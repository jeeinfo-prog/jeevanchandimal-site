// lib/email.js
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

// ✅ Use your verified sender as fallback
const FROM = process.env.EMAIL_FROM || 'Jeevan Chandimal <info@jeevanchandimal.com>'

function safeText(v) {
  return String(v ?? '').replace(/[<>&"]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;' }[c]))
}

/**
 * If `downloadUrl` contains a cart list like:
 * 1) Title • LICENSE • FORMAT
 * https://...
 *
 * 2) Title ...
 * https://...
 *
 * We parse into items with { label, url }.
 * If it’s a single URL, return single item.
 */
function parseDownloadLinks(downloadUrl) {
  const raw = String(downloadUrl || '').trim()
  if (!raw) return []

  // If it looks like a single URL
  const singleUrlMatch = raw.match(/https?:\/\/[^\s]+/i)
  const allUrls = raw.match(/https?:\/\/[^\s]+/gi) || []

  if (allUrls.length <= 1) {
    return singleUrlMatch ? [{ label: 'Download your file', url: singleUrlMatch[0] }] : []
  }

  // Split blocks by blank lines
  const blocks = raw.split(/\n\s*\n/g).map((b) => b.trim()).filter(Boolean)

  const items = []
  for (const b of blocks) {
    const url = (b.match(/https?:\/\/[^\s]+/i) || [null])[0]
    if (!url) continue

    // Label from first non-empty line that is not the URL
    const lines = b.split('\n').map((x) => x.trim()).filter(Boolean)
    const firstLine = lines.find((x) => !/^https?:\/\//i.test(x)) || 'Download'
    // Clean "1) " prefix if present
    const label = firstLine.replace(/^\d+\)\s*/, '').trim()

    items.push({ label, url })
  }

  // Fallback: if parsing failed but we have URLs
  if (items.length === 0) {
    return allUrls.map((u, i) => ({ label: `Download item ${i + 1}`, url: u }))
  }

  return items
}

export async function sendDownloadEmail({
  to,
  orderId,
  photoTitle,
  downloadUrl,
  license,
  format,
}) {
  if (!to || !downloadUrl) return

  try {
    const links = parseDownloadLinks(downloadUrl)
    const isMulti = links.length > 1

    const subject = isMulti ? 'Your downloads are ready' : 'Your photo download is ready'

    const text = isMulti
      ? `Thank you for your purchase.

Your downloads are ready:

${downloadUrl}

Order ID: ${orderId || ''}

© ${new Date().getFullYear()} Jeevan Chandimal
`
      : `Thank you for your purchase.

Your photo "${photoTitle || 'Photo'}" is ready for download:
${downloadUrl}

Order ID: ${orderId || ''}
License: ${license || 'N/A'}
Format: ${format || 'N/A'}

© ${new Date().getFullYear()} Jeevan Chandimal
`

    // ---------- HTML ----------
    let downloadSectionHtml = ''

    if (!isMulti) {
      const one = links[0]?.url || String(downloadUrl).trim()

      downloadSectionHtml = `
  <p style="margin:24px 0">
    <a href="${one}"
       style="display:inline-block;padding:12px 20px;background:#111;color:#fff;text-decoration:none;border-radius:999px;font-weight:bold">
      Download your file
    </a>
  </p>

  <p style="font-size:13px;color:#666">
    This secure link will expire soon. If the button doesn’t work, copy and paste this link:<br/>
    <a href="${one}">${one}</a>
  </p>
`
    } else {
      const buttons = links
        .map(
          (x, idx) => `
    <div style="padding:12px 0;border-top:1px solid #eee">
      <div style="font-size:13px;color:#111;margin-bottom:10px">
        <b>${safeText(x.label || `Item ${idx + 1}`)}</b>
      </div>
      <a href="${x.url}"
         style="display:inline-block;padding:12px 18px;background:#111;color:#fff;text-decoration:none;border-radius:999px;font-weight:bold">
        Download item ${idx + 1}
      </a>
      <div style="font-size:12px;color:#666;margin-top:10px;line-height:1.4">
        If the button doesn’t work, use this link:<br/>
        <a href="${x.url}">${x.url}</a>
      </div>
    </div>
`
        )
        .join('')

      downloadSectionHtml = `
  <p>Your downloads are ready:</p>
  <div style="margin:18px 0;border:1px solid #eee;border-radius:14px;padding:10px 14px">
${buttons}
  </div>

  <p style="font-size:12px;color:#666;margin-top:10px">
    These secure links will expire soon.
  </p>
`
    }

    const html = `
<div style="font-family:Arial,Helvetica,sans-serif;max-width:600px;margin:0 auto">
  <h2>Thank you for your purchase</h2>

  <p>
    ${
      isMulti
        ? `Your order contains multiple items and all downloads are ready.`
        : `Your photo <strong>${safeText(photoTitle || 'Photo')}</strong> is ready for download.`
    }
  </p>

  ${downloadSectionHtml}

  <hr style="margin:32px 0;border:none;border-top:1px solid #eee"/>

  <p style="font-size:12px;color:#777">
    Order ID: ${safeText(orderId || '')}<br/>
    ${isMulti ? '' : `License: ${safeText(license || 'N/A')}<br/>Format: ${safeText(format || 'N/A')}<br/>`}
    © ${new Date().getFullYear()} Jeevan Chandimal
  </p>
</div>
`

    const result = await resend.emails.send({
      from: FROM,
      to,
      subject,
      text,
      html,
    })

    console.log('Download email sent:', result?.id || 'ok', 'to:', to)
  } catch (err) {
    console.error('Download email send failed:', err)
  }
}

export async function sendReceiptEmail({
  to,
  orderId,
  amount,
  currency,
  photoTitle,
  license,
  format,
  paymentId,
}) {
  if (!to) return

  try {
    const subject = 'Payment receipt'

    const text = `Payment received.

Order ID: ${orderId || ''}
Payment ID: ${paymentId || ''}
Item: ${photoTitle || 'Photo'}
License: ${license || 'N/A'}
Format: ${format || 'N/A'}
Amount: ${currency || ''} ${amount || ''}

© ${new Date().getFullYear()} Jeevan Chandimal
`

    const html = `
<div style="font-family:Arial,Helvetica,sans-serif;max-width:600px;margin:0 auto">
  <h2>Payment Receipt</h2>
  <p>Thanks — your payment was successful.</p>

  <table style="width:100%;border-collapse:collapse;margin-top:16px">
    <tr><td style="padding:8px 0;color:#666">Order ID</td><td style="padding:8px 0"><b>${safeText(orderId || '')}</b></td></tr>
    <tr><td style="padding:8px 0;color:#666">Payment ID</td><td style="padding:8px 0">${safeText(paymentId || '-')}</td></tr>
    <tr><td style="padding:8px 0;color:#666">Item</td><td style="padding:8px 0">${safeText(photoTitle || 'Photo')}</td></tr>
    <tr><td style="padding:8px 0;color:#666">License</td><td style="padding:8px 0">${safeText(license || '-')}</td></tr>
    <tr><td style="padding:8px 0;color:#666">Format</td><td style="padding:8px 0">${safeText(format || '-')}</td></tr>
    <tr><td style="padding:8px 0;color:#666">Amount</td><td style="padding:8px 0"><b>${safeText(currency || '')} ${safeText(amount || '')}</b></td></tr>
  </table>

  <hr style="margin:28px 0;border:none;border-top:1px solid #eee" />
  <p style="font-size:12px;color:#777">© ${new Date().getFullYear()} Jeevan Chandimal</p>
</div>
`

    const result = await resend.emails.send({
      from: FROM,
      to,
      subject,
      text,
      html,
    })

    console.log('Receipt email sent:', result?.id || 'ok', 'to:', to)
  } catch (err) {
    console.error('Receipt email send failed:', err)
  }
}