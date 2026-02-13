// pages/api/payhere/create-checkout.js

import { supabaseAdmin } from '@/lib/supabaseAdmin'
import { payhereInitHash } from '@/lib/payhere'

function uid() {
  return `ORD_${Date.now()}_${Math.random().toString(16).slice(2)}`
}

const PRICES = {
  LKR: {
    personal: { jpg: 2500, raw: 4000 },
    commercial: { jpg: 6500, raw: 9500 },
    editorial: { jpg: 4000, raw: 6000 },
  },
  USD: {
    personal: { jpg: 8, raw: 13 },
    commercial: { jpg: 22, raw: 32 },
    editorial: { jpg: 13, raw: 20 },
  },
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  try {
    const {
      photoId,
      license,
      format,
      currency,
      email,
      firstName = 'Customer',
      lastName = 'Guest',
      phone = '0000000000',
      address = 'N/A',
      city = 'N/A',
      country = 'Sri Lanka',
    } = req.body || {}

    // ✅ Validate request
    if (!photoId || !license || !format || !currency) {
      return res.status(400).json({ error: 'Missing required fields' })
    }
    if (!['personal', 'commercial', 'editorial'].includes(license)) {
      return res.status(400).json({ error: 'Invalid license' })
    }
    if (!['jpg', 'raw'].includes(format)) {
      return res.status(400).json({ error: 'Invalid format' })
    }
    if (!['LKR', 'USD'].includes(currency)) {
      return res.status(400).json({ error: 'Invalid currency' })
    }

    const amount = PRICES?.[currency]?.[license]?.[format]
    if (!amount) return res.status(400).json({ error: 'Invalid pricing selection' })

    // ✅ Env vars
    const merchantId = process.env.PAYHERE_MERCHANT_ID
    const merchantSecret = process.env.PAYHERE_MERCHANT_SECRET
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
    const webhookBase = process.env.WEBHOOK_BASE_URL || siteUrl
    const sandbox = String(process.env.PAYHERE_SANDBOX || 'false') === 'true'

    if (!merchantId || !merchantSecret || !siteUrl) {
      return res.status(500).json({
        error: 'Missing env vars (PAYHERE_MERCHANT_ID, PAYHERE_MERCHANT_SECRET, NEXT_PUBLIC_SITE_URL)',
      })
    }

    // ✅ Fetch photo (select ONLY columns that exist)
    // IMPORTANT: You must have 'original_key' in photos table to deliver paid JPG securely.
    const { data: photo, error: photoErr } = await supabaseAdmin
      .from('photos')
      .select('id, title, status, original_key')
      .eq('id', String(photoId))
      .eq('status', 'published')
      .single()

    if (photoErr || !photo) {
      console.error('Photo lookup failed:', { photoId: String(photoId), photoErr })
      return res.status(404).json({ error: 'Photo not found' })
    }

    // ✅ Decide delivery key
    // - JPG uses photos.original_key
    // - RAW not supported unless you add photos.raw_zip_key (or similar)
    let deliveryKey = null

    if (format === 'jpg') {
      deliveryKey = photo.original_key
      if (!deliveryKey) {
        return res.status(500).json({
          error: 'Missing photos.original_key (required for paid JPG delivery)',
        })
      }
    } else {
      // RAW path not ready (you can change this later when you add a RAW key column)
      return res.status(400).json({
        error: 'RAW delivery not configured yet. Please purchase JPG for now.',
      })
    }

    // ✅ Create order in Supabase (store delivery_object_key!)
    const orderId = uid()

    const { error: insertError } = await supabaseAdmin.from('orders').insert({
      id: orderId,
      status: 'PENDING',
      email: email || null,
      currency,
      amount,
      photo_id: String(photoId),
      license,
      format,
      delivery_object_key: deliveryKey, // ✅ FIX
    })

    if (insertError) {
      console.error('Supabase insert error:', insertError)
      return res.status(500).json({ error: 'Failed to create order' })
    }

    // ✅ PayHere checkout URL
    const actionUrl = sandbox ? 'https://sandbox.payhere.lk/pay/checkout' : 'https://www.payhere.lk/pay/checkout'

    // ✅ Hash for PayHere init
    const hash = payhereInitHash({
      merchantId,
      merchantSecret,
      orderId,
      amount,
      currency,
    })

    const notifyUrl = `${webhookBase}/api/payhere/notify`
    console.log('PAYHERE notify_url =', notifyUrl)

    // ✅ PayHere form fields
    const fields = {
      merchant_id: merchantId,

      return_url: `${siteUrl}/store/return?order_id=${encodeURIComponent(orderId)}`,
      cancel_url: `${siteUrl}/store/cancel?order_id=${encodeURIComponent(orderId)}`,

      notify_url: notifyUrl,

      first_name: firstName,
      last_name: lastName,
      email: email || 'guest@example.com',
      phone,
      address,
      city,
      country,

      order_id: orderId,
      items: `${photo.title || 'Photo'} - ${license.toUpperCase()} - ${format.toUpperCase()}`,
      currency,
      amount: Number(amount).toFixed(2),
      hash,

      custom_1: String(photoId),
      custom_2: `${license}:${format}`,
    }

    return res.status(200).json({ actionUrl, fields, orderId })
  } catch (e) {
    console.error('create-checkout error:', e)
    return res.status(500).json({ error: 'Server error', detail: e?.message || String(e) })
  }
}
