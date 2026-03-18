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
  if (envBase) return envBase

  const host =
    clean(readHeader(req, 'x-forwarded-host')) || clean(readHeader(req, 'host'))

  const proto =
    clean(readHeader(req, 'x-forwarded-proto')) ||
    (host && !host.includes('localhost') ? 'https' : 'http')

  if (host) return `${proto}://${host}`

  return 'http://localhost:3000'
}

function getPayloadField(post, key, fallback = '') {
  const payload = post?.payload && typeof post.payload === 'object' ? post.payload : {}
  return clean(post?.[key] || payload?.[key] || fallback)
}

async function markJobRunning(jobId, attempts) {
  const { data, error } = await supabaseAdmin
    .from('scheduled_posts')
    .update({
      status: 'running',
      attempts,
      started_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq('id', jobId)
    .eq('status', 'pending')
    .select()
    .single()

  if (error || !data) return null
  return data
}

async function markJobDone(jobId, result) {
  await supabaseAdmin
    .from('scheduled_posts')
    .update({
      status: 'done',
      result,
      last_error: null,
      finished_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq('id', jobId)
}

async function markJobRetry(jobId, attempts, errorMessage, nextRunAt) {
  await supabaseAdmin
    .from('scheduled_posts')
    .update({
      status: attempts >= MAX_ATTEMPTS ? 'failed' : 'pending',
      last_error: clean(errorMessage) || 'Unknown error',
      run_at: nextRunAt,
      updated_at: new Date().toISOString(),
    })
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

    if (expectedSecret && sentSecret !== expectedSecret) {
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
          await markJobDone(job.id, publishing)

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
          await markJobRetry(job.id, attempts, combinedError, nextRunAt)

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
            nextRunAt,
          })
        }
      } catch (err) {
        const nextRunAt = nextRetryIso(attempts)

        await markJobRetry(
          job.id,
          attempts,
          err?.message || 'Scheduled publishing failed',
          nextRunAt
        )

        if (attempts >= MAX_ATTEMPTS) {
          summary.failed += 1
        } else {
          summary.retried += 1
        }

        summary.jobs.push({
          id: job.id,
          ok: false,
          error: err?.message || 'Scheduled publishing failed',
          attempts,
          nextRunAt,
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