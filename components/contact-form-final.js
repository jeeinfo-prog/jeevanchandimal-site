import React from 'react'

const ContactFormFinal = (props) => {
  return (
    <form
      className="contact-form-form"
      onSubmit={async (e) => {
        e.preventDefault()

        const data = {
          name: e.target.name.value,
          email: e.target.email.value,
          message: e.target.message.value,
        }

        const res = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        })

        if (res.ok) {
          alert('Message sent successfully!')
          e.target.reset()
        } else {
          alert('Something went wrong. Please try again.')
        }
      }}
    >
      {/* Name */}
      <input
        type="text"
        name="name"
        required
        placeholder="Your Name"
        className="thq-input"
      />

      {/* Email */}
      <input
        type="email"
        name="email"
        required
        placeholder="Your Email"
        className="thq-input"
      />

      {/* Message */}
      <textarea
        name="message"
        required
        placeholder="Your Message"
        className="textarea"
      ></textarea>

      {/* Submit */}
      <button type="submit" className="thq-button-filled">
        Send Message
      </button>
    </form>
  )
}

export default ContactFormFinal
