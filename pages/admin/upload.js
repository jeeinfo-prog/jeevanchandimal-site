// pages/admin/upload.js

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

function stripExt(name) {
  const n = String(name || '')
  const i = n.lastIndexOf('.')
  return i > 0 ? n.slice(0, i) : n
}
function toTitleCase(s) {
  return String(s)
    .replace(/[_\-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .split(' ')
    .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : ''))
    .join(' ')
}
function autoTitleFromFile(file) {
  const base = stripExt(file?.name || '')
  return toTitleCase(base)
}
function autoTagsFromFile(file) {
  const base = stripExt(file?.name || '')
  const raw = base
    .replace(/[_\-]+/g, ' ')
    .replace(/[^\p{L}\p{N}\s]+/gu, ' ')
    .toLowerCase()

  const stop = new Set(['the', 'a', 'an', 'and', 'or', 'of', 'to', 'in', 'on', 'at', 'for', 'with', 'by', 'from'])
  const words = raw.split(/\s+/g).filter(Boolean)

  const tags = []
  const seen = new Set()
  for (const w of words) {
    if (w.length < 3) continue
    if (stop.has(w)) continue
    if (/^\d+$/.test(w)) continue
    if (seen.has(w)) continue
    seen.add(w)
    tags.push(w)
    if (tags.length >= 10) break
  }
  return tags
}

export default function AdminUploadPage() {
  // Auth
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [session, setSession] = React.useState(null)
  const [isAdmin, setIsAdmin] = React.useState(false)

  // Queue
  const [queue, setQueue] = React.useState([])
  const [logs, setLogs] = React.useState([])
  const [busy, setBusy] = React.useState(false)

  // Controls
  const [autoStart, setAutoStart] = React.useState(true)
  const [paused, setPaused] = React.useState(false)
  const [stopAfterCurrent, setStopAfterCurrent] = React.useState(false)
  const [keepFolderStructure, setKeepFolderStructure] = React.useState(true)

  // License preset defaults (Commercial updated to 7500 / 25)
  const [licensePreset, setLicensePreset] = React.useState('personal')
  const [priceUsd, setPriceUsd] = React.useState(8)
  const [priceLkr, setPriceLkr] = React.useState(2500)

  // Auto FX (USD -> LKR)
  const [fxUsdToLkr, setFxUsdToLkr] = React.useState(320)
  const [autoLkrFromUsd, setAutoLkrFromUsd] = React.useState(true)

  const concurrency = 4
  const runningRef = React.useRef(false)
  const queueRef = React.useRef([])
  const xhrMapRef = React.useRef(new Map())

  // License presets map
  const LICENSE_PRESETS = React.useMemo(
    () => ({
      personal: { lkr: 2500, usd: 8 },
      editorial: { lkr: 4000, usd: 13 },
      commercial: { lkr: 7500, usd: 25 },
    }),
    []
  )

  // Keep ref updated
  React.useEffect(() => {
    queueRef.current = queue
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
      try {
        xhr.abort()
      } catch {}
    }
    setQueue((q) => q.filter((it) => it.id !== id))
  }

  function retryFailed() {
    setQueue((q) =>
      q.map((it) =>
        it.status === 'ERROR'
          ? { ...it, status: 'QUEUED', error: '', errorType: '', progress: 0, speedBps: 0, etaSec: 0 }
          : it
      )
    )
  }

  function applyBulkPresetToQueued() {
    setQueue((q) =>
      q.map((it) =>
        it.status === 'QUEUED' || it.status === 'ERROR'
          ? {
              ...it,
              meta: {
                ...(it.meta || {}),
                licensePreset,
                priceLkr: Number(priceLkr) || 0,
                priceUsd: Number(priceUsd) || 0,
              },
            }
          : it
      )
    )
    log(`✅ Applied bulk preset to queued items (${licensePreset}, LKR ${priceLkr}, USD ${priceUsd})`)
  }

  async function safeJson(resp) {
    const text = await resp.text()
    try {
      return { json: JSON.parse(text), text }
    } catch {
      return { json: null, text }
    }
  }

  // Auto LKR from USD (optional)
  React.useEffect(() => {
    if (!autoLkrFromUsd) return
    const usd = Number(priceUsd)
    if (!Number.isFinite(usd)) return
    const rate = Number(fxUsdToLkr || 0)
    if (!Number.isFinite(rate) || rate <= 0) return
    const lkr = Math.round(usd * rate)
    if (Number.isFinite(lkr) && lkr > 0) setPriceLkr(lkr)
  }, [priceUsd, fxUsdToLkr, autoLkrFromUsd])

  // Auth: session
  React.useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data?.session || null))
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s))
    return () => sub?.subscription?.unsubscribe?.()
  }, [])

  // Admin check
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
      setStopAfterCurrent(false)
      log('✅ Signed out')
    } catch (e) {
      log(`❌ Sign out error: ${e.message}`)
    } finally {
      setBusy(false)
    }
  }

  // Drag & drop visuals
  const [dragOver, setDragOver] = React.useState(false)

  function onDrop(e) {
    e.preventDefault()
    e.stopPropagation()
    setDragOver(false)
    const files = e.dataTransfer?.files
    if (files && files.length) addFiles(files)
  }

  // XHR PUT with progress
  function putToR2WithProgress(itemId, uploadUrl, file, onProgress) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      xhr.open('PUT', uploadUrl, true)
      xhrMapRef.current.set(itemId, xhr)

      let lastAt = Date.now()
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

    const items = picked.map((file) => {
      const rel = file.webkitRelativePath || ''
      const relPath = keepFolderStructure && rel ? rel : ''

      const title = autoTitleFromFile(file)
      const tags = autoTagsFromFile(file)

      return {
        id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
        file,
        relativePath: relPath,
        status: 'QUEUED',
        error: '',
        errorType: '',
        progress: 0,
        loaded: 0,
        total: file.size || 0,
        speedBps: 0,
        etaSec: 0,
        photoId: null,
        meta: {
          title,
          tags,
          licensePreset,
          priceLkr: Number(priceLkr) || 0,
          priceUsd: Number(priceUsd) || 0,
        },
      }
    })

    setQueue((q) => [...q, ...items])
  }

  // Auto-start
  React.useEffect(() => {
    if (!autoStart) return
    if (paused) return
    if (busy) return
    if (stopAfterCurrent) return
    if (!session?.access_token || !isAdmin) return

    const hasQueued = queue.some((x) => x.status === 'QUEUED')
    if (hasQueued) runQueue()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queue.length, autoStart, paused, busy, stopAfterCurrent, session?.access_token, isAdmin])

  async function uploadSingleItem(item, token) {
    const file = item.file

    setItem(item.id, {
      status: 'UPLOADING',
      error: '',
      errorType: '',
      progress: 0,
      loaded: 0,
      total: file.size || 0,
      speedBps: 0,
      etaSec: 0,
    })

    log(`Preparing upload: ${file.name}`)

    // 1) create-upload
    let photoId, uploadUrl
    try {
      const createResp = await fetch('/api/admin/photos/create-upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          filename: file.name,
          relativePath: item.relativePath || '',
          title: item?.meta?.title || '',
          tags: item?.meta?.tags || [],
          // NOTE: license/prices are NOT stored in DB yet; we keep them UI-only for now.
          licensePreset: item?.meta?.licensePreset || '',
          priceLkr: item?.meta?.priceLkr ?? null,
          priceUsd: item?.meta?.priceUsd ?? null,
        }),
      })

      const { json, text } = await safeJson(createResp)
      if (!createResp.ok) throw Object.assign(new Error(json?.error || text || 'create-upload failed'), { _type: 'CREATE' })

      photoId = json.photoId
      uploadUrl = json.uploadUrl
      log(`✅ create-upload OK — photoId=${photoId}`)
      setItem(item.id, { photoId })
    } catch (e) {
      throw Object.assign(new Error(e.message), { _type: e?._type || 'CREATE' })
    }

    // 2) PUT to R2
    try {
      log(`Uploading to R2: ${file.name}`)
      await putToR2WithProgress(item.id, uploadUrl, file, ({ pct, loaded, total, speedBps, etaSec }) => {
        setItem(item.id, { progress: pct, loaded, total, speedBps, etaSec })
      })
      log('✅ R2 PUT OK')
    } catch (e) {
      if (String(e?.message || '').toLowerCase().includes('aborted')) throw e
      throw Object.assign(new Error(e.message), { _type: e?._type || 'R2' })
    }

    // 3) commit
    try {
      setItem(item.id, { status: 'COMMITTING', speedBps: 0, etaSec: 0 })
      log(`Commit: ${file.name}`)

      const commitResp = await fetch('/api/admin/photos/commit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ photoId }),
      })

      const { json, text } = await safeJson(commitResp)
      if (!commitResp.ok) throw Object.assign(new Error(json?.detail || json?.error || text || 'Commit failed'), { _type: 'COMMIT' })

      log('✅ Done: commit complete')
      log(`thumbUrl: ${json?.thumbUrl || json?.thumb_url || '(none)'}`)
      log(`previewUrl: ${json?.previewUrl || json?.preview_url || '(none)'}`)
    } catch (e) {
      throw Object.assign(new Error(e.message), { _type: e?._type || 'COMMIT' })
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
    if (runningRef.current) return
    if (paused) return
    if (!session?.access_token) return log('❌ Not logged in')
    if (!isAdmin) return log('❌ Not admin')

    runningRef.current = true
    setBusy(true)

    const token = session.access_token

    try {
      log(`📦 Upload queue started (concurrency=${concurrency})`)

      while (true) {
        if (paused) break

        if (stopAfterCurrent) {
          const anyWorking = queueRef.current.some((x) => x.status === 'UPLOADING' || x.status === 'COMMITTING')
          if (!anyWorking) break
          // eslint-disable-next-line no-await-in-loop
          await new Promise((r) => setTimeout(r, 200))
          continue
        }

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
              setItem(it.id, { status: 'DONE', error: '', errorType: '', progress: 100, speedBps: 0, etaSec: 0 })
            } catch (e) {
              const msg = e?.message || String(e)

              if (paused && msg.toLowerCase().includes('aborted')) {
                setItem(it.id, { status: 'QUEUED', error: '', errorType: '' })
                return
              }

              setItem(it.id, { status: 'ERROR', error: msg, errorType: e?._type || 'UNKNOWN', speedBps: 0, etaSec: 0 })
              log(`❌ Failed: ${it.file.name} — ${msg}`)
            }
          })
        )

        // eslint-disable-next-line no-await-in-loop
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
      <Head>
        <title>Admin Upload</title>
      </Head>

      <main style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 20px' }}>
        <h1 style={{ margin: 0 }}>Admin Upload</h1>
        <p style={{ opacity: 0.8, marginTop: 8 }}>
          Drag & drop + folder upload + auto title/tags + bulk preset defaults.
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

            {/* Bulk preset */}
            <div
              style={{
                marginTop: 18,
                padding: 14,
                border: '1px solid rgba(245,244,244,0.16)',
                borderRadius: 14,
              }}
            >
              <h3 style={{ marginTop: 0 }}>Bulk preset</h3>

              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
                <label style={{ fontSize: 13 }}>
                  License:
                  <select
                    value={licensePreset}
                    onChange={(e) => {
                      const next = e.target.value
                      setLicensePreset(next)
                      const preset = LICENSE_PRESETS[next]
                      if (preset) {
                        setPriceUsd(preset.usd)
                        setPriceLkr(preset.lkr)
                      }
                    }}
                    disabled={busy}
                    style={{ marginLeft: 8 }}
                  >
                    <option value="personal">personal</option>
                    <option value="editorial">editorial</option>
                    <option value="commercial">commercial</option>
                  </select>
                </label>

                <label style={{ fontSize: 13 }}>
                  USD:
                  <input
                    type="number"
                    value={priceUsd}
                    onChange={(e) => setPriceUsd(e.target.value)}
                    style={{ width: 90, marginLeft: 8 }}
                    disabled={busy}
                  />
                </label>

                <label style={{ fontSize: 13 }}>
                  LKR:
                  <input
                    type="number"
                    value={priceLkr}
                    onChange={(e) => setPriceLkr(e.target.value)}
                    style={{ width: 110, marginLeft: 8 }}
                    disabled={busy}
                  />
                </label>

                <button
                  type="button"
                  onClick={applyBulkPresetToQueued}
                  disabled={busy || queue.length === 0}
                  style={{ padding: '8px 12px' }}
                >
                  Apply to queued
                </button>
              </div>

              <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginTop: 10, flexWrap: 'wrap' }}>
                <label style={{ display: 'inline-flex', gap: 8, alignItems: 'center', fontSize: 13, opacity: 0.9 }}>
                  <input
                    type="checkbox"
                    checked={autoLkrFromUsd}
                    onChange={(e) => setAutoLkrFromUsd(e.target.checked)}
                    disabled={busy}
                  />
                  Auto LKR from USD
                </label>

                <label style={{ fontSize: 13, opacity: 0.9 }}>
                  FX (1 USD → LKR):
                  <input
                    type="number"
                    value={fxUsdToLkr}
                    onChange={(e) => setFxUsdToLkr(e.target.value)}
                    style={{ width: 110, marginLeft: 8 }}
                    disabled={busy || !autoLkrFromUsd}
                  />
                </label>

                <div style={{ fontSize: 12, opacity: 0.7 }}>
                  Defaults: personal 2500/8 • editorial 4000/13 • commercial 7500/25
                </div>
              </div>
            </div>

            <div style={{ marginTop: 14, display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'center' }}>
              <label style={{ display: 'inline-flex', gap: 8, alignItems: 'center', fontSize: 13, opacity: 0.9 }}>
                <input
                  type="checkbox"
                  checked={keepFolderStructure}
                  onChange={(e) => setKeepFolderStructure(e.target.checked)}
                  disabled={busy}
                />
                Keep folder structure (R2 keys use webkitRelativePath)
              </label>

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

              {paused && <span style={{ opacity: 0.9 }}>⏸ Paused</span>}
              {stopAfterCurrent && <span style={{ opacity: 0.9 }}>🛑 Will stop after current</span>}
            </div>

            {/* Add files */}
            <div style={{ marginTop: 14 }}>
              <h3 style={{ marginTop: 0 }}>Add files</h3>

              <div
                onDragOver={(e) => {
                  e.preventDefault()
                  setDragOver(true)
                }}
                onDragLeave={(e) => {
                  e.preventDefault()
                  setDragOver(false)
                }}
                onDrop={onDrop}
                style={{
                  border: `1px dashed ${dragOver ? 'rgba(245,244,244,0.55)' : 'rgba(245,244,244,0.25)'}`,
                  borderRadius: 14,
                  padding: 18,
                  background: dragOver ? 'rgba(245,244,244,0.06)' : 'rgba(255,255,255,0.02)',
                }}
              >
                <div style={{ fontWeight: 700 }}>Drag & drop files here</div>
                <div style={{ opacity: 0.75, marginTop: 6, fontSize: 13 }}>
                  Tip: use the folder picker below for folder selection.
                </div>

                <div style={{ marginTop: 12, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                  <label style={{ display: 'inline-block' }}>
                    <div style={{ fontSize: 13, opacity: 0.85, marginBottom: 6 }}>Select files</div>
                    <input
                      type="file"
                      multiple
                      accept="image/*,.jpg,.jpeg,.png,.webp,.tif,.tiff"
                      onChange={(e) => {
                        addFiles(e.target.files)
                        e.target.value = ''
                      }}
                    />
                  </label>

                  <label style={{ display: 'inline-block' }}>
                    <div style={{ fontSize: 13, opacity: 0.85, marginBottom: 6 }}>Select folder</div>
                    <input
                      type="file"
                      multiple
                      accept="image/*,.jpg,.jpeg,.png,.webp,.tif,.tiff"
                      {...{ webkitdirectory: 'true', directory: 'true' }}
                      onChange={(e) => {
                        addFiles(e.target.files)
                        e.target.value = ''
                      }}
                    />
                  </label>
                </div>
              </div>

              <div style={{ marginTop: 12, opacity: 0.85, fontSize: 13 }}>
                Queued: <strong>{countQueued}</strong> | Working: <strong>{countWorking}</strong> | Done:{' '}
                <strong>{countDone}</strong> | Errors: <strong>{countErr}</strong>
              </div>

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

                <button
                  type="button"
                  onClick={() => {
                    setStopAfterCurrent(true)
                    log('🛑 Will stop after current uploads finish')
                  }}
                  disabled={!busy || paused}
                  style={{ padding: '10px 14px' }}
                >
                  Stop after current
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
                            {it.relativePath ? (
                              <span style={{ marginLeft: 8, opacity: 0.7, fontSize: 12 }}>({it.relativePath})</span>
                            ) : null}
                            <span style={{ marginLeft: 8, opacity: 0.7, fontSize: 12 }}>
                              ({fmtMB(it.total || it.file.size)} MB)
                            </span>
                          </div>

                          <div style={{ display: 'flex', gap: 10, alignItems: 'center', whiteSpace: 'nowrap' }}>
                            <span style={{ opacity: 0.9 }}>{it.status === 'ERROR' ? 'ERROR' : it.status}</span>

                            {it.status === 'ERROR' && !busy && (
                              <button
                                onClick={() => setItem(it.id, { status: 'QUEUED', error: '', errorType: '', progress: 0 })}
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

                            {it.status === 'DONE' && it.photoId && (
                              <a
                                href={`/store/${it.photoId}`}
                                target="_blank"
                                rel="noreferrer"
                                style={{ fontSize: 11, textDecoration: 'underline', opacity: 0.9 }}
                              >
                                Open in Store
                              </a>
                            )}

                            <button
                              type="button"
                              onClick={() => removeItem(it.id)}
                              disabled={busy && (it.status === 'UPLOADING' || it.status === 'COMMITTING')}
                              style={{
                                padding: '2px 8px',
                                fontSize: 11,
                                borderRadius: 8,
                                border: '1px solid rgba(245,244,244,0.18)',
                                background: 'transparent',
                                cursor: 'pointer',
                                opacity: busy && (it.status === 'UPLOADING' || it.status === 'COMMITTING') ? 0.5 : 1,
                              }}
                            >
                              Remove
                            </button>
                          </div>
                        </div>

                        <div style={{ marginTop: 8, fontSize: 12, opacity: 0.85 }}>
                          <div>
                            <strong>Title:</strong> {it?.meta?.title || '(auto)'}
                          </div>
                          <div>
                            <strong>Tags:</strong>{' '}
                            {(it?.meta?.tags || []).length ? it.meta.tags.slice(0, 10).join(', ') : '(auto)'}
                          </div>
                          <div>
                            <strong>Preset:</strong> {it?.meta?.licensePreset || licensePreset} • LKR{' '}
                            {it?.meta?.priceLkr ?? priceLkr} • USD {it?.meta?.priceUsd ?? priceUsd}
                          </div>
                        </div>

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

                        <div
                          style={{
                            marginTop: 6,
                            display: 'flex',
                            justifyContent: 'space-between',
                            gap: 10,
                            fontSize: 12,
                            opacity: 0.85,
                          }}
                        >
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
                              <>
                                <strong>{it.errorType || 'ERROR'}:</strong> {it.error || 'Unknown error'}
                              </>
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
