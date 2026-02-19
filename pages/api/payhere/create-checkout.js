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

function getDeliveryObjectKey(photoId, format) {
  if (format === 'raw') return `photos/original/${photoId}.zip`
  return `photos/original/${photoId}.jpg`
}

function isValidEmail(v) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v || '').trim())
}

function toBool(v) {
  return String(v || '').trim().toLowerCase() === 'true'
}

function cleanBaseUrl(v) {
  return String(v || '').trim().replace(/\/+$/, '')
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' })
  }

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
    const cleanPhotoId = String(photoId || '').trim()
    if (!cleanPhotoId || !license || !format || !currency) {
      return res.status(400).json({ ok: false, error: 'Missing required fields' })
    }
    if (!['personal', 'commercial', 'editorial'].includes(license)) {
      return res.status(400).json({ ok: false, error: 'Invalid license' })
    }
    if (!['jpg', 'raw'].includes(format)) {
      return res.status(400).json({ ok: false, error: 'Invalid format' })
    }
    if (!['LKR', 'USD'].includes(currency)) {
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

    // ✅ Env vars (server)
    const merchantId = cleanBaseUrl(process.env.PAYHERE_MERCHANT_ID) // no harm if not url; we just trim
    const merchantSecret = String(process.env.PAYHERE_MERCHANT_SECRET || '').trim()

    // Use stable public site URL for return/cancel links
    const siteUrl = cleanBaseUrl(process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL)

    // Webhook base must be publicly reachable URL (prefer WEBHOOK_BASE_URL)
    const webhookBase = cleanBaseUrl(process.env.WEBHOOK_BASE_URL || siteUrl)

    const sandbox =
      toBool(process.env.PAYHERE_SANDBOX) || toBool(process.env.NEXT_PUBLIC_PAYHERE_SANDBOX)

    if (!merchantId || !merchantSecret || !siteUrl) {
      return res.status(500).json({
        ok: false,
        error:
          'Missing env vars (PAYHERE_MERCHANT_ID, PAYHERE_MERCHANT_SECRET, SITE_URL or NEXT_PUBLIC_SITE_URL)',
      })
    }

    // ✅ Fetch photo
    const { data: photo, error: photoErr } = await supabaseAdmin
      .from('photos')
      .select('id, title, status')
      .eq('id', cleanPhotoId)
      .eq('status', 'published')
      .single()

    if (photoErr || !photo) {
      console.error('Photo lookup failed:', { photoId: cleanPhotoId, photoErr })
      return res.status(404).json({ ok: false, error: 'Photo not found' })
    }

    const orderId = uid()
    const delivery_object_key = getDeliveryObjectKey(cleanPhotoId, format)

    // ✅ Store everything you need for emails/receipt in DB
    const { error: insertError } = await supabaseAdmin.from('orders').insert({
      id: orderId,
      status: 'PENDING',

      // type
      order_kind: 'photo',

      // customer
      email: cleanEmail,
      first_name: String(firstName || 'Customer').trim(),
      last_name: String(lastName || 'Guest').trim(),
      phone: String(phone || '').trim(),
      address: String(address || '').trim(),
      city: String(city || '').trim(),
      country: String(country || '').trim(),

      // item
      currency,
      amount,
      photo_id: cleanPhotoId,
      license,
      format,
      delivery_object_key,
    })

    if (insertError) {
      console.error('Supabase insert error:', insertError)
      return res.status(500).json({ ok: false, error: 'Failed to create order' })
    }

    // ✅ PayHere checkout URL
    const actionUrl = sandbox
      ? 'https://sandbox.payhere.lk/pay/checkout'
      : 'https://www.payhere.lk/pay/checkout'

    // ✅ Hash for PayHere init
    const hash = payhereInitHash({
      merchantId,
      merchantSecret,
      orderId,
      amount,
      currency,
    })

    // ✅ PayHere form fields
    const fields = {
      merchant_id: merchantId,

      return_url: `${siteUrl}/store/return?order_id=${encodeURIComponent(orderId)}`,
      cancel_url: `${siteUrl}/store/cancel?order_id=${encodeURIComponent(orderId)}`,

      // ✅ Critical: PayHere will call this URL on payment status change
      notify_url: `${webhookBase}/api/payhere/notify`,

      first_name: String(firstName || 'Customer').trim(),
      last_name: String(lastName || 'Guest').trim(),
      email: cleanEmail,
      phone: String(phone || '0000000000').trim(),
      address: String(address || 'N/A').trim(),
      city: String(city || 'N/A').trim(),
      country: String(country || 'Sri Lanka').trim(),

      order_id: orderId,
      items: `${photo.title || 'Photo'} - ${license.toUpperCase()} - ${format.toUpperCase()}`,
      currency,
      amount: Number(amount).toFixed(2),
      hash,

      // ✅ Custom fields used by notify.js (keep consistent)
      custom_1: 'photo',          // order kind
      custom_2: cleanPhotoId,     // photo id
    }

    // ✅ Return
    return res.status(200).json({
      ok: true,
      actionUrl,
      fields,
      orderId,
      // Optional debug only in development
      ...(process.env.NODE_ENV !== 'production'
        ? {
            debug: {
              sandbox,
              siteUrl,
              webhookBase,
            },
          }
        : {}),
    })
  } catch (e) {
    console.error('create-checkout error:', e)
    return res.status(500).json({
      ok: false,
      error: 'Server error',
      detail: e?.message || String(e),
    })
  }
}
