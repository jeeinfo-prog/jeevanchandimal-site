// pages/api/admin/download-stats.js
import { supabaseAdmin } from '../../../lib/supabaseAdmin'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET')
    return res.status(405).json({ ok: false, error: 'Method not allowed' })
  }

  try {
    const { data: tokens, error } = await supabaseAdmin
      .from('download_tokens')
      .select('order_id, created_at')

    if (error) throw error

    const rows = Array.isArray(tokens) ? tokens : []
    const totalDownloads = rows.length

    const byOrder = {}
    for (const t of rows) {
      const key = String(t?.order_id || '').trim()
      if (!key) continue
      byOrder[key] = (byOrder[key] || 0) + 1
    }

    const topOrders = Object.entries(byOrder)
      .map(([orderId, count]) => ({ orderId, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10)

    return res.status(200).json({
      ok: true,
      totalDownloads,
      topOrders,
    })
  } catch (err) {
    console.error('download-stats error:', err)
    return res.status(500).json({
      ok: false,
      error: err?.message || 'Server error',
    })
  }
}