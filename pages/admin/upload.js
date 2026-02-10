import React from 'react'
import Head from 'next/head'
import { supabase } from '../../lib/supabaseClient'

export default function AdminUpload() {
  const [session, setSession] = React.useState(null)
  const [role, setRole] = React.useState(null)
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [busy, setBusy] = React.useState(false)
  const [logs, setLogs] = React.useState([])

  function log(line) {
    setLogs((p) => [`${new Date().toLocaleTimeString()} — ${line}`, ...p])
  }

  React.useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session || null))

    const { data: sub } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession || null)
    })

    return () => sub.subscription.unsubscribe()
  }, [])

  React.useEffect(() => {
    async function loadRole() {
      if (!session?.user?.id) {
        setRole(null)
        return
      }
      const { data, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', session.user.id)
        .single()

      if (error) {
        console.error(error)
        setRole(null)
        return
      }
      setRole(data?.role || null)
    }
    loadRole()
  }, [session?.user?.id])

  async function signIn() {
    setBusy(true)
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) throw error
      log('✅ Signed in')
    } catch (e) {
      log(`❌ Sign in failed: ${e.message}`)
    } finally {
      setBusy(false)
    }
  }

  async function signOut() {
    await supabase.auth.signOut()
    setLogs([])
  }

  async function uploadOne(file) {
    const token = session?.access_token
    if (!token) throw new Error('No access token')

    log(`Preparing upload: ${file.name}`)

    const prepRes = await fetch('/api/admin/photos/create-upload', {
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

    if (!prepRes.ok) {
      const j = await prepRes.json().catch(() => ({}))
      throw new Error(j.error || 'create-upload failed')
    }

    const { photoId, objectKey, uploadUrl } = await prepRes.json()

    log(`Uploading to R2: ${file.name}`)
    const putRes = await fetch(uploadUrl, {
      method: 'PUT',
      headers: { 'Content-Type': file.type || 'application/octet-stream' },
      body: file,
    })
    if (!putRes.ok) throw new Error('R2 upload failed')

    log(`Commit: ${file.name}`)
    const commitRes = await fetch('/api/admin/photos/commit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ photoId, objectKey }),
    })

    if (!commitRes.ok) {
      const j = await commitRes.json().catch(() => ({}))
      throw new Error(j.error || 'commit failed')
    }

    log(`✅ Done: ${file.name} (photoId: ${photoId})`)
  }

  async function onPick(e) {
    const files = Array.from(e.target.files || [])
    if (!files.length) return

    setBusy(true)
    setLogs([])

    try {
      for (const f of files) await uploadOne(f)
      log('All uploads complete.')
    } catch (err) {
      console.error(err)
      log(`❌ Error: ${err.message}`)
    } finally {
      setBusy(false)
      e.target.value = ''
    }
  }

  const isAdmin = role === 'admin'

  return (
    <>
      <Head>
        <title>Admin Upload</title>
      </Head>

      <main style={{ maxWidth: 900, margin: '0 auto', padding: '40px 20px' }}>
        <h1 style={{ margin: 0 }}>Admin Upload</h1>
        <p style={{ opacity: 0.8 }}>Supabase login required.</p>

        {!session ? (
          <div style={{ marginTop: 18, padding: 16, border: '1px solid rgba(245,244,244,0.16)', borderRadius: 14 }}>
            <h3 style={{ marginTop: 0 }}>Login</h3>

            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              style={{ width: '100%', padding: 10, marginBottom: 10 }}
              disabled={busy}
            />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              type="password"
              style={{ width: '100%', padding: 10, marginBottom: 10 }}
              disabled={busy}
            />

            <button onClick={signIn} disabled={busy} style={{ padding: '10px 14px' }}>
              Sign in
            </button>
          </div>
        ) : (
          <>
            <div style={{ marginTop: 18, display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
              <div style={{ opacity: 0.85 }}>
                Signed in as <strong>{session.user.email}</strong> — Role:{' '}
                <strong>{role ? role : 'loading...'}</strong>
              </div>
              <button onClick={signOut} style={{ padding: '8px 12px' }}>
                Sign out
              </button>
            </div>

            {!isAdmin ? (
              <div style={{ marginTop: 16, padding: 16, border: '1px solid rgba(245,244,244,0.16)', borderRadius: 14 }}>
                <p style={{ margin: 0 }}>
                  ❌ You are not admin. Update your role in Supabase:
                  <br />
                  <code>update profiles set role='admin' where email='...';</code>
                </p>
              </div>
            ) : (
              <div style={{ marginTop: 18, padding: 16, border: '1px solid rgba(245,244,244,0.16)', borderRadius: 14 }}>
                <input type="file" multiple accept="image/*" onChange={onPick} disabled={busy} />
                <p style={{ marginTop: 10, opacity: 0.7, fontSize: 13 }}>
                  Upload originals privately to R2. (Next step: generate thumb/web/watermark.)
                </p>
              </div>
            )}
          </>
        )}

        <div style={{ marginTop: 18 }}>
          <h3 style={{ marginBottom: 10 }}>Logs</h3>
          <div style={{ padding: 14, border: '1px solid rgba(245,244,244,0.16)', borderRadius: 14 }}>
            {logs.length === 0 ? (
              <p style={{ opacity: 0.7, margin: 0 }}>No logs yet.</p>
            ) : (
              <ul style={{ margin: 0, paddingLeft: 18 }}>
                {logs.map((l, i) => (
                  <li key={i} style={{ marginBottom: 6, opacity: 0.9 }}>
                    {l}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </main>
    </>
  )
}
