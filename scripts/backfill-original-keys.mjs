// scripts/backfill-original-keys.mjs
import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

import { S3Client, ListObjectsV2Command } from '@aws-sdk/client-s3'
import { createClient } from '@supabase/supabase-js'

function must(name) {
  const v = process.env[name]
  if (!v) throw new Error(`Missing env: ${name}`)
  return v
}

const R2_ENDPOINT = must('R2_ENDPOINT')
const R2_BUCKET = must('R2_BUCKET')
const R2_ACCESS_KEY_ID = must('R2_ACCESS_KEY_ID')
const R2_SECRET_ACCESS_KEY = must('R2_SECRET_ACCESS_KEY')

const SUPABASE_URL =
  process.env.SUPABASE_URL ||
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  (() => {
    throw new Error('Missing SUPABASE_URL or NEXT_PUBLIC_SUPABASE_URL')
  })()

const SUPABASE_SERVICE_ROLE_KEY = must('SUPABASE_SERVICE_ROLE_KEY')

const DRY_RUN = process.argv.includes('--dry-run')
const LIMIT = (() => {
  const i = process.argv.findIndex((a) => a === '--limit')
  if (i >= 0 && process.argv[i + 1]) return Number(process.argv[i + 1])
  return null
})()

const uuidRe =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

const r2 = new S3Client({
  region: 'auto',
  endpoint: R2_ENDPOINT,
  credentials: {
    accessKeyId: R2_ACCESS_KEY_ID,
    secretAccessKey: R2_SECRET_ACCESS_KEY,
  },
})

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
})

function parseKey(key) {
  // Expected: photos/original/<id>/<filename>
  const parts = String(key || '').split('/')
  if (parts.length < 4) return null
  if (parts[0] !== 'photos' || parts[1] !== 'original') return null

  const id = parts[2]
  const filename = parts.slice(3).join('/') // supports nested (rare)

  if (!uuidRe.test(id)) return null
  if (!filename || filename.endsWith('/')) return null

  return { id, filename, key }
}

async function listAllOriginalKeys() {
  const prefix = 'photos/original/'
  let token = undefined
  const out = []

  while (true) {
    const resp = await r2.send(
      new ListObjectsV2Command({
        Bucket: R2_BUCKET,
        Prefix: prefix,
        ContinuationToken: token,
        MaxKeys: 1000,
      })
    )

    const items = resp.Contents || []
    for (const it of items) {
      if (it?.Key) out.push(it.Key)
      if (LIMIT && out.length >= LIMIT) return out.slice(0, LIMIT)
    }

    if (!resp.IsTruncated) break
    token = resp.NextContinuationToken
  }

  return out
}

async function run() {
  console.log('🔎 Listing R2 objects under photos/original/ ...')
  const keys = await listAllOriginalKeys()
  console.log(`✅ Found ${keys.length} objects`)

  // Build id -> (filename/key)
  const map = new Map()
  let parsed = 0

  for (const k of keys) {
    const p = parseKey(k)
    if (!p) continue
    parsed++
    if (!map.has(p.id)) map.set(p.id, p)
  }

  console.log(`✅ Parsed ${parsed} valid original objects`)
  console.log(`✅ Unique photo IDs found in R2: ${map.size}`)

  console.log('🔎 Fetching published photos missing original fields from Supabase ...')

  const { data: rows, error } = await supabase
    .from('photos')
    .select('id, original_key, original_filename, status')
    .eq('status', 'published')
    .or('original_key.is.null,original_filename.is.null')
    .limit(5000)

  if (error) throw error

  console.log(`✅ Supabase rows needing backfill: ${rows?.length || 0}`)

  let matched = 0
  let updated = 0
  let skippedNoR2 = 0

  const concurrency = 6
  const queue = []

  async function pushTask(fn) {
    if (queue.length >= concurrency) await Promise.race(queue)
    const p = fn().finally(() => {
      const i = queue.indexOf(p)
      if (i >= 0) queue.splice(i, 1)
    })
    queue.push(p)
  }

  for (const row of rows || []) {
    const hit = map.get(row.id)
    if (!hit) {
      skippedNoR2++
      continue
    }

    matched++

    const newFilename = row.original_filename || hit.filename
    const newKey = row.original_key || hit.key

    if (row.original_filename && row.original_key) continue

    await pushTask(async () => {
      if (DRY_RUN) {
        console.log('DRY RUN update:', row.id, newFilename, newKey)
        updated++
        return
      }

      const { error: upErr } = await supabase
        .from('photos')
        .update({
          original_filename: newFilename,
          original_key: newKey,
        })
        .eq('id', row.id)

      if (upErr) {
        console.warn('❌ Update failed for', row.id, upErr.message)
        return
      }

      updated++
      console.log('✅ Updated', row.id)
    })
  }

  await Promise.all(queue)

  console.log('—')
  console.log('📊 Summary')
  console.log('R2 unique IDs:', map.size)
  console.log('Supabase needing backfill:', rows?.length || 0)
  console.log('Matched with R2:', matched)
  console.log('Updated:', updated, DRY_RUN ? '(dry-run)' : '')
  console.log('No R2 match:', skippedNoR2)
  console.log('—')
  console.log('Next: run bulk EXIF:')
  console.log('curl -X POST http://localhost:3000/api/admin/exif/bulk')
}

run().catch((e) => {
  console.error('Fatal:', e)
  process.exit(1)
})
