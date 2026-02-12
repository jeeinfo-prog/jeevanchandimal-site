// pages/admin/upload.js

import React from 'react'
import Head from 'next/head'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export default function AdminUploadPage() {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [session, setSession] = React.useState(null)
  const [isAdmin, setIsAdmin] = React.useState(false)

  const [queue, setQueue] = React.useState([])
  const [busy, setBusy] = React.useState(false)
  const [logs, setLogs] = React.useState([])

  // ✅ Safe default concurrency (stable on Vercel)
  const concurrency = 4
  const runningRef = React.useRef(false)

  function log(line) {
    setLogs((p) => [...p, `${new Date().toLocaleTimeString()} — ${line}`])
  }

  async function safeJson(resp) {
    const text = await resp.text()
    try {
      return { json: JSON.parse(text), text }
    } catch {
      return { json: null, text }
    }
  }

  function setItem(id, patch) {
    setQueue((q) => q.map((it) => (it.id === id ? { ...it, ...patch } : it)))
  }

  function retryFailed() {
    setQueue((q) =>
      q.map((it) =>
        it.status === 'ERROR' ? { ...it, status: 'QUEUED', error: '' } : it
      )
    )
  }

  // --------------------------
  // Auth session
  // --------------------------
  React.useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data?.session || null))
    const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => setSession(s))
    return () => sub?.subscription?.unsubscribe?.()
  }, [])

  // --------------------------
  // Admin check
  // --------------------------
  React.useEffect(() => {
    async function checkAdmin() {
      if (!session?.user?.id) {
        setIsAdmin(false)
        return
      }

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
      log(ok ? '✅ Admin verified' : '❌ Not admin (profiles.role != admin)')
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
      log('✅ Signed out')
    } catch (e) {
      log(`❌ Sign out error: ${e.message}`)
    } finally {
      setBusy(false)
    }
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
    }))

    setQueue((q) => [...q, ...items])
  }

  async function uploadSingleItem(item, token) {
    const file = item.file

    setItem(item.id, { status: 'UPLOADING', error: '' })
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
      throw new Error(
        createJson?.error ||
          createJson?.message ||
          createText ||
          `create-upload failed (${createResp.status})`
      )
    }

    const { photoId, objectKey, uploadUrl } = createJson
    log(`✅ create-upload OK — photoId=${photoId}`)
    log(`Object key: ${objectKey}`)

    // 2) PUT to R2 (no Content-Type header)
    log(`Uploading to R2: ${file.name}`)
    const putResp = await fetch(uploadUrl, {
      method: 'PUT',
      body: file,
    })

    if (!putResp.ok) {
      const t = await putResp.text().catch(() => '')
      throw new Error(`R2 PUT failed: ${putResp.status} ${t || ''}`.trim())
    }

    log('✅ R2 PUT OK')

    // 3) commit
    setItem(item.id, { status: 'COMMITTING' })
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

  async function runQueue() {
    if (runningRef.current) return
    if (!session?.access_token) return log('❌ Not logged in')
    if (!isAdmin) return log('❌ Not admin')

    runningRef.current = true
    setBusy(true)

    const token = session.access_token

    try {
      log(`📦 Upload queue started (concurrency=${concurrency})`)

      while (true) {
        // IMPORTANT: compute batch from latest queue snapshot
        const snapshot = (() => {
          // take a snapshot without mutating state
          // eslint-disable-next-line no-unused-vars
          let s = null
          setQueue((q) => {
            s = q
            return q
          })
          return s || []
        })()

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
              setItem(it.id, { status: 'DONE', error: '' })
            } catch (e) {
              setItem(it.id, { status: 'ERROR', error: e.message })
              log(`❌ Failed: ${it.file.name} — ${e.message}`)
            }
          })
        )

        // small yield so React applies state updates
        // eslint-disable-next-line no-await-in-loop
        await new Promise((r) => setTimeout(r, 20))
      }

      log('🏁 Queue finished')
    } finally {
      runningRef.current = false
      setBusy(false)
    }
  }

  const countQueued = queue.filter((x) => x.status === 'QUEUED').length
  const countWorking = queue.filter((x) => x.status === 'UPLOADING' || x.status === 'COMMITTING').length
  const countDone = queue.filter((x) => x.status === 'DONE').length
  const countErr = queue.filter((x) => x.status === 'ERROR').length

  return (
    <>
      <Head>
        <title>Admin Upload</title>
      </Head>

      <main style={{ maxWidth: 900, margin: '0 auto', padding: '40px 20px' }}>
        <h1 style={{ margin: 0 }}>Admin Upload</h1>
        <p style={{ opacity: 0.8, marginTop: 8 }}>
          Multi-file uploader with queue + retry (4 concurrent).
        </p>

        {!session ? (
          <div
            style={{
              marginTop: 18,
              padding: 16,
              border: '1px solid rgba(245,244,244,0.16)',
              borderRadius: 14,
            }}
          >
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
          <div
            style={{
              marginTop: 18,
              padding: 16,
              border: '1px solid rgba(245,244,244,0.16)',
              borderRadius: 14,
            }}
          >
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

              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 12 }}>
                <button
                  onClick={runQueue}
                  disabled={busy || !isAdmin || !countQueued}
                  style={{ padding: '10px 14px' }}
                >
                  {busy ? 'Uploading…' : `Start Uploads (4 at a time)`}
                </button>

                <button
                  type="button"
                  onClick={retryFailed}
                  disabled={busy || countErr === 0}
                  style={{ padding: '10px 14px' }}
                >
                  Retry failed ({countErr})
                </button>

                <button
                  type="button"
                  onClick={() => setQueue([])}
                  disabled={busy}
                  style={{ padding: '10px 14px' }}
                >
                  Clear queue
                </button>
              </div>

              {queue.length > 0 && (
                <div style={{ marginTop: 14, fontSize: 13, opacity: 0.9 }}>
                  <div style={{ fontWeight: 700, marginBottom: 6 }}>Queue</div>

                  <div style={{ display: 'grid', gap: 6 }}>
                    {queue.slice(-12).map((it) => (
                      <div
                        key={it.id}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          gap: 10,
                          padding: '8px 10px',
                          border: '1px solid rgba(245,244,244,0.12)',
                          borderRadius: 12,
                        }}
                      >
                        <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {it.file.name}
                          {it.status === 'ERROR' && it.error ? (
                            <span style={{ opacity: 0.75 }}> — {it.error}</span>
                          ) : null}
                        </div>

                        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                          <span style={{ opacity: 0.9 }}>{it.status === 'ERROR' ? 'ERROR' : it.status}</span>

                          {it.status === 'ERROR' && !busy && (
                            <button
                              onClick={() => setItem(it.id, { status: 'QUEUED', error: '' })}
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
                    ))}
                  </div>

                  {queue.length > 12 && (
                    <div style={{ marginTop: 8, opacity: 0.75 }}>
                      Showing last 12 items (total {queue.length})
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

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
    </>
  )
}
