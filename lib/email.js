// lib/email.js
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

// ✅ Use your verified sender as fallback
const FROM = process.env.EMAIL_FROM || 'Jeevan Chandimal <info@jeevanchandimal.com>'

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

    // ✅ Plain-text fallback improves Gmail delivery
    const text = `Thank you for your purchase.

Your photo "${photoTitle || 'Photo'}" is ready for download:

${downloadUrl}

Order ID: ${orderId || ''}
License: ${license || ''}
Format: ${format || ''}

© ${new Date().getFullYear()} Jeevan Chandimal
This is an automated email. Please keep it for your records.
`

    const html = `
      <div style="font-family:Arial,Helvetica,sans-serif;max-width:600px;margin:0 auto">
        <h2>Thank you for your purchase</h2>

        <p>Your photo <strong>${photoTitle || 'Photo'}</strong> is ready for download.</p>

        <p style="margin:24px 0">
          <a href="${downloadUrl}"
             style="display:inline-block;padding:12px 20px;
             background:#111;color:#fff;text-decoration:none;
             border-radius:999px;font-weight:bold">
            Download your file
          </a>
        </p>

        <p style="font-size:13px;color:#666">
          This secure link will expire soon. If the button doesn’t work, copy and paste this link:<br/>
          <a href="${downloadUrl}">${downloadUrl}</a>
        </p>

        <hr style="margin:32px 0;border:none;border-top:1px solid #eee"/>

        <p style="font-size:12px;color:#777">
          Order ID: ${orderId || ''}<br/>
          License: ${license || 'N/A'}<br/>
          Format: ${format || 'N/A'}<br/><br/>
          © ${new Date().getFullYear()} Jeevan Chandimal<br/>
          This is an automated email. Please keep it for your records.
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

    console.log('Email sent:', result?.id || 'ok', 'to:', to)
  } catch (err) {
    console.error('Email send failed:', err)
  }
}
