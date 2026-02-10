// pages/api/payhere/create-checkout.js

import { supabaseAdmin } from "../../../lib/supabaseAdmin.js";
import { payhereInitHash } from "../../../lib/payhere";
import { getPhotoById } from "../../../lib/photos";

function uid() {
  return `ORD_${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

const PRICES = {
  LKR: {
    personal: { jpg: 2500, raw: 4000 },
    commercial: { jpg: 6500, raw: 9500 },
    editorial: { jpg: 4000, raw: 6000 },
  },
  USD: {
    personal: { jpg: 8, raw: 13 },
    commercial: { jpg: 22, raw: 32 },
    editorial: { jpg: 13, raw: 20 },
  },
};

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    const {
      photoId,
      license,
      format,
      currency,
      email,
      firstName = "Customer",
      lastName = "Guest",
      phone = "0000000000",
      address = "N/A",
      city = "N/A",
      country = "Sri Lanka",
    } = req.body || {};

    // Validate request
    if (!photoId || !license || !format || !currency) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    if (!["personal", "commercial", "editorial"].includes(license)) {
      return res.status(400).json({ error: "Invalid license" });
    }
    if (!["jpg", "raw"].includes(format)) {
      return res.status(400).json({ error: "Invalid format" });
    }
    if (!["LKR", "USD"].includes(currency)) {
      return res.status(400).json({ error: "Invalid currency" });
    }

    const photo = getPhotoById(String(photoId));
    if (!photo) return res.status(404).json({ error: "Photo not found" });

    const amount = PRICES?.[currency]?.[license]?.[format];
    if (!amount) return res.status(400).json({ error: "Invalid pricing selection" });

    // Env vars
    const merchantId = process.env.PAYHERE_MERCHANT_ID;
    const merchantSecret = process.env.PAYHERE_MERCHANT_SECRET;

    // Where users are redirected after payment
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

    // Where PayHere webhook posts (use .vercel.app to avoid redirects)
    const webhookBase = process.env.WEBHOOK_BASE_URL || siteUrl;

    const sandbox = String(process.env.PAYHERE_SANDBOX || "false") === "true";

    if (!merchantId || !merchantSecret || !siteUrl) {
      return res.status(500).json({
        error:
          "Missing env vars (PAYHERE_MERCHANT_ID, PAYHERE_MERCHANT_SECRET, NEXT_PUBLIC_SITE_URL)",
      });
    }

    // Create order in Supabase
    const orderId = uid();

    const { error: insertError } = await supabaseAdmin.from("orders").insert({
      id: orderId,
      status: "PENDING",
      email: email || null,
      currency,
      amount,
      photo_id: String(photoId),
      license,
      format,
    });

    if (insertError) {
      console.error("Supabase insert error:", insertError);
      return res.status(500).json({ error: "Failed to create order" });
    }

    // PayHere checkout URL
    const actionUrl = sandbox
      ? "https://sandbox.payhere.lk/pay/checkout"
      : "https://www.payhere.lk/pay/checkout";

    // Hash for PayHere init
    const hash = payhereInitHash({
      merchantId,
      merchantSecret,
      orderId,
      amount,
      currency,
    });

    // PayHere form fields
    const fields = {
      merchant_id: merchantId,

      // Redirect user back to your website
      return_url: `${siteUrl}/store/return?order_id=${encodeURIComponent(orderId)}`,
      cancel_url: `${siteUrl}/store/cancel?order_id=${encodeURIComponent(orderId)}`,

      // PayHere server-to-server webhook (no redirects)
      notify_url: `${webhookBase}/api/payhere/notify`,

      first_name: firstName,
      last_name: lastName,
      email: email || "guest@example.com",
      phone,
      address,
      city,
      country,

      order_id: orderId,
      items: `${photo.title} - ${license.toUpperCase()} - ${format.toUpperCase()}`,
      currency,
      amount: Number(amount).toFixed(2),
      hash,

      // Optional debug / metadata
      custom_1: String(photoId),
      custom_2: `${license}:${format}`,
    };

    return res.status(200).json({ actionUrl, fields, orderId });
  } catch (e) {
    console.error("create-checkout error:", e);
    return res.status(500).json({ error: "Server error" });
  }
}
