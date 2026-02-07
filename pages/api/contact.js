import nodemailer from 'nodemailer'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { name, email, message } = req.body

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Missing fields' })
  }

  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.titan.email',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER, // info@jeevanchandimal.com
        pass: process.env.EMAIL_PASS, // Titan email password
      },
    })

    await transporter.sendMail({
      from: `"Website Contact" <info@jeevanchandimal.com>`,
      to: 'info@jeevanchandimal.com',
      replyTo: email,
      subject: `New Contact Message from ${name}`,
      text: `
Name: ${name}
Email: ${email}

Message:
${message}
      `,
    })

    return res.status(200).json({ message: 'Message sent successfully' })
  } catch (error) {
    console.error('TITAN EMAIL ERROR:', error)

    return res.status(500).json({
      message: 'Email sending failed. Please try again later.',
    })
  }
}
