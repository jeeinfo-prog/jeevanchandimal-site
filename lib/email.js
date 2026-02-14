// lib/email.js
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

// ✅ Use your verified sender as fallback
const FROM = process.env.EMAIL_FROM || 'Jeevan Chandimal <info@jeevanchandimal.com>'

function safeText(v) {
  return String(v ?? '').replace(/[<>&"]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;' }[c]))
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
    const subject = 'Your photo download is ready'

    const text = `Thank you for your purchase.

Your photo "${photoTitle || 'Photo'}" is ready for download:
${downloadUrl}

Order ID: ${orderId || ''}
License: ${license || 'N/A'}
Format: ${format || 'N/A'}

© ${new Date().getFullYear()} Jeevan Chandimal
`

    const html = `
<div style="font-family:Arial,Helvetica,sans-serif;max-width:600px;margin:0 auto">
  <h2>Thank you for your purchase</h2>

  <p>Your photo <strong>${safeText(photoTitle || 'Photo')}</strong> is ready for download.</p>

  <p style="margin:24px 0">
    <a href="${downloadUrl}"
       style="display:inline-block;padding:12px 20px;background:#111;color:#fff;text-decoration:none;border-radius:999px;font-weight:bold">
      Download your file
    </a>
  </p>

  <p style="font-size:13px;color:#666">
    This secure link will expire soon. If the button doesn’t work, copy and paste this link:<br/>
    <a href="${downloadUrl}">${downloadUrl}</a>
  </p>

  <hr style="margin:32px 0;border:none;border-top:1px solid #eee"/>

  <p style="font-size:12px;color:#777">
    Order ID: ${safeText(orderId || '')}<br/>
    License: ${safeText(license || 'N/A')}<br/>
    Format: ${safeText(format || 'N/A')}<br/><br/>
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
