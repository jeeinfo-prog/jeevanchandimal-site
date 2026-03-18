// pages/api/pinterest/auto-post.js

import { skippedResult } from '../../../lib/socialResult'

function clean(v) {
  return String(v || '').trim()
}

function getAutopostSecret() {
  return clean(
    process.env.FACEBOOK_AUTOPOST_SECRET ||
      process.env.FACEBOOK_AUTPOST_SECRET
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
    const secret = getAutopostSecret()
    const sentSecret = clean(
      req.headers['x-autopost-secret'] || req.headers['X-Autopost-Secret']
    )

    if (secret && sentSecret !== secret) {
      return res.status(401).json({
        ok: false,
        error: 'Unauthorized',
      })
    }

    return res.status(200).json(
      skippedResult('Pinterest autopost not configured yet')
    )
  } catch (err) {
    return res.status(500).json({
      ok: false,
      error: err?.message || 'Pinterest autopost failed',
    })
  }
}