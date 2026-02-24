export default async function handler(req, res) {
  try {
    // free endpoint (no key) – returns many rates
    const r = await fetch('https://open.er-api.com/v6/latest/USD', {
      headers: { 'Cache-Control': 'no-store' },
    })

    const data = await r.json()

    if (!r.ok || !data?.rates?.LKR) {
      return res.status(500).json({ ok: false, error: 'Rate unavailable' })
    }

    const usdLkr = Number(data.rates.LKR)

    return res.status(200).json({
      ok: true,
      usdLkr,
      updated: data.time_last_update_utc || null,
    })
  } catch (e) {
    return res.status(500).json({ ok: false, error: 'FX fetch failed' })
  }
}