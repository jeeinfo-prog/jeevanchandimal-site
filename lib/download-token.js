// lib/download-token.js
import crypto from "crypto";

function base64url(input) {
  return Buffer.from(input)
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

function base64urlJson(obj) {
  return base64url(JSON.stringify(obj));
}

function fromBase64urlToJson(body) {
  const json = Buffer.from(
    body.replace(/-/g, "+").replace(/_/g, "/"),
    "base64"
  ).toString("utf8");
  return JSON.parse(json);
}

/**
 * Sign a download token with expiring payload.
 * @param {object} payload - Your payload (photoId, scope, userId, etc.)
 * @param {string} secret - DOWNLOAD_TOKEN_SECRET
 * @param {object} options
 * @param {number} options.ttlSeconds - default 300 (5 minutes)
 * @param {number} options.nowSeconds - for testing
 */
export function signDownloadToken(payload, secret, options = {}) {
  if (!secret) throw new Error("Missing secret");

  const ttlSeconds = Number.isFinite(options.ttlSeconds) ? options.ttlSeconds : 300; // 5 min
  const now = Number.isFinite(options.nowSeconds)
    ? options.nowSeconds
    : Math.floor(Date.now() / 1000);

  const fullPayload = {
    ...payload,
    iat: now,
    exp: now + ttlSeconds,
  };

  const body = base64urlJson(fullPayload);

  const sig = crypto
    .createHmac("sha256", secret)
    .update(body)
    .digest("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");

  return `${body}.${sig}`;
}

/**
 * Verify token signature + expiration.
 * @returns { ok: boolean, payload?: object, error?: string }
 */
export function verifyDownloadToken(token, secret, options = {}) {
  try {
    if (!secret) return { ok: false, error: "Missing secret" };
    if (!token || !token.includes(".")) return { ok: false, error: "Bad token" };

    const [body, sig] = token.split(".");
    if (!body || !sig) return { ok: false, error: "Bad token" };

    const expected = crypto
      .createHmac("sha256", secret)
      .update(body)
      .digest("base64")
      .replace(/=/g, "")
      .replace(/\+/g, "-")
      .replace(/\//g, "_");

    // timing safe compare
    const a = Buffer.from(sig);
    const b = Buffer.from(expected);
    if (a.length !== b.length) return { ok: false, error: "Bad token sig" };
    if (!crypto.timingSafeEqual(a, b)) return { ok: false, error: "Bad token sig" };

    const payload = fromBase64urlToJson(body);

    // Expiry check
    const now = Number.isFinite(options.nowSeconds)
      ? options.nowSeconds
      : Math.floor(Date.now() / 1000);

    if (typeof payload.exp !== "number") {
      return { ok: false, error: "Token missing exp" };
    }
    if (now >= payload.exp) {
      return { ok: false, error: "Token expired" };
    }

    // Optional not-before check (if you ever use it)
    if (typeof payload.nbf === "number" && now < payload.nbf) {
      return { ok: false, error: "Token not active yet" };
    }

    return { ok: true, payload };
  } catch (e) {
    return { ok: false, error: "Bad token" };
  }
}
