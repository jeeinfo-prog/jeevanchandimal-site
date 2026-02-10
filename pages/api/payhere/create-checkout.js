// pages/api/payhere/create-checkout.js

import { supabaseAdmin } from "../../../lib/supabase-admin";
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

    // Basic validation
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
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
    const sandbox = String(process.env.PAYHERE_SANDBOX || "false") === "true";

    if (!merchantId || !merchantSecret || !siteUrl) {
      return res.status(500).json({
        error: "Missing env vars (PAYHERE_MERCHANT_ID, PAYHERE_MERCHANT_SECRET, NEXT_PUBLIC_SITE_URL)",
      });
    }

    // Create order
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

    // Hash for checkout
    const hash = payhereInitHash({
      merchantId,
      merchantSecret,
      orderId,
      amount,
      currency,
    });

    // Form fields PayHere expects
    const fields = {
      merchant_id: merchantId,
      return_url: `${siteUrl}/store/return?order_id=${encodeURIComponent(orderId)}`,
      cancel_url: `${siteUrl}/store/cancel?order_id=${encodeURIComponent(orderId)}`,
      notify_url: `${siteUrl}/api/payhere/notify`,

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

      // Optional custom fields (handy for debugging)
      custom_1: String(photoId),
      custom_2: `${license}:${format}`,
    };

    return res.status(200).json({ actionUrl, fields, orderId });
  } catch (e) {
    console.error("create-checkout error:", e);
    return res.status(500).json({ error: "Server error" });
  }
}
