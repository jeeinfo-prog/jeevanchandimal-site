import { supabaseAdmin } from "../../../lib/supabase-admin";

export default async function handler(req, res) {
  const { id } = req.query;

  const { data, error } = await supabaseAdmin
    .from("orders")
    .select("*")
    .eq("id", String(id))
    .single();

  if (error || !data) {
    return res.status(404).json({ error: "Order not found" });
  }

  return res.status(200).json({
    id: data.id,
    status: data.status,
    photoId: data.photo_id,
    license: data.license,
    format: data.format,
    currency: data.currency,
    amount: Number(data.amount),
  });
}
