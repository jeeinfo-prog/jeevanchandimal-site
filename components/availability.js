import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'

const Availability = (props) => {
  return (
    <>
      <section className="availabilityWrap thq-section-padding">
        <div className="thq-section-max-width">
          {/* cinematic divider */}
          <div className="cineDivider" aria-hidden="true" />

          <div className="availability-thq-container-elm">
            <div className="availability-thq-content-elm">
              {/* status badge */}
              <div className="badgeRow">
                <span className={`availabilityBadge ${props.statusTone || 'toneCyan'}`}>
                  <span className="dot" aria-hidden="true" />
                  {props.statusText ?? (
                    <Fragment>
                      <span className="availability-text20">Available for select projects</span>
                    </Fragment>
                  )}
                </span>
              </div>

              <span className="thq-heading-2">
                {props.heading1 ?? (
                  <Fragment>
                    <span className="availability-text17">Availability</span>
                  </Fragment>
                )}
              </span>

              <span className="thq-heading-3">
                {props.heading11 ?? (
                  <Fragment>
                    <span className="availability-text15">
                      Available for select projects.
                    </span>
                  </Fragment>
                )}
              </span>

              <p className="thq-body-large">
                {props.content1 ?? (
                  <Fragment>
                    <span className="availability-text19">
                      If you’d like to collaborate or discuss an idea, feel free to reach out.
                    </span>
                  </Fragment>
                )}
              </p>
            </div>

            {/* ✅ Single CTA */}
            <div className="availability-thq-actions-elm">
              <Link href="/contact" className="availability-cta">
                <span className="ctaLabel">
                  {props.action2 ?? (
                    <Fragment>
                      <span className="availability-text18">Contact Me</span>
                    </Fragment>
                  )}
                </span>
                <span className="ctaArrow" aria-hidden="true">
                  →
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .availabilityWrap {
          width: 100%;
          position: relative;
        }

        /* cinematic divider */
        .cineDivider {
          width: 100%;
          height: 1px;
          margin: 0 0 var(--dl-layout-space-threeunits);
          background: linear-gradient(
            90deg,
            transparent,
            rgba(245, 244, 244, 0.12),
            transparent
          );
        }

        .availability-thq-container-elm {
          gap: var(--dl-layout-space-oneandhalfunits);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .availability-thq-content-elm {
          gap: var(--dl-layout-space-oneandhalfunits);
          display: flex;
          align-items: flex-start;
          flex-direction: column;
          max-width: 760px;
        }

        .availability-thq-actions-elm {
          flex: 1;
          display: flex;
          justify-content: flex-end;
          align-items: center;
        }

        /* badge row */
        .badgeRow {
          display: flex;
          width: 100%;
        }

        .availabilityBadge {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 10px 12px;
          border-radius: 999px;
          font-size: 12px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(245, 244, 244, 0.12);
          background: rgba(255, 255, 255, 0.04);
          color: rgba(245, 244, 244, 0.92);
        }

        .dot {
          width: 8px;
          height: 8px;
          border-radius: 999px;
          background: rgba(245, 244, 244, 0.6);
          box-shadow: 0 0 0 4px rgba(245, 244, 244, 0.08);
        }

        /* tones */
        .toneCyan {
          background: linear-gradient(
            180deg,
            rgba(37, 195, 226, 0.18),
            rgba(37, 195, 226, 0.06)
          );
          border-color: rgba(37, 195, 226, 0.22);
          color: #25c3e2;
        }
        .toneCyan .dot {
          background: #25c3e2;
          box-shadow: 0 0 0 4px rgba(37, 195, 226, 0.12);
        }

        .toneAmber {
          background: linear-gradient(180deg, rgba(255, 193, 7, 0.16), rgba(255, 193, 7, 0.06));
          border-color: rgba(255, 193, 7, 0.22);
          color: rgba(255, 193, 7, 0.95);
        }
        .toneAmber .dot {
          background: rgba(255, 193, 7, 0.95);
          box-shadow: 0 0 0 4px rgba(255, 193, 7, 0.12);
        }

        .toneRed {
          background: linear-gradient(180deg, rgba(255, 76, 76, 0.16), rgba(255, 76, 76, 0.06));
          border-color: rgba(255, 76, 76, 0.22);
          color: rgba(255, 120, 120, 0.95);
        }
        .toneRed .dot {
          background: rgba(255, 120, 120, 0.95);
          box-shadow: 0 0 0 4px rgba(255, 120, 120, 0.12);
        }

        /* CTA (your .mLink cinematic cyan style + polish) */
        .availability-cta {
          color: #25c3e2 !important;
          text-decoration: none !important;
          padding: 14px 18px;
          border-radius: 14px;
          background: linear-gradient(
            180deg,
            rgba(37, 195, 226, 0.22),
            rgba(37, 195, 226, 0.1)
          );
          border: 1px solid rgba(37, 195, 226, 0.22);
          opacity: 1;
          font-weight: 700;
          box-shadow: 0 8px 18px rgba(37, 195, 226, 0.08);
          display: inline-flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          transition: transform 180ms ease, background 180ms ease, box-shadow 180ms ease,
            opacity 180ms ease;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          font-size: 13px;
          will-change: transform;
        }

        .availability-cta:hover {
          opacity: 1;
          transform: translateY(-1px);
          background: linear-gradient(
            180deg,
            rgba(37, 195, 226, 0.28),
            rgba(37, 195, 226, 0.12)
          );
          box-shadow: 0 14px 26px rgba(37, 195, 226, 0.12);
        }

        .availability-cta:active {
          transform: translateY(0px);
        }

        .availability-cta:focus-visible {
          outline: 2px solid rgba(37, 195, 226, 0.6);
          outline-offset: 2px;
        }

        .ctaLabel {
          display: inline-flex;
          align-items: center;
        }

        .ctaArrow {
          font-size: 18px;
          line-height: 1;
        }

        .availability-text15,
        .availability-text17,
        .availability-text18,
        .availability-text19,
        .availability-text20 {
          display: inline-block;
        }

        @media (max-width: 991px) {
          .availability-thq-container-elm {
            flex-direction: column;
            align-items: flex-start;
            gap: var(--dl-layout-space-oneandhalfunits);
          }

          .availability-thq-actions-elm {
            width: 100%;
            justify-content: flex-start;
          }
        }
      `}</style>
    </>
  )
}

Availability.defaultProps = {
  heading11: undefined,
  action2: undefined,
  heading1: undefined,
  content1: undefined,

  // ✅ new
  statusText: undefined,
  statusTone: 'toneCyan', // toneCyan | toneAmber | toneRed
}

Availability.propTypes = {
  heading11: PropTypes.element,
  action2: PropTypes.element,
  heading1: PropTypes.element,
  content1: PropTypes.element,

  // ✅ new
  statusText: PropTypes.element,
  statusTone: PropTypes.oneOf(['toneCyan', 'toneAmber', 'toneRed']),
}

export default Availability