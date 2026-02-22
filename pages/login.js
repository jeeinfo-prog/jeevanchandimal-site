// pages/login.js
import React, { useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import JeevanChandimalNavi from '../components/jeevan-chandimal-navi'
import JeevanChandimalNewFooter from '../components/jeevan-chandimal-new-footer'

export default function LoginPage() {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')

    if (!email || !password) {
      setError('Please enter email and password')
      return
    }

    try {
      setLoading(true)

      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (!res.ok || !data.ok) {
        setError(data?.error || 'Login failed')
        setLoading(false)
        return
      }

      // ✅ store email for navbar + membership
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('user_email', data.user.email)
      }

      // optional: store plan if your API returns it later
      if (data?.plan && typeof window !== 'undefined') {
        window.localStorage.setItem('member_plan', data.plan)
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

          {error && <div className="errorBox">{error}</div>}

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