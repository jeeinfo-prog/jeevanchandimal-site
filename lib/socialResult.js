// lib/socialResult.js

function clean(v) {
  return String(v || '').trim()
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

  if (raw.ok === true) {
    return okResult(raw.postId || raw.id)
  }

  if (raw.skipped === true) {
    return skippedResult(raw.reason || raw.message)
  }

  if (clean(raw.postId || raw.id)) {
    return okResult(raw.postId || raw.id)
  }

  return errorResult(raw.error || raw.message || 'Unknown error')
}