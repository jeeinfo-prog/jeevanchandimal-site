// pages/api/download/file.js

import { supabaseAdmin } from "../../../lib/supabaseAdmin.js";
import { verifyDownloadToken } from "../../../lib/download.js";
import { getPhotoById } from "../../../lib/photos";

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store, max-age=0");

  const token = typeof req.query.token === "string" ? req.query.token : "";
  const secret = process.env.DOWNLOAD_TOKEN_SECRET;
  if (!secret) return res.status(500).send("Missing DOWNLOAD_TOKEN_SECRET");

  const check = verifyDownloadToken(token, secret);
  if (!check.ok) return res.status(401).send("Invalid token");

  const { orderId, photoId, format, exp } = check.payload || {};
  if (!orderId || !photoId || !format || !exp) return res.status(401).send("Invalid token");

  if (Math.floor(Date.now() / 1000) > Number(exp)) {
    return res.status(401).send("Token expired");
  }

  // Confirm order is still PAID (server-side truth)
  const { data, error } = await supabaseAdmin
    .from("orders")
    .select("id,status,photo_id,format")
    .eq("id", String(orderId))
    .single();

  if (error || !data) return res.status(404).send("Order not found");
  if (data.status !== "PAID") return res.status(403).send("Not paid");
  if (String(data.photo_id) !== String(photoId)) return res.status(403).send("Mismatch");
  if (String(data.format) !== String(format)) return res.status(403).send("Mismatch");

  const photo = getPhotoById(String(photoId));
  if (!photo) return res.status(404).send("Photo not found");

  // MVP: deliver JPG via previewUrl (replace with R2 original later)
  if (format === "raw") {
    return res.status(501).send("RAW delivery will be enabled after Cloudflare R2 is connected.");
  }

  const fileUrl = photo.previewUrl; // TODO: swap to R2 private original JPG signed fetch
  const filename = `${photo.id}.jpg`;

  // Fetch and stream
  const upstream = await fetch(fileUrl);
  if (!upstream.ok) return res.status(502).send("Failed to fetch file");

  res.setHeader("Content-Type", upstream.headers.get("content-type") || "image/jpeg");
  res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);

  const arrayBuffer = await upstream.arrayBuffer();
  return res.status(200).send(Buffer.from(arrayBuffer));
}
