import nodemailer from 'nodemailer'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { name, email, message } = req.body || {}

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Missing fields' })
  }

  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    return res.status(500).json({
      message: 'EMAIL_USER / EMAIL_PASS missing in Vercel',
    })
  }

  try {
    const transporter = nodemailer.createTransport({
      host: 'smtpout.secureserver.net',
      port: 587,
      secure: false, // STARTTLS
      auth: {
        user: process.env.EMAIL_USER, // info@jeevanchandimal.com
        pass: process.env.EMAIL_PASS, // GoDaddy email password
      },
    })

    await transporter.verify()

    // 1) Send message to you (site owner)
    await transporter.sendMail({
      from: `"Website Contact" <${process.env.EMAIL_USER}>`,
      to: 'info@jeevanchandimal.com',
      replyTo: email,
      subject: `New Contact Message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: Arial, Helvetica, sans-serif; line-height: 1.6;">
          <h2 style="margin:0 0 12px;">New contact message</h2>
          <p style="margin:0 0 6px;"><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p style="margin:0 0 6px;"><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p style="margin:12px 0 6px;"><strong>Message:</strong></p>
          <div style="white-space:pre-wrap; padding:12px; border:1px solid #ddd; border-radius:8px;">
            ${escapeHtml(message)}
          </div>
        </div>
      `,
    })

    // 2) Auto-reply (HTML)
    const safeName = name?.trim() ? name.trim() : 'there'

    const autoReplySubject = 'Thanks for contacting Jeevan Chandimal'

    const autoReplyText = `Hi ${safeName},

Thanks for reaching out to Jeevan Chandimal.

I’ve received your message and will get back to you as soon as possible.

— Jeevan Chandimal
www.jeevanchandimal.com
`

    const autoReplyHtml = `
      <div style="margin:0; padding:0; background:#222222;">
        <div style="max-width:640px; margin:0 auto; padding:24px;">
          <div style="background:#1b1b1b; border:1px solid rgba(245,244,244,0.12); border-radius:16px; padding:22px;">
            
            <div style="text-align:center; margin-bottom:18px;">
              <div style="display:inline-block; padding:10px 14px; border-radius:999px; border:1px solid rgba(245,244,244,0.18); color:#F5F4F4; font-family: Arial, Helvetica, sans-serif; font-size:13px; letter-spacing:0.4px;">
                Jeevan Chandimal
              </div>
            </div>

            <h2 style="margin:0 0 10px; color:#F5F4F4; font-family: Arial, Helvetica, sans-serif; font-size:22px;">
              Thanks for contacting me
            </h2>

            <p style="margin:0 0 14px; color:#F5F4F4; opacity:0.92; font-family: Arial, Helvetica, sans-serif; font-size:15px; line-height:1.7;">
              Hi ${escapeHtml(safeName)},<br/>
              I’ve received your message and I’ll get back to you as soon as possible.
            </p>

            <div style="margin:16px 0; padding:14px; border-radius:12px; background:#222222; border:1px solid rgba(245,244,244,0.12);">
              <p style="margin:0; color:#F5F4F4; opacity:0.9; font-family: Arial, Helvetica, sans-serif; font-size:13px; line-height:1.7;">
                <strong style="color:#F5F4F4;">Your message:</strong><br/>
                <span style="white-space:pre-wrap;">${escapeHtml(message)}</span>
              </p>
            </div>

            <a href="https://www.jeevanchandimal.com"
              style="display:inline-block; margin-top:10px; padding:12px 16px; border-radius:999px; text-decoration:none; background:#F5F4F4; color:#222222; font-family: Arial, Helvetica, sans-serif; font-size:14px; font-weight:bold;">
              Visit my website
            </a>

            <p style="margin:18px 0 0; color:#F5F4F4; opacity:0.8; font-family: Arial, Helvetica, sans-serif; font-size:13px;">
              — Jeevan Chandimal
            </p>
          </div>

          <p style="margin:14px 0 0; text-align:center; color:#F5F4F4; opacity:0.6; font-family: Arial, Helvetica, sans-serif; font-size:12px;">
            This is an automatic reply confirming we received your message.
          </p>
        </div>
      </div>
    `

    await transporter.sendMail({
      from: `"Jeevan Chandimal" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: autoReplySubject,
      text: autoReplyText,
      html: autoReplyHtml,
    })

    return res.status(200).json({ message: 'Message sent successfully' })
  } catch (error) {
    console.error('CONTACT EMAIL ERROR:', error)
    return res.status(500).json({
      message: error.message || 'Email sending failed',
    })
  }
}

// Simple HTML escape to prevent HTML injection in emails
function escapeHtml(input) {
  return String(input || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}
