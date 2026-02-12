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

  const [autoStart, setAutoStart] = React.useState(true)
  const [paused, setPaused] = React.useState(false)
  const [stopAfterCurrent, setStopAfterCurrent] = React.useState(false)

  const concurrency = 4
  const runningRef = React.useRef(false)
  const queueRef = React.useRef([])
  const xhrMapRef = React.useRef(new Map())
  const countWorkingRef = React.useRef(0)

  React.useEffect(() => {
    queueRef.current = queue
    countWorkingRef.current = queue.filter(
      (x) => x.status === 'UPLOADING' || x.status === 'COMMITTING'
    ).length
  }, [queue])

  function log(line) {
    setLogs((p) => [...p, `${new Date().toLocaleTimeString()} — ${line}`])
  }

  function setItem(id, patch) {
    setQueue((q) => q.map((it) => (it.id === id ? { ...it, ...patch } : it)))
  }

  function removeItem(id) {
    const xhr = xhrMapRef.current.get(id)
    if (xhr) {
      try { xhr.abort() } catch {}
    }
    setQueue((q) => q.filter((it) => it.id !== id))
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

  // Auth
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
      setStopAfterCurrent(false)
      log('✅ Signed out')
    } catch (e) {
      log(`❌ Sign out error: ${e.message}`)
    } finally {
      setBusy(false)
    }
  }

  // XHR upload with progress
  function putToR2WithProgress(itemId, uploadUrl, file, onProgress) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      xhr.open('PUT', uploadUrl, true)
      xhrMapRef.current.set(itemId, xhr)

      const startedAt = Date.now()
      let lastAt = startedAt
      let lastLoaded = 0

      xhr.upload.onprogress = (evt) => {
        if (!evt.lengthComputable) return

        const now = Date.now()
        const loaded = evt.loaded
        const total = evt.total

        const dt = Math.max(1, now - lastAt) / 1000
        const dBytes = Math.max(0, loaded - lastLoaded)
        const bps = dBytes / dt

        lastAt = now
        lastLoaded = loaded

        const pct = Math.round((loaded / total) * 100)
        const remaining = Math.max(0, total - loaded)
        const etaSec = bps > 0 ? remaining / bps : 0

        onProgress({ pct, loaded, total, speedBps: bps, etaSec })
      }

      xhr.onload = () => {
        xhrMapRef.current.delete(itemId)
        if (xhr.status >= 200 && xhr.status < 300) {
          onProgress({ pct: 100, loaded: file.size, total: file.size, speedBps: 0, etaSec: 0 })
          resolve()
        } else {
          reject(Object.assign(new Error(`R2 PUT failed: ${xhr.status}`), { _type: 'R2' }))
        }
      }

      xhr.onerror = () => {
        xhrMapRef.current.delete(itemId)
        reject(Object.assign(new Error('R2 network error'), { _type: 'R2' }))
      }

      xhr.onabort = () => {
        xhrMapRef.current.delete(itemId)
        reject(new Error('R2 PUT aborted'))
      }

      xhr.send(file)
    })
  }

  function addFiles(fileList) {
    const picked = Array.from(fileList || [])
    if (!picked.length) return

    const items = picked.map((file) => ({
      id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      file,
      status: 'QUEUED',
      error: '',
      errorType: '',
      progress: 0,
      loaded: 0,
      total: file.size || 0,
      speedBps: 0,
      etaSec: 0,
      photoId: null,
    }))

    setQueue((q) => [...q, ...items])
  }

  // Auto-start
  React.useEffect(() => {
    if (!autoStart || paused || busy || stopAfterCurrent) return
    if (!session?.access_token || !isAdmin) return
    if (queue.some((x) => x.status === 'QUEUED')) runQueue()
  }, [queue.length, autoStart, paused, busy, stopAfterCurrent, session?.access_token, isAdmin])

  async function uploadSingleItem(item, token) {
    const file = item.file

    setItem(item.id, { status: 'UPLOADING', error: '', progress: 0 })

    log(`Preparing upload: ${file.name}`)

    // CREATE
    let photoId, objectKey, uploadUrl
    try {
      const createResp = await fetch('/api/admin/photos/create-upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ filename: file.name }),
      })
      const { json, text } = await safeJson(createResp)
      if (!createResp.ok) throw new Error(json?.error || text)
      photoId = json.photoId
      objectKey = json.objectKey
      uploadUrl = json.uploadUrl
      log(`✅ create-upload OK — photoId=${photoId}`)
    } catch (e) {
      throw Object.assign(new Error(e.message), { _type: 'CREATE' })
    }

    // PUT
    try {
      log(`Uploading to R2: ${file.name}`)
      await putToR2WithProgress(item.id, uploadUrl, file, ({ pct, loaded, total, speedBps, etaSec }) => {
        setItem(item.id, { progress: pct, loaded, total, speedBps, etaSec })
      })
      log('✅ R2 PUT OK')
    } catch (e) {
      if (e.message.includes('aborted')) throw e
      throw Object.assign(new Error(e.message), { _type: 'R2' })
    }

    // COMMIT
    try {
      setItem(item.id, { status: 'COMMITTING', speedBps: 0, etaSec: 0 })
      const commitResp = await fetch('/api/admin/photos/commit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ photoId }),
      })
      const { json, text } = await safeJson(commitResp)
      if (!commitResp.ok) throw new Error(json?.detail || json?.error || text)
      log('✅ Done: commit complete')
      setItem(item.id, { photoId })
    } catch (e) {
      throw Object.assign(new Error(e.message), { _type: 'COMMIT' })
    }
  }

  function pauseQueue() {
    setPaused(true)
    log('⏸ Pausing… aborting active uploads')
    for (const [, xhr] of xhrMapRef.current.entries()) {
      try { xhr.abort() } catch {}
    }
  }

  function resumeQueue() {
    setPaused(false)
    setStopAfterCurrent(false)
    log('▶️ Resuming queue…')
    runQueue()
  }

  async function runQueue() {
    if (runningRef.current || paused) return
    if (!session?.access_token || !isAdmin) return

    runningRef.current = true
    setBusy(true)

    const token = session.access_token

    try {
      log(`📦 Queue started (concurrency=${concurrency})`)

      while (true) {
        if (paused) break

        if (stopAfterCurrent) {
          const anyWorking = queueRef.current.some(
            (x) => x.status === 'UPLOADING' || x.status === 'COMMITTING'
          )
          if (!anyWorking) break
          await new Promise((r) => setTimeout(r, 200))
          continue
        }

        const next = []
        for (const it of queueRef.current) {
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
              const msg = e?.message || String(e)
              if (paused && msg.toLowerCase().includes('aborted')) {
                setItem(it.id, { status: 'QUEUED', error: '' })
                return
              }
              setItem(it.id, {
                status: 'ERROR',
                error: msg,
                errorType: e?._type || 'UNKNOWN',
                speedBps: 0,
                etaSec: 0,
              })
              log(`❌ Failed: ${it.file.name} — ${msg}`)
            }
          })
        )

        await new Promise((r) => setTimeout(r, 30))
      }

      if (paused) log('⏸ Queue paused')
      else log('🏁 Queue finished')
    } finally {
      runningRef.current = false
      setBusy(false)
      setStopAfterCurrent(false)
    }
  }

  const countQueued = queue.filter((x) => x.status === 'QUEUED').length
  const countWorking = queue.filter((x) => x.status === 'UPLOADING' || x.status === 'COMMITTING').length
  const countDone = queue.filter((x) => x.status === 'DONE').length
  const countErr = queue.filter((x) => x.status === 'ERROR').length

  const canStart = !busy && !paused && isAdmin && countQueued > 0
  const canPause = busy && !paused && countWorking > 0
  const canResume = !busy && paused && countQueued > 0

  return (
    <>
      <Head><title>Admin Upload</title></Head>

      <main style={{ maxWidth: 980, margin: '0 auto', padding: '40px 20px' }}>
        <h1>Admin Upload</h1>

        {!session ? (
          <div>
            <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
            <button onClick={signIn}>Sign in</button>
          </div>
        ) : (
          <>
            <div>
              <strong>{session.user.email}</strong> — {isAdmin ? 'admin' : 'not admin'}
              <button onClick={signOut}>Sign out</button>
            </div>

            <input type="file" multiple accept="image/*" onChange={(e) => addFiles(e.target.files)} />

            <div>Queued: {countQueued} | Working: {countWorking} | Done: {countDone} | Errors: {countErr}</div>

            <button onClick={runQueue} disabled={!canStart}>Start</button>
            <button onClick={pauseQueue} disabled={!canPause}>Pause</button>
            <button onClick={resumeQueue} disabled={!canResume}>Resume</button>

            <button onClick={() => { setStopAfterCurrent(true); log('🛑 Will stop after current uploads finish') }}
              disabled={!busy || paused}>
              Stop after current
            </button>

            <button onClick={retryFailed} disabled={busy || countErr === 0}>Retry failed</button>
            <button onClick={() => setQueue([])} disabled={busy}>Clear queue</button>

            {queue.map((it) => (
              <div key={it.id} style={{ marginTop: 10, border: '1px solid #444', padding: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>{it.file.name}</span>
                  <span>{it.status}</span>
                </div>

                <div style={{ height: 6, background: '#333', marginTop: 4 }}>
                  <div style={{ width: `${it.progress}%`, height: '100%', background: '#aaa' }} />
                </div>

                <div style={{ fontSize: 12 }}>
                  {it.status === 'UPLOADING' && `${it.progress}% • ${fmtSpeed(it.speedBps)} • ETA ${fmtEta(it.etaSec)}`}
                  {it.status === 'COMMITTING' && 'Committing…'}
                  {it.status === 'ERROR' && `${it.errorType}: ${it.error}`}
                  {it.status === 'DONE' && it.photoId && (
                    <a href={`/store/${it.photoId}`} target="_blank" rel="noreferrer">Open in Store</a>
                  )}
                </div>

                <button onClick={() => removeItem(it.id)}
                  disabled={busy && (it.status === 'UPLOADING' || it.status === 'COMMITTING')}>
                  Remove
                </button>
              </div>
            ))}
          </>
        )}

        <pre style={{ marginTop: 20 }}>{logs.join('\n')}</pre>
      </main>
    </>
  )
}
