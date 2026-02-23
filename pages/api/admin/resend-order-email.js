// pages/api/admin/resend-order-email.js
import crypto from 'crypto'
import { supabaseAdmin } from '@/lib/supabaseAdmin'
import { createDownloadToken } from '@/lib/secureDownload'
import { sendDownloadEmail, sendReceiptEmail } from '@/lib/email'

function cleanBaseUrl(v) {
  return String(v || '')
    .trim()
    .replace(/\/+$/, '')
}

function getBaseUrl(req) {
  // ✅ Prefer server env, then NEXT_PUBLIC version
  const webhook =
    cleanBaseUrl(process.env.WEBHOOK_BASE_URL) || cleanBaseUrl(process.env.NEXT_PUBLIC_WEBHOOK_BASE_URL)
  if (webhook) return webhook

  const proto = (req.headers['x-forwarded-proto'] || 'https').toString()
  const host = (req.headers['x-forwarded-host'] || req.headers.host || '').toString()
  if (host) return `${proto}://${host}`

  return cleanBaseUrl(process.env.NEXT_PUBLIC_SITE_URL)
}

function normalizeFormat(v) {
  return String(v || '').trim().toLowerCase() === 'raw' ? 'raw' : 'jpg'
}

// last resort only
function fallbackObjectKeyFromPhotoId(photoId, format) {
  const pid = String(photoId || '').trim()
  if (!pid) return null
  if (format === 'raw') return `photos/original/${pid}.zip`
  return `photos/original/${pid}.jpg`
}

// ✅ Safe resolver that only selects columns that exist in your photos table
async function resolveObjectKeyForSingleOrder(o) {
  const photoId = String(o?.photo_id || '').trim()
  if (!photoId) return null

  const fmt = normalizeFormat(o?.format)

  const { data: p, error } = await supabaseAdmin
    .from('photos')
    .select('id,original_key,original_raw_key')
    .eq('id', photoId)
    .maybeSingle()

  if (error) throw new Error(error.message)
  if (!p) return null

  if (fmt === 'raw') return p.original_raw_key ? String(p.original_raw_key) : null
  return p.original_key ? String(p.original_key) : null
}

function safeEmail(v) {
  return String(v || '').trim().toLowerCase()
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ ok: false, error: 'Method not allowed' })

  try {
    const { orderId } = req.body || {}
    const id = String(orderId || '').trim()
    if (!id) return res.status(400).json({ ok: false, error: 'Missing orderId' })

    const { data: o, error } = await supabaseAdmin.from('orders').select('*').eq('id', id).single()
    if (error || !o) return res.status(404).json({ ok: false, error: 'Order not found' })
    if (String(o.status || '').toUpperCase() !== 'PAID') return res.status(400).json({ ok: false, error: 'Order not paid' })

    const email = safeEmail(o.email)
    if (!email) return res.status(400).json({ ok: false, error: 'Missing email' })

    // ✅ ensure invoice_no (use your real generator style)
    let invoiceNo = o.invoice_no
    if (!invoiceNo) {
      const tail =
        String(o.id || '')
          .replace(/[^a-zA-Z0-9]/g, '')
          .slice(-6)
          .toUpperCase() || crypto.randomUUID().slice(0, 6).toUpperCase()
      const d = new Date()
      const yyyy = d.getUTCFullYear()
      const mm = String(d.getUTCMonth() + 1).padStart(2, '0')
      const dd = String(d.getUTCDate()).padStart(2, '0')
      invoiceNo = `INV-${yyyy}${mm}${dd}-${tail}`

      await supabaseAdmin.from('orders').update({ invoice_no: invoiceNo }).eq('id', o.id)
    }

    // ✅ objectKey fallbacks (this is the big fix)
    let objectKey = null
    try {
      objectKey = await resolveObjectKeyForSingleOrder(o)
    } catch (e) {
      // if photos table lookup fails, continue with order fallback
      console.error('resolveObjectKeyForSingleOrder failed:', e?.message || e)
    }

    if (!objectKey) objectKey = String(o.delivery_object_key || '').trim()
    if (!objectKey) objectKey = fallbackObjectKeyFromPhotoId(String(o.photo_id || ''), normalizeFormat(o.format))

    if (!objectKey) {
      return res.status(400).json({ ok: false, error: 'Missing objectKey (delivery_object_key and photos key missing)' })
    }

    // ✅ persist correct key if needed
    if (String(o.delivery_object_key || '').trim() !== String(objectKey)) {
      await supabaseAdmin.from('orders').update({ delivery_object_key: objectKey }).eq('id', o.id)
    }

    // ✅ create token record
    const jti = crypto.randomUUID()
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000)

    const ins = await supabaseAdmin.from('download_tokens').insert({
      jti,
      order_id: o.id,
      expires_at: expiresAt.toISOString(),
    })
    if (ins.error) throw new Error(`download_tokens insert failed: ${ins.error.message}`)

    const fmt = normalizeFormat(o.format)
    const ext = fmt === 'raw' ? 'zip' : 'jpg'

    const token = createDownloadToken(
      {
        jti,
        orderId: o.id,
        photoId: o.photo_id,
        format: fmt,
        objectKey,
        guestEmail: email,
        filename: `${o.photo_id}.${ext}`,
      },
      '1h'
    )

    const base = getBaseUrl(req)
    const downloadUrl = `${base}/api/download?token=${encodeURIComponent(token)}`

    // ✅ send receipt (don’t silently skip)
    await sendReceiptEmail({
      to: email,
      orderId: o.id,
      invoiceNo,
      amount: o.amount,
      currency: o.currency,
      photoTitle: o.photo_id,
      license: o.license,
      format: o.format,
      paymentId: o.payhere_payment_id || null,
    })

    await supabaseAdmin
      .from('orders')
      .update({ invoice_email_sent_at: new Date().toISOString() })
      .eq('id', o.id)

    // ✅ send download
    await sendDownloadEmail({
      to: email,
      orderId: o.id,
      photoTitle: o.photo_id,
      downloadUrl,
      license: o.license,
      format: o.format,
    })

    await supabaseAdmin
      .from('orders')
      .update({ download_email_sent_at: new Date().toISOString() })
      .eq('id', o.id)

    // ✅ return debug info so you KNOW what happened
    return res.status(200).json({
      ok: true,
      orderId: o.id,
      to: email,
      base,
      objectKey,
      invoiceNo,
      expiresAt: expiresAt.toISOString(),
    })
  } catch (e) {
    console.error('resend-order-email error:', e)
    return res.status(500).json({ ok: false, error: e?.message || 'Email resend failed' })
  }
}