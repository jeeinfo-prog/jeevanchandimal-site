// components/AddToCartButton.js
import React from 'react'
import { addToCart } from '../lib/cart'

const LICENSES = [
  { value: 'personal', label: 'Personal' },
  { value: 'editorial', label: 'Editorial' },
  { value: 'commercial', label: 'Commercial' },
]

export default function AddToCartButton({
  photo,
  defaultLicense = 'personal',
  defaultFormat = 'jpg',
  defaultCurrency = 'LKR',
  prices, // optional: { LKR: { personal: { jpg: 2500, raw: 4000 }, ... }, USD: ... }
  compact = false,
}) {
  const [license, setLicense] = React.useState(defaultLicense)
  const [format, setFormat] = React.useState(defaultFormat)
  const [currency, setCurrency] = React.useState(defaultCurrency)
  const [qty, setQty] = React.useState(1)
  const [msg, setMsg] = React.useState('')

  const unitPrice = React.useMemo(() => {
    if (prices?.[currency]?.[license]?.[format] != null) {
      return Number(prices[currency][license][format])
    }
    // fallback (if you pass unitPrice already)
    if (photo?.unitPrice != null) return Number(photo.unitPrice)
    return 0
  }, [prices, currency, license, format, photo])

  function onAdd() {
    if (!photo?.id) return
    if (!unitPrice || unitPrice <= 0) {
      setMsg('Price not available')
      setTimeout(() => setMsg(''), 1200)
      return
    }

    addToCart({
      photoId: photo.id,
      title: photo.title || '',
      thumbUrl: photo.thumbUrl || photo.thumb_url || photo.thumb || photo.preview_url || '',
      license,
      format,
      currency,
      unitPrice,
      qty,
    })

    // ✅ update navbar immediately
    try {
      window.dispatchEvent(new Event('jc_cart_updated'))
    } catch {}

    setMsg('Added ✅')
    setTimeout(() => setMsg(''), 1200)
  }

  return (
    <div className="wrap">
      <div className="row">
        <select className="sel" value={license} onChange={(e) => setLicense(e.target.value)}>
          {LICENSES.map((x) => (
            <option key={x.value} value={x.value}>
              {x.label}
            </option>
          ))}
        </select>

        <select className="sel" value={format} onChange={(e) => setFormat(e.target.value)}>
          <option value="jpg">JPG</option>
          <option value="raw">RAW</option>
        </select>

        <select className="sel" value={currency} onChange={(e) => setCurrency(e.target.value)}>
          <option value="LKR">LKR</option>
          <option value="USD">USD</option>
        </select>

        {!compact ? (
          <input
            className="qty"
            value={qty}
            inputMode="numeric"
            onChange={(e) => {
              const v = String(e.target.value || '').replace(/[^\d]/g, '')
              const n = v ? Number(v) : 1
              setQty(Math.max(1, Math.min(99, n)))
            }}
          />
        ) : null}
      </div>

      <div className="row2">
        <button className="btn" onClick={onAdd} type="button">
          Add to Cart {unitPrice > 0 ? `• ${currency === 'LKR' ? 'LKR' : '$'}${unitPrice}` : ''}
        </button>
        {msg ? <span className="msg">{msg}</span> : null}
      </div>

      <style jsx>{`
        .wrap {
          display: grid;
          gap: 10px;
        }
        .row {
          display: grid;
          grid-template-columns: 1.2fr 0.9fr 0.9fr ${compact ? '' : '0.6fr'};
          gap: 8px;
          align-items: center;
        }
        .sel,
        .qty {
          padding: 10px 12px;
          border-radius: 12px;
          border: 1px solid rgba(245, 244, 244, 0.18);
          background: rgba(0, 0, 0, 0.28);
          color: #fff;
          outline: none;
          font-size: 13px;
        }
        .qty {
          text-align: center;
        }
        .row2 {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .btn {
          padding: 12px 16px;
          border-radius: 999px;
          border: 1px solid rgba(245, 244, 244, 0.18);
          background: rgba(0, 120, 255, 0.22);
          color: #fff;
          font-weight: 800;
          cursor: pointer;
        }
        .btn:hover {
          background: rgba(0, 120, 255, 0.28);
        }
        .msg {
          font-size: 12px;
          opacity: 0.85;
        }
      `}</style>
    </div>
  )
}