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

function chunkArray(arr, size) {
  const out = []
  for (let i = 0; i < arr.length; i += size) {
    out.push(arr.slice(i, i + size))
  }
  return out
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
      .select('id, photo_id, amount, currency, status, created_at')
      .order('created_at', { ascending: false })

    if (orderErr) throw orderErr

    /* ---------------- download tokens ---------------- */
    const { data: tokens, error: tokenErr } = await supabaseAdmin
      .from('download_tokens')
      .select('order_id, created_at')

    if (tokenErr) throw tokenErr

    const orderRows = Array.isArray(orders) ? orders : []
    const tokenRows = Array.isArray(tokens) ? tokens : []

    const paidOrders = orderRows.filter(
      (o) => String(o?.status || '').trim().toUpperCase() === 'PAID'
    )

    const totalOrders = paidOrders.length
    const totalDownloads = tokenRows.length

    /* ---------------- analytics maps ---------------- */
    const revenueByCurrencyMap = {}
    const revenuePerDayByCurrencyMap = {}
    const downloadsByDay = {}
    const downloadsByOrder = {}
    const byPhoto = {}

    for (const o of paidOrders) {
      const currency = normalizeCurrency(o?.currency)
      const amount = toNumber(o?.amount)
      const day = dateKey(o?.created_at)

      revenueByCurrencyMap[currency] = (revenueByCurrencyMap[currency] || 0) + amount

      if (!revenuePerDayByCurrencyMap[currency]) {
        revenuePerDayByCurrencyMap[currency] = {}
      }

      if (day) {
        revenuePerDayByCurrencyMap[currency][day] =
          (revenuePerDayByCurrencyMap[currency][day] || 0) + amount
      }

      const photoId = String(o?.photo_id || '').trim()
      if (photoId) {
        byPhoto[photoId] = (byPhoto[photoId] || 0) + 1
      }
    }

    for (const t of tokenRows) {
      const day = dateKey(t?.created_at)
      if (day) downloadsByDay[day] = (downloadsByDay[day] || 0) + 1

      const orderId = String(t?.order_id || '').trim()
      if (orderId) {
        downloadsByOrder[orderId] = (downloadsByOrder[orderId] || 0) + 1
      }
    }

    /* ---------------- photos lookup (NO RELATIONSHIP JOIN) ---------------- */
    const uniquePhotoIds = Array.from(
      new Set(
        paidOrders
          .map((o) => String(o?.photo_id || '').trim())
          .filter(Boolean)
      )
    )

    const photosById = {}

    for (const ids of chunkArray(uniquePhotoIds, 200)) {
      const { data: photos, error: photosErr } = await supabaseAdmin
        .from('photos')
        .select('id, thumbnail_key, original_key, original_jpg_key')
        .in('id', ids)

      if (photosErr) throw photosErr

      for (const p of photos || []) {
        photosById[String(p.id)] = p
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
      revenuePerDayByCurrency[currency] = Object.entries(revenuePerDayByCurrencyMap[currency])
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

    /* ---------------- recent orders monitor ---------------- */
    const ordersOut = paidOrders
      .slice()
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      .slice(0, 20)
      .map((o) => {
        const photoId = String(o?.photo_id || '').trim()
        const photo = photosById[photoId] || null

        return {
          orderId: o.id,
          photoId,
          amount: Number(toNumber(o?.amount).toFixed(2)),
          currency: normalizeCurrency(o?.currency),
          date: o.created_at,
          downloads: downloadsByOrder[o.id] || 0,
          thumbnail: photo?.thumbnail_key || null,
          original: photo?.original_jpg_key || photo?.original_key || null,
        }
      })

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