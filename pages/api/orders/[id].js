// pages/api/orders/[id].js

import { supabaseAdmin } from "../../../lib/supabase-admin";

export default async function handler(req, res) {
  // HARD no-cache (Vercel/CDN/browser)
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");
  res.setHeader("Surrogate-Control", "no-store");

  const { id } = req.query;

  const { data, error } = await supabaseAdmin
    .from("orders")
    .select("id,status,photo_id,license,format,currency,amount,paid_at,payhere_payment_id")
    .eq("id", String(id))
    .single();

  if (error || !data) return res.status(404).json({ error: "Order not found" });

  return res.status(200).json({
    id: data.id,
    status: data.status, // "PAID" / "PENDING" ...
    photoId: data.photo_id,
    license: data.license,
    format: data.format,
    currency: data.currency,
    amount: Number(data.amount),
    paidAt: data.paid_at,
    paymentId: data.payhere_payment_id,
  });
}
