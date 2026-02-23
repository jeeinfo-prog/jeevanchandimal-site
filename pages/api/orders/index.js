// pages/api/orders/index.js
import { supabaseAdmin } from '../../../lib/supabaseAdmin'

function isUuid(v) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
    String(v || '')
  )
}

function safeArr(v) {
  return Array.isArray(v) ? v : []
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' })
  }

  // hard no-cache
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')
  res.setHeader('Pragma', 'no-cache')
  res.setHeader('Expires', '0')
  res.setHeader('Surrogate-Control', 'no-store')

  try {
    const email = String(req.query.email || '').trim().toLowerCase()
    if (!email) return res.status(400).json({ ok: false, error: 'Missing email' })

    // ✅ include cart fields too
    const { data: orders, error } = await supabaseAdmin
      .from('orders')
      .select(
        'id,code,order_id,order_kind,status,email,photo_id,license,format,currency,amount,paid_at,download_limit,download_count,delivery_object_key,invoice_no,items'
      )
      .eq('email', email)
      .eq('status', 'PAID')
      .order('paid_at', { ascending: false })
      .limit(200)

    if (error) return res.status(500).json({ ok: false, error: error.message })

    const list = orders || []
    if (list.length === 0) return res.status(200).json({ ok: true, orders: [] })

    // ✅ Collect photo IDs from BOTH single + cart
    const photoIdsSet = new Set()

    for (const o of list) {
      // single
      if (isUuid(o.photo_id)) photoIdsSet.add(o.photo_id)

      // cart
      if (String(o.order_kind || '').toLowerCase() === 'cart') {
        const items = safeArr(o.items)
        for (const it of items) {
          const pid = String(it?.photoId || it?.photo_id || '').trim()
          if (isUuid(pid)) photoIdsSet.add(pid)
        }
      }
    }

    const photoIds = Array.from(photoIdsSet)

    let photoMap = {}
    if (photoIds.length) {
      const { data: photos, error: pErr } = await supabaseAdmin
        .from('photos')
        .select('id,title,thumb_url,preview_url')
        .in('id', photoIds)

      if (pErr) return res.status(500).json({ ok: false, error: pErr.message })

      photoMap = Object.fromEntries((photos || []).map((p) => [p.id, p]))
    }

    // ✅ Build response rows
    const merged = list.map((o) => {
      const kind = String(o.order_kind || '').toLowerCase()

      // default single photo merge
      const p = photoMap[o.photo_id] || null

      return {
        // ✅ keep compatibility with your UI
        order_id: o.id,

        // ✅ single-photo convenience fields (cart will still have these but may be first-item only)
        title: p?.title || null,
        thumb_url: p?.thumb_url || null,
        preview_url: p?.preview_url || null,

        // ✅ include cart data so UI can render multiple downloads
        order_kind: o.order_kind || null,
        code: o.code || null,
        items: safeArr(o.items).map((it) => {
          const pid = String(it?.photoId || it?.photo_id || '').trim()
          const pp = pid ? photoMap[pid] : null
          return {
            ...it,
            // enrich item with photo basics
            title: pp?.title || it?.title || null,
            thumb_url: pp?.thumb_url || null,
            preview_url: pp?.preview_url || null,
          }
        }),

        // ✅ original order fields
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

        // optional full merged photo (single-photo only)
        photo: p,
      }
    })

    return res.status(200).json({ ok: true, orders: merged })
  } catch (e) {
    console.error(e)
    return res.status(500).json({ ok: false, error: e?.message || 'Server error' })
  }
}