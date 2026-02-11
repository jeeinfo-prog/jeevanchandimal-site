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

  const [file, setFile] = React.useState(null)
  const [busy, setBusy] = React.useState(false)
  const [logs, setLogs] = React.useState([])

  function log(line) {
    setLogs((p) => [...p, `${new Date().toLocaleTimeString()} — ${line}`])
  }

  React.useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data?.session || null)
    })

    const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s)
    })

    return () => sub?.subscription?.unsubscribe?.()
  }, [])

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

      setIsAdmin(data?.role === 'admin')
      if (data?.role === 'admin') log('✅ Admin verified')
      else log('❌ You are not admin (profiles.role != admin)')
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
      setFile(null)
      log('✅ Signed out')
    } catch (e) {
      log(`❌ Sign out error: ${e.message}`)
    } finally {
      setBusy(false)
    }
  }

  async function upload() {
    if (!session?.access_token) {
      log('❌ Not logged in')
      return
    }
    if (!isAdmin) {
      log('❌ Not admin')
      return
    }
    if (!file) {
      log('❌ Select a file first')
      return
    }

    setBusy(true)
    setLogs([])
    try {
      const token = session.access_token

      // 1) create-upload
      log(`Creating upload… (${file.name})`)
      const createResp = await fetch('/api/admin/photos/create-upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          filename: file.name,
          contentType: file.type || 'application/octet-stream',
        }),
      })

      const createText = await createResp.text()
      let createJson = null
      try {
        createJson = JSON.parse(createText)
      } catch {
        // ignore
      }

      if (!createResp.ok) {
        const msg =
          createJson?.error ||
          createJson?.message ||
          createText ||
          `create-upload failed (HTTP ${createResp.status})`
        throw new Error(msg)
      }

      const { photoId, objectKey, uploadUrl } = createJson
      log(`✅ create-upload OK — photoId=${photoId}`)
      log(`Uploading to R2 URL: ${uploadUrl}`)

      // 2) PUT to R2
      const putResp = await fetch(uploadUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': file.type || 'application/octet-stream',
        },
        body: file,
      })

      if (!putResp.ok) {
        const txt = await putResp.text().catch(() => '')
        log(`❌ R2 PUT failed: ${putResp.status} ${putResp.statusText}`)
        log(`❌ R2 response: ${txt || '(empty body)'}`)
        throw new Error(`R2 upload failed`)
      }

      log(`✅ R2 PUT OK (${putResp.status})`)

      // 3) commit
      log('Committing…')
      const commitResp = await fetch('/api/admin/photos/commit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ photoId, objectKey }),
      })

      const commitText = await commitResp.text()
      let commitJson = null
      try {
        commitJson = JSON.parse(commitText)
      } catch {
        // ignore
      }

      if (!commitResp.ok) {
        const msg =
          commitJson?.error ||
          commitJson?.message ||
          commitText ||
          `commit failed (HTTP ${commitResp.status})`
        throw new Error(msg)
      }

      // ✅ CHANGE: print full commit response text
      log(`✅ Commit OK — response: ${commitText}`)
    } catch (e) {
      log(`❌ Error: ${e.message}`)
    } finally {
      setBusy(false)
    }
  }

  return (
    <>
      <Head>
        <title>Admin Upload</title>
      </Head>

      <main style={{ maxWidth: 900, margin: '0 auto', padding: '40px 20px' }}>
        <h1 style={{ margin: 0 }}>Admin Upload</h1>
        <p style={{ opacity: 0.8, marginTop: 8 }}>Supabase login required.</p>

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
                accept="image/*,.jpg,.jpeg,.png,.webp,.tif,.tiff,.zip,.raw,.dng"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
              />
              <div style={{ marginTop: 10, opacity: 0.85, fontSize: 13 }}>
                {file ? (
                  <>
                    Selected: <strong>{file.name}</strong> ({Math.round(file.size / 1024)} KB)
                  </>
                ) : (
                  'No file selected'
                )}
              </div>

              <button
                onClick={upload}
                disabled={busy || !isAdmin || !file}
                style={{ marginTop: 12, padding: '10px 14px' }}
              >
                {busy ? 'Working…' : 'Upload'}
              </button>
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
