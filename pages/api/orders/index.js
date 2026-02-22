// pages/api/orders/index.js

import { supabaseAdmin } from '@/lib/supabaseAdmin'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' })
  }

  try {
    const email = String(req.query.email || '').trim().toLowerCase()

    if (!email) {
      return res.status(400).json({ ok: false, error: 'Missing email' })
    }

    const { data, error } = await supabaseAdmin
      .from('orders')
      .select(`
        id,
        status,
        email,
        photo_id,
        license,
        format,
        currency,
        amount,
        paid_at,
        download_count,
        download_limit,
        delivery_object_key,
        photos:photo_id (
          title,
          preview_url,
          thumb_url
        )
      `)
      .eq('email', email)
      .eq('status', 'PAID')
      .order('paid_at', { ascending: false })

    if (error) {
      console.error('orders fetch error:', error)
      return res.status(500).json({ ok: false, error: error.message })
    }

    const orders = (data || []).map((o) => ({
      id: o.id,
      status: o.status,
      email: o.email,
      photoId: o.photo_id,
      title: o.photos?.title || 'Untitled',
      preview_url: o.photos?.preview_url || null,
      thumb_url: o.photos?.thumb_url || null,
      license: o.license,
      format: o.format,
      currency: o.currency,
      amount: Number(o.amount || 0),
      paid_at: o.paid_at,
      download_count: o.download_count || 0,
      download_limit: o.download_limit || 0,
      delivery_object_key: o.delivery_object_key || null,
    }))

    return res.status(200).json({ ok: true, orders })
  } catch (err) {
    console.error('orders api error:', err)
    return res.status(500).json({ ok: false, error: 'Server error' })
  }
}