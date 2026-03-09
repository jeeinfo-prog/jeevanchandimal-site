// pages/login.js
import React, { useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import JeevanChandimalNavi from '../components/layout/jeevan-chandimal-navi'
import JeevanChandimalNewFooter from '../components/layout/jeevan-chandimal-new-footer'

const STORAGE_MEMBER_TOKEN_KEY = 'jc_member_token'
const STORAGE_MEMBER_DEVICE_KEY = 'jc_member_device_id'

function normalizeEmail(v) {
  return String(v || '').trim().toLowerCase()
}

function getOrCreateDeviceId() {
  if (typeof window === 'undefined') return ''

  let id = String(window.localStorage.getItem(STORAGE_MEMBER_DEVICE_KEY) || '').trim()
  if (id) return id

  id = `dev_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 12)}`
  window.localStorage.setItem(STORAGE_MEMBER_DEVICE_KEY, id)
  return id
}

export default function LoginPage() {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')

    const cleanEmail = normalizeEmail(email)

    if (!cleanEmail || !password) {
      setError('Please enter email and password')
      return
    }

    try {
      setLoading(true)

      const authRes = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: cleanEmail, password }),
      })

      const authData = await authRes.json().catch(() => ({}))

      if (!authRes.ok || !authData?.ok) {
        setError(authData?.error || 'Login failed')
        setLoading(false)
        return
      }

      if (typeof window !== 'undefined') {
        window.localStorage.setItem('user_email', cleanEmail)
      }

      const deviceId = getOrCreateDeviceId()

      const sessionRes = await fetch('/api/member/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'start',
          email: cleanEmail,
          deviceId,
        }),
      })

      const sessionData = await sessionRes.json().catch(() => ({}))

      if (!sessionRes.ok || !sessionData?.ok || !sessionData?.token) {
        if (sessionData?.code === 'DEVICE_LIMIT' && sessionData?.cinematic?.title) {
          setError(sessionData.cinematic.title)
        } else {
          setError(sessionData?.error || 'Could not start member session')
        }
        setLoading(false)
        return
      }

      if (typeof window !== 'undefined') {
        window.localStorage.setItem(STORAGE_MEMBER_TOKEN_KEY, sessionData.token)

        if (typeof sessionData.active === 'number' && typeof sessionData.max === 'number') {
          const remaining = Math.max(0, sessionData.max - sessionData.active)
          window.localStorage.setItem('member_remaining', String(remaining))
        }

        window.dispatchEvent(new Event('jc_member_updated'))
      }

      router.push('/store')
    } catch (err) {
      console.error(err)
      setError('Network error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>Login – Jeevan Chandimal</title>
      </Head>

      <JeevanChandimalNavi />

      <main className="loginWrap">
        <form className="loginCard" onSubmit={handleSubmit}>
          <h1>Member Login</h1>

          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            autoComplete="email"
            required
          />

          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            autoComplete="current-password"
            required
          />

          {error ? <div className="errorBox">{error}</div> : null}

          <button type="submit" disabled={loading}>
            {loading ? 'Signing in…' : 'Login'}
          </button>

          <div className="help">
            <a href="/memberships">Get Membership</a>
          </div>
        </form>
      </main>

      <JeevanChandimalNewFooter />

      <style jsx>{`
        .loginWrap {
          min-height: 70vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px 20px;
        }

        .loginCard {
          width: 100%;
          max-width: 420px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(245, 244, 244, 0.1);
          border-radius: 18px;
          padding: 28px;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        h1 {
          margin: 0 0 6px 0;
          font-size: 22px;
          text-align: center;
        }

        label {
          font-size: 13px;
          opacity: 0.85;
        }

        input {
          width: 100%;
          padding: 12px 14px;
          border-radius: 12px;
          border: 1px solid rgba(245, 244, 244, 0.15);
          background: rgba(0, 0, 0, 0.25);
          color: #f5f4f4;
          outline: none;
        }

        input:focus {
          border-color: #25c3e2;
          box-shadow: 0 0 0 1px rgba(37, 195, 226, 0.3);
        }

        button {
          margin-top: 8px;
          padding: 12px;
          border-radius: 12px;
          border: 1px solid #25c3e2;
          background: rgba(37, 195, 226, 0.1);
          color: #25c3e2;
          font-weight: 600;
          cursor: pointer;
          transition: 0.15s;
        }

        button:hover {
          background: rgba(37, 195, 226, 0.18);
        }

        button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .errorBox {
          padding: 10px 12px;
          border-radius: 10px;
          background: rgba(255, 0, 0, 0.12);
          border: 1px solid rgba(255, 0, 0, 0.25);
          font-size: 13px;
        }

        .help {
          margin-top: 6px;
          text-align: center;
          font-size: 13px;
          opacity: 0.8;
        }

        .help a {
          color: #25c3e2;
          text-decoration: none;
        }

        .help a:hover {
          text-decoration: underline;
        }
      `}</style>
    </>
  )
}