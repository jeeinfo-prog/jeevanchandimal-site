// pages/api/payhere/create-checkout.js

import { supabaseAdmin } from '../../../lib/supabaseAdmin'
import { payhereInitHash } from '../../../lib/payhere'

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

// ✅ NEW: unified PayHere mode resolver (Supabase setting first)
async function getPayhereMode() {
  // 1) env fallback (optional)
  const envFallback = String(process.env.PAYHERE_ENV || '').trim().toLowerCase()
  if (envFallback === 'live') return 'live'
  if (envFallback === 'sandbox') return 'sandbox'

  // 2) boolean env fallback (what you currently have)
  const sandboxBool =
    toBool(process.env.PAYHERE_SANDBOX) || toBool(process.env.NEXT_PUBLIC_PAYHERE_SANDBOX)

  const fallbackMode = sandboxBool ? 'sandbox' : 'live'

  // 3) Supabase app_settings override (no redeploy)
  try {
    const { data, error } = await supabaseAdmin
      .from('app_settings')
      .select('value')
      .eq('key', 'payhere_mode')
      .maybeSingle()

    if (error) return fallbackMode

    const v = String(data?.value || '').trim().toLowerCase()
    if (v === 'live') return 'live'
    if (v === 'sandbox') return 'sandbox'
    return fallbackMode
  } catch {
    return fallbackMode
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ ok: false, error: 'Method not allowed' })

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

    if (!photoId || !license || !format || !currency) {
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
    if (!amount) return res.status(400).json({ ok: false, error: 'Invalid pricing selection' })

    const merchantId = String(process.env.PAYHERE_MERCHANT_ID || '').trim()
    const merchantSecret = String(process.env.PAYHERE_MERCHANT_SECRET || '').trim()
    const siteUrl = String(process.env.NEXT_PUBLIC_SITE_URL || '').trim()
    const webhookBase = String(process.env.WEBHOOK_BASE_URL || siteUrl).trim()

    if (!merchantId || !merchantSecret || !siteUrl) {
      return res.status(500).json({
        ok: false,
        error: 'Missing env vars (PAYHERE_MERCHANT_ID, PAYHERE_MERCHANT_SECRET, NEXT_PUBLIC_SITE_URL)',
      })
    }

    // ✅ Fetch photo
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
    const delivery_object_key = getDeliveryObjectKey(String(photoId), format)

    // ✅ IMPORTANT: only insert columns that exist in your `orders` table
    const insertPayload = {
      id: orderId,
      status: 'PENDING',
      email: cleanEmail,
      currency,
      amount,
      photo_id: String(photoId),
      license,
      format,
      delivery_object_key,
      order_kind: 'photo',
    }

    const { error: insertError } = await supabaseAdmin.from('orders').insert(insertPayload)

    if (insertError) {
      console.error('Supabase insert error:', insertError)
      return res.status(500).json({ ok: false, error: insertError.message || 'Failed to create order' })
    }

    // ✅ NEW: mode from Supabase (with env fallback)
    const payhereMode = await getPayhereMode()

    const actionUrl =
      payhereMode === 'live'
        ? 'https://www.payhere.lk/pay/checkout'
        : 'https://sandbox.payhere.lk/pay/checkout'

    const hash = payhereInitHash({
      merchantId,
      merchantSecret,
      orderId,
      amount,
      currency,
    })

    const fields = {
      merchant_id: merchantId,

      return_url: `${siteUrl}/store/return?order_id=${encodeURIComponent(orderId)}`,
      cancel_url: `${siteUrl}/store/cancel?order_id=${encodeURIComponent(orderId)}`,
      notify_url: `${webhookBase}/api/payhere/notify`,

      first_name: String(firstName || 'Customer').trim(),
      last_name: String(lastName || 'Guest').trim(),
      email: cleanEmail,
      phone,
      address,
      city,
      country,

      order_id: orderId,
      items: `${photo.title || 'Photo'} - ${license.toUpperCase()} - ${format.toUpperCase()}`,
      currency,
      amount: Number(amount).toFixed(2),
      hash,

      custom_1: 'photo',
      custom_2: `${license}:${format}`,
    }

    return res.status(200).json({
      ok: true,
      actionUrl,
      fields,
      orderId,
      payhereMode, // ✅ helpful debug
    })
  } catch (e) {
    console.error('create-checkout error:', e)
    return res.status(500).json({ ok: false, error: e?.message || 'Server error' })
  }
}