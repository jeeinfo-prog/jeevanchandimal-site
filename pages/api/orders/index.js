// pages/api/orders/index.js
import { supabaseAdmin } from '@/lib/supabaseAdmin'

function isUuid(v) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
    String(v || '')
  )
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' })
  }

  // no-cache (downloads should reflect latest)
  res.setHeader('Cache-Control', 'no-store, max-age=0')

  try {
    const email = String(req.query.email || '').trim().toLowerCase()
    if (!email) return res.status(400).json({ ok: false, error: 'Missing email' })

    // 1) Load PAID orders for this email
    const { data: orders, error } = await supabaseAdmin
      .from('orders')
      .select(
        'id,status,photo_id,license,format,currency,amount,paid_at,download_limit,download_count,delivery_object_key,invoice_no'
      )
      .eq('email', email)
      .eq('status', 'PAID')
      .order('paid_at', { ascending: false })
      .limit(200)

    if (error) return res.status(500).json({ ok: false, error: error.message })

    const list = orders || []
    if (list.length === 0) return res.status(200).json({ ok: true, orders: [] })

    // 2) Fetch related photos WITHOUT FK relationship
    const photoIds = Array.from(new Set(list.map((o) => o.photo_id).filter((x) => isUuid(x))))

    let photoMap = {}
    if (photoIds.length) {
      const { data: photos, error: pErr } = await supabaseAdmin
        .from('photos')
        .select('id,title,thumb_url,preview_url')
        .in('id', photoIds)

      if (pErr) return res.status(500).json({ ok: false, error: pErr.message })

      photoMap = Object.fromEntries((photos || []).map((p) => [p.id, p]))
    }

    // 3) Merge + FLATTEN fields used by UI
    const merged = list.map((o) => {
      const p = photoMap[o.photo_id] || null
      return {
        // ✅ UI convenience
        order_id: o.id, // your Downloads page uses item.order_id
        title: p?.title || null,
        thumb_url: p?.thumb_url || null,
        preview_url: p?.preview_url || null,

        // ✅ keep original order fields
        id: o.id,
        status: o.status,
        photo_id: o.photo_id,
        license: o.license,
        format: o.format,
        currency: o.currency,
        amount: o.amount,
        paid_at: o.paid_at,
        download_limit: o.download_limit,
        download_count: o.download_count,
        delivery_object_key: o.delivery_object_key,
        invoice_no: o.invoice_no,

        // optional: keep full photo object too
        photo: p,
      }
    })

    return res.status(200).json({ ok: true, orders: merged })
  } catch (e) {
    console.error(e)
    return res.status(500).json({ ok: false, error: e?.message || 'Server error' })
  }
}