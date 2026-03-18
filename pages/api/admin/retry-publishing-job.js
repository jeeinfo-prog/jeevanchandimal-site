// pages/api/admin/retry-publishing-job.js

import { supabaseAdmin } from '../../../lib/supabaseAdmin'

function clean(v) {
  return String(v || '').trim()
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

    const { error: updateErr } = await supabaseAdmin
      .from('scheduled_posts')
      .update({
        status: 'pending',
        attempts: 0,
        last_error: null,
        started_at: null,
        finished_at: null,
        updated_at: new Date().toISOString(),
      })
      .eq('id', jobId)

    if (updateErr) {
      throw updateErr
    }

    return res.status(200).json({
      ok: true,
      message: 'Publishing job reset to pending',
      jobId,
    })
  } catch (err) {
    console.error('retry-publishing-job error:', err)

    return res.status(500).json({
      ok: false,
      error: err?.message || 'Server error',
    })
  }
}