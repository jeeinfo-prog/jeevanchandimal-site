// pages/api/member/download.js

import crypto from 'crypto'
import { supabaseAdmin } from '../../../lib/supabaseAdmin'
import { createDownloadToken } from '../../../lib/secureDownload'

function normalizeEmail(v) {
  return String(v || '').trim().toLowerCase()
}
function isValidEmail(v) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v || '').trim())
}
function cleanLower(v) {
  return String(v || '').trim().toLowerCase()
}
function normalizeFormat(v) {
  return String(v || '').trim().toLowerCase() === 'raw' ? 'raw' : 'jpg'
}

function isExpired(iso) {
  if (!iso) return false
  const t = new Date(iso).getTime()
  if (!Number.isFinite(t)) return false
  return t < Date.now()
}

async function resolveObjectKeyFromPhotos(photoId, format) {
  const pid = String(photoId || '').trim()
  if (!pid) return null

  const fmt = normalizeFormat(format)

  const { data: p, error } = await supabaseAdmin
    .from('photos')
    .select('id,original_key,original_raw_key,original_jpg_key')
    .eq('id', pid)
    .maybeSingle()

  if (error) throw new Error(error.message)
  if (!p) return null

  if (fmt === 'raw') return p.original_raw_key ? String(p.original_raw_key) : null
  return p.original_jpg_key || p.original_key ? String(p.original_jpg_key || p.original_key) : null
}

function resolveTierTermFromMembershipRow(m) {
  const tier = cleanLower(m?.plan)
  const term = cleanLower(m?.billing_cycle)

  // New schema
  if (['basic', 'pro', 'elite'].includes(tier)) {
    return {
      tier,
      term: ['monthly', 'yearly', 'lifetime'].includes(term) ? term : 'monthly',
    }
  }

  // Legacy plan values
  if (tier === 'monthly') return { tier: 'pro', term: 'monthly' }
  if (tier === 'yearly') return { tier: 'pro', term: 'yearly' }
  if (tier === 'lifetime') return { tier: 'pro', term: 'lifetime' }

  return { tier: 'pro', term: 'monthly' }
}

export default async function handler(req, res) {
  // no caching
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0')
  res.setHeader('Pragma', 'no-cache')
  res.setHeader('Expires', '0')
  res.setHeader('Surrogate-Control', 'no-store')

  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' })
  }

  try {
    const photoId = String(req.body?.photoId || '').trim()
    const email = normalizeEmail(req.body?.email)
    const requestedFormat = normalizeFormat(req.body?.format)

    if (!photoId || !email) {
      return res.status(400).json({ ok: false, error: 'Missing photoId or email' })
    }
    if (!isValidEmail(email)) {
      return res.status(400).json({ ok: false, error: 'Invalid email' })
    }

    // ✅ Read membership (single upsert row)
    const { data: m, error: mErr } = await supabaseAdmin
      .from('memberships')
      .select(
        'email, plan, status, start_date, end_date, billing_cycle, billing_cycle_start, billing_cycle_end, monthly_download_limit, monthly_download_used, created_at'
      )
      .eq('email', email)
      .maybeSingle()

    if (mErr) return res.status(500).json({ ok: false, error: mErr.message })
    if (!m) return res.status(403).json({ ok: false, error: 'Not a member' })
    if (cleanLower(m.status) !== 'active') return res.status(403).json({ ok: false, error: 'Not a member' })

    const endsAt = m.billing_cycle_end || m.end_date || null
    if (isExpired(endsAt)) {
      return res.status(403).json({ ok: false, error: 'Membership expired', ends_at: endsAt })
    }

    const { tier, term } = resolveTierTermFromMembershipRow(m)

    // RAW allowed only for elite (you can change this rule)
    const canRaw = tier === 'elite'
    const format = requestedFormat === 'raw' && canRaw ? 'raw' : 'jpg'
    const ext = format === 'raw' ? 'zip' : 'jpg'

    const objectKey = await resolveObjectKeyFromPhotos(photoId, format)
    if (!objectKey) return res.status(404).json({ ok: false, error: 'File not found' })

    // ✅ Metering from memberships table (source of truth)
    const limit = Number(m.monthly_download_limit ?? 0)
    const used = Number(m.monthly_download_used ?? 0)

    // limit=0 => unlimited
    const remaining = limit === 0 ? null : Math.max(0, limit - used)
    if (remaining !== null && remaining <= 0) {
      return res.status(403).json({
        ok: false,
        error: 'Monthly download limit reached.',
        tier,
        term,
        used,
        limit,
        remaining: 0,
        ends_at: endsAt,
      })
    }

    // Create download token record (prefer NULL order_id)
    const jti = crypto.randomUUID()
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000)

    // NOTE:
    // If download_tokens.order_id is NOT NULL in your DB, set it to a known placeholder.
    // Best is to ALTER TABLE to allow NULL and keep it null for membership downloads.
    const tokenRow = {
      jti,
      order_id: null, // ✅ membership downloads aren’t tied to an order row
      expires_at: expiresAt.toISOString(),
    }

    const insTok = await supabaseAdmin.from('download_tokens').insert(tokenRow)
    if (insTok.error) {
      // fallback if order_id is NOT NULL in DB
      const msg = String(insTok.error.message || '')
      if (msg.toLowerCase().includes('null') && msg.toLowerCase().includes('order_id')) {
        const fallbackIns = await supabaseAdmin.from('download_tokens').insert({
          jti,
          order_id: 'MEMBERSHIP', // fallback placeholder
          expires_at: expiresAt.toISOString(),
        })
        if (fallbackIns.error) {
          console.error('download_tokens insert failed:', fallbackIns.error.message)
          return res.status(500).json({ ok: false, error: fallbackIns.error.message })
        }
      } else {
        console.error('download_tokens insert failed:', insTok.error.message)
        return res.status(500).json({ ok: false, error: insTok.error.message })
      }
    }

    const token = createDownloadToken(
      {
        jti,
        orderId: null, // membership-based
        photoId,
        format,
        objectKey,
        guestEmail: email,
        filename: `${photoId}.${ext}`,
        license: 'membership',
        membership: { tier, term }, // optional extra context
      },
      '1h'
    )

    return res.status(200).json({
      ok: true,
      tier,
      term,
      type: format,
      used,
      limit,
      remaining,
      ends_at: endsAt,
      url: `/api/download?token=${encodeURIComponent(token)}`,
    })
  } catch (e) {
    console.error('member/download error:', e)
    return res.status(500).json({ ok: false, error: e?.message || 'Server error' })
  }
}