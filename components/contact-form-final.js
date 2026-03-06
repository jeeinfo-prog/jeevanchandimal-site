import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const ContactFormFinal = (props) => {
  // time-trap: record when form first rendered
  const [formStartTs] = React.useState(() => Date.now())
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  return (
    <>
      <section className={`cff-wrap ${props.rootClassName || ''}`}>
        <div className="cff-shell">
          {/* LEFT: cinematic video */}
          <div className="cff-media">
            <div className="cff-mediaFrame">
              <div className="cff-mediaBg" aria-hidden="true">
                <div className="cff-mediaVignette" />
                <div className="cff-mediaGrain" />
              </div>

              <video
                src={props.videoSrc}
                loop
                muted
                autoPlay
                playsInline
                poster="https://play.teleporthq.io/static/svg/videoposter.svg"
                className="cff-video"
              />
            </div>
          </div>

          {/* RIGHT: premium form panel */}
          <div className="cff-panel">
            <div className="cff-kickerRow">
              <span className="cff-kicker">GET IN TOUCH</span>
              <span className="cff-line" />
            </div>

            <h2 className="cff-title thq-heading-2">
              {props.heading1 ?? (
                <Fragment>
                  <span className="contact-form-final-text1">Contact us</span>
                </Fragment>
              )}
            </h2>

            <p className="cff-subtitle thq-heading-3">
              {props.content2 ?? (
                <Fragment>
                  <span className="contact-form-final-text2">Get in touch with us</span>
                </Fragment>
              )}
            </p>

            <p className="cff-copy thq-body-large">
              {props.content1 ?? (
                <Fragment>
                  <span className="contact-form-final-text3">
                    Do not hesitate to contact us. We look forward to hearing from you!
                  </span>
                </Fragment>
              )}
            </p>

            <div className="cff-divider" aria-hidden="true" />

            <form
              className="cff-form"
              onSubmit={async (e) => {
                e.preventDefault()
                if (isSubmitting) return

                const form = e.currentTarget

                const data = {
                  name: form['contact-form-3-name']?.value || '',
                  email: form['contact-form-3-email']?.value || '',
                  message: form['contact-form-3-message']?.value || '',
                  company: form['company']?.value || '',
                  formStartTs,
                }

                try {
                  setIsSubmitting(true)

                  const res = await fetch('/api/contact', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data),
                  })

                  if (res.ok) {
                    alert('Message sent successfully!')
                    form.reset()
                  } else {
                    const err = await res.json().catch(() => null)
                    alert(err?.message || 'Something went wrong. Please try again.')
                  }
                } catch (error) {
                  alert('Something went wrong. Please try again.')
                } finally {
                  setIsSubmitting(false)
                }
              }}
            >
              {/* honeypot */}
              <input
                type="text"
                name="company"
                tabIndex="-1"
                autoComplete="off"
                aria-hidden="true"
                className="cff-honeypot"
              />

              <div className="cff-field">
                <label htmlFor="contact-form-3-name" className="cff-label">
                  Name
                </label>
                <input
                  type="text"
                  id="contact-form-3-name"
                  name="contact-form-3-name"
                  placeholder="Your name"
                  className="cff-input"
                  required
                />
              </div>

              <div className="cff-field">
                <label htmlFor="contact-form-3-email" className="cff-label">
                  Email
                </label>
                <input
                  type="email"
                  id="contact-form-3-email"
                  name="contact-form-3-email"
                  placeholder="Your email"
                  className="cff-input"
                  required
                />
              </div>

              <div className="cff-field">
                <label htmlFor="contact-form-3-message" className="cff-label">
                  Message
                </label>
                <textarea
                  id="contact-form-3-message"
                  name="contact-form-3-message"
                  rows="5"
                  placeholder="Tell me about your project"
                  className="cff-textarea"
                  required
                />
              </div>

              <label className="cff-checkRow" htmlFor="contact-form-3-check">
                <input
                  type="checkbox"
                  id="contact-form-3-check"
                  name="contact-form-3-check"
                  className="cff-checkbox"
                  required
                />
                <span className="cff-checkText">I accept the Terms</span>
              </label>

              <button
                type="submit"
                className="cff-button"
                disabled={isSubmitting}
              >
                <span className="cff-buttonText">
                  {isSubmitting
                    ? 'Sending...'
                    : props.action ?? (
                        <Fragment>
                          <span className="contact-form-final-text4">Submit</span>
                        </Fragment>
                      )}
                </span>
                <span className="cff-arrow" aria-hidden="true">
                  →
                </span>
              </button>
            </form>
          </div>
        </div>
      </section>

      <style jsx>{`
        .cff-wrap {
          width: 100%;
        }

        .cff-shell {
          width: 100%;
          display: grid;
          grid-template-columns: 1.08fr 0.92fr;
          align-items: stretch;
          gap: 28px;
        }

        .cff-media {
          width: 100%;
          display: flex;
          align-items: stretch;
        }

        .cff-mediaFrame {
          width: 100%;
          min-height: 560px;
          position: relative;
          overflow: hidden;
          border-radius: 22px;
          border: 1px solid rgba(245, 244, 244, 0.08);
          background: rgba(10, 10, 10, 0.45);
          box-shadow: 0 18px 50px rgba(0, 0, 0, 0.35);
        }

        .cff-mediaBg {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 1;
        }

        .cff-mediaVignette {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(
              80% 70% at 50% 20%,
              rgba(255, 255, 255, 0.04),
              rgba(0, 0, 0, 0.44)
            ),
            linear-gradient(
              180deg,
              rgba(0, 0, 0, 0.08),
              rgba(0, 0, 0, 0.28)
            );
        }

        .cff-mediaGrain {
          position: absolute;
          inset: 0;
          opacity: 0.06;
          mix-blend-mode: overlay;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)' opacity='.35'/%3E%3C/svg%3E");
          background-size: 240px 240px;
        }

        .cff-video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .cff-panel {
          min-height: 560px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 14px;
          padding: 8px 0;
        }

        .cff-kickerRow {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .cff-kicker {
          font-size: 12px;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: rgba(245, 244, 244, 0.72);
          padding: 6px 10px;
          border-radius: 999px;
          border: 1px solid rgba(245, 244, 244, 0.12);
          background: rgba(0, 0, 0, 0.22);
          white-space: nowrap;
        }

        .cff-line {
          flex: 1;
          height: 1px;
          background: linear-gradient(
            90deg,
            rgba(245, 244, 244, 0.18),
            rgba(245, 244, 244, 0)
          );
        }

        .cff-title {
          margin: 0;
          color: #f5f4f4;
          line-height: 1.1;
          text-shadow: 0 16px 42px rgba(0, 0, 0, 0.55);
        }

        .cff-subtitle {
          margin: 0;
          color: rgba(245, 244, 244, 0.95);
          line-height: 1.25;
        }

        .cff-copy {
          margin: 0;
          color: rgba(245, 244, 244, 0.82);
          line-height: 1.8;
          max-width: 58ch;
        }

        .cff-divider {
          width: 100%;
          height: 1px;
          margin-top: 4px;
          margin-bottom: 2px;
          background: linear-gradient(
            90deg,
            rgba(245, 244, 244, 0.12),
            rgba(245, 244, 244, 0.04),
            rgba(245, 244, 244, 0.12)
          );
        }

        .cff-form {
          display: flex;
          flex-direction: column;
          gap: 14px;
          margin-top: 2px;
          position: relative;
        }

        .cff-field {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .cff-label {
          font-size: 13px;
          letter-spacing: 0.06em;
          color: rgba(245, 244, 244, 0.88);
        }

        .cff-input,
        .cff-textarea {
          width: 100%;
          border: 1px solid rgba(245, 244, 244, 0.08);
          background: rgba(255, 255, 255, 0.05);
          color: #f5f4f4;
          border-radius: 18px;
          outline: none;
          transition:
            border-color 180ms ease,
            box-shadow 180ms ease,
            background 180ms ease,
            transform 180ms ease;
          backdrop-filter: blur(8px);
        }

        .cff-input {
          height: 54px;
          padding: 0 18px;
        }

        .cff-textarea {
          min-height: 140px;
          resize: vertical;
          padding: 16px 18px;
        }

        .cff-input::placeholder,
        .cff-textarea::placeholder {
          color: rgba(245, 244, 244, 0.42);
        }

        .cff-input:focus,
        .cff-textarea:focus {
          border-color: rgba(37, 195, 226, 0.45);
          background: rgba(255, 255, 255, 0.07);
          box-shadow: 0 0 0 3px rgba(37, 195, 226, 0.08);
        }

        .cff-checkRow {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          margin-top: 2px;
          cursor: pointer;
          user-select: none;
        }

        .cff-checkbox {
          width: 16px;
          height: 16px;
          accent-color: #25c3e2;
        }

        .cff-checkText {
          color: rgba(245, 244, 244, 0.86);
          font-size: 14px;
          line-height: 1.4;
        }

        .cff-button {
          margin-top: 4px;
          align-self: flex-start;
          height: 44px;
          padding: 0 18px 0 20px;
          border-radius: 999px;
          border: 1px solid rgba(37, 195, 226, 0.32);
          background: linear-gradient(
            180deg,
            rgba(37, 195, 226, 0.22),
            rgba(37, 195, 226, 0.08)
          );
          color: #f5f4f4;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-size: 11px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          font-weight: 800;
          cursor: pointer;
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.28);
          transition:
            transform 180ms ease,
            border-color 180ms ease,
            background 180ms ease,
            box-shadow 180ms ease,
            opacity 180ms ease;
        }

        .cff-button:hover:not(:disabled) {
          transform: translateY(-1px);
          border-color: rgba(37, 195, 226, 0.55);
          background: linear-gradient(
            180deg,
            rgba(37, 195, 226, 0.28),
            rgba(37, 195, 226, 0.12)
          );
          box-shadow: 0 16px 28px rgba(0, 0, 0, 0.34);
        }

        .cff-button:disabled {
          opacity: 0.72;
          cursor: wait;
        }

        .cff-arrow {
          color: #25c3e2;
          font-size: 14px;
          line-height: 1;
        }

        .cff-honeypot {
          position: absolute;
          left: -5000px;
          top: auto;
          width: 1px;
          height: 1px;
          overflow: hidden;
          opacity: 0;
          pointer-events: none;
        }

        .contact-form-final-text1,
        .contact-form-final-text2,
        .contact-form-final-text3,
        .contact-form-final-text4 {
          display: inline-block;
        }

        @media (max-width: 991px) {
          .cff-shell {
            grid-template-columns: 1fr;
            gap: 22px;
          }

          .cff-mediaFrame,
          .cff-panel {
            min-height: auto;
          }

          .cff-mediaFrame {
            min-height: 360px;
          }
        }

        @media (max-width: 767px) {
          .cff-mediaFrame {
            min-height: 280px;
            border-radius: 18px;
          }

          .cff-button {
            width: 100%;
            justify-content: center;
          }

          .cff-line {
            display: none;
          }
        }
      `}</style>
    </>
  )
}

ContactFormFinal.defaultProps = {
  heading1: undefined,
  content1: undefined,
  content2: undefined,
  action: undefined,
  rootClassName: '',
  videoSrc: '/JC/jeevan%20chandimal%20logo.mp4',
}

ContactFormFinal.propTypes = {
  heading1: PropTypes.element,
  content1: PropTypes.element,
  content2: PropTypes.element,
  action: PropTypes.element,
  rootClassName: PropTypes.string,
  videoSrc: PropTypes.string,
}

export default ContactFormFinal