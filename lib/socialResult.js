// lib/socialResult.js

function clean(v) {
  return String(v || '').trim()
}

function firstNonEmpty(...vals) {
  for (const v of vals) {
    const x = clean(v)
    if (x) return x
  }
  return ''
}

export function okResult(postId = '') {
  return {
    ok: true,
    postId: clean(postId),
  }
}

export function skippedResult(reason = 'Skipped') {
  return {
    ok: false,
    skipped: true,
    reason: clean(reason) || 'Skipped',
  }
}

export function errorResult(error = 'Unknown error') {
  return {
    ok: false,
    error: clean(error) || 'Unknown error',
  }
}

export function normalizeSocialResult(raw) {
  if (!raw || typeof raw !== 'object') {
    return errorResult('Empty response')
  }

  const postId = firstNonEmpty(
    raw.postId,
    raw.id,
    raw.mediaId,
    raw.creationId,
    raw.pinId
  )

  const reason = firstNonEmpty(
    raw.reason,
    raw.message,
    raw.detail
  )

  const error = firstNonEmpty(
    raw.error,
    raw.message,
    raw.detail
  )

  if (raw.ok === true || raw.success === true || raw.published === true) {
    return okResult(postId)
  }

  if (raw.skipped === true) {
    return skippedResult(reason)
  }

  if (postId) {
    return okResult(postId)
  }

  return errorResult(error || 'Unknown error')
}