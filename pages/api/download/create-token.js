import crypto from 'crypto'
import { supabaseAdmin } from '@/lib/supabaseAdmin'
import { createDownloadToken } from '@/lib/secureDownload'

const RL_WINDOW_MS = 60_000
const RL_MAX = 30

const rl = globalThis.__jc_rl_create_token || new Map()
globalThis.__jc_rl_create_token = rl

function getIp(req) {
  const xf = req.headers['x-forwarded-for']
  if (typeof xf === 'string' && xf.trim()) return xf.split(',')[0].trim()
  return (
    String(req.headers['x-real-ip'] || '').trim() ||
    String(req.socket?.remoteAddress || '').trim() ||
    'unknown'
  )
}

function rateLimit(req, res) {
  const ip = getIp(req)
  const now = Date.now()
  const key = `ct:${ip}`

  const cur = rl.get(key) || { n: 0, resetAt: now + RL_WINDOW_MS }
  if (now > cur.resetAt) {
    cur.n = 0
    cur.resetAt = now + RL_WINDOW_MS
  }

  cur.n += 1
  rl.set(key, cur)

  res.setHeader('X-RateLimit-Limit', String(RL_MAX))
  res.setHeader('X-RateLimit-Remaining', String(Math.max(0, RL_MAX - cur.n)))
  res.setHeader('X-RateLimit-Reset', String(Math.ceil(cur.resetAt / 1000)))

  if (cur.n > RL_MAX) {
    res.status(429).json({ ok: false, error: 'Too many requests' })
    return false
  }

  return true
}

function limitForLicense(license) {
  const x = String(license || '').trim().toLowerCase()
  if (x === 'commercial') return 0
  if (x === 'editorial') return 5
  return 3
}

function normalizeFormat(v) {
  return String(v || '').trim().toLowerCase() === 'raw' ? 'raw' : 'jpg'
}

function normalizeLicense(v) {
  const x = String(v || '').trim().toLowerCase()
  if (x === 'commercial') return 'commercial'
  if (x === 'editorial') return 'editorial'
  return 'personal'
}

function normalizeEmail(v) {
  return String(v || '').trim().toLowerCase()
}

function getBaseUrl(req) {
  const explicit =
    String(
      process.env.WEBHOOK_BASE_URL ||
        process.env.NEXT_PUBLIC_WEBHOOK_BASE_URL ||
        ''
    ).trim() || String(process.env.NEXT_PUBLIC_SITE_URL || '').trim()

  if (explicit) return explicit.replace(/\/+$/, '')

  const proto = (req.headers['x-forwarded-proto'] || 'https').toString()
  const host = (req.headers['x-forwarded-host'] || req.headers.host || '').toString()
  return host ? `${proto}://${host}` : ''
}

function isUuid(v) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
    String(v || '').trim()
  )
}

function isCartCode(v) {
  const s = String(v || '').trim()
  return /^CART_[A-Za-z0-9._-]{6,120}$/.test(s)
}

async function resolveObjectKeyFromPhotos(photoId, format) {
  const pid = String(photoId || '').trim()
  if (!pid || !isUuid(pid)) return null

  const fmt = normalizeFormat(format)

  const { data: p, error } = await supabaseAdmin
    .from('photos')
    .select('id, original_key, original_jpg_key, original_raw_key')
    .eq('id', pid)
    .maybeSingle()

  if (error) throw new Error(error.message)
  if (!p) return null

  if (fmt === 'raw') return p.original_raw_key ? String(p.original_raw_key) : null

  const k = p.original_jpg_key || p.original_key
  return k ? String(k) : null
}

function fallbackObjectKeyFromPhotoId(photoId, format) {
  const pid = String(photoId || '').trim()
  if (!pid) return null

  return format === 'raw'
    ? `photos/original/${pid}.zip`
    : `photos/original/${pid}.jpg`
}

async function ensureObjectKeyForSingleOrder(order) {
  const photoId = String(order?.photo_id || '').trim()
  if (!photoId) return ''

  let objectKey = order?.delivery_object_key ? String(order.delivery_object_key).trim() : ''

  if (!objectKey) {
    const resolved = await resolveObjectKeyFromPhotos(photoId, order?.format)

    if (resolved) {
      objectKey = resolved

      const u = await supabaseAdmin
        .from('orders')
        .update({ delivery_object_key: objectKey })
        .eq('id', order.id)

      if (u.error) console.error('delivery_object_key update failed:', u.error.message)
    } else {
      objectKey = fallbackObjectKeyFromPhotoId(photoId, normalizeFormat(order?.format)) || ''
    }
  }

  return objectKey || ''
}

function makeCartItemLabel(item, idx) {
  const lic = normalizeLicense(item?.license)
  const fmt = normalizeFormat(item?.format)
  const base = String(item?.title || item?.photoId || item?.photo_id || `Item ${idx + 1}`).trim()
  return `${base} • ${lic.toUpperCase()} • ${fmt.toUpperCase()}`
}

async function findSingleOrder(ref) {
  const value = String(ref || '').trim()
  if (!value) return null

  const selectCols =
    'id,status,photo_id,format,email,license,download_limit,delivery_object_key,code,order_id'

  try {
    const byId = await supabaseAdmin
      .from('orders')
      .select(selectCols)
      .eq('id', value)
      .maybeSingle()

    if (byId.error) {
      const msg = String(byId.error.message || '').toLowerCase()
      if (!msg.includes('invalid input syntax') && !msg.includes('uuid')) {
        throw new Error(byId.error.message)
      }
    } else if (byId.data) {
      return byId.data
    }
  } catch (err) {
    const msg = String(err?.message || '').toLowerCase()
    if (!msg.includes('invalid input syntax') && !msg.includes('uuid')) {
      throw err
    }
  }

  const byCode = await supabaseAdmin
    .from('orders')
    .select(selectCols)
    .eq('code', value)
    .maybeSingle()

  if (byCode.error) throw new Error(byCode.error.message)
  if (byCode.data) return byCode.data

  const byOrderId = await supabaseAdmin
    .from('orders')
    .select(selectCols)
    .eq('order_id', value)
    .maybeSingle()

  if (byOrderId.error) throw new Error(byOrderId.error.message)
  if (byOrderId.data) return byOrderId.data

  return null
}

export default async function handler(req, res) {
  if (!rateLimit(req, res)) return

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ ok: false, error: 'Method not allowed' })
  }

  try {
    const body = req.body || {}
    const orderId = String(body.orderId || '').trim()
    const code = String(body.code || '').trim()

    if (!orderId && !code) {
      return res.status(400).json({ ok: false, error: 'Missing orderId or code' })
    }

    if (code && !isCartCode(code)) {
      return res.status(400).json({ ok: false, error: 'Invalid code' })
    }

    const base = getBaseUrl(req)
    if (!base) return res.status(500).json({ ok: false, error: 'Missing site base URL' })

    const expiresMinutes = 30
    const expiresAt = new Date(Date.now() + expiresMinutes * 60 * 1000)
    const MAX_CART_ITEMS = 24

    if (code) {
      const { data: cartOrder, error } = await supabaseAdmin
        .from('orders')
        .select('id,status,code,order_id,order_kind,items,email,currency,amount,download_limit')
        .or(`code.eq.${code},order_id.eq.${code}`)
        .maybeSingle()

      if (error) return res.status(500).json({ ok: false, error: error.message })
      if (!cartOrder) return res.status(404).json({ ok: false, error: 'Cart order not found' })

      if (String(cartOrder.status || '').toUpperCase() !== 'PAID') {
        return res.status(400).json({ ok: false, error: 'Order not paid' })
      }

      const itemsArr = Array.isArray(cartOrder.items) ? cartOrder.items : []
      if (itemsArr.length === 0) {
        return res.status(400).json({ ok: false, error: 'Cart has no items' })
      }
      if (itemsArr.length > MAX_CART_ITEMS) {
        return res.status(400).json({ ok: false, error: `Cart too large (max ${MAX_CART_ITEMS})` })
      }

      const licenses = itemsArr.map((it) => normalizeLicense(it?.license))
      const desiredLimit = licenses.includes('commercial')
        ? 0
        : licenses.includes('editorial')
          ? 5
          : 3

      if (
        cartOrder.download_limit == null ||
        Number(cartOrder.download_limit) !== Number(desiredLimit)
      ) {
        const u = await supabaseAdmin
          .from('orders')
          .update({ download_limit: desiredLimit })
          .eq('id', cartOrder.id)

        if (u.error) console.error('cart download_limit update failed:', u.error.message)
      }

      const guestEmail = normalizeEmail(cartOrder.email)
      const outItems = []

      for (let i = 0; i < itemsArr.length; i++) {
        const it = itemsArr[i] || {}
        const photoId = String(it.photoId || it.photo_id || '').trim()
        if (!photoId || !isUuid(photoId)) continue

        const fmt = normalizeFormat(it.format)
        const lic = normalizeLicense(it.license)

        let objectKey = String(it.objectKey || it.object_key || '').trim()

        if (!objectKey) {
          try {
            objectKey = (await resolveObjectKeyFromPhotos(photoId, fmt)) || ''
          } catch (e) {
            console.error('cart resolveObjectKeyFromPhotos failed:', e?.message || e)
          }
        }

        if (!objectKey) objectKey = fallbackObjectKeyFromPhotoId(photoId, fmt) || ''
        if (!objectKey) continue

        const jti = crypto.randomUUID()

        const ins = await supabaseAdmin.from('download_tokens').insert({
          jti,
          order_id: cartOrder.id,
          expires_at: expiresAt.toISOString(),
        })

        if (ins.error) {
          console.error('download_tokens insert failed:', ins.error.message)
          continue
        }

        const ext = fmt === 'raw' ? 'zip' : 'jpg'

        const token = createDownloadToken(
          {
            jti,
            orderId: cartOrder.id,
            photoId,
            format: fmt,
            objectKey,
            guestEmail: guestEmail || null,
            filename: `${photoId}.${ext}`,
            license: lic,
          },
          '30m'
        )

        outItems.push({
          title: makeCartItemLabel(it, i),
          token,
          url: `${base}/api/download?token=${encodeURIComponent(token)}`,
        })
      }

      if (outItems.length === 0) {
        return res.status(400).json({ ok: false, error: 'No downloadable items found for this cart' })
      }

      return res.status(200).json({
        ok: true,
        items: outItems,
        expiresAt: expiresAt.toISOString(),
      })
    }

    const order = await findSingleOrder(orderId)

    if (!order) {
      return res.status(404).json({ ok: false, error: 'Order not found' })
    }

    if (String(order.status || '').toUpperCase() !== 'PAID') {
      return res.status(400).json({ ok: false, error: 'Order not paid' })
    }

    const objectKey = await ensureObjectKeyForSingleOrder(order)
    if (!objectKey) {
      return res.status(400).json({ ok: false, error: 'Missing delivery_object_key (cannot resolve)' })
    }

    if (order.download_limit == null) {
      const desired = limitForLicense(order.license)
      const u = await supabaseAdmin
        .from('orders')
        .update({ download_limit: desired })
        .eq('id', order.id)

      if (u.error) return res.status(500).json({ ok: false, error: 'Failed to set download limit' })
    }

    const jti = crypto.randomUUID()

    const ins = await supabaseAdmin.from('download_tokens').insert({
      jti,
      order_id: order.id,
      expires_at: expiresAt.toISOString(),
    })

    if (ins.error) return res.status(500).json({ ok: false, error: ins.error.message })

    const fmt = normalizeFormat(order.format)
    const ext = fmt === 'raw' ? 'zip' : 'jpg'

    const token = createDownloadToken(
      {
        jti,
        orderId: order.id,
        photoId: order.photo_id,
        format: fmt,
        objectKey,
        guestEmail: normalizeEmail(order.email) || null,
        filename: `${order.photo_id}.${ext}`,
        license: normalizeLicense(order.license),
      },
      '30m'
    )

    const url = `${base}/api/download?token=${encodeURIComponent(token)}`
    return res.status(200).json({ ok: true, url, token, expiresAt: expiresAt.toISOString() })
  } catch (e) {
    console.error('create-token error:', e)
    return res.status(500).json({ ok: false, error: e?.message || 'Server error' })
  }
}