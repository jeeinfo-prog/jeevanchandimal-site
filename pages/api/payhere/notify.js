// pages/api/payhere/notify.js

import { payhereVerifyMd5Sig } from "../../../lib/payhere";
import { supabaseAdmin } from "../../../lib/supabase-admin";

export const config = {
  api: { bodyParser: false }, // PayHere sends x-www-form-urlencoded
};

function parseFormUrlEncoded(raw) {
  const s = raw.toString("utf8");
  const obj = {};
  for (const pair of s.split("&")) {
    const [k, v] = pair.split("=");
    if (!k) continue;
    obj[decodeURIComponent(k)] = decodeURIComponent((v || "").replace(/\+/g, " "));
  }
  return obj;
}

export default async function handler(req, res) {
  // PayHere will POST here. We return OK for GET too (browser checks).
  if (req.method !== "POST") return res.status(200).send("OK");

  try {
    // Read raw body
    const chunks = [];
    for await (const chunk of req) chunks.push(chunk);
    const body = parseFormUrlEncoded(Buffer.concat(chunks));

    // Quick log (optional but useful)
    console.log("PAYHERE_NOTIFY_HIT", {
      order_id: body.order_id,
      status_code: body.status_code,
      status_message: body.status_message,
      payment_id: body.payment_id,
      payhere_amount: body.payhere_amount,
      payhere_currency: body.payhere_currency,
    });

    const merchantSecret = process.env.PAYHERE_MERCHANT_SECRET;
    if (!merchantSecret) return res.status(500).send("Missing merchant secret");

    // Verify signature (md5sig)
    const ok = payhereVerifyMd5Sig({
      merchantSecret,
      merchant_id: body.merchant_id,
      order_id: body.order_id,
      payhere_amount: body.payhere_amount,
      payhere_currency: body.payhere_currency,
      status_code: body.status_code,
      md5sig: body.md5sig,
    });

    console.log("PAYHERE_NOTIFY_SIG_OK?", ok, "order_id:", body.order_id);

    if (!ok) {
      console.error("PayHere notify: invalid signature", body.order_id);
      return res.status(400).send("Invalid signature");
    }

    const orderId = String(body.order_id || "");
    if (!orderId) return res.status(400).send("Missing order_id");

    const statusCode = Number(body.status_code);

    // Map PayHere status codes
    // 2 = success
    // -1 = canceled
    // -2 = failed
    // -3 = reversed/charged back (treat as failed)
    let status = "PENDING";
    if (statusCode === 2) status = "PAID";
    else if (statusCode === -1) status = "CANCELED";
    else if (statusCode === -2 || statusCode === -3) status = "FAILED";

    const updatePayload = {
      status,
      payhere_payment_id: body.payment_id || null,
      payhere_status_code: statusCode,
      payhere_status_message: body.status_message || null,
    };

    if (status === "PAID") {
      updatePayload.paid_at = new Date().toISOString();
    }

    const { error } = await supabaseAdmin
      .from("orders")
      .update(updatePayload)
      .eq("id", orderId);

    if (error) {
      console.error("Supabase update error (notify):", error, orderId);
      // Respond OK so PayHere doesn't keep retrying forever
      return res.status(200).send("OK");
    }

    return res.status(200).send("OK");
  } catch (e) {
    console.error("notify.js error:", e);
    // Respond OK to avoid repeated retries; log for debugging
    return res.status(200).send("OK");
  }
}
