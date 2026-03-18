// pages/api/instagram/auto-post.js

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

  /* allow POST only */

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({
      ok: false,
      error: 'Method not allowed'
    })
  }

  try {

    /* verify autopost secret */

    const secret = getAutopostSecret()
    const sentSecret = clean(req.headers['x-autopost-secret'])

    if (secret && sentSecret !== secret) {
      return res.status(401).json({
        ok: false,
        error: 'Unauthorized'
      })
    }

    /* placeholder response */

    return res.status(200).json(
      skippedResult('Instagram autopost not configured yet')
    )

  } catch (err) {

    return res.status(500).json({
      ok: false,
      error: err?.message || 'Instagram autopost failed'
    })

  }
}