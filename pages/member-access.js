// pages/member-access.js
import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

import JeevanChandimalNavi from '../components/jeevan-chandimal-navi'
import JeevanChandimalNewFooter from '../components/jeevan-chandimal-new-footer'

function normalizeEmail(v) {
  return String(v || '').trim().toLowerCase()
}

export default function MemberAccess() {
  const router = useRouter()
  const [loading, setLoading] = React.useState(true)
  const [status, setStatus] = React.useState({
    member: false,
    tier: null,
    term: null,
    ends_at: null,
  })
  const [email, setEmail] = React.useState('')
  const [error, setError] = React.useState('')

  React.useEffect(() => {
    let alive = true

    async function run() {
      try {
        setLoading(true)
        setError('')

        const saved =
          typeof window !== 'undefined' ? window.localStorage.getItem('user_email') : ''
        const clean = normalizeEmail(saved)
        setEmail(clean)

        if (!clean) {
          setStatus({ member: false, tier: null, term: null, ends_at: null })
          return
        }

        const r = await fetch(`/api/member/status?email=${encodeURIComponent(clean)}`, {
          headers: { 'Cache-Control': 'no-store' },
        })
        const j = await r.json().catch(() => null)

        if (!alive) return

        if (!r.ok || !j?.ok) {
          setError(j?.error || 'Failed to check membership status.')
          setStatus({ member: false, tier: null, term: null, ends_at: null })
          return
        }

        const isMember = Boolean(j.member)
        setStatus({
          member: isMember,
          tier: j.tier || null,
          term: j.term || null,
          ends_at: j.ends_at || null,
        })

        // ✅ if active member -> send them to Store for now
        if (isMember) {
          router.replace('/store')
        }
      } catch (e) {
        if (!alive) return
        setError(e?.message || 'Something went wrong.')
      } finally {
        if (!alive) return
        setLoading(false)
      }
    }

    run()
    return () => {
      alive = false
    }
  }, [router])

  const planLabel =
    status.tier && status.term ? `${status.tier.toUpperCase()} • ${status.term.toUpperCase()}` : null

  return (
    <>
      <Head>
        <title>Member Access — Jeevan Chandimal</title>
        <meta name="description" content="Access member downloads and archive." />
      </Head>

      <JeevanChandimalNavi />

      <main className="wrap">
        <div className="box">
          <h1 className="title">Member access</h1>

          {loading ? (
            <p className="sub">Checking your membership…</p>
          ) : error ? (
            <p className="sub error">{error}</p>
          ) : status.member ? (
            <p className="sub">Redirecting you to the archive…</p>
          ) : (
            <>
              <p className="sub">
                {email
                  ? `No active membership found for ${email}.`
                  : 'Please enter your email on the Membership page to continue.'}
              </p>

              {planLabel ? <p className="sub">Plan detected: {planLabel}</p> : null}

              <div className="actions">
                <Link href="/memberships" legacyBehavior>
                  <a className="btn primary">Go to Membership</a>
                </Link>
                <Link href="/store" legacyBehavior>
                  <a className="btn ghost">Browse Store</a>
                </Link>
              </div>
            </>
          )}
        </div>
      </main>

      <JeevanChandimalNewFooter />

      <style jsx>{`
        .wrap {
          max-width: 1100px;
          margin: 0 auto;
          padding: 60px 20px 90px;
        }
        .box {
          max-width: 760px;
          margin: 0 auto;
          text-align: center;
          border: 1px solid rgba(245, 244, 244, 0.14);
          background: rgba(255, 255, 255, 0.02);
          border-radius: 18px;
          padding: 34px 22px;
        }
        .title {
          margin: 0;
          font-size: 28px;
        }
        .sub {
          margin: 12px 0 0;
          opacity: 0.85;
          line-height: 1.6;
        }
        .error {
          color: #ffb3b3;
          opacity: 1;
        }
        .actions {
          margin-top: 18px;
          display: flex;
          gap: 10px;
          justify-content: center;
          flex-wrap: wrap;
        }
        .btn {
          text-decoration: none;
          padding: 12px 16px;
          border-radius: 999px;
          border: 1px solid rgba(245, 244, 244, 0.16);
          background: rgba(255, 255, 255, 0.02);
          color: inherit;
          font-weight: 800;
          font-size: 13px;
        }
        .btn:hover {
          border-color: rgba(245, 244, 244, 0.3);
          background: rgba(245, 244, 244, 0.06);
        }
        .primary {
          border-color: rgba(37, 195, 226, 0.55);
          background: rgba(37, 195, 226, 0.08);
        }
        .primary:hover {
          border-color: rgba(37, 195, 226, 0.85);
        }
      `}</style>
    </>
  )
}