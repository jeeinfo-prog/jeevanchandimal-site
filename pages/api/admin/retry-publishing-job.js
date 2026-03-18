// pages/api/admin/retry-publishing-job.js

import { supabaseAdmin } from '../../../lib/supabaseAdmin'

function clean(v) {
  return String(v || '').trim()
}

function readHeader(req, name) {
  const v = req.headers?.[name]
  if (Array.isArray(v)) return v[0] || ''
  return typeof v === 'string' ? v : ''
}

function extractAccessToken(req) {
  const authHeader =
    readHeader(req, 'authorization') ||
    readHeader(req, 'Authorization') ||
    ''

  const m = authHeader.match(/^Bearer\s+(.+)$/i)
  if (m?.[1]) return m[1].trim()

  const alt =
    readHeader(req, 'x-supabase-access-token') ||
    readHeader(req, 'X-Supabase-Access-Token') ||
    readHeader(req, 'x-access-token') ||
    ''

  return clean(alt)
}

async function requireAdmin(req) {
  const token = extractAccessToken(req)

  if (!token) {
    return { ok: false, status: 401, error: 'Missing token' }
  }

  const { data: userData, error: userErr } = await supabaseAdmin.auth.getUser(token)
  if (userErr || !userData?.user) {
    return { ok: false, status: 401, error: 'Invalid token' }
  }

  const { data: profile, error: profErr } = await supabaseAdmin
    .from('profiles')
    .select('role')
    .eq('id', userData.user.id)
    .single()

  if (profErr || !profile) {
    return { ok: false, status: 403, error: 'No profile' }
  }

  if (profile.role !== 'admin') {
    return { ok: false, status: 403, error: 'Not admin' }
  }

  return { ok: true, user: userData.user }
}

function isUuid(v) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
    clean(v)
  )
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({
      ok: false,
      error: 'Method not allowed',
    })
  }

  try {
    const admin = await requireAdmin(req)
    if (!admin.ok) {
      return res.status(admin.status).json({
        ok: false,
        error: admin.error,
      })
    }

    const body = req.body || {}
    const jobId = clean(body.jobId)

    if (!jobId || !isUuid(jobId)) {
      return res.status(400).json({
        ok: false,
        error: 'Invalid jobId',
      })
    }

    const { data: job, error: jobErr } = await supabaseAdmin
      .from('scheduled_posts')
      .select('*')
      .eq('id', jobId)
      .single()

    if (jobErr || !job) {
      return res.status(404).json({
        ok: false,
        error: 'Scheduled job not found',
      })
    }

    if (clean(job.status).toLowerCase() === 'done') {
      return res.status(400).json({
        ok: false,
        error: 'Completed jobs cannot be retried',
      })
    }

    const nowIso = new Date().toISOString()

    const { data: updated, error: updateErr } = await supabaseAdmin
      .from('scheduled_posts')
      .update({
        status: 'pending',
        attempts: 0,
        run_at: nowIso,
        last_error: null,
        result: null,
        started_at: null,
        finished_at: null,
        updated_at: nowIso,
      })
      .eq('id', jobId)
      .select()
      .single()

    if (updateErr || !updated) {
      throw updateErr || new Error('Failed to update scheduled job')
    }

    return res.status(200).json({
      ok: true,
      message: 'Publishing job reset to pending',
      jobId,
      job: updated,
    })
  } catch (err) {
    console.error('retry-publishing-job error:', err)

    return res.status(500).json({
      ok: false,
      error: err?.message || 'Server error',
    })
  }
}