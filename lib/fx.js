// lib/fx.js
const FX_LOCK_KEY = 'jc_fx_lock_v1'
const DEFAULT_FX = 300

function normalizeRate(v) {
  const n = Number(v)
  if (!Number.isFinite(n) || n <= 0) return null
  return n
}

export function readFxLock() {
  // return null if not locked yet (important!)
  if (typeof window === 'undefined') return null

  const raw = window.localStorage.getItem(FX_LOCK_KEY)
  if (!raw) return null

  return normalizeRate(raw)
}

export function writeFxLock(rate) {
  if (typeof window === 'undefined') return

  const n = normalizeRate(rate)
  if (!n) return

  window.localStorage.setItem(FX_LOCK_KEY, String(n))
}

export function clearFxLock() {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.removeItem(FX_LOCK_KEY)
  } catch {}
}

export async function ensureFxLock() {
  // server-side fallback
  if (typeof window === 'undefined') return DEFAULT_FX

  // already locked → reuse (even if it's 300)
  const existing = readFxLock()
  if (existing) return existing

  try {
    const res = await fetch('/api/fx-rate', { cache: 'no-store' })
    const json = await res.json().catch(() => null)

    // ✅ respect your API shape: { ok: true, usdLkr }
    if (json?.ok !== true) return DEFAULT_FX

    const rate = normalizeRate(json?.usdLkr)
    if (rate) {
      writeFxLock(rate)
      return rate
    }
  } catch (e) {
    console.warn('FX fetch failed, using fallback', e)
  }

  return DEFAULT_FX
}

export function getFxForDisplay() {
  // convenience: locked if exists else DEFAULT_FX
  return readFxLock() || DEFAULT_FX
}

export { DEFAULT_FX, FX_LOCK_KEY }