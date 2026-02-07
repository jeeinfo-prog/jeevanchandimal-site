import nodemailer from 'nodemailer'

export default async function handler(req, res) {
  // Allow only POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { name, email, message } = req.body || {}

  // Validate fields
  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Missing fields' })
  }

  // Check environment variables
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    return res.status(500).json({
      message: 'Email credentials not configured on server',
    })
  }

  try {
    // Titan SMTP configuration
    const transporter = nodemailer.createTransport({
      host: 'smtp.titan.email',
      port: 587,
      secure: false, // STARTTLS
      auth: {
        user: process.env.EMAIL_USER, // info@jeevanchandimal.com
        pass: process.env.EMAIL_PASS, // Titan email password
      },
    })

    // Verify SMTP connection
    await transporter.verify()

    // Send email
    await transporter.sendMail({
      from: `"Website Contact" <${process.env.EMAIL_USER}>`,
      to: 'info@jeevanchandimal.com',
      replyTo: email,
      subject: `New Contact Message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    })

    return res.status(200).json({ message: 'Message sent successfully' })
  } catch (error) {
    console.error('CONTACT EMAIL ERROR:', error)

    return res.status(500).json({
      message: error.message || 'Email sending failed',
    })
  }
}
