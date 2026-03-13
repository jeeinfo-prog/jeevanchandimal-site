// pages/login.js
import React, { useEffect, useMemo, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import JeevanChandimalNavi from '../components/layout/jeevan-chandimal-navi'
import JeevanChandimalNewFooter from '../components/layout/jeevan-chandimal-new-footer'

const STORAGE_MEMBER_TOKEN_KEY = 'jc_member_token'
const STORAGE_MEMBER_DEVICE_KEY = 'jc_member_device_id'

function normalizeEmail(v) {
  return String(v || '')
    .trim()
    .toLowerCase()
}

function getOrCreateDeviceId() {
  if (typeof window === 'undefined') return ''

  let id = String(window.localStorage.getItem(STORAGE_MEMBER_DEVICE_KEY) || '').trim()
  if (id) return id

  id = `dev_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 12)}`
  window.localStorage.setItem(STORAGE_MEMBER_DEVICE_KEY, id)
  return id
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="socialIcon">
      <path
        fill="currentColor"
        d="M21.805 10.023h-9.58v3.955h5.49c-.237 1.272-.949 2.351-2.024 3.074v2.552h3.278c1.918-1.766 3.036-4.37 3.036-7.486 0-.7-.063-1.373-.2-2.095Z"
      />
      <path
        fill="currentColor"
        d="M12.225 22c2.745 0 5.048-.91 6.731-2.396l-3.278-2.552c-.91.61-2.072.973-3.453.973-2.658 0-4.91-1.795-5.715-4.21H3.126v2.632A10.16 10.16 0 0 0 12.225 22Z"
      />
      <path
        fill="currentColor"
        d="M6.51 13.815a6.11 6.11 0 0 1-.32-1.94c0-.674.116-1.328.32-1.94V7.303H3.126A10.16 10.16 0 0 0 2 11.875c0 1.64.393 3.194 1.126 4.572l3.384-2.632Z"
      />
      <path
        fill="currentColor"
        d="M12.225 5.725c1.493 0 2.832.514 3.885 1.523l2.916-2.916C17.27 2.69 14.968 1.75 12.225 1.75A10.16 10.16 0 0 0 3.126 7.303L6.51 9.935c.805-2.415 3.057-4.21 5.715-4.21Z"
      />
    </svg>
  )
}

function AppleIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="socialIcon">
      <path
        fill="currentColor"
        d="M16.365 12.6c.02 2.16 1.894 2.88 1.915 2.89-.016.05-.299 1.015-.986 2.01-.594.86-1.21 1.715-2.18 1.732-.953.018-1.26-.563-2.35-.563-1.092 0-1.433.545-2.333.582-.936.035-1.65-.938-2.248-1.794-1.223-1.77-2.157-5.003-.902-7.185.624-1.083 1.742-1.77 2.956-1.788.922-.018 1.792.618 2.35.618.557 0 1.604-.765 2.702-.653.46.018 1.752.186 2.58 1.4-.067.042-1.54.9-1.504 2.75Zm-2.104-5.996c.498-.603.833-1.44.742-2.276-.717.03-1.583.478-2.096 1.08-.46.532-.862 1.386-.754 2.202.8.062 1.61-.407 2.108-1.006Z"
      />
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="socialIcon">
      <path
        fill="currentColor"
        d="M13.5 22v-8.2h2.76l.414-3.22H13.5V8.52c0-.932.26-1.568 1.597-1.568h1.708V4.07c-.295-.04-1.31-.12-2.49-.12-2.464 0-4.15 1.504-4.15 4.266v2.364H7.39v3.22h2.775V22h3.335Z"
      />
    </svg>
  )
}

export default function LoginPage() {
  const router = useRouter()

  const nextPath = useMemo(() => {
    const raw = router.query?.next
    if (typeof raw === 'string' && raw.startsWith('/')) return raw
    return '/store'
  }, [router.query?.next])

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [socialLoading, setSocialLoading] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (!router.isReady) return
    const qError = typeof router.query?.error === 'string' ? router.query.error.trim() : ''
    if (qError) setError(qError)
  }, [router.isReady, router.query?.error])

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

      await router.push(nextPath)
    } catch (err) {
      console.error(err)
      setError('Network error')
    } finally {
      setLoading(false)
    }
  }

  function handleSocialLogin(provider) {
    try {
      setError('')

      if (provider !== 'google') {
        setError(`${provider[0].toUpperCase()}${provider.slice(1)} login is not enabled yet`)
        return
      }

      setSocialLoading(provider)

      const deviceId = getOrCreateDeviceId()

      const url =
        `/api/auth/oauth/start?provider=${encodeURIComponent(provider)}` +
        `&next=${encodeURIComponent(nextPath)}` +
        `&deviceId=${encodeURIComponent(deviceId)}`

      window.location.href = url
    } catch (err) {
      console.error(err)
      setSocialLoading('')
      setError('Could not start social login')
    }
  }

  return (
    <>
      <Head>
        <title>Login – Jeevan Chandimal</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <JeevanChandimalNavi />

      <main className="loginWrap">
        <div className="loginShell">
          <form className="loginCard" onSubmit={handleSubmit}>
            <div className="eyebrow">Members Area</div>
            <h1>Welcome Back</h1>
            <p className="subtext">
              Sign in to access your membership, downloads, and private store content.
            </p>

            <div className="socialStack">
              <button
                type="button"
                className="socialBtn"
                onClick={() => handleSocialLogin('google')}
                disabled={loading || !!socialLoading}
              >
                <GoogleIcon />
                <span>
                  {socialLoading === 'google' ? 'Connecting Google…' : 'Continue with Google'}
                </span>
              </button>

              <button
                type="button"
                className="socialBtn"
                onClick={() => handleSocialLogin('apple')}
                disabled={loading || !!socialLoading}
                aria-disabled="true"
              >
                <AppleIcon />
                <span>Continue with Apple</span>
                <small className="comingSoon">Soon</small>
              </button>

              <button
                type="button"
                className="socialBtn"
                onClick={() => handleSocialLogin('facebook')}
                disabled={loading || !!socialLoading}
                aria-disabled="true"
              >
                <FacebookIcon />
                <span>Continue with Facebook</span>
                <small className="comingSoon">Soon</small>
              </button>
            </div>

            <div className="divider">
              <span>or continue with email</span>
            </div>

            <label htmlFor="login-email">Email</label>
            <input
              id="login-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              autoComplete="email"
              required
            />

            <label htmlFor="login-password">Password</label>
            <input
              id="login-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete="current-password"
              required
            />

            {error ? <div className="errorBox">{error}</div> : null}

            <button type="submit" className="primaryBtn" disabled={loading || !!socialLoading}>
              {loading ? 'Signing in…' : 'Login'}
            </button>

            <div className="help">
              <a href="/memberships">Get Membership</a>
            </div>
          </form>
        </div>
      </main>

      <JeevanChandimalNewFooter />

      <style jsx>{`
        .loginWrap {
          min-height: 70vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 48px 20px;
          background:
            radial-gradient(circle at top, rgba(37, 195, 226, 0.08), transparent 28%),
            linear-gradient(180deg, rgba(0, 0, 0, 0.2), transparent 30%);
        }

        .loginShell {
          width: 100%;
          max-width: 520px;
        }

        .loginCard {
          width: 100%;
          background: rgba(255, 255, 255, 0.035);
          border: 1px solid rgba(245, 244, 244, 0.1);
          border-radius: 24px;
          padding: 32px 28px 28px;
          display: flex;
          flex-direction: column;
          gap: 14px;
          box-shadow:
            0 24px 80px rgba(0, 0, 0, 0.34),
            inset 0 1px 0 rgba(255, 255, 255, 0.04);
          backdrop-filter: blur(10px);
        }

        .eyebrow {
          text-align: center;
          font-size: 11px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(37, 195, 226, 0.9);
          margin-bottom: 2px;
        }

        h1 {
          margin: 0;
          font-size: 30px;
          line-height: 1.1;
          text-align: center;
          color: #f5f4f4;
        }

        .subtext {
          margin: 0 0 6px 0;
          text-align: center;
          font-size: 14px;
          line-height: 1.6;
          color: rgba(245, 244, 244, 0.72);
        }

        .socialStack {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-top: 6px;
        }

        .socialBtn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          padding: 13px 16px;
          border-radius: 14px;
          border: 1px solid rgba(245, 244, 244, 0.12);
          background: rgba(255, 255, 255, 0.03);
          color: #f5f4f4;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.18s ease, border-color 0.18s ease, background 0.18s ease;
        }

        .socialBtn:hover {
          transform: translateY(-1px);
          border-color: rgba(37, 195, 226, 0.45);
          background: rgba(255, 255, 255, 0.05);
        }

        .socialBtn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        .socialIcon {
          width: 18px;
          height: 18px;
          flex: 0 0 18px;
        }

        .comingSoon {
          margin-left: auto;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: rgba(37, 195, 226, 0.88);
        }

        .divider {
          position: relative;
          text-align: center;
          margin: 8px 0 2px;
        }

        .divider:before {
          content: '';
          position: absolute;
          left: 0;
          right: 0;
          top: 50%;
          height: 1px;
          background: rgba(245, 244, 244, 0.08);
        }

        .divider span {
          position: relative;
          display: inline-block;
          padding: 0 12px;
          background: rgba(10, 10, 10, 0.65);
          color: rgba(245, 244, 244, 0.55);
          font-size: 12px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        label {
          font-size: 13px;
          color: rgba(245, 244, 244, 0.86);
        }

        input {
          width: 100%;
          padding: 13px 14px;
          border-radius: 14px;
          border: 1px solid rgba(245, 244, 244, 0.12);
          background: rgba(0, 0, 0, 0.26);
          color: #f5f4f4;
          outline: none;
          transition: border-color 0.15s ease, box-shadow 0.15s ease, background 0.15s ease;
        }

        input::placeholder {
          color: rgba(245, 244, 244, 0.38);
        }

        input:focus {
          border-color: rgba(37, 195, 226, 0.9);
          box-shadow: 0 0 0 1px rgba(37, 195, 226, 0.28);
          background: rgba(0, 0, 0, 0.34);
        }

        .primaryBtn {
          margin-top: 8px;
          padding: 13px;
          border-radius: 14px;
          border: 1px solid rgba(37, 195, 226, 0.88);
          background: linear-gradient(
            180deg,
            rgba(37, 195, 226, 0.18),
            rgba(37, 195, 226, 0.11)
          );
          color: #25c3e2;
          font-weight: 700;
          letter-spacing: 0.02em;
          cursor: pointer;
          transition: transform 0.18s ease, background 0.18s ease, opacity 0.18s ease;
        }

        .primaryBtn:hover {
          transform: translateY(-1px);
          background: linear-gradient(
            180deg,
            rgba(37, 195, 226, 0.24),
            rgba(37, 195, 226, 0.14)
          );
        }

        .primaryBtn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        .errorBox {
          padding: 11px 12px;
          border-radius: 12px;
          background: rgba(255, 0, 0, 0.1);
          border: 1px solid rgba(255, 0, 0, 0.24);
          color: #ffd3d3;
          font-size: 13px;
          line-height: 1.5;
        }

        .help {
          margin-top: 6px;
          text-align: center;
          font-size: 13px;
          color: rgba(245, 244, 244, 0.74);
        }

        .help a {
          color: #25c3e2;
          text-decoration: none;
        }

        .help a:hover {
          text-decoration: underline;
        }

        @media (max-width: 640px) {
          .loginWrap {
            padding: 28px 16px;
          }

          .loginCard {
            padding: 24px 18px 20px;
            border-radius: 20px;
          }

          h1 {
            font-size: 26px;
          }

          .subtext {
            font-size: 13px;
          }

          .comingSoon {
            display: none;
          }
        }
      `}</style>
    </>
  )
}