// pages/api/fx.js

export default async function handler(req, res) {
  try {
    const r = await fetch('https://open.er-api.com/v6/latest/USD', {
      headers: { 'Cache-Control': 'no-store' },
    })

    const data = await r.json().catch(() => null)

    const rateRaw = data?.rates?.LKR
    const usdLkr = Number(rateRaw)

    if (!r.ok || !Number.isFinite(usdLkr) || usdLkr <= 0) {
      return res.status(500).json({
        ok: false,
        error: 'Rate unavailable',
      })
    }

    // 🚫 prevent browser / CDN caching
    res.setHeader(
      'Cache-Control',
      'no-store, no-cache, must-revalidate, proxy-revalidate'
    )
    res.setHeader('Pragma', 'no-cache')
    res.setHeader('Expires', '0')

    return res.status(200).json({
      ok: true,
      usdLkr,
      updated: data?.time_last_update_utc || data?.time_last_update_unix || null,
      source: 'open.er-api.com',
    })
  } catch (e) {
    return res.status(500).json({
      ok: false,
      error: 'FX fetch failed',
    })
  }
}