// pages/store/[id].js
import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import JeevanChandimalNavi from '../../components/jeevan-chandimal-navi'
import JeevanChandimalNewFooter from '../../components/jeevan-chandimal-new-footer'

const PRICES = {
  LKR: {
    personal: { jpg: 2500, raw: 4000 },
    commercial: { jpg: 7500, raw: 10500 },
    editorial: { jpg: 4000, raw: 6000 },
  },
  USD: {
    personal: { jpg: 8, raw: 13 },
    commercial: { jpg: 25, raw: 35 },
    editorial: { jpg: 13, raw: 20 },
  },
}

function formatMoney(currency, amount) {
  if (currency === 'LKR') return `LKR ${Number(amount).toLocaleString('en-LK')}`
  return `$${Number(amount)}`
}

function isValidEmail(v) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v || '').trim())
}

export default function StoreDetail() {
  const router = useRouter()
  const id = typeof router.query.id === 'string' ? router.query.id : ''

  const [photo, setPhoto] = React.useState(null)
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState('')

  const [currency, setCurrency] = React.useState('LKR')
  const [license, setLicense] = React.useState('personal')
  const [format, setFormat] = React.useState('jpg')

  const [email, setEmail] = React.useState('')
  const [firstName, setFirstName] = React.useState('')
  const [lastName, setLastName] = React.useState('')
  const [isCheckingOut, setIsCheckingOut] = React.useState(false)

  const [variant, setVariant] = React.useState('standard')
  const [zoomOpen, setZoomOpen] = React.useState(false)

  const [similar, setSimilar] = React.useState([])
  const [recommended, setRecommended] = React.useState([])
  const [recLoading, setRecLoading] = React.useState(false)

  const previewSrc = photo?.id
    ? `/api/photo/${photo.id}/preview?variant=${variant}`
    : ''

  const firstTag = (photo?.tags || []).find(Boolean) || ''

  React.useEffect(() => {
    if (!id) return
    async function run() {
      try {
        setLoading(true)
        const r = await fetch(`/api/store/photo?id=${id}`)
        const data = await r.json()
        if (!data?.ok) throw new Error(data?.error || 'Failed')

        setPhoto({
  id: row.id,
  title: row.title || 'Untitled',
  description: row.description || '',
  tags: Array.isArray(row.tags) ? row.tags : [],
  thumbUrl: row.thumb_url,
  previewUrl: row.preview_url,
  createdAt: row.created_at,
})

      } catch (e) {
        setError('Failed to load photo')
      } finally {
        setLoading(false)
      }
    }
    run()
  }, [id])

  React.useEffect(() => {
    if (!photo?.id) return
    async function run() {
      setRecLoading(true)
      try {
        const s = await fetch(`/api/store/similar?id=${photo.id}&limit=6`).then((x) => x.json())
        const similarList = Array.isArray(s?.photos) ? s.photos : []
        setSimilar(similarList)

        const similarIds = similarList.map((p) => p.id).join(',')
        const r = await fetch(
          `/api/store/recommended?excludeId=${photo.id}&similarIds=${similarIds}&limit=6`
        ).then((x) => x.json())

        setRecommended(Array.isArray(r?.photos) ? r.photos : [])
      } catch {
        setSimilar([])
        setRecommended([])
      } finally {
        setRecLoading(false)
      }
    }
    run()
  }, [photo?.id])

  async function startCheckout() {
    if (!photo) return
    if (!isValidEmail(email)) {
      alert('Please enter a valid email')
      return
    }

    setIsCheckingOut(true)

    try {
      const r = await fetch('/api/payhere/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          photoId: photo.id,
          license,
          format,
          currency,
          email,
          firstName: firstName || 'Customer',
          lastName: lastName || 'Guest',
        }),
      })

      const data = await r.json()
      if (!data?.actionUrl) throw new Error('Checkout init failed')

      const form = document.createElement('form')
      form.method = 'POST'
      form.action = data.actionUrl

      Object.entries(data.fields).forEach(([k, v]) => {
        const input = document.createElement('input')
        input.type = 'hidden'
        input.name = k
        input.value = v
        form.appendChild(input)
      })

      document.body.appendChild(form)
      form.submit()
    } catch {
      alert('Checkout failed')
    } finally {
      setIsCheckingOut(false)
    }
  }

  const price = PRICES[currency][license][format]

  if (loading) return <div className="wrap">Loading…</div>
  if (error) return <div className="wrap">{error}</div>

  return (
    <>
      <Head>
        <title>{photo.title} | Store</title>
        <meta name="description" content={photo.description || 'Licensable photograph'} />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'ImageObject',
              contentUrl: previewSrc,
              name: photo.title,
              description: photo.description,
              creditText: 'Jeevan Chandimal',
              creator: { '@type': 'Person', name: 'Jeevan Chandimal' },
              license: `${process.env.NEXT_PUBLIC_SITE_URL}/license`,
              acquireLicensePage: `${process.env.NEXT_PUBLIC_SITE_URL}/store/${photo.id}`,
            }),
          }}
        />
      </Head>

      <JeevanChandimalNavi />

      <main className="wrap">
        <div className="layout">
          {/* IMAGE */}
          <section className="imageCard">
            <div className="imageFrame">
              <img src={previewSrc} alt={photo.title} />
              <div className={`wmTile wmTile-${variant}`} />
            </div>

            <div className="tags">
              {photo.tags.map((t) => (
                <Link key={t} href={`/store?tag=${t}`}>
                  <a className="tag">{t}</a>
                </Link>
              ))}
            </div>

            <div className="imgDetails">
              <div className="imgDesc">{photo.description}</div>
              <div className="imgMetaRow">
                <span>ID: {photo.id}</span>
                <span>•</span>
                <span>{new Date(photo.createdAt).toLocaleDateString()}</span>
                <span>•</span>
                <span>{photo.tags.length} tags</span>
              </div>
            </div>
          </section>

          {/* BUY CARD */}
          <aside className="buyCard">
            <h1>{photo.title}</h1>
            <p className="sub">Choose license + format</p>
            <p className="photoDesc">{photo.description}</p>

            <input
              className="field"
              placeholder="Email for receipt + download"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <div className="row2">
              <input
                className="field"
                placeholder="First name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <input
                className="field"
                placeholder="Last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            <div className="priceRow">
              <span className="price">{formatMoney(currency, price)}</span>
              <span className="small">Instant digital download</span>
            </div>

            <button className="buyBtn" onClick={startCheckout} disabled={isCheckingOut}>
              {isCheckingOut ? 'Working…' : 'Buy license'}
            </button>
          </aside>
        </div>

        {/* FULL WIDTH RELATED SECTIONS */}
        <section className="fullRel">
          {similar.length > 0 && (
            <div className="fullRelBlock">
              <h2>Similar images</h2>
              <div className="fullRelGrid">
                {similar.map((p) => (
                  <Link key={p.id} href={`/store/${p.id}`}>
                    <a className="fullRelCard">
                      <div className="relThumb">
                        <img src={p.thumb_url} alt={p.title} />
                        <div className="relWm" />
                      </div>
                      <div className="relName">{p.title}</div>
                    </a>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {recommended.length > 0 && (
            <div className="fullRelBlock">
              <h2>Recommended for you</h2>
              <div className="fullRelGrid">
                {recommended.map((p) => (
                  <Link key={p.id} href={`/store/${p.id}`}>
                    <a className="fullRelCard">
                      <div className="relThumb">
                        <img src={p.thumb_url} alt={p.title} />
                        <div className="relWm" />
                      </div>
                      <div className="relName">{p.title}</div>
                    </a>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {firstTag && similar.length > 0 && (
            <div className="fullRelBlock">
              <h2>More from #{firstTag}</h2>
              <div className="fullRelGrid">
                {similar.slice(0, 6).map((p) => (
                  <Link key={p.id} href={`/store/${p.id}`}>
                    <a className="fullRelCard">
                      <div className="relThumb">
                        <img src={p.thumb_url} alt={p.title} />
                        <div className="relWm" />
                      </div>
                      <div className="relName">{p.title}</div>
                    </a>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="fullRelBlock">
            <h2>Curated collections</h2>
            <div className="chipRow">
              {['Nature', 'Portrait', 'Wildlife', 'Travel', 'Night', 'Macro'].map((c) => (
                <Link key={c} href={`/store?tag=${c}`}>
                  <a className="chip">📁 {c}</a>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <JeevanChandimalNewFooter />
    </>
  )
}
