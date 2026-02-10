import crypto from "crypto";
import { createClient } from "@supabase/supabase-js";
import { sendDownloadEmail } from "../../../lib/email";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  // PayHere may call with GET or POST
  const data = req.method === "POST" ? req.body : req.query;

  try {
    const {
      order_id,
      payment_id,
      status_code,
      status_message,
      md5sig,
      merchant_id,
      payhere_amount,
      payhere_currency,
    } = data;

    if (!order_id) {
      return res.status(200).json({ ok: true });
    }

    // Fetch order
    const { data: order, error } = await supabase
      .from("orders")
      .select("*")
      .eq("id", order_id)
      .single();

    if (error || !order) {
      console.error("Order not found:", order_id);
      return res.status(200).json({ ok: true });
    }

    // Verify signature (PayHere security)
    if (process.env.PAYHERE_MERCHANT_SECRET) {
      const secret = process.env.PAYHERE_MERCHANT_SECRET;
      const localSig = crypto
        .createHash("md5")
        .update(
          merchant_id +
            order_id +
            payhere_amount +
            payhere_currency +
            status_code +
            secret
        )
        .digest("hex")
        .toUpperCase();

      if (md5sig && md5sig !== localSig) {
        console.error("MD5 signature mismatch");
        return res.status(200).json({ ok: true });
      }
    }

    // ✅ PAYMENT SUCCESS
    if (Number(status_code) === 2 && order.status !== "PAID") {
      await supabase
        .from("orders")
        .update({
          status: "PAID",
          paid_at: new Date().toISOString(),
          payhere_payment_id: payment_id,
          payhere_status_code: status_code,
          payhere_status_message: status_message,
        })
        .eq("id", order_id);

      // Send email (only once)
      if (order.email) {
        await sendDownloadEmail({
          to: order.email,
          orderId: order.id,
          photoTitle: order.photo_id,
        });
      }

      console.log("Order marked PAID:", order_id);
    }

    // ❌ PAYMENT FAILED / CANCELED
    if (Number(status_code) < 0) {
      await supabase
        .from("orders")
        .update({
          status: "FAILED",
          payhere_payment_id: payment_id || "0",
          payhere_status_code: status_code,
          payhere_status_message: status_message,
        })
        .eq("id", order_id);

      console.log("Order marked FAILED:", order_id);
    }

    // Always respond 200 to PayHere
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("PayHere notify error:", err);
    return res.status(200).json({ ok: true });
  }
}
