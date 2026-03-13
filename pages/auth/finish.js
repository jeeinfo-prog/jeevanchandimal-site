// pages/auth/finish.js
import { useEffect, useMemo, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'

const STORAGE_MEMBER_TOKEN_KEY = 'jc_member_token'

function cleanNext(value) {
  const v = String(value || '').trim()
  if (!v.startsWith('/')) return '/store'
  return v
}

export default function AuthFinishPage() {
  const router = useRouter()
  const [error, setError] = useState('')

  const data = useMemo(() => {
    const q = router.query || {}

    return {
      token: typeof q.token === 'string' ? q.token.trim() : '',
      email: typeof q.email === 'string' ? q.email.trim().toLowerCase() : '',
      next: cleanNext(typeof q.next === 'string' ? q.next : '/store'),
      remaining:
        typeof q.remaining === 'string' || typeof q.remaining === 'number'
          ? String(q.remaining).trim()
          : '',
    }
  }, [router.query])

  useEffect(() => {
    if (!router.isReady) return

    if (!data.token) {
      setError('Missing login token')
      return
    }

    try {
      if (typeof window === 'undefined') return

      window.localStorage.setItem(STORAGE_MEMBER_TOKEN_KEY, data.token)

      if (data.email) {
        window.localStorage.setItem('user_email', data.email)
      }

      if (data.remaining) {
        window.localStorage.setItem('member_remaining', data.remaining)
      } else {
        window.localStorage.removeItem('member_remaining')
      }

      window.dispatchEvent(new Event('jc_member_updated'))

      router.replace(data.next).catch((err) => {
        console.error(err)
        setError('Could not finish sign-in')
      })
    } catch (err) {
      console.error(err)
      setError('Could not finish sign-in')
    }
  }, [router.isReady, data.token, data.email, data.remaining, data.next, router])

  return (
    <>
      <Head>
        <title>Signing in – Jeevan Chandimal</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="noindex,nofollow" />
      </Head>

      <main style={wrapStyle}>
        <div style={cardStyle}>
          <h1 style={titleStyle}>{error ? 'Sign-in error' : 'Signing you in...'}</h1>
          <p style={textStyle}>
            {error || 'Please wait while we finish your Google sign-in.'}
          </p>
        </div>
      </main>
    </>
  )
}

const wrapStyle = {
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '24px',
  background:
    'radial-gradient(circle at top, rgba(37, 195, 226, 0.08), transparent 30%), #0a0a0a',
}

const cardStyle = {
  width: '100%',
  maxWidth: '420px',
  borderRadius: '18px',
  border: '1px solid rgba(255,255,255,0.08)',
  background: 'rgba(255,255,255,0.03)',
  padding: '28px',
  textAlign: 'center',
  color: '#f5f4f4',
  boxShadow: '0 24px 80px rgba(0,0,0,0.34)',
  backdropFilter: 'blur(10px)',
}

const titleStyle = {
  margin: '0 0 10px',
  fontSize: '24px',
  lineHeight: 1.2,
}

const textStyle = {
  margin: 0,
  opacity: 0.82,
  lineHeight: 1.6,
}