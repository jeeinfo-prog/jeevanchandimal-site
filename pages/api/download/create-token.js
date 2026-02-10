// pages/api/download/create-token.js

import { supabaseAdmin } from "../../../lib/supabaseAdmin.js";
import { signDownloadToken } from "../../../lib/download-token";

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store, max-age=0");

  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { orderId } = req.body || {};
  if (!orderId) return res.status(400).json({ error: "Missing orderId" });

  const secret = process.env.DOWNLOAD_TOKEN_SECRET;
  if (!secret) return res.status(500).json({ error: "Missing DOWNLOAD_TOKEN_SECRET" });

  const { data, error } = await supabaseAdmin
    .from("orders")
    .select("id,status,photo_id,license,format")
    .eq("id", String(orderId))
    .single();

  if (error || !data) return res.status(404).json({ error: "Order not found" });
  if (data.status !== "PAID") return res.status(403).json({ error: "Order is not paid" });

  const exp = Math.floor(Date.now() / 1000) + 10 * 60; // 10 minutes

  const token = signDownloadToken(
    {
      orderId: data.id,
      photoId: data.photo_id,
      license: data.license,
      format: data.format,
      exp,
    },
    secret
  );

  const url = `/api/download/file?token=${encodeURIComponent(token)}`;
  return res.status(200).json({ url, exp });
}
