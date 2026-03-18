// pages/api/cron/publish-scheduled.js

import { supabaseAdmin } from '../../../lib/supabaseAdmin'
import { runAutoPublishing } from '../../../lib/autoPublish'

const MAX_BATCH = 10
const MAX_ATTEMPTS = 4

function clean(v) {
  return String(v || '').trim()
}

function readHeader(req, name) {
  const v = req.headers?.[name]
  if (Array.isArray(v)) return v[0] || ''
  return typeof v === 'string' ? v : ''
}

function getCronSecret() {
  return clean(
    process.env.CRON_SECRET ||
      process.env.SCHEDULED_PUBLISH_SECRET ||
      process.env.FACEBOOK_AUTOPOST_SECRET ||
      process.env.FACEBOOK_AUTPOST_SECRET
  )
}

function getSiteBase(req) {
  const envBase = clean(process.env.NEXT_PUBLIC_SITE_URL)
  if (envBase) return envBase.replace(/\/+$/, '')

  const host =
    clean(readHeader(req, 'x-forwarded-host')) ||
    clean(readHeader(req, 'host'))

  const proto =
    clean(readHeader(req, 'x-forwarded-proto')) ||
    (host && !host.includes('localhost') ? 'https' : 'http')

  if (host) return `${proto}://${host}`

  return 'http://localhost:3000'
}

function parsePayload(raw) {
  if (!raw) return {}
  if (typeof raw === 'object' && !Array.isArray(raw)) return raw

  if (typeof raw === 'string') {
    try {
      const parsed = JSON.parse(raw)
      if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
        return parsed
      }
    } catch {}
  }

  return {}
}

function normalizeTags(input) {
  let arr = []

  if (Array.isArray(input)) {
    arr = input
  } else if (typeof input === 'string') {
    const raw = input.trim()

    if (!raw) {
      arr = []
    } else {
      try {
        const parsed = JSON.parse(raw)
        if (Array.isArray(parsed)) arr = parsed
        else arr = raw.split(',')
      } catch {
        arr = raw.split(',')
      }
    }
  }

  const out = []
  const seen = new Set()

  for (const raw of arr) {
    let t = clean(raw).toLowerCase()
    t = t.replace(/\s+/g, '-')
    if (!t) continue
    if (t === 'sri-anka') t = 'sri-lanka'
    if (seen.has(t)) continue
    seen.add(t)
    out.push(t)
    if (out.length >= 30) break
  }

  return out
}

function getPayloadField(post, key, fallback = '') {
  const payload = parsePayload(post?.payload)
  return clean(post?.[key] || payload?.[key] || fallback)
}

function getPayloadTags(post) {
  const payload = parsePayload(post?.payload)
  return normalizeTags(post?.tags || payload?.tags || [])
}

async function markJobRunning(jobId, attempts) {
  const nowIso = new Date().toISOString()

  const { data, error } = await supabaseAdmin
    .from('scheduled_posts')
    .update({
      status: 'running',
      attempts,
      started_at: nowIso,
      updated_at: nowIso,
    })
    .eq('id', jobId)
    .eq('status', 'pending')
    .select()
    .single()

  if (error || !data) return null
  return data
}

async function markJobDone(jobId, attempts, result) {
  await supabaseAdmin
    .from('scheduled_posts')
    .update({
      status: 'done',
      attempts,
      result: result || null,
      last_error: null,
      finished_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq('id', jobId)
}

async function markJobRetry(jobId, attempts, errorMessage, nextRunAt, result = null) {
  const failed = attempts >= MAX_ATTEMPTS

  const updatePayload = {
    status: failed ? 'failed' : 'pending',
    attempts,
    result: result || null,
    last_error: clean(errorMessage) || 'Unknown error',
    updated_at: new Date().toISOString(),
  }

  if (failed) {
    updatePayload.finished_at = new Date().toISOString()
  } else {
    updatePayload.run_at = nextRunAt
  }

  await supabaseAdmin
    .from('scheduled_posts')
    .update(updatePayload)
    .eq('id', jobId)
}

function nextRetryIso(attempts) {
  const delayMinutes = Math.min(60, Math.max(1, Math.pow(2, Math.max(0, attempts - 1))))
  return new Date(Date.now() + delayMinutes * 60 * 1000).toISOString()
}

export default async function handler(req, res) {
  if (req.method !== 'GET' && req.method !== 'POST') {
    res.setHeader('Allow', 'GET, POST')
    return res.status(405).json({
      ok: false,
      error: 'Method not allowed',
    })
  }

  try {
    const expectedSecret = getCronSecret()
    const sentSecret = clean(
      readHeader(req, 'x-cron-secret') ||
        readHeader(req, 'x-autopost-secret') ||
        req.query?.secret
    )

    if (expectedSecret && (!sentSecret || sentSecret !== expectedSecret)) {
      return res.status(401).json({
        ok: false,
        error: 'Unauthorized',
      })
    }

    const now = new Date().toISOString()
    const siteBase = getSiteBase(req)

    const { data: jobs, error } = await supabaseAdmin
      .from('scheduled_posts')
      .select('*')
      .eq('status', 'pending')
      .lte('run_at', now)
      .order('run_at', { ascending: true })
      .limit(MAX_BATCH)

    if (error) {
      return res.status(500).json({
        ok: false,
        error: error.message || 'Failed to load scheduled posts',
      })
    }

    const items = Array.isArray(jobs) ? jobs : []
    const summary = {
      ok: true,
      scanned: items.length,
      processed: 0,
      done: 0,
      failed: 0,
      retried: 0,
      skipped: 0,
      jobs: [],
    }

    for (const job of items) {
      const attempts = Number(job?.attempts || 0) + 1
      const locked = await markJobRunning(job.id, attempts)

      if (!locked) {
        summary.skipped += 1
        summary.jobs.push({
          id: job.id,
          ok: false,
          skipped: true,
          reason: 'Job already claimed by another worker',
        })
        continue
      }

      summary.processed += 1

      try {
        const photoId = getPayloadField(job, 'photo_id')
        const title = getPayloadField(job, 'title')
        const description = getPayloadField(job, 'description')
        const tags = getPayloadTags(job)

        const previewUrl =
          getPayloadField(job, 'preview_url') ||
          (photoId ? `${siteBase}/api/photo/${photoId}/preview?variant=standard` : '')

        const storeUrl =
          getPayloadField(job, 'store_url') ||
          (photoId ? `${siteBase}/store/${photoId}` : '')

        if (!photoId) {
          throw new Error('Missing photo_id')
        }

        if (!previewUrl) {
          throw new Error('Missing preview_url')
        }

        const publishing = await runAutoPublishing({
          siteBase,
          photoId,
          previewUrl,
          storeUrl,
          title,
          description,
          tags,
        })

        const hasAnySuccess =
          publishing?.facebook?.ok ||
          publishing?.instagram?.ok ||
          publishing?.pinterest?.ok

        const hasOnlySkips =
          publishing?.facebook?.skipped &&
          publishing?.instagram?.skipped &&
          publishing?.pinterest?.skipped

        if (hasAnySuccess || hasOnlySkips) {
          await markJobDone(job.id, attempts, publishing)

          summary.done += 1
          summary.jobs.push({
            id: job.id,
            ok: true,
            result: publishing,
          })
        } else {
          const combinedError =
            publishing?.facebook?.error ||
            publishing?.instagram?.error ||
            publishing?.pinterest?.error ||
            'Scheduled publishing failed'

          const nextRunAt = nextRetryIso(attempts)

          await markJobRetry(job.id, attempts, combinedError, nextRunAt, publishing)

          if (attempts >= MAX_ATTEMPTS) {
            summary.failed += 1
          } else {
            summary.retried += 1
          }

          summary.jobs.push({
            id: job.id,
            ok: false,
            error: combinedError,
            attempts,
            nextRunAt: attempts >= MAX_ATTEMPTS ? null : nextRunAt,
            result: publishing,
          })
        }
      } catch (err) {
        const nextRunAt = nextRetryIso(attempts)
        const errorMessage = err?.message || 'Scheduled publishing failed'

        await markJobRetry(job.id, attempts, errorMessage, nextRunAt, {
          ok: false,
          error: errorMessage,
        })

        if (attempts >= MAX_ATTEMPTS) {
          summary.failed += 1
        } else {
          summary.retried += 1
        }

        summary.jobs.push({
          id: job.id,
          ok: false,
          error: errorMessage,
          attempts,
          nextRunAt: attempts >= MAX_ATTEMPTS ? null : nextRunAt,
        })
      }
    }

    return res.status(200).json(summary)
  } catch (err) {
    return res.status(500).json({
      ok: false,
      error: err?.message || 'Cron publish failed',
    })
  }
}