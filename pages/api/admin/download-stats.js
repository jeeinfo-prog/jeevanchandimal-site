import { supabaseAdmin } from '../../../lib/supabaseAdmin'

function toNumber(v) {
  const n = Number(v || 0)
  return Number.isFinite(n) ? n : 0
}

function dateKey(v) {
  const s = String(v || '').trim()
  return s ? s.slice(0, 10) : ''
}

function normalizeCurrency(v) {
  const s = String(v || '').trim().toUpperCase()
  return s || 'UNKNOWN'
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET')
    return res.status(405).json({ ok: false, error: 'Method not allowed' })
  }

  try {

    /* ---------------- orders ---------------- */

    const { data: orders, error: orderErr } = await supabaseAdmin
      .from('orders')
      .select(`
        id,
        photo_id,
        amount,
        currency,
        status,
        created_at,
        photos (
          id,
          thumbnail_key
        )
      `)

    if (orderErr) throw orderErr


    /* ---------------- download tokens ---------------- */

    const { data: tokens, error: tokenErr } = await supabaseAdmin
      .from('download_tokens')
      .select('order_id, created_at')

    if (tokenErr) throw tokenErr


    const orderRows = Array.isArray(orders) ? orders : []
    const tokenRows = Array.isArray(tokens) ? tokens : []

    const paidOrders = orderRows.filter(
      (o) => String(o?.status || '').toUpperCase() === 'PAID'
    )

    const totalOrders = paidOrders.length
    const totalDownloads = tokenRows.length


    /* ---------------- analytics maps ---------------- */

    const revenueByCurrencyMap = {}
    const revenuePerDayByCurrencyMap = {}
    const downloadsByDay = {}
    const downloadsByOrder = {}
    const byPhoto = {}


    /* ---------------- process orders ---------------- */

    for (const o of paidOrders) {

      const currency = normalizeCurrency(o.currency)
      const amount = toNumber(o.amount)
      const day = dateKey(o.created_at)

      revenueByCurrencyMap[currency] =
        (revenueByCurrencyMap[currency] || 0) + amount

      if (!revenuePerDayByCurrencyMap[currency]) {
        revenuePerDayByCurrencyMap[currency] = {}
      }

      if (day) {
        revenuePerDayByCurrencyMap[currency][day] =
          (revenuePerDayByCurrencyMap[currency][day] || 0) + amount
      }

      const photoId = String(o.photo_id || '').trim()
      if (photoId) {
        byPhoto[photoId] = (byPhoto[photoId] || 0) + 1
      }
    }


    /* ---------------- process downloads ---------------- */

    for (const t of tokenRows) {

      const day = dateKey(t.created_at)
      if (day) downloadsByDay[day] = (downloadsByDay[day] || 0) + 1

      const orderId = String(t.order_id || '').trim()
      if (orderId) {
        downloadsByOrder[orderId] = (downloadsByOrder[orderId] || 0) + 1
      }
    }


    /* ---------------- analytics outputs ---------------- */

    const revenueByCurrency = Object.entries(revenueByCurrencyMap)
      .map(([currency, total]) => ({
        currency,
        total: Number(total.toFixed(2)),
      }))
      .sort((a, b) => a.currency.localeCompare(b.currency))


    const revenuePerDayByCurrency = {}

    for (const currency of Object.keys(revenuePerDayByCurrencyMap)) {
      revenuePerDayByCurrency[currency] =
        Object.entries(revenuePerDayByCurrencyMap[currency])
          .map(([date, value]) => ({
            date,
            value: Number(value.toFixed(2)),
          }))
          .sort((a, b) => a.date.localeCompare(b.date))
    }


    const downloadsPerDay = Object.entries(downloadsByDay)
      .map(([date, value]) => ({ date, value }))
      .sort((a, b) => a.date.localeCompare(b.date))


    const topPhotos = Object.entries(byPhoto)
      .map(([photoId, count]) => ({ photoId, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10)


    /* ---------------- order table ---------------- */

    const ordersOut = paidOrders
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      .slice(0, 20)
      .map((o) => ({
        orderId: o.id,
        photoId: o.photo_id,
        amount: o.amount,
        currency: o.currency,
        date: o.created_at,
        downloads: downloadsByOrder[o.id] || 0,
        thumbnail: o.photos?.thumbnail_key || null,
      }))


    /* ---------------- response ---------------- */

    return res.status(200).json({
      ok: true,

      totalOrders,
      totalDownloads,

      revenueByCurrency,
      revenuePerDayByCurrency,
      downloadsPerDay,

      topPhotos,

      orders: ordersOut,
    })

  } catch (err) {
    console.error('download-stats error:', err)

    return res.status(500).json({
      ok: false,
      error: err?.message || 'Server error',
    })
  }
}