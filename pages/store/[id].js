// pages/store/[id].js
import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

import JeevanChandimalNavi from '../../components/layout/jeevan-chandimal-navi'
import JeevanChandimalNewFooter from '../../components/layout/jeevan-chandimal-new-footer'

import { addToCart } from '../../lib/cart'

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

/* ================== storage ================== */
const STORAGE_CCY_KEY = 'jc_currency_v1'
const STORAGE_FX_LOCK_KEY = 'jc_fx_lock_v1'
const STORAGE_MEMBER_TOKEN_KEY = 'jc_member_token'
const STORAGE_MEMBER_DEVICE_KEY = 'jc_member_device_id'
const DEFAULT_CURRENCY = 'USD'

function safeJsonParse(v, fallback) {
  try {
    return JSON.parse(v)
  } catch {
    return fallback
  }
}

function round2(n) {
  const x = Number(n || 0)
  return Math.round(x * 100) / 100
}

function readCurrency() {
  if (typeof window === 'undefined') return DEFAULT_CURRENCY
  const raw = window.localStorage.getItem(STORAGE_CCY_KEY)
  const c = String(raw || '').trim().toUpperCase()
  return c === 'LKR' ? 'LKR' : 'USD'
}

function writeCurrency(ccy) {
  if (typeof window === 'undefined') return
  const c = String(ccy || '').trim().toUpperCase() === 'LKR' ? 'LKR' : 'USD'
  window.localStorage.setItem(STORAGE_CCY_KEY, c)
}

function readUsdLkrRate() {
  if (typeof window === 'undefined') return null
  const raw = window.localStorage.getItem(STORAGE_FX_LOCK_KEY)
  const lock = safeJsonParse(raw, null)
  const v = lock?.usdLkr ?? lock?.rate ?? lock?.usd_lkr ?? null
  const n = Number(v)
  if (!Number.isFinite(n) || n <= 0) return null
  return n
}

function getOrCreateDeviceId() {
  if (typeof window === 'undefined') return ''

  let deviceId = String(window.localStorage.getItem(STORAGE_MEMBER_DEVICE_KEY) || '').trim()
  if (deviceId && deviceId.length >= 8) return deviceId

  deviceId = `${Date.now()}_${Math.random().toString(36).slice(2, 12)}`
  window.localStorage.setItem(STORAGE_MEMBER_DEVICE_KEY, deviceId)
  return deviceId
}

function readMemberToken() {
  if (typeof window === 'undefined') return ''
  return String(window.localStorage.getItem(STORAGE_MEMBER_TOKEN_KEY) || '').trim()
}

function writeMemberToken(token) {
  if (typeof window === 'undefined') return
  if (!token) {
    window.localStorage.removeItem(STORAGE_MEMBER_TOKEN_KEY)
    return
  }
  window.localStorage.setItem(STORAGE_MEMBER_TOKEN_KEY, String(token))
}

function getUnitPrice({ currency, license, format, usdLkrRate }) {
  const ccy = String(currency || '').toUpperCase() === 'LKR' ? 'LKR' : 'USD'
  const lic = String(license || '').trim().toLowerCase()
  const fmt = String(format || '').trim().toLowerCase()

  const baseUsd = PRICES?.USD?.[lic]?.[fmt] != null ? Number(PRICES.USD[lic][fmt]) : 0
  if (ccy === 'USD') return baseUsd

  if (usdLkrRate != null && Number.isFinite(Number(usdLkrRate)) && Number(usdLkrRate) > 0) {
    return round2(baseUsd * Number(usdLkrRate))
  }

  const fallbackLkr = PRICES?.LKR?.[lic]?.[fmt] != null ? Number(PRICES.LKR[lic][fmt]) : 0
  return fallbackLkr
}

function formatMoney(currency, amount) {
  const n = Number(amount || 0)
  if (currency === 'LKR') return `LKR ${Math.round(n).toLocaleString('en-LK')}`
  return `$${n}`
}

function isValidEmail(v) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v || '').trim())
}

function clamp(n, a, b) {
  return Math.max(a, Math.min(b, n))
}

function formatExifDate(exifDate) {
  const s = String(exifDate || '').trim()
  if (!s) return ''
  const isoish = s.replace(/^(\d{4}):(\d{2}):(\d{2})/, '$1-$2-$3')
  const d = new Date(isoish)
  if (String(d) === 'Invalid Date') return s
  return d.toLocaleString()
}

function estimateJpgSizeMB(width, height) {
  if (!width || !height) return null
  const bytes = width * height * 0.35
  return (bytes / (1024 * 1024)).toFixed(1)
}

function estimateRawSizeMB(width, height) {
  if (!width || !height) return null
  const bytes = width * height * 2
  return (bytes / (1024 * 1024)).toFixed(1)
}

function buildContentLocation(location) {
  const loc = String(location || '').trim()
  if (!loc) {
    return {
      '@type': 'Place',
      name: 'Sri Lanka',
      address: { '@type': 'PostalAddress', addressCountry: 'Sri Lanka' },
    }
  }

  const parts = loc.split(',').map((s) => s.trim()).filter(Boolean)
  const locality = parts[0] || undefined
  const country = parts[1] || 'Sri Lanka'

  return {
    '@type': 'Place',
    name: loc,
    address: {
      '@type': 'PostalAddress',
      addressLocality: locality,
      addressCountry: country,
    },
  }
}

function cleanDisplayTitle(title, tags = []) {
  const raw = String(title || '').trim()
  if (!raw) return 'Untitled'

  const words = raw.split(/\s+/).filter(Boolean)
  if (words.length <= 1) return raw

  const firstWord = String(words[0] || '').toLowerCase()
  const normalizedTags = Array.isArray(tags)
    ? tags.map((t) => String(t || '').toLowerCase())
    : []

  const collectionWords = new Set([
    'history',
    'travel',
    'nature',
    'wildlife',
    'landscape',
    'culture',
    'lifestyle',
    'fineart',
  ])

  if (collectionWords.has(firstWord) || normalizedTags.includes(firstWord)) {
    return words.slice(1).join(' ').trim() || raw
  }

  return raw
}

function normalizePhotoPayload(payload) {
  const row = payload?.photo || payload
  if (!row) return null

  const cleanedThumb = String(row.thumb_url || row.thumbUrl || '').trim()
  const cleanedPreview = String(row.preview_url || row.previewUrl || '').trim()

  const rawAvailable =
    row.rawAvailable === false
      ? false
      : Boolean(row.raw_available) ||
        Boolean(row.has_raw) ||
        Boolean(row.hasRaw) ||
        Boolean(row.rawUrl) ||
        Boolean(row.raw_url) ||
        Boolean(row.raw_key) ||
        Boolean(row.rawKey) ||
        (Array.isArray(row.formats) && row.formats.includes('raw')) ||
        (Array.isArray(row.available_formats) && row.available_formats.includes('raw'))

  const tags = Array.isArray(row.tags) ? row.tags : []
  const cleanedTitle = cleanDisplayTitle(row.title || 'Untitled', tags)

  return {
    id: row.id,
    title: cleanedTitle,
    description: row.description || '',
    tags,
    thumbUrl: cleanedThumb || '',
    previewUrl: cleanedPreview || '',
    createdAt: row.created_at || row.createdAt || null,
    location: row.location || 'Sri Lanka',
    exif: row.exif || null,
    rawAvailable,
  }
}

async function safeJson(resp) {
  const text = await resp.text()
  try {
    return { json: JSON.parse(text), text }
  } catch {
    return { json: null, text }
  }
}

export default function StoreDetail({ initialPhoto = null, initialError = '' }) {
  const router = useRouter()
  const id = typeof router.query.id === 'string' ? router.query.id : ''

  const [loading, setLoading] = React.useState(!initialPhoto && !initialError)
  const [error, setError] = React.useState(initialError || '')
  const [photo, setPhoto] = React.useState(initialPhoto)

  const [currency, setCurrency] = React.useState(DEFAULT_CURRENCY)
  const [usdLkrRate, setUsdLkrRate] = React.useState(null)

  const [license, setLicense] = React.useState('personal')
  const [format, setFormat] = React.useState('jpg')
  const [isCheckingOut, setIsCheckingOut] = React.useState(false)

  const [variant] = React.useState('standard')
  const [naturalDims, setNaturalDims] = React.useState({ w: null, h: null })

  const [wmOn, setWmOn] = React.useState(true)
  const [wmOpacity, setWmOpacity] = React.useState(0.08)

  const [zoomOpen, setZoomOpen] = React.useState(false)
  const [zoom, setZoom] = React.useState(1)
  const [pan, setPan] = React.useState({ x: 0, y: 0 })
  const [isPanning, setIsPanning] = React.useState(false)
  const panStart = React.useRef({ x: 0, y: 0 })
  const panOrigin = React.useRef({ x: 0, y: 0 })

  const activePointerId = React.useRef(null)

  function onPointerDownPan(e) {
    if (e.pointerType === 'mouse' && e.button !== 0) return

    e.preventDefault()
    setIsPanning(true)
    activePointerId.current = e.pointerId

    try {
      e.currentTarget.setPointerCapture(e.pointerId)
    } catch {}

    panStart.current = { x: e.clientX, y: e.clientY }
    panOrigin.current = { x: pan.x, y: pan.y }
  }

  function onPointerMovePan(e) {
    if (!isPanning) return
    if (activePointerId.current != null && e.pointerId !== activePointerId.current) return

    e.preventDefault()
    const dx = e.clientX - panStart.current.x
    const dy = e.clientY - panStart.current.y
    setPan({ x: panOrigin.current.x + dx, y: panOrigin.current.y + dy })
  }

  function endPointerPan(e) {
    if (activePointerId.current != null && e.pointerId !== activePointerId.current) return
    setIsPanning(false)
    activePointerId.current = null
  }

  const [email, setEmail] = React.useState('')
  const [firstName, setFirstName] = React.useState('')
  const [lastName, setLastName] = React.useState('')
  const [agreed, setAgreed] = React.useState(false)

  const [similar, setSimilar] = React.useState([])
  const [recommended, setRecommended] = React.useState([])
  const [relLoading, setRelLoading] = React.useState(false)

  const [memberLoading, setMemberLoading] = React.useState(false)
  const [isMember, setIsMember] = React.useState(false)
  const [memberPlan, setMemberPlan] = React.useState(null)

  const [cartQty, setCartQty] = React.useState(1)
  const [cartMsg, setCartMsg] = React.useState('')

  React.useEffect(() => {
    if (typeof window === 'undefined') return
    const c = readCurrency()
    setCurrency(c)
    writeCurrency(c)
    setUsdLkrRate(readUsdLkrRate())
  }, [])

  const previewSrc = photo?.id
    ? `/api/photo/${encodeURIComponent(photo.id)}/preview?variant=${encodeURIComponent(variant)}`
    : ''

  const displaySrc = previewSrc || photo?.previewUrl || photo?.thumbUrl || ''
  const firstTag = (photo?.tags || []).find(Boolean) || ''
  const rawAvailable = photo?.rawAvailable !== false

  React.useEffect(() => {
    if (photo && rawAvailable === false && format === 'raw') setFormat('jpg')
  }, [photo, rawAvailable, format])

  React.useEffect(() => {
    if (typeof window === 'undefined') return
    try {
      const saved = window.localStorage.getItem('user_email')
      if (saved) setEmail(String(saved).trim().toLowerCase())
    } catch {}
  }, [])

  function preventSave(e) {
    e.preventDefault()
    e.stopPropagation()
  }

  function openZoom() {
    setZoomOpen(true)
    setZoom(1)
    setPan({ x: 0, y: 0 })
  }

  function closeZoom() {
    setZoomOpen(false)
    setIsPanning(false)
  }

  function onWheelZoom(e) {
    e.preventDefault()
    const delta = e.deltaY > 0 ? -0.08 : 0.08
    setZoom((z) => clamp(Number((z + delta).toFixed(2)), 1, 3))
  }

  React.useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') closeZoom()
    }
    if (zoomOpen) window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [zoomOpen])

  React.useEffect(() => {
    if (!router.isReady || !id) return
    if (photo?.id && photo.id === id) return

    let alive = true

    async function run() {
      try {
        setLoading(true)
        setError('')
        setPhoto(null)

        const r = await fetch(`/api/store/photo?id=${encodeURIComponent(id)}`, {
          headers: { 'Cache-Control': 'no-store' },
        })
        const { json, text } = await safeJson(r)
        if (!alive) return

        if (!r.ok || !json?.ok) {
          setError(json?.error || text || 'Failed to load photo')
          setLoading(false)
          return
        }

        const normalized = normalizePhotoPayload(json)
        if (!normalized?.id) {
          setError(json?.error || text || 'Failed to load photo')
          setLoading(false)
          return
        }

        setPhoto(normalized)
        setLoading(false)
      } catch {
        if (!alive) return
        setError('Failed to load photo')
        setLoading(false)
      }
    }

    run()
    return () => {
      alive = false
    }
  }, [router.isReady, id, photo?.id])

  React.useEffect(() => {
    if (!photo?.id) return

    const hasW = Number(
      photo?.exif?.width || photo?.exif?.ExifImageWidth || photo?.exif?.PixelXDimension
    )
    const hasH = Number(
      photo?.exif?.height || photo?.exif?.ExifImageHeight || photo?.exif?.PixelYDimension
    )
    const hasBytes =
      typeof photo?.exif?.bytes === 'number' || typeof photo?.exif?.size === 'number'
    if (photo?.exif && hasW && hasH && hasBytes) return

    let alive = true
    async function loadExif() {
      try {
        const r = await fetch(`/api/photo/${encodeURIComponent(photo.id)}/exif`, {
          headers: { 'Cache-Control': 'no-store' },
        })
        const j = await r.json().catch(() => null)
        if (!alive) return
        if (!j?.ok || !j?.exif) return

        const mapped = {
          make: j.exif?.make || j.exif?.Make || null,
          model: j.exif?.model || j.exif?.Model || null,
          lensModel: j.exif?.lensModel || j.exif?.LensModel || null,
          settingsLine: j.exif?.settingsLine || null,
          dateTimeOriginal: j.exif?.dateTimeOriginal || j.exif?.DateTimeOriginal || null,
          width:
            j.exif?.width ||
            j.exif?.ImageWidth ||
            j.exif?.PixelXDimension ||
            j.exif?.ExifImageWidth ||
            null,
          height:
            j.exif?.height ||
            j.exif?.ImageHeight ||
            j.exif?.PixelYDimension ||
            j.exif?.ExifImageHeight ||
            null,
          bytes: typeof j.size === 'number' ? j.size : null,
        }

        setPhoto((p) => ({ ...p, exif: { ...(p?.exif || {}), ...mapped } }))
      } catch {}
    }

    loadExif()
    return () => {
      alive = false
    }
  }, [photo?.id])

  React.useEffect(() => {
    if (!photo?.id) return

    let alive = true
    async function loadRelated() {
      try {
        setRelLoading(true)

        const sResp = await fetch(`/api/store/similar?id=${encodeURIComponent(photo.id)}&limit=6`, {
          headers: { 'Cache-Control': 'no-store' },
        })
        const s = await sResp.json().catch(() => ({}))
        const similarList = Array.isArray(s?.photos) ? s.photos : []
        if (!alive) return
        setSimilar(similarList)

        const similarIds = similarList.map((p) => p.id).filter(Boolean).join(',')
        const rResp = await fetch(
          `/api/store/recommended?excludeId=${encodeURIComponent(
            photo.id
          )}&similarIds=${encodeURIComponent(similarIds)}&limit=6`,
          { headers: { 'Cache-Control': 'no-store' } }
        )
        const r = await rResp.json().catch(() => ({}))
        if (!alive) return
        setRecommended(Array.isArray(r?.photos) ? r.photos : [])
      } catch {
        if (!alive) return
        setSimilar([])
        setRecommended([])
      } finally {
        if (!alive) return
        setRelLoading(false)
      }
    }

    loadRelated()
    return () => {
      alive = false
    }
  }, [photo?.id])

  function validEmailQuick(v) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v || '').trim())
  }

  React.useEffect(() => {
    const em = String(email || '').trim().toLowerCase()

    if (!validEmailQuick(em)) {
      setIsMember(false)
      setMemberPlan(null)
      setMemberLoading(false)
      return
    }

    let alive = true

    async function bootstrapAndCheckMember() {
      try {
        setMemberLoading(true)

        const deviceId = getOrCreateDeviceId()
        let token = readMemberToken()

        async function fetchStatus(activeToken) {
          const r = await fetch(`/api/member/status?email=${encodeURIComponent(em)}`, {
            headers: {
              Authorization: `Bearer ${activeToken}`,
              'Cache-Control': 'no-store',
            },
          })
          const j = await r.json().catch(() => null)
          return { r, j }
        }

        if (token) {
          const { r, j } = await fetchStatus(token)
          if (!alive) return

          if (r.ok && j?.ok) {
            const active = Boolean(j.member)
            setIsMember(active)
            setMemberPlan(active ? j?.tier || null : null)
            return
          }

          writeMemberToken('')
          token = ''
        }

        const sessionRes = await fetch('/api/member/session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: em,
            deviceId,
          }),
        })

        const sessionJson = await sessionRes.json().catch(() => null)
        if (!alive) return

        if (!sessionRes.ok || !sessionJson?.ok || !sessionJson?.token) {
          setIsMember(false)
          setMemberPlan(null)
          return
        }

        token = String(sessionJson.token)
        writeMemberToken(token)

        const { r, j } = await fetchStatus(token)
        if (!alive) return

        if (!r.ok || !j?.ok) {
          setIsMember(false)
          setMemberPlan(null)
          return
        }

        const active = Boolean(j.member)
        setIsMember(active)
        setMemberPlan(active ? j?.tier || null : null)
      } catch {
        if (!alive) return
        setIsMember(false)
        setMemberPlan(null)
      } finally {
        if (!alive) return
        setMemberLoading(false)
      }
    }

    bootstrapAndCheckMember()

    return () => {
      alive = false
    }
  }, [email])

  async function downloadAsMember() {
    if (!photo?.id) return

    const em = String(email || '').trim().toLowerCase()
    if (!validEmailQuick(em)) {
      alert('Enter your membership email first.')
      return
    }

    try {
      setIsCheckingOut(true)

      let token = readMemberToken()
      const deviceId = getOrCreateDeviceId()

      if (!token) {
        const sessionRes = await fetch('/api/member/session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: em,
            deviceId,
          }),
        })

        const sessionJson = await sessionRes.json().catch(() => null)

        if (!sessionRes.ok || !sessionJson?.ok || !sessionJson?.token) {
          alert(sessionJson?.error || 'Please sign in to continue.')
          return
        }

        token = String(sessionJson.token)
        writeMemberToken(token)
      }

      const r = await fetch('/api/member/download', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          photoId: photo.id,
          email: em,
          format,
        }),
      })

      const j = await r.json().catch(() => null)

      if (!r.ok || !j?.ok || !j?.url) {
        alert(j?.error || 'Member download failed')
        return
      }

      window.location.href = j.url
    } catch (e) {
      console.error(e)
      alert('Member download failed')
    } finally {
      setIsCheckingOut(false)
    }
  }

  async function startCheckout() {
    if (!photo) return

    if (format === 'raw' && rawAvailable === false) {
      alert('RAW is not available for this image. Please choose JPG.')
      return
    }

    const em = String(email || '').trim().toLowerCase()
    if (!isValidEmail(em)) {
      alert('Please enter a valid email for receipt + download link.')
      return
    }

    if (!agreed) {
      alert('Please agree to the Terms / Refund / Privacy Policy to continue.')
      return
    }

    try {
      setIsCheckingOut(true)

      const r = await fetch('/api/payhere/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          photoId: photo.id,
          license,
          format,
          currency,
          email: em,
          firstName: (firstName || 'Customer').trim(),
          lastName: (lastName || 'Guest').trim(),
          phone: '0000000000',
          address: 'N/A',
          city: 'N/A',
          country: 'Sri Lanka',
        }),
      })

      const data = await r.json().catch(() => null)
      if (!r.ok || !data?.actionUrl || !data?.fields) {
        alert(data?.error || 'Checkout init failed')
        return
      }

      const oid = String(data?.orderId || data?.order_id || data?.fields?.order_id || '').trim()
      if (oid) {
        try {
          localStorage.setItem('last_order_id', oid)
        } catch {}
      }

      const form = document.createElement('form')
      form.method = 'POST'
      form.action = String(data.actionUrl)

      Object.entries(data.fields).forEach(([k, v]) => {
        const input = document.createElement('input')
        input.type = 'hidden'
        input.name = k
        input.value = String(v ?? '')
        form.appendChild(input)
      })

      document.body.appendChild(form)
      form.submit()
    } catch (e) {
      console.error(e)
      alert('Checkout failed')
    } finally {
      setIsCheckingOut(false)
    }
  }

  function addCurrentToCart() {
    if (!photo?.id) return

    if (format === 'raw' && rawAvailable === false) {
      alert('RAW is not available for this image. Please choose JPG.')
      return
    }

    const unitPrice = getUnitPrice({ currency, license, format, usdLkrRate })
    if (!unitPrice || Number(unitPrice) <= 0) {
      alert('Price not available.')
      return
    }

    const qty = clamp(Number(cartQty || 1), 1, 99)

    addToCart({
      photoId: photo.id,
      title: photo.title || 'Untitled',
      thumbUrl: String(photo.thumbUrl || photo.previewUrl || '').trim(),
      license,
      format,
      currency,
      unitPrice: Number(unitPrice),
      qty,
    })

    try {
      window.dispatchEvent(new Event('jc_cart_updated'))
    } catch {}

    setCartMsg('Added to cart ✅')
    setTimeout(() => setCartMsg(''), 1200)
  }

  const SITE_URL = 'https://jeevanchandimal.com'
  const canonicalId = photo?.id || id
  const canonicalUrl = `${SITE_URL}/store/${encodeURIComponent(canonicalId || '')}`

  const licenseUrl = `${SITE_URL}/terms-and-conditions`
  const acquireLicensePage = canonicalUrl

  const absolutePreviewForBots = canonicalId
    ? `${SITE_URL}/api/photo/${encodeURIComponent(canonicalId)}/preview?variant=${encodeURIComponent(
        variant
      )}`
    : ''

  const ogImageFromDb = String(photo?.previewUrl || photo?.thumbUrl || '').trim()
  const ogImage = ogImageFromDb || absolutePreviewForBots

  const ogRaw = ogImage || ''
  const ogAbs =
    ogRaw && /^https?:\/\//i.test(ogRaw)
      ? ogRaw
      : ogRaw
      ? `${SITE_URL}${ogRaw.startsWith('/') ? '' : '/'}${ogRaw}`
      : ''

  const thumbRaw = String(photo?.thumbUrl || '').trim()
  const thumbAbs =
    thumbRaw && /^https?:\/\//i.test(thumbRaw)
      ? thumbRaw
      : thumbRaw
      ? `${SITE_URL}${thumbRaw.startsWith('/') ? '' : '/'}${thumbRaw}`
      : ogAbs

  const exifW =
    Number(
      photo?.exif?.width ||
        photo?.exif?.ImageWidth ||
        photo?.exif?.PixelXDimension ||
        photo?.exif?.ExifImageWidth
    ) || null

  const exifH =
    Number(
      photo?.exif?.height ||
        photo?.exif?.ImageHeight ||
        photo?.exif?.PixelYDimension ||
        photo?.exif?.ExifImageHeight
    ) || null

  const finalW = exifW || naturalDims.w || null
  const finalH = exifH || naturalDims.h || null
  const imgW = finalW
  const imgH = finalH

  const resolution = finalW && finalH ? `${finalW}×${finalH}` : null

  const exactJpgMB =
    typeof photo?.exif?.bytes === 'number'
      ? (photo.exif.bytes / (1024 * 1024)).toFixed(1)
      : null

  const jpgSizeMB = estimateJpgSizeMB(finalW, finalH)
  const rawSizeMB = estimateRawSizeMB(finalW, finalH)

  const imageObjectJsonLd =
    photo && ogAbs
      ? {
          '@context': 'https://schema.org',
          '@type': 'ImageObject',
          '@id': `${canonicalUrl}#image`,
          mainEntityOfPage: canonicalUrl,
          contentUrl: ogAbs,
          url: ogAbs,
          thumbnailUrl: thumbAbs || ogAbs,
          name: photo.title,
          description:
            photo.description || `${photo.title} – Sri Lanka photography by Jeevan Chandimal`,
          keywords: Array.isArray(photo.tags) ? photo.tags.join(', ') : undefined,
          creator: { '@type': 'Person', name: 'Jeevan Chandimal', url: SITE_URL },
          copyrightHolder: { '@type': 'Person', name: 'Jeevan Chandimal' },
          creditText: 'Jeevan Chandimal',
          copyrightNotice: '© Jeevan Chandimal',
          license: licenseUrl,
          acquireLicensePage,
          isAccessibleForFree: false,
          width: imgW || undefined,
          height: imgH || undefined,
          contentLocation: buildContentLocation(photo.location),
        }
      : null

  const price = getUnitPrice({ currency, license, format, usdLkrRate })

  return (
    <>
      <Head>
        <title>
          {photo?.title
            ? `${photo.title} | Photograph by Jeevan Chandimal`
            : 'Photo | Jeevan Chandimal'}
        </title>

        <meta
          name="description"
          content={
            photo?.description ||
            `${photo?.title || 'Photograph'} – premium Sri Lanka photography by Jeevan Chandimal. Available for licensing.`
          }
        />

        <meta property="og:title" content={photo?.title || 'Photograph'} />
        <meta
          property="og:description"
          content={
            photo?.description ||
            `Professional photography by Jeevan Chandimal. License this image for commercial, editorial, or personal use.`
          }
        />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="article" />
        {ogAbs ? <meta property="og:image" content={ogAbs} /> : null}
        {ogAbs && imgW ? <meta property="og:image:width" content={String(imgW)} /> : null}
        {ogAbs && imgH ? <meta property="og:image:height" content={String(imgH)} /> : null}

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={photo?.title || 'Photograph'} />
        <meta
          name="twitter:description"
          content={
            photo?.description ||
            `Professional photography by Jeevan Chandimal. License this image for commercial, editorial, or personal use.`
          }
        />
        {ogAbs ? <meta name="twitter:image" content={ogAbs} /> : null}

        <link rel="canonical" href={canonicalUrl} />
        {photo?.id && previewSrc ? <link rel="preload" as="image" href={previewSrc} /> : null}

        {imageObjectJsonLd ? (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(imageObjectJsonLd) }}
          />
        ) : null}
      </Head>

      <JeevanChandimalNavi />

      <main className="wrap">
        <div className="top">
          <Link href="/store" legacyBehavior>
            <a className="back">← Back to store</a>
          </Link>

          <div className="toggle" role="group" aria-label="Currency toggle">
            <button
              type="button"
              className={`tbtn ${currency === 'LKR' ? 'active' : ''}`}
              onClick={() => {
                setCurrency('LKR')
                writeCurrency('LKR')
              }}
            >
              LKR
            </button>
            <button
              type="button"
              className={`tbtn ${currency === 'USD' ? 'active' : ''}`}
              onClick={() => {
                setCurrency('USD')
                writeCurrency('USD')
              }}
            >
              USD
            </button>
          </div>
        </div>

        {loading && <div className="state">Loading…</div>}
        {!loading && error && <div className="state">❌ {error}</div>}

        {!loading && !error && photo && (
          <>
            <div className="layout">
              <section className="imageCard">
                <div className="imageFrame" onContextMenu={preventSave}>
                  <button type="button" className="zoomBtn" onClick={openZoom}>
                    Zoom
                  </button>

                  <div
                    className="imgBg"
                    role="img"
                    aria-label={photo.title}
                    onClick={openZoom}
                    onContextMenu={preventSave}
                    style={{
                      backgroundImage: displaySrc ? `url('${displaySrc}')` : 'none',
                      aspectRatio: finalW && finalH ? `${finalW} / ${finalH}` : '4 / 3',
                    }}
                  />

                  <img
                    className="mainImg"
                    src={displaySrc}
                    alt={photo.title}
                    draggable={false}
                    onClick={openZoom}
                    onContextMenu={preventSave}
                    onDragStart={preventSave}
                    loading="eager"
                    onLoad={(e) => {
                      const w = e.currentTarget.naturalWidth
                      const h = e.currentTarget.naturalHeight
                      if (w && h) setNaturalDims({ w, h })
                    }}
                    onError={(e) => {
                      if (photo.previewUrl && e.currentTarget.src !== photo.previewUrl) {
                        e.currentTarget.src = photo.previewUrl
                        return
                      }
                      if (photo.thumbUrl) e.currentTarget.src = photo.thumbUrl
                    }}
                    style={{
                      userSelect: 'none',
                      WebkitUserSelect: 'none',
                      WebkitTouchCallout: 'none',
                      WebkitUserDrag: 'none',
                      touchAction: 'manipulation',
                    }}
                  />

                  {wmOn && <div className="wmTile" style={{ opacity: wmOpacity }} />}
                </div>

                <p className="desc">
                  {photo.description ||
                    'Premium preview with watermark. Final download is delivered clean after payment.'}
                </p>

                <div className="metaCard">
                  <div className="metaRow">
                    <div className="metaTitle">Watermark</div>
                    <div className="metaCell">
                      <div className="wmControls">
                        <button
                          type="button"
                          className={`miniBtn ${wmOn ? 'active' : ''}`}
                          onClick={() => setWmOn(true)}
                        >
                          On
                        </button>
                        <button
                          type="button"
                          className={`miniBtn ${!wmOn ? 'active' : ''}`}
                          onClick={() => setWmOn(false)}
                        >
                          Off
                        </button>
                      </div>
                    </div>
                    <div />
                  </div>

                  <div className="metaRow">
                    <div className="metaTitle">Strength</div>
                    <div className="metaCell">
                      <input
                        type="range"
                        min="0.02"
                        max="0.18"
                        step="0.01"
                        value={wmOpacity}
                        onChange={(e) => setWmOpacity(Number(e.target.value))}
                        className="range"
                        disabled={!wmOn}
                      />
                    </div>
                    <div className="rangeVal">{Math.round(wmOpacity * 100)}%</div>
                  </div>

                  <div className="metaRow metaRowTall">
                    <div className="metaTitle">Photo details</div>
                    <div className="metaText">
                      <div>
                        <strong>ID:</strong> {photo.id}
                      </div>

                      {photo.createdAt ? (
                        <div>
                          <strong>Date:</strong> {new Date(photo.createdAt).toLocaleDateString()}
                        </div>
                      ) : null}

                      {photo.exif?.lensModel ? (
                        <div>
                          <strong>Lens:</strong> {photo.exif.lensModel}
                        </div>
                      ) : null}

                      {photo.exif?.settingsLine ? (
                        <div>
                          <strong>Settings:</strong> {photo.exif.settingsLine}
                        </div>
                      ) : null}

                      {photo.exif?.dateTimeOriginal ? (
                        <div>
                          <strong>Taken:</strong> {formatExifDate(photo.exif.dateTimeOriginal)}
                        </div>
                      ) : null}

                      <div>
                        <strong>Preview:</strong> Watermarked
                      </div>
                      <div>
                        <strong>Delivery:</strong> Clean file after payment
                      </div>
                    </div>
                    <div />
                  </div>

                  <div className="metaRow metaRowTall">
                    <div className="metaTitle">Tags</div>
                    <div className="metaText">
                      {Array.isArray(photo.tags) && photo.tags.length > 0 ? (
                        <div className="tagRow">
                          {photo.tags.slice(0, 14).map((t) => (
                            <Link
                              key={t}
                              href={`/store?tag=${encodeURIComponent(t)}`}
                              legacyBehavior
                            >
                              <a className="tag">#{t}</a>
                            </Link>
                          ))}
                        </div>
                      ) : (
                        <div style={{ opacity: 0.75 }}>No tags</div>
                      )}
                    </div>
                    <div />
                  </div>

                  <div className="metaRow metaRowTall">
                    <div className="metaTitle">Description</div>
                    <div className="metaText">
                      {photo.description ? (
                        photo.description
                      ) : (
                        <span style={{ opacity: 0.75 }}>No description added yet.</span>
                      )}
                    </div>
                    <div />
                  </div>
                </div>
              </section>

              <aside className="buyCard">
                <h1 className="title">{photo.title}</h1>
                <div className="badgeRow">
                  {photo?.location ? <span className="badge">📍 {photo.location}</span> : null}

                  {photo?.exif?.make || photo?.exif?.model ? (
                    <span className="badge">
                      📷 {[photo.exif?.make, photo.exif?.model].filter(Boolean).join(' ')}
                    </span>
                  ) : null}

                  {resolution ? <span className="badge">🖼️ {resolution}</span> : null}

                  {format === 'jpg' && (exactJpgMB || jpgSizeMB) ? (
                    <span className="badge">
                      💾 {exactJpgMB ? `${exactJpgMB} MB` : `~${jpgSizeMB} MB`}
                    </span>
                  ) : null}

                  {format === 'raw' && rawAvailable && rawSizeMB ? (
                    <span className="badge">💾 ~{rawSizeMB} MB</span>
                  ) : null}
                </div>

                {isMember ? (
                  <div className="memberBadge">{String(memberPlan || 'member').toUpperCase()}</div>
                ) : null}

                <p className="sub">
                  {isMember ? 'Download included with your membership' : 'Choose license + format'}
                </p>

                <div className="block">
                  <span className="label">Receipt email</span>
                  <input
                    className="field"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => {
                      const v = e.target.value
                      setEmail(v)
                      try {
                        if (typeof window !== 'undefined') {
                          window.localStorage.setItem(
                            'user_email',
                            String(v || '').trim().toLowerCase()
                          )
                        }
                      } catch {}
                    }}
                  />

                  <div className="row2">
                    <input
                      className="field"
                      type="text"
                      placeholder="First name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                    <input
                      className="field"
                      type="text"
                      placeholder="Last name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>

                  <p className="fine">
                    We’ll send your receipt and secure download link to this email.
                  </p>
                </div>

                {!isMember && (
                  <>
                    <div className="block">
                      <span className="label">License</span>
                      <div className="options options3">
                        <button
                          type="button"
                          className={`opt ${license === 'personal' ? 'active' : ''}`}
                          onClick={() => setLicense('personal')}
                        >
                          Personal
                        </button>
                        <button
                          type="button"
                          className={`opt ${license === 'commercial' ? 'active' : ''}`}
                          onClick={() => setLicense('commercial')}
                        >
                          Commercial
                        </button>
                        <button
                          type="button"
                          className={`opt ${license === 'editorial' ? 'active' : ''}`}
                          onClick={() => setLicense('editorial')}
                        >
                          Editorial
                        </button>
                      </div>

                      <p className="fine">
                        Personal: non-commercial use. Commercial: ads, branding, client work.
                        Editorial: news, blogs, documentary.
                      </p>
                    </div>

                    <div className="block">
                      <span className="label">Format</span>
                      <div className="options options2">
                        <button
                          type="button"
                          className={`opt ${format === 'jpg' ? 'active' : ''}`}
                          onClick={() => setFormat('jpg')}
                        >
                          JPG
                        </button>

                        <button
                          type="button"
                          className={`opt ${format === 'raw' ? 'active' : ''} ${
                            rawAvailable ? '' : 'disabled'
                          }`}
                          onClick={() => {
                            if (!rawAvailable) return
                            setFormat('raw')
                          }}
                          disabled={!rawAvailable}
                          title={!rawAvailable ? 'RAW not available for this image' : 'RAW'}
                        >
                          RAW
                        </button>

                        {!rawAvailable ? (
                          <p className="fine" style={{ marginTop: 8 }}>
                            RAW is not available for this image.
                          </p>
                        ) : null}
                      </div>
                    </div>
                  </>
                )}

                {memberLoading ? (
                  <p className="fine">Checking membership…</p>
                ) : isMember ? (
                  <div className="memberBox">
                    <div className="memberLine">
                      ✅ Membership active{memberPlan ? ` (${memberPlan})` : ''}
                    </div>

                    <button
                      type="button"
                      className="memberBtn"
                      onClick={downloadAsMember}
                      disabled={isCheckingOut}
                    >
                      {isCheckingOut ? 'Working…' : 'Download with membership'}
                    </button>

                    <p className="fine" style={{ marginTop: 8 }}>
                      Basic/Pro downloads JPG • Elite downloads RAW ZIP
                    </p>
                  </div>
                ) : null}

                {!isMember && (
                  <>
                    <div className="licenseTable">
                      <table>
                        <thead>
                          <tr>
                            <th>License</th>
                            <th>Allowed Usage</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Personal</td>
                            <td>Social media, personal projects (non-commercial)</td>
                          </tr>
                          <tr>
                            <td>Commercial</td>
                            <td>Advertising, websites, marketing, client work</td>
                          </tr>
                          <tr>
                            <td>Editorial</td>
                            <td>News articles, blogs, documentaries</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div className="priceRow">
                      <span className="price">{formatMoney(currency, price)}</span>
                      <span className="small">Instant digital download</span>
                    </div>

                    <div className="cartRow">
                      <div className="cartLeft">
                        <span className="cartLabel">Qty</span>
                        <input
                          className="cartQty"
                          type="number"
                          min="1"
                          max="99"
                          value={cartQty}
                          onChange={(e) => setCartQty(clamp(Number(e.target.value || 1), 1, 99))}
                        />
                      </div>

                      <button
                        type="button"
                        className="cartBtn"
                        onClick={addCurrentToCart}
                        disabled={isCheckingOut}
                        title="Add this selection to cart"
                      >
                        Add to cart
                      </button>
                    </div>

                    <div className="cartLinks">
                      <Link href="/cart" legacyBehavior>
                        <a className="cartLink">Go to cart →</a>
                      </Link>
                      {cartMsg ? <span className="cartMsg">{cartMsg}</span> : null}
                    </div>

                    <p className="digitalNotice">
                      This is a digital product. No physical item will be shipped. Files are
                      delivered instantly after successful payment.
                    </p>

                    <div className="termsRow">
                      <input
                        type="checkbox"
                        id="agree"
                        checked={agreed}
                        onChange={(e) => setAgreed(e.target.checked)}
                      />
                      <label htmlFor="agree">
                        I agree to the{' '}
                        <a href="/terms-and-conditions" target="_blank" rel="noreferrer">
                          Terms
                        </a>
                        ,{' '}
                        <a href="/refund-policy" target="_blank" rel="noreferrer">
                          Refund Policy
                        </a>
                        , and{' '}
                        <a href="/privacy-policy" target="_blank" rel="noreferrer">
                          Privacy Policy
                        </a>
                        .
                      </label>
                    </div>

                    <button
                      type="button"
                      className="buyBtn"
                      onClick={startCheckout}
                      disabled={isCheckingOut || !agreed}
                    >
                      {isCheckingOut ? 'Working…' : 'Buy license'}
                    </button>

                    <p className="fine">
                      After payment, you will receive an email with your secure download link.
                    </p>
                  </>
                )}

                <p className="fine">
                  Need help? 📧 <a href="mailto:info@jeevanchandimal.com">Email us</a> or{' '}
                  <Link href="/contact" legacyBehavior>
                    <a>Contact form</a>
                  </Link>
                </p>
              </aside>
            </div>

            <section className="relBlock">
              <div className="relHead">
                <h2>Similar images</h2>
                <Link
                  href={firstTag ? `/store?tag=${encodeURIComponent(firstTag)}` : '/store'}
                  legacyBehavior
                >
                  <a className="seeAll">See all</a>
                </Link>
              </div>

              {relLoading ? (
                <div className="relState">Loading…</div>
              ) : similar.length === 0 ? (
                <div className="relState">No similar photos found yet.</div>
              ) : (
                <div className="relGrid">
                  {similar.map((p) => {
                    const cleanedTitle = cleanDisplayTitle(p.title || 'Untitled', p.tags || [])
                    return (
                      <Link key={p.id} href={`/store/${p.id}`} legacyBehavior>
                        <a className="relCard">
                          <div className="relThumb">
                            <img src={String(p.thumb_url || '').trim()} alt={cleanedTitle} />
                            {wmOn && <div className="relWm" style={{ opacity: wmOpacity }} />}
                          </div>
                          <div className="relMeta">
                            <div className="relName">{cleanedTitle}</div>
                            <div className="relCaption">
                              {String(p.description || '').trim()
                                ? String(p.description).trim()
                                : Array.isArray(p.tags) && p.tags[0]
                                ? `#${p.tags[0]}`
                                : 'Sri Lanka photography'}
                            </div>
                          </div>
                        </a>
                      </Link>
                    )
                  })}
                </div>
              )}
            </section>

            <section className="relBlock">
              <div className="relHead">
                <h2>Recommended for you</h2>
                <Link href="/store" legacyBehavior>
                  <a className="seeAll">See all</a>
                </Link>
              </div>

              {relLoading ? (
                <div className="relState">Loading…</div>
              ) : recommended.length === 0 ? (
                <div className="relState">No recommendations yet.</div>
              ) : (
                <div className="relGrid">
                  {recommended.map((p) => {
                    const cleanedTitle = cleanDisplayTitle(p.title || 'Untitled', p.tags || [])
                    return (
                      <Link key={p.id} href={`/store/${p.id}`} legacyBehavior>
                        <a className="relCard">
                          <div className="relThumb">
                            <img src={String(p.thumb_url || '').trim()} alt={cleanedTitle} />
                            {wmOn && <div className="relWm" style={{ opacity: wmOpacity }} />}
                          </div>
                          <div className="relMeta">
                            <div className="relName">{cleanedTitle}</div>
                            <div className="relTag">
                              {Array.isArray(p.tags) && p.tags[0] ? `#${p.tags[0]}` : 'Photo'}
                            </div>
                          </div>
                        </a>
                      </Link>
                    )
                  })}
                </div>
              )}
            </section>
          </>
        )}

        {zoomOpen && (
          <div className="zoomOverlay" onContextMenu={preventSave}>
            <div className="zoomTop">
              <div className="zoomTitle">{photo?.title || 'Preview'}</div>
              <div className="zoomActions">
                <span className="zoomPct">{Math.round(zoom * 100)}%</span>

                <button
                  type="button"
                  className="miniBtn"
                  onClick={() => setZoom((z) => clamp(z - 0.1, 1, 3))}
                >
                  −
                </button>

                <button
                  type="button"
                  className="miniBtn"
                  onClick={() => setZoom((z) => clamp(z + 0.1, 1, 3))}
                >
                  +
                </button>

                <button type="button" className="miniBtn" onClick={closeZoom}>
                  Close
                </button>
              </div>
            </div>

            <div
              className="zoomBody"
              onWheel={onWheelZoom}
              onPointerDown={onPointerDownPan}
              onPointerMove={onPointerMovePan}
              onPointerUp={endPointerPan}
              onPointerCancel={endPointerPan}
              onPointerLeave={endPointerPan}
              onContextMenu={preventSave}
            >
              <img
                src={previewSrc || photo?.previewUrl || photo?.thumbUrl}
                alt={photo?.title || 'Preview'}
                draggable={false}
                onDragStart={preventSave}
                onContextMenu={preventSave}
                style={{
                  transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
                  cursor: isPanning ? 'grabbing' : 'grab',
                  pointerEvents: 'none',
                  userSelect: 'none',
                  WebkitUserSelect: 'none',
                  WebkitTouchCallout: 'none',
                  WebkitUserDrag: 'none',
                }}
              />

              {wmOn && <div className="zoomWm" style={{ opacity: wmOpacity }} />}
            </div>
          </div>
        )}
      </main>

      <JeevanChandimalNewFooter />

      <style jsx>{`
        .wrap {
          padding: var(--dl-layout-space-threeunits) var(--dl-layout-space-twounits);
        }

        .top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          margin-bottom: var(--dl-layout-space-twounits);
        }

        .back {
          opacity: 0.85;
          text-decoration: none;
        }

        .toggle {
          display: inline-flex;
          gap: 8px;
        }

        .tbtn {
          padding: 8px 10px;
          border-radius: 999px;
          border: 1px solid rgba(245, 244, 244, 0.15);
          background: rgba(255, 255, 255, 0.02);
          color: #f5f4f4;
          cursor: pointer;
        }

        .tbtn.active {
          border-color: rgba(37, 195, 226, 0.65);
          background: rgba(37, 195, 226, 0.08);
        }

        .state {
          padding: 24px;
          opacity: 0.9;
        }

        .layout {
          display: grid;
          grid-template-columns: 1.65fr 1fr;
          gap: var(--dl-layout-space-threeunits);
          align-items: start;
        }

        .imageCard {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .imageFrame {
          position: relative;
          border-radius: 18px;
          overflow: hidden;
          border: 1px solid rgba(245, 244, 244, 0.12);
          background: rgba(0, 0, 0, 0.35);
        }

        .imageFrame img {
          width: 100%;
          height: auto;
          display: block;
          user-select: none;
        }

        .imgBg {
          display: none;
          width: 100%;
          background-position: center;
          background-repeat: no-repeat;
          background-size: contain;
          user-select: none;
          -webkit-user-select: none;
          -webkit-touch-callout: none;
        }

        .mainImg {
          display: block;
          -webkit-touch-callout: none;
          -webkit-user-drag: none;
          user-select: none;
          -webkit-user-select: none;
        }

        .zoomBtn {
          position: absolute;
          top: 12px;
          left: 12px;
          z-index: 2;
          padding: 8px 10px;
          border-radius: 999px;
          border: 1px solid rgba(245, 244, 244, 0.18);
          background: rgba(0, 0, 0, 0.35);
          color: #f5f4f4;
          cursor: pointer;
        }

        .wmTile,
        .relWm,
        .zoomWm {
          pointer-events: none;
          position: absolute;
          inset: 0;
          background-image: url('/JC/jclogo05.png');
          background-repeat: repeat;
          background-size: 240px auto;
          mix-blend-mode: lighten;
          opacity: 0.08;
        }

        .desc {
          margin: 0;
          opacity: 0.85;
        }

        .metaCard {
          border: 1px solid rgba(245, 244, 244, 0.12);
          border-radius: 18px;
          overflow: hidden;
          background: rgba(255, 255, 255, 0.02);
        }

        .metaRow {
          display: grid;
          grid-template-columns: 160px 1fr 70px;
          gap: 12px;
          padding: 14px 16px;
          border-top: 1px solid rgba(245, 244, 244, 0.08);
        }

        .metaRow:first-child {
          border-top: none;
        }

        .metaRowTall {
          grid-template-columns: 160px 1fr;
        }

        .metaTitle {
          font-weight: 600;
          opacity: 0.95;
        }

        .metaCell {
          display: flex;
          align-items: center;
        }

        .metaText {
          opacity: 0.9;
          line-height: 1.55;
        }

        .wmControls {
          display: inline-flex;
          gap: 8px;
        }

        .miniBtn {
          padding: 7px 10px;
          border-radius: 999px;
          border: 1px solid rgba(245, 244, 244, 0.18);
          background: rgba(255, 255, 255, 0.02);
          color: #f5f4f4;
          cursor: pointer;
        }

        .miniBtn.active {
          border-color: rgba(37, 195, 226, 0.65);
          background: rgba(37, 195, 226, 0.08);
        }

        .range {
          width: 100%;
        }

        .rangeVal {
          opacity: 0.85;
          font-size: 12px;
          text-align: right;
        }

        .tagRow {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .tag {
          display: inline-flex;
          padding: 6px 10px;
          border-radius: 999px;
          border: 1px solid rgba(245, 244, 244, 0.12);
          background: rgba(255, 255, 255, 0.02);
          text-decoration: none;
          font-size: 12px;
        }

        .buyCard {
          border: 1px solid rgba(245, 244, 244, 0.12);
          border-radius: 18px;
          padding: 18px;
          background: rgba(255, 255, 255, 0.02);
          display: flex;
          flex-direction: column;
          gap: 14px;
          overflow: visible;
          max-height: none;
          position: sticky;
          top: 18px;
          align-self: start;
        }

        .title {
          margin: 0;
          font-size: 24px;
          line-height: 1.2;
        }

        .memberBadge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-top: 8px;
          padding: 4px 10px;
          border-radius: 999px;
          font-size: 12px;
          letter-spacing: 0.6px;
          background: rgba(37, 195, 226, 0.14);
          border: 1px solid rgba(37, 195, 226, 0.55);
          width: fit-content;
        }

        .sub {
          margin: 0;
          opacity: 0.82;
        }

        .block {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .label {
          font-size: 12px;
          opacity: 0.9;
          letter-spacing: 0.5px;
        }

        .field {
          width: 100%;
          padding: 12px 14px;
          border-radius: 12px;
          border: 1px solid rgba(245, 244, 244, 0.15);
          background: rgba(255, 255, 255, 0.02);
          color: #f5f4f4;
          outline: none;
        }

        .row2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }

        .options {
          display: grid;
          gap: 10px;
        }

        .options2 {
          grid-template-columns: 1fr 1fr;
        }

        .options3 {
          grid-template-columns: 1fr 1fr 1fr;
        }

        .opt {
          padding: 12px 12px;
          border-radius: 12px;
          border: 1px solid rgba(245, 244, 244, 0.15);
          background: rgba(255, 255, 255, 0.02);
          color: #f5f4f4;
          cursor: pointer;
        }

        .opt.active {
          border-color: rgba(37, 195, 226, 0.65);
          background: rgba(37, 195, 226, 0.08);
        }

        .opt.disabled {
          opacity: 0.55;
          cursor: not-allowed;
        }

        .licenseTable {
          border: 1px solid rgba(245, 244, 244, 0.12);
          border-radius: 14px;
          overflow: hidden;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          font-size: 12px;
        }

        th,
        td {
          padding: 10px 12px;
          border-top: 1px solid rgba(245, 244, 244, 0.08);
          text-align: left;
        }

        thead th {
          border-top: none;
          background: rgba(255, 255, 255, 0.03);
        }

        .priceRow {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          gap: 10px;
        }

        .price {
          font-size: 28px;
          font-weight: 700;
        }

        .small {
          font-size: 12px;
          opacity: 0.85;
        }

        .cartRow {
          display: flex;
          gap: 10px;
          align-items: center;
          justify-content: space-between;
          padding: 12px;
          border: 1px solid rgba(245, 244, 244, 0.12);
          border-radius: 14px;
          background: rgba(255, 255, 255, 0.02);
        }

        .cartLeft {
          display: inline-flex;
          align-items: center;
          gap: 10px;
        }

        .cartLabel {
          font-size: 12px;
          opacity: 0.85;
        }

        .cartQty {
          width: 80px;
          padding: 10px 10px;
          border-radius: 12px;
          border: 1px solid rgba(245, 244, 244, 0.15);
          background: rgba(255, 255, 255, 0.02);
          color: #f5f4f4;
          outline: none;
          text-align: center;
        }

        .cartBtn {
          padding: 12px 14px;
          border-radius: 14px;
          border: 1px solid rgba(37, 195, 226, 0.55);
          background: rgba(37, 195, 226, 0.14);
          color: #f5f4f4;
          font-weight: 700;
          cursor: pointer;
          white-space: nowrap;
        }

        .cartBtn:disabled {
          opacity: 0.55;
          cursor: not-allowed;
        }

        .cartLinks {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
        }

        .cartLink {
          opacity: 0.9;
          text-decoration: none;
        }

        .cartMsg {
          font-size: 12px;
          opacity: 0.85;
          white-space: nowrap;
        }

        .fileInfo {
          display: grid;
          gap: 6px;
          font-size: 12px;
          opacity: 0.9;
        }

        .digitalNotice {
          margin: 0;
          font-size: 12px;
          opacity: 0.8;
          line-height: 1.5;
        }

        .termsRow {
          display: flex;
          gap: 10px;
          align-items: flex-start;
          font-size: 12px;
          opacity: 0.9;
        }

        .buyBtn {
          width: 100%;
          padding: 14px 14px;
          border-radius: 14px;
          border: none;
          background: rgba(37, 195, 226, 0.9);
          color: #081316;
          font-weight: 700;
          cursor: pointer;
        }

        .buyBtn:disabled {
          opacity: 0.55;
          cursor: not-allowed;
        }

        .fine {
          margin: 0;
          font-size: 12px;
          opacity: 0.82;
          line-height: 1.55;
        }

        .memberBox {
          border: 1px solid rgba(37, 195, 226, 0.3);
          background: rgba(37, 195, 226, 0.06);
          border-radius: 14px;
          padding: 12px;
        }

        .memberLine {
          font-size: 13px;
          font-weight: 600;
          margin-bottom: 10px;
          opacity: 0.95;
        }

        .memberBtn {
          width: 100%;
          padding: 12px 12px;
          border-radius: 14px;
          border: 1px solid rgba(37, 195, 226, 0.5);
          background: rgba(37, 195, 226, 0.2);
          color: #f5f4f4;
          font-weight: 700;
          cursor: pointer;
        }

        .memberBtn:disabled {
          opacity: 0.55;
          cursor: not-allowed;
        }

        .relBlock {
          margin-top: var(--dl-layout-space-fourunits);
        }

        .relHead {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          gap: 12px;
          margin-bottom: 14px;
        }

        .seeAll {
          opacity: 0.85;
          text-decoration: none;
        }

        .relState {
          opacity: 0.85;
          padding: 10px 0;
        }

        .relGrid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 14px;
        }

        .relCard {
          text-decoration: none;
          border: 1px solid rgba(245, 244, 244, 0.12);
          border-radius: 14px;
          overflow: hidden;
          background: rgba(255, 255, 255, 0.02);
          display: grid;
          transition: transform 160ms ease, border-color 160ms ease, background 160ms ease;
        }

        .relCard:hover {
          transform: translateY(-3px);
          border-color: rgba(37, 195, 226, 0.45);
          background: rgba(37, 195, 226, 0.06);
        }

        .relThumb {
          position: relative;
          aspect-ratio: 4 / 3;
          overflow: hidden;
        }

        .relThumb img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 220ms ease;
        }

        .relCard:hover .relThumb img {
          transform: scale(1.03);
        }

        .badgeRow {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 8px;
        }

        .badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 10px;
          border-radius: 999px;
          font-size: 12px;
          border: 1px solid rgba(245, 244, 244, 0.12);
          background: rgba(255, 255, 255, 0.02);
          opacity: 0.92;
        }

        .relCaption {
          font-size: 12px;
          opacity: 0.82;
          line-height: 1.35;
          margin-top: 4px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .zoomOverlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.78);
          z-index: 9999;
          display: grid;
          grid-template-rows: auto 1fr auto;
        }

        .zoomTop {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 14px 16px;
          border-bottom: 1px solid rgba(245, 244, 244, 0.12);
          background: rgba(0, 0, 0, 0.35);
          backdrop-filter: blur(10px);
        }

        .zoomTitle {
          font-size: 14px;
          opacity: 0.95;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          max-width: 55vw;
        }

        .zoomActions {
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }

        .zoomPct {
          font-size: 12px;
        }

        .zoomBody {
          position: relative;
          overflow: hidden;
          display: grid;
          place-items: center;
          touch-action: none;
          -webkit-user-select: none;
          user-select: none;
        }

        .zoomBody img {
          max-width: none;
          max-height: none;
          width: auto;
          height: auto;
          pointer-events: none;
          -webkit-user-drag: none;
          -webkit-touch-callout: none;
          user-select: none;
        }

        .imageFrame:hover .wmTile {
          opacity: 0;
        }

        .relThumb:hover .relWm {
          opacity: 0;
        }

        .zoomBody:hover .zoomWm {
          opacity: 0;
        }

        .zoomWm {
          position: absolute;
          inset: 0;
        }

        @media (max-width: 991px) {
          .imageFrame img.mainImg {
            display: none !important;
          }
          .imageFrame .imgBg {
            display: block !important;
          }
          .layout {
            grid-template-columns: 1fr;
          }
          .relGrid {
            grid-template-columns: 1fr;
          }
          .buyCard {
            position: static;
          }
        }
      `}</style>
    </>
  )
}

export async function getServerSideProps(ctx) {
  try {
    const id = String(ctx?.params?.id || '').trim()
    if (!id) return { props: { initialPhoto: null, initialError: 'Missing photo id' } }

    const { supabaseAdmin } = require('../../lib/supabaseAdmin')

    const { data, error } = await supabaseAdmin
      .from('photos')
      .select(
        'id, title, description, tags, preview_url, thumb_url, created_at, location, exif, raw_available'
      )
      .eq('id', id)
      .single()

    if (error || !data) {
      return { props: { initialPhoto: null, initialError: 'Photo not found' } }
    }

    const initialPhoto = normalizePhotoPayload({
      photo: {
        id: data.id,
        title: data.title,
        description: data.description,
        tags: data.tags,
        preview_url: data.preview_url,
        thumb_url: data.thumb_url,
        created_at: data.created_at,
        location: data.location,
        exif: data.exif,
        raw_available: data.raw_available,
      },
    })

    return { props: { initialPhoto, initialError: '' } }
  } catch (e) {
    return { props: { initialPhoto: null, initialError: 'Failed to load photo' } }
  }
}