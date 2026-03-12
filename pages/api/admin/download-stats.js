import { supabaseAdmin } from '../../../lib/supabaseAdmin'

export default async function handler(req, res) {
  try {
    const { data: tokens, error } = await supabaseAdmin
      .from('download_tokens')
      .select('order_id, created_at')

    if (error) throw error

    const rows = tokens || []

    const totalDownloads = rows.length

    const byOrder = {}
    const byDay = {}

    rows.forEach((t) => {
      const order = String(t.order_id || '').trim()
      const day = String(t.created_at || '').slice(0, 10)

      if (order) {
        byOrder[order] = (byOrder[order] || 0) + 1
      }

      if (day) {
        byDay[day] = (byDay[day] || 0) + 1
      }
    })

    const topOrders = Object.entries(byOrder)
      .map(([orderId, count]) => ({ orderId, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10)

    const downloadsPerDay = Object.entries(byDay)
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => new Date(a.date) - new Date(b.date))

    res.status(200).json({
      ok: true,
      totalDownloads,
      topOrders,
      downloadsPerDay,
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({
      ok: false,
      error: err.message,
    })
  }
}