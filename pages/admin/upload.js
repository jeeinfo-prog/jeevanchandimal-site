import React from 'react'
import Head from 'next/head'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

function fmtMB(bytes) {
  return (bytes / (1024 * 1024)).toFixed(2)
}

function fmtSpeed(bps) {
  if (!bps || bps <= 0) return '—'
  return `${(bps / (1024 * 1024)).toFixed(2)} MB/s`
}

function fmtEta(sec) {
  if (!sec || sec <= 0 || !Number.isFinite(sec)) return '—'
  const m = Math.floor(sec / 60)
  const s = Math.floor(sec % 60)
  return m > 0 ? `${m}m ${s}s` : `${s}s`
}

export default function AdminUploadPage() {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [session, setSession] = React.useState(null)
  const [isAdmin, setIsAdmin] = React.useState(false)

  const [queue, setQueue] = React.useState([])
  const [logs, setLogs] = React.useState([])
  const [busy, setBusy] = React.useState(false)

  // Pro controls
  const [autoStart, setAutoStart] = React.useState(true)
  const [paused, setPaused] = React.useState(false)

  const concurrency = 4
  const runningRef = React.useRef(false)
  const queueRef = React.useRef([])
  const xhrMapRef = React.useRef(new Map()) // id -> XMLHttpRequest

  React.useEffect(() => {
    queueRef.current = queue
  }, [queue])

  function log(line) {
    setLogs((p) => [...p, `${new Date().toLocaleTimeString()} — ${line}`])
  }

  function setItem(id, patch) {
    setQueue((q) => q.map((it) => (it.id === id ? { ...it, ...patch } : it)))
  }

  function retryFailed() {
    setQueue((q) =>
      q.map((it) =>
        it.status === 'ERROR'
          ? { ...it, status: 'QUEUED', error: '', progress: 0, speedBps: 0, etaSec: 0 }
          : it
      )
    )
  }

  async function safeJson(resp) {
    const text = await resp.text()
    try {
      return { json: JSON.parse(text), text }
    } catch {
      return { json: null, text }
    }
  }

  // --------------------------
  // Auth
  // --------------------------
  React.useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data?.session || null))
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s))
    return () => sub?.subscription?.unsubscribe?.()
  }, [])

  React.useEffect(() => {
    async function checkAdmin() {
      if (!session?.user?.id) return setIsAdmin(false)

      const { data, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', session.user.id)
        .single()

      if (error) {
        log(`❌ Profile check failed: ${error.message}`)
        setIsAdmin(false)
        return
      }

      const ok = data?.role === 'admin'
      setIsAdmin(ok)
      log(ok ? '✅ Admin verified' : '❌ Not admin')
    }

    checkAdmin()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session?.user?.id])

  async function signIn() {
    setBusy(true)
    setLogs([])
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) throw error
      log('✅ Signed in')
    } catch (e) {
      log(`❌ Sign in error: ${e.message}`)
    } finally {
      setBusy(false)
    }
  }

  async function signOut() {
    setBusy(true)
    try {
      await supabase.auth.signOut()
      setIsAdmin(false)
      setQueue([])
      setPaused(false)
      log('✅ Signed out')
    } catch (e) {
      log(`❌ Sign out error: ${e.message}`)
    } finally {
      setBusy(false)
    }
  }

  // --------------------------
  // XHR PUT with progress + speed + ETA
  // --------------------------
  function putToR2WithProgress(itemId, uploadUrl, file, onProgress) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      xhr.open('PUT', uploadUrl, true)

      // Track for Pause/Cancel
      xhrMapRef.current.set(itemId, xhr)

      const startedAt = Date.now()
      let lastAt = startedAt
      let lastLoaded = 0

      xhr.upload.onprogress = (evt) => {
        if (!evt.lengthComputable) return

        const now = Date.now()
        const loaded = evt.loaded
        const total = evt.total

        // speed calc using delta (smoother)
        const dt = Math.max(1, now - lastAt) / 1000
        const dBytes = Math.max(0, loaded - lastLoaded)
        const bps = dBytes / dt

        lastAt = now
        lastLoaded = loaded

        const pct = Math.round((loaded / total) * 100)
        const remaining = Math.max(0, total - loaded)
        const etaSec = bps > 0 ? remaining / bps : 0

        onProgress({
          pct,
          loaded,
          total,
          speedBps: bps,
          etaSec,
        })
      }

      xhr.onload = () => {
        xhrMapRef.current.delete(itemId)
        if (xhr.status >= 200 && xhr.status < 300) {
          onProgress({
            pct: 100,
            loaded: file.size,
            total: file.size,
            speedBps: 0,
            etaSec: 0,
          })
          resolve()
        } else {
          reject(new Error(`R2 PUT failed: ${xhr.status} ${xhr.responseText || ''}`.trim()))
        }
      }

      xhr.onerror = () => {
        xhrMapRef.current.delete(itemId)
        reject(new Error('R2 PUT failed: network error'))
      }

      xhr.onabort = () => {
        xhrMapRef.current.delete(itemId)
        reject(new Error('R2 PUT aborted'))
      }

      xhr.send(file)
    })
  }

  // --------------------------
  // Queue add
  // --------------------------
  function addFiles(fileList) {
    const picked = Array.from(fileList || [])
    if (!picked.length) return

    const items = picked.map((file) => ({
      id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      file,
      status: 'QUEUED', // QUEUED | UPLOADING | COMMITTING | DONE | ERROR
      error: '',
      progress: 0,
      loaded: 0,
      total: file.size || 0,
      speedBps: 0,
      etaSec: 0,
    }))

    setQueue((q) => [...q, ...items])
  }

  // Auto-start when new queued items appear
  React.useEffect(() => {
    if (!autoStart) return
    if (paused) return
    if (busy) return
    if (!session?.access_token || !isAdmin) return

    const hasQueued = queue.some((x) => x.status === 'QUEUED')
    if (hasQueued) {
      runQueue()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queue.length, autoStart, paused, busy, session?.access_token, isAdmin])

  // --------------------------
  // Single item pipeline
  // --------------------------
  async function uploadSingleItem(item, token) {
    const file = item.file

    setItem(item.id, {
      status: 'UPLOADING',
      error: '',
      progress: 0,
      loaded: 0,
      total: file.size || 0,
      speedBps: 0,
      etaSec: 0,
    })

    log(`Preparing upload: ${file.name}`)

    // 1) create-upload
    const createResp = await fetch('/api/admin/photos/create-upload', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ filename: file.name }),
    })

    const { json: createJson, text: createText } = await safeJson(createResp)
    if (!createResp.ok) {
      throw new Error(createJson?.error || createText || `create-upload failed (${createResp.status})`)
    }

    const { photoId, objectKey, uploadUrl } = createJson
    log(`✅ create-upload OK — photoId=${photoId}`)
    log(`Object key: ${objectKey}`)

    // 2) PUT to R2 with progress + speed + ETA
    log(`Uploading to R2: ${file.name}`)
    await putToR2WithProgress(item.id, uploadUrl, file, ({ pct, loaded, total, speedBps, etaSec }) => {
      setItem(item.id, {
        progress: pct,
        loaded,
        total,
        speedBps,
        etaSec,
      })
    })
    log('✅ R2 PUT OK')

    // 3) commit
    setItem(item.id, { status: 'COMMITTING', speedBps: 0, etaSec: 0 })
    log(`Commit: ${file.name}`)

    const commitResp = await fetch('/api/admin/photos/commit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ photoId }),
    })

    const { json: commitJson, text: commitText } = await safeJson(commitResp)
    if (!commitResp.ok) {
      throw new Error(commitJson?.detail || commitJson?.error || commitText || 'Commit failed')
    }

    log('✅ Done: commit complete')
    log(`thumbUrl: ${commitJson?.thumbUrl || commitJson?.thumb_url || '(none)'}`)
    log(`previewUrl: ${commitJson?.previewUrl || commitJson?.preview_url || '(none)'}`)
  }

  // --------------------------
  // Pause / Resume
  // --------------------------
  function pauseQueue() {
    setPaused(true)
    log('⏸ Pausing… aborting active uploads')

    // Abort active XHRs
    for (const [, xhr] of xhrMapRef.current.entries()) {
      try {
        xhr.abort()
      } catch {}
    }
  }

  function resumeQueue() {
    setPaused(false)
    log('▶️ Resuming queue…')
    runQueue()
  }

  // --------------------------
  // Queue runner (4 concurrent)
  // --------------------------
  async function runQueue() {
    if (runningRef.current) return
    if (paused) return
    if (!session?.access_token) return log('❌ Not logged in')
    if (!isAdmin) return log('❌ Not admin')

    runningRef.current = true
    setBusy(true)

    const token = session.access_token

    try {
      log(`📦 Queue started (concurrency=${concurrency})`)

      while (true) {
        if (paused) break

        const snapshot = queueRef.current
        const next = []

        for (const it of snapshot) {
          if (next.length >= concurrency) break
          if (it.status === 'QUEUED') next.push(it)
        }

        if (!next.length) break

        await Promise.all(
          next.map(async (it) => {
            try {
              await uploadSingleItem(it, token)
              setItem(it.id, { status: 'DONE', error: '', progress: 100, speedBps: 0, etaSec: 0 })
            } catch (e) {
              // If paused, aborted uploads will error with "R2 PUT aborted" — keep them queued.
              const msg = e?.message || String(e)
              if (paused && msg.toLowerCase().includes('aborted')) {
                setItem(it.id, { status: 'QUEUED', error: '', speedBps: 0, etaSec: 0 })
                return
              }

              setItem(it.id, { status: 'ERROR', error: msg, speedBps: 0, etaSec: 0 })
              log(`❌ Failed: ${it.file.name} — ${msg}`)
            }
          })
        )

        // small yield to let React flush updates
        // eslint-disable-next-line no-await-in-loop
        await new Promise((r) => setTimeout(r, 30))
      }

      if (paused) {
        log('⏸ Queue paused')
      } else {
        log('🏁 Queue finished')
      }
    } finally {
      runningRef.current = false
      setBusy(false)
    }
  }

  const countQueued = queue.filter((x) => x.status === 'QUEUED').length
  const countWorking = queue.filter((x) => x.status === 'UPLOADING' || x.status === 'COMMITTING').length
  const countDone = queue.filter((x) => x.status === 'DONE').length
  const countErr = queue.filter((x) => x.status === 'ERROR').length

  const workingItems = queue.filter((x) => x.status === 'UPLOADING' || x.status === 'COMMITTING')

  const canStart = !busy && !paused && isAdmin && countQueued > 0
  const canPause = busy && !paused && countWorking > 0
  const canResume = !busy && paused && countQueued > 0

  return (
    <>
      <Head>
        <title>Admin Upload</title>
      </Head>

      <main style={{ maxWidth: 980, margin: '0 auto', padding: '40px 20px' }}>
        <h1 style={{ margin: 0 }}>Admin Upload</h1>
        <p style={{ opacity: 0.8, marginTop: 8 }}>
          Queue uploader (4 concurrent) + progress + speed + ETA + pause/resume.
        </p>

        {!session ? (
          <div style={{ marginTop: 18, padding: 16, border: '1px solid rgba(245,244,244,0.16)', borderRadius: 14 }}>
            <h3 style={{ marginTop: 0 }}>Login</h3>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              style={{ width: '100%', padding: 10, marginBottom: 10 }}
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              style={{ width: '100%', padding: 10, marginBottom: 10 }}
            />
            <button onClick={signIn} disabled={busy} style={{ padding: '10px 14px' }}>
              {busy ? 'Signing in…' : 'Sign in'}
            </button>
          </div>
        ) : (
          <div style={{ marginTop: 18, padding: 16, border: '1px solid rgba(245,244,244,0.16)', borderRadius: 14 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
              <div>
                <div style={{ fontWeight: 700 }}>Signed in</div>
                <div style={{ opacity: 0.8, fontSize: 13 }}>{session.user.email}</div>
                <div style={{ marginTop: 6, fontSize: 13 }}>
                  Role:{' '}
                  <strong style={{ color: isAdmin ? '#7CFF9B' : '#FF7C7C' }}>
                    {isAdmin ? 'admin' : 'not admin'}
                  </strong>
                </div>
              </div>
              <button onClick={signOut} disabled={busy} style={{ padding: '10px 14px' }}>
                Sign out
              </button>
            </div>

            <div style={{ marginTop: 16, paddingTop: 14, borderTop: '1px solid rgba(245,244,244,0.12)' }}>
              <h3 style={{ marginTop: 0 }}>Upload</h3>

              <input
                type="file"
                multiple
                accept="image/*,.jpg,.jpeg,.png,.webp,.tif,.tiff"
                onChange={(e) => {
                  addFiles(e.target.files)
                  e.target.value = ''
                }}
              />

              <div style={{ marginTop: 10, opacity: 0.85, fontSize: 13 }}>
                Queued: <strong>{countQueued}</strong> | Working: <strong>{countWorking}</strong> | Done:{' '}
                <strong>{countDone}</strong> | Errors: <strong>{countErr}</strong>
              </div>

              <div style={{ marginTop: 10, display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
                <label style={{ display: 'inline-flex', gap: 8, alignItems: 'center', fontSize: 13, opacity: 0.9 }}>
                  <input
                    type="checkbox"
                    checked={autoStart}
                    onChange={(e) => setAutoStart(e.target.checked)}
                    disabled={busy}
                  />
                  Auto-start
                </label>

                {busy && (
                  <span style={{ display: 'inline-flex', gap: 8, alignItems: 'center', opacity: 0.9 }}>
                    <span className="spinner" /> Uploading…
                  </span>
                )}

                {paused && (
                  <span style={{ opacity: 0.9 }}>
                    ⏸ Paused
                  </span>
                )}
              </div>

              {workingItems.length > 0 && (
                <div style={{ marginTop: 10, padding: 12, border: '1px solid rgba(245,244,244,0.12)', borderRadius: 12 }}>
                  <div style={{ fontWeight: 700, marginBottom: 8 }}>Now processing</div>
                  <ul style={{ margin: 0, paddingLeft: 18, opacity: 0.9 }}>
                    {workingItems.slice(0, 4).map((x) => (
                      <li key={x.id}>
                        {x.file.name} — <strong>{x.status}</strong>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 12 }}>
                <button onClick={runQueue} disabled={!canStart} style={{ padding: '10px 14px' }}>
                  Start Uploads (4 at a time)
                </button>

                <button onClick={pauseQueue} disabled={!canPause} style={{ padding: '10px 14px' }}>
                  Pause
                </button>

                <button onClick={resumeQueue} disabled={!canResume} style={{ padding: '10px 14px' }}>
                  Resume
                </button>

                <button onClick={retryFailed} disabled={busy || countErr === 0} style={{ padding: '10px 14px' }}>
                  Retry failed ({countErr})
                </button>

                <button onClick={() => setQueue([])} disabled={busy} style={{ padding: '10px 14px' }}>
                  Clear queue
                </button>
              </div>

              {/* Queue list */}
              {queue.length > 0 && (
                <div style={{ marginTop: 16 }}>
                  <div style={{ fontWeight: 700, marginBottom: 10 }}>Queue</div>

                  <div style={{ display: 'grid', gap: 10 }}>
                    {queue.map((it) => (
                      <div
                        key={it.id}
                        style={{
                          padding: 12,
                          border: '1px solid rgba(245,244,244,0.12)',
                          borderRadius: 14,
                          background: 'rgba(255,255,255,0.02)',
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10 }}>
                          <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {it.file.name}
                            <span style={{ marginLeft: 8, opacity: 0.7, fontSize: 12 }}>
                              ({fmtMB(it.total || it.file.size)} MB)
                            </span>
                          </div>

                          <div style={{ display: 'flex', gap: 10, alignItems: 'center', whiteSpace: 'nowrap' }}>
                            <span style={{ opacity: 0.9 }}>
                              {it.status === 'ERROR' ? 'ERROR' : it.status}
                            </span>

                            {it.status === 'ERROR' && !busy && (
                              <button
                                onClick={() =>
                                  setItem(it.id, { status: 'QUEUED', error: '', progress: 0, speedBps: 0, etaSec: 0 })
                                }
                                style={{
                                  padding: '2px 8px',
                                  fontSize: 11,
                                  borderRadius: 8,
                                  border: '1px solid rgba(245,244,244,0.18)',
                                  background: 'transparent',
                                  cursor: 'pointer',
                                }}
                              >
                                Retry
                              </button>
                            )}
                          </div>
                        </div>

                        {/* Progress bar */}
                        <div
                          style={{
                            marginTop: 8,
                            height: 7,
                            background: 'rgba(245,244,244,0.12)',
                            borderRadius: 999,
                            overflow: 'hidden',
                          }}
                        >
                          <div
                            style={{
                              width: `${it.progress || 0}%`,
                              height: '100%',
                              background: 'rgba(245,244,244,0.65)',
                              transition: 'width 120ms linear',
                            }}
                          />
                        </div>

                        <div style={{ marginTop: 6, display: 'flex', justifyContent: 'space-between', gap: 10, fontSize: 12, opacity: 0.85 }}>
                          <div>
                            {it.status === 'UPLOADING' ? (
                              <>
                                {it.progress || 0}% • {fmtMB(it.loaded || 0)}/{fmtMB(it.total || it.file.size)} MB
                              </>
                            ) : it.status === 'COMMITTING' ? (
                              <>100% • Committing…</>
                            ) : it.status === 'DONE' ? (
                              <>100% • Done</>
                            ) : it.status === 'ERROR' ? (
                              <>Error: {it.error || 'Unknown error'}</>
                            ) : (
                              <>Waiting…</>
                            )}
                          </div>

                          <div style={{ whiteSpace: 'nowrap' }}>
                            {it.status === 'UPLOADING' ? (
                              <>
                                {fmtSpeed(it.speedBps)} • ETA {fmtEta(it.etaSec)}
                              </>
                            ) : (
                              ' '
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Logs */}
        <div style={{ marginTop: 18 }}>
          <h3 style={{ marginBottom: 10 }}>Logs</h3>
          <div
            style={{
              padding: 14,
              border: '1px solid rgba(245,244,244,0.16)',
              borderRadius: 14,
              minHeight: 80,
              whiteSpace: 'pre-wrap',
              fontFamily:
                'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
              fontSize: 12,
            }}
          >
            {logs.length ? logs.join('\n') : <span style={{ opacity: 0.7 }}>No logs yet.</span>}
          </div>
        </div>
      </main>

      <style jsx global>{`
        .spinner {
          display: inline-block;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top-color: rgba(245, 244, 244, 0.95);
          animation: spin 0.8s linear infinite;
        }
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </>
  )
}
