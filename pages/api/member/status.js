// pages/api/member/status.js
import crypto from 'crypto'
import { createClient } from '@supabase/supabase-js'
import { supabaseAdmin } from '../../../lib/supabaseAdmin'

function cleanLower(v) {
  return String(v || '').trim().toLowerCase()
}

function resolveTierTermFromMembershipRow(memberRow) {
  // memberships.plan could be:
  // - legacy: monthly/yearly/lifetime
  // - new: basic/pro/elite
  const planRaw = cleanLower(memberRow?.plan)

  // legacy mapping
  if (planRaw === 'monthly') return { tier: 'basic', term: 'monthly' }
  if (planRaw === 'yearly') return { tier: 'pro', term: 'yearly' }
  if (planRaw === 'lifetime') return { tier: 'elite', term: 'lifetime' }

  if (['basic', 'pro', 'elite'].includes(planRaw)) {
    const end = memberRow?.end_date || null
    if (!end) return { tier: planRaw, term: 'monthly' }

    const now = Date.now()
    const diffDays = Math.round((new Date(end).getTime() - now) / 86400000)
    if (diffDays > 3000) return { tier: planRaw, term: 'lifetime' }
    if (diffDays > 300) return { tier: planRaw, term: 'yearly' }
    return { tier: planRaw, term: 'monthly' }
  }

  return { tier: 'pro', term: 'monthly' }
}

function limitForTier(tier) {
  const t = cleanLower(tier)
  if (t === 'basic') return 20
  if (t === 'pro') return 75
  if (t === 'elite') return 200
  return 75
}

function cycleKey(term, now = new Date()) {
  const t = cleanLower(term)
  const yyyy = now.getUTCFullYear()
  const mm = String(now.getUTCMonth() + 1).padStart(2, '0')
  if (t === 'yearly') return `${yyyy}`
  if (t === 'lifetime') return `LIFE`
  return `${yyyy}-${mm}`
}

function getBearerToken(req) {
  const h = req.headers.authorization || ''
  const m = String(h).match(/^Bearer\s+(.+)$/i)
  return m?.[1] ? String(m[1]).trim() : ''
}

function getAuthClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !anon) throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY')
  return createClient(url, anon)
}

async function getUserFromRequest(req) {
  const token = getBearerToken(req)
  if (!token) return null
  const supabase = getAuthClient()
  const { data, error } = await supabase.auth.getUser(token)
  if (error) return null
  return data?.user || null
}

async function getOrCreateMemberOrder(email, tier, term) {
  const code = `MEMBER_${cycleKey(term)}_${email}`

  const existing = await supabaseAdmin.from('orders').select('*').eq('code', code).maybeSingle()
  if (!existing.error && existing.data) return existing.data

  const id = crypto.randomUUID()

  const payload = {
    id,
    code,
    email,
    status: 'PAID',
    paid_at: new Date().toISOString(),
    amount: 0,
    currency: 'LKR',
    order_kind: 'membership',
    photo_id: 'membership',
    delivery_object_key: 'membership',
    license: cleanLower(tier),
    format: cleanLower(term),
    download_limit: limitForTier(tier),
    download_count: 0,
  }

  const ins = await supabaseAdmin.from('orders').insert(payload).select('*').maybeSingle()
  if (ins.error) throw new Error(ins.error.message)
  return ins.data
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store')
  if (req.method !== 'GET') return res.status(405).json({ ok: false, error: 'Method not allowed' })

  try {
    const user = await getUserFromRequest(req)
    if (!user) return res.status(401).json({ ok: false, error: 'Unauthorized' })

    const userId = user.id
    const email = String(user.email || '').trim().toLowerCase()
    if (!email) return res.status(400).json({ ok: false, error: 'Missing user email' })

    // IMPORTANT: user_id-backed membership lookup
    const { data: member, error } = await supabaseAdmin
      .from('memberships')
      .select('plan,status,end_date,created_at,user_id')
      .eq('user_id', userId)
      .eq('status', 'active')
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle()

    if (error) return res.status(500).json({ ok: false, error: error.message })
    if (!member) return res.status(200).json({ ok: true, member: false })

    const endDate = member.end_date || null
    if (endDate && new Date(endDate) < new Date()) {
      return res.status(200).json({ ok: true, member: false })
    }

    const { tier, term } = resolveTierTermFromMembershipRow(member)

    // Your metering stays in orders (same as before)
    const order = await getOrCreateMemberOrder(email, tier, term)
    const used = Number(order?.download_count ?? 0)
    const limit = Number(order?.download_limit ?? limitForTier(tier))
    const remaining = Math.max(0, limit - used)

    return res.status(200).json({
      ok: true,
      member: true,
      tier,
      term,
      used,
      limit,
      remaining,
      ends_at: endDate,
    })
  } catch (e) {
    console.error('member/status error:', e)
    return res.status(500).json({ ok: false, error: e?.message || 'Server error' })
  }
}