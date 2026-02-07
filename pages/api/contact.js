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
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })

    await transporter.verify()

    // 1️⃣ Email to you
    await transporter.sendMail({
      from: `"Website Contact" <${process.env.EMAIL_USER}>`,
      to: 'info@jeevanchandimal.com',
      replyTo: email,
      subject: `New Contact Message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    })

    // 2️⃣ Auto-reply with logo
    await transporter.sendMail({
      from: `"Jeevan Chandimal" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Thanks for contacting Jeevan Chandimal',
      html: `
        <div style="background:#222222;padding:24px
