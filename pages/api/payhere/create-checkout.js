// pages/api/payhere/create-checkout.js

import { supabaseAdmin } from '../../../lib/supabaseAdmin'
import { PAYHERE, assertPayhereEnv, payhereInitHash } from '../../../lib/payhere'

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

function getDeliveryObjectKey(photoId, format) {
  if (format === 'raw') return `photos/original/${photoId}.zip`
  return `photos/original/${photoId}.jpg`
}

function isValidEmail(v) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v || '').trim())
}

function cleanBaseUrl(v) {
  return String(v || '')
    .trim()
    .replace(/\/+$/, '')
}

function normalizePublicBaseUrl() {
  const siteUrl =
    cleanBaseUrl(process.env.NEXT_PUBLIC_SITE_URL) ||
    cleanBaseUrl(process.env.SITE_URL)

  return siteUrl
}

function normalizeWebhookBaseUrl() {
  return (
    cleanBaseUrl(process.env.WEBHOOK_BASE_URL) ||
    cleanBaseUrl(process.env.NEXT_PUBLIC_WEBHOOK_BASE_URL) ||
    normalizePublicBaseUrl()
  )
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' })
  }

  try {
    assertPayhereEnv()

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

    if (!photoId || !license || !format || !currency) {
      return res.status(400).json({ ok: false, error: 'Missing required fields' })
    }

    if (!['personal', 'commercial', 'editorial'].includes(String(license))) {
      return res.status(400).json({ ok: false, error: 'Invalid license' })
    }

    if (!['jpg', 'raw'].includes(String(format))) {
      return res.status(400).json({ ok: false, error: 'Invalid format' })
    }

    if (!['LKR', 'USD'].includes(String(currency))) {
      return res.status(400).json({ ok: false, error: 'Invalid currency' })
    }

    const cleanEmail = String(email || '').trim().toLowerCase()
    if (!isValidEmail(cleanEmail)) {
      return res.status(400).json({ ok: false, error: 'Valid email is required' })
    }

    const amount = PRICES?.[currency]?.[license]?.[format]
    if (!amount) {
      return res.status(400).json({ ok: false, error: 'Invalid pricing selection' })
    }

    const siteUrl = normalizePublicBaseUrl()
    const webhookBase = normalizeWebhookBaseUrl()

    if (!siteUrl) {
      return res.status(500).json({
        ok: false,
        error: 'Missing env var NEXT_PUBLIC_SITE_URL',
      })
    }

    if (!webhookBase) {
      return res.status(500).json({
        ok: false,
        error: 'Missing webhook base URL',
      })
    }

    const notifyUrl = `${webhookBase}/api/payhere/notify`
    const returnUrl = `${siteUrl}/store/return?order_id=`
    const cancelUrl = `${siteUrl}/store/cancel?order_id=`

    // published photo only
    const { data: photo, error: photoErr } = await supabaseAdmin
      .from('photos')
      .select('id, title, status')
      .eq('id', String(photoId))
      .eq('status', 'published')
      .single()

    if (photoErr || !photo) {
      console.error('Photo lookup failed:', { photoId, photoErr })
      return res.status(404).json({ ok: false, error: 'Photo not found' })
    }

    const orderId = uid()
    const deliveryObjectKey = getDeliveryObjectKey(String(photoId), format)

    const insertPayload = {
      id: orderId,
      order_id: orderId,
      code: orderId,
      status: 'PENDING',
      email: cleanEmail,
      currency,
      amount,
      photo_id: String(photoId),
      license,
      format,
      delivery_object_key: deliveryObjectKey,
      order_kind: 'photo',
    }

    const { error: insertError } = await supabaseAdmin.from('orders').insert(insertPayload)

    if (insertError) {
      console.error('Supabase insert error:', insertError)
      return res
        .status(500)
        .json({ ok: false, error: insertError.message || 'Failed to create order' })
    }

    const hash = payhereInitHash({
      merchantId: PAYHERE.merchantId,
      merchantSecret: PAYHERE.merchantSecret,
      orderId,
      amount,
      currency,
    })

    const fields = {
      merchant_id: PAYHERE.merchantId,

      return_url: `${returnUrl}${encodeURIComponent(orderId)}`,
      cancel_url: `${cancelUrl}${encodeURIComponent(orderId)}`,
      notify_url: notifyUrl,

      first_name: String(firstName || 'Customer').trim(),
      last_name: String(lastName || 'Guest').trim(),
      email: cleanEmail,
      phone: String(phone || '0000000000').trim(),
      address: String(address || 'N/A').trim(),
      city: String(city || 'N/A').trim(),
      country: String(country || 'Sri Lanka').trim(),

      order_id: orderId,
      items: `${photo.title || 'Photo'} - ${String(license).toUpperCase()} - ${String(format).toUpperCase()}`,
      currency,
      amount: Number(amount).toFixed(2),
      hash,

      custom_1: 'photo',
      custom_2: `${license}:${format}`,
    }

    console.log('PayHere checkout created:', {
      orderId,
      notify_url: fields.notify_url,
      return_url: fields.return_url,
      cancel_url: fields.cancel_url,
      merchant_id: fields.merchant_id,
      sandbox: PAYHERE.sandbox,
    })

    return res.status(200).json({
      ok: true,
      actionUrl: PAYHERE.checkoutUrl,
      fields,
      orderId,
      sandbox: PAYHERE.sandbox,
    })
  } catch (e) {
    console.error('create-checkout error:', e)
    return res.status(500).json({ ok: false, error: e?.message || 'Server error' })
  }
}