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
    })

    // 2) Auto-reply to the sender
    await transporter.sendMail({
      from: `"Jeevan Chandimal" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `Thanks for contacting Jeevan Chandimal`,
      text: `Hi ${name},

Thanks for reaching out to Jeevan Chandimal.

I’ve received your message and will get back to you as soon as possible.

— Jeevan Chandimal
www.jeevanchandimal.com
`,
    })

    return res.status(200).json({ message: 'Message sent successfully' })
  } catch (error) {
    console.error('CONTACT EMAIL ERROR:', error)
    return res.status(500).json({
      message: error.message || 'Email sending failed',
    })
  }
}
