// lib/download-token.js

import crypto from "crypto";

function base64url(input) {
  return Buffer.from(input).toString("base64").replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}

function base64urlJson(obj) {
  return base64url(JSON.stringify(obj));
}

export function signDownloadToken(payload, secret) {
  const body = base64urlJson(payload);
  const sig = crypto.createHmac("sha256", secret).update(body).digest("base64").replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
  return `${body}.${sig}`;
}

export function verifyDownloadToken(token, secret) {
  if (!token || !token.includes(".")) return { ok: false, error: "Bad token" };

  const [body, sig] = token.split(".");
  const expected = crypto.createHmac("sha256", secret).update(body).digest("base64").replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");

  // timing safe compare
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return { ok: false, error: "Bad token sig" };
  if (!crypto.timingSafeEqual(a, b)) return { ok: false, error: "Bad token sig" };

  const json = Buffer.from(body.replace(/-/g, "+").replace(/_/g, "/"), "base64").toString("utf8");
  const payload = JSON.parse(json);

  return { ok: true, payload };
}
