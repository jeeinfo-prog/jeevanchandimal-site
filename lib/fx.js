// lib/fx.js
// Central FX helper:
// - live FX from /api/fx (cached in localStorage)
// - optional lock (stable at checkout)

export const STORAGE_FX_KEY = 'jc_fx_live_v1'
export const STORAGE_FX_LOCK_KEY = 'jc_fx_lock_v1'

// fallback: 1 USD = 300 LKR
export const DEFAULT_FX = 300

// refresh window
export const SIX_HOURS_MS = 6 * 60 * 60 * 1000

function safeNumber(v, fallback) {
  const n = Number(v)
  return Number.isFinite(n) && n > 0 ? n : fallback
}

function safeJsonParse(raw, fallback) {
  try {
    const v = JSON.parse(raw)
    return v ?? fallback
  } catch {
    return fallback
  }
}

/**
 * Read cached live FX rate (USD->LKR) from localStorage
 * returns number
 */
export function readFxCache() {
  if (typeof window === 'undefined') return null
  const raw = window.localStorage.getItem(STORAGE_FX_KEY)
  if (!raw) return null
  const obj = safeJsonParse(raw, null)
  if (!obj || !obj.rate) return null
  return safeNumber(obj.rate, null)
}

/**
 * Read cached live FX object { rate, fetchedAt }
 */
export function readFxCacheObj() {
  if (typeof window === 'undefined') return null
  const raw = window.localStorage.getItem(STORAGE_FX_KEY)
  if (!raw) return null
  const obj = safeJsonParse(raw, null)
  if (!obj || !obj.rate) return null
  return {
    rate: safeNumber(obj.rate, DEFAULT_FX),
    fetchedAt: safeNumber(obj.fetchedAt, 0),
  }
}

export function writeFxCache(rate) {
  if (typeof window === 'undefined') return
  const r = safeNumber(rate, DEFAULT_FX)
  window.localStorage.setItem(
    STORAGE_FX_KEY,
    JSON.stringify({
      rate: r,
      fetchedAt: Date.now(),
    })
  )
}

export function isFxCacheFresh(maxAgeMs = SIX_HOURS_MS) {
  const obj = readFxCacheObj()
  if (!obj) return false
  if (!obj.fetchedAt) return false
  return Date.now() - obj.fetchedAt <= maxAgeMs
}

/**
 * FX LOCK: used to keep rate stable during checkout
 */
export function readFxLock() {
  if (typeof window === 'undefined') return null
  const raw = window.localStorage.getItem(STORAGE_FX_LOCK_KEY)
  if (!raw) return null
  const obj = safeJsonParse(raw, null)
  if (!obj || !obj.rate) return null
  return safeNumber(obj.rate, null)
}

export function readFxLockObj() {
  if (typeof window === 'undefined') return null
  const raw = window.localStorage.getItem(STORAGE_FX_LOCK_KEY)
  if (!raw) return null
  const obj = safeJsonParse(raw, null)
  if (!obj || !obj.rate) return null
  return {
    rate: safeNumber(obj.rate, DEFAULT_FX),
    lockedAt: safeNumber(obj.lockedAt, 0),
  }
}

export function hasFxLock() {
  return !!readFxLock()
}

export function writeFxLock(rate) {
  if (typeof window === 'undefined') return
  const r = safeNumber(rate, DEFAULT_FX)
  window.localStorage.setItem(
    STORAGE_FX_LOCK_KEY,
    JSON.stringify({
      rate: r,
      lockedAt: Date.now(),
    })
  )
}

export function clearFxLock() {
  if (typeof window === 'undefined') return
  window.localStorage.removeItem(STORAGE_FX_LOCK_KEY)
}

/**
 * Get FX rate for display:
 * - if lock exists -> use lock
 * - else use cached live
 * - else fallback DEFAULT_FX
 */
export function getFxForDisplay() {
  const lock = readFxLock()
  if (lock) return safeNumber(lock, DEFAULT_FX)

  const cached = readFxCache()
  if (cached) return safeNumber(cached, DEFAULT_FX)

  return DEFAULT_FX
}

/**
 * Fetch live FX from your API: GET /api/fx
 * Expected response:
 *  { ok: true, rate: <number>, base: 'USD', quote: 'LKR', fetchedAt?: <ms> }
 */
export async function fetchLiveFx() {
  // if locked, keep stable (do not overwrite)
  if (hasFxLock()) return getFxForDisplay()

  const res = await fetch('/api/fx', { method: 'GET' })
  const json = await res.json().catch(() => ({}))

  if (!res.ok || !json?.ok) {
    // fallback to cached or DEFAULT
    return getFxForDisplay()
  }

  const rate = safeNumber(json.rate, DEFAULT_FX)

  // cache it
  writeFxCache(rate)

  return rate
}