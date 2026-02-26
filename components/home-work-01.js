import React, { Fragment } from 'react'
import Link from 'next/link'
import PropTypes from 'prop-types'

const HomeWork01 = (props) => {
  return (
    <>
      <section className={`hw thq-section-padding ${props.rootClassName || ''}`}>
        <div className="hwMax thq-section-max-width">
          <div className="hwHeader">
            <span className="kicker">DISCIPLINES</span>
            <h2 className="title">Core Work</h2>
            <p className="desc">
              Film, sound, motion, and still imagery — crafted with atmosphere, restraint, and
              narrative intent.
            </p>
          </div>

          <div className="grid">
            {/* FILM */}
            <Link href="/work-film" legacyBehavior>
              <a className="card" aria-label="Film Production — View work">
                <div className="imgWrap">
                  <img
                    alt={props.feature1ImageAlt}
                    src={props.feature1ImageSrc || '/home/hw-01.jpg'}
                    className="img"
                    loading="lazy"
                  />
                  <div className="shade" />
                  <div className="badge">01</div>
                </div>

                <div className="content">
                  <h3 className="h3">
                    {props.feature1Title ?? (
                      <Fragment>
                        <span className="t">Film Production</span>
                      </Fragment>
                    )}
                  </h3>

                  <p className="p thq-body-small">
                    {props.feature1Description ?? (
                      <Fragment>
                        <span className="t">
                          Stories shaped through light, pacing, and cinematic presence.
                        </span>
                      </Fragment>
                    )}
                  </p>

                  <div className="cta">
                    <span className="ctaText">
                      {props.feature1Button ?? (
                        <Fragment>
                          <span className="t">View Work</span>
                        </Fragment>
                      )}
                    </span>
                    <span className="arrow" aria-hidden="true">
                      →
                    </span>
                  </div>
                </div>
              </a>
            </Link>

            {/* AUDIO */}
            <Link href="/work-audio" legacyBehavior>
              <a className="card" aria-label="Audio Production — View work">
                <div className="imgWrap">
                  <img
                    alt={props.feature2ImageAlt}
                    src={props.feature2ImageSrc || '/home/hw-02.jpg'}
                    className="img"
                    loading="lazy"
                  />
                  <div className="shade" />
                  <div className="badge">02</div>
                </div>

                <div className="content">
                  <h3 className="h3">
                    {props.feature2Title ?? (
                      <Fragment>
                        <span className="t">Audio Production</span>
                      </Fragment>
                    )}
                  </h3>

                  <p className="p thq-body-small">
                    {props.feature2Description ?? (
                      <Fragment>
                        <span className="t">
                          Sound design and mixing that supports emotion and depth.
                        </span>
                      </Fragment>
                    )}
                  </p>

                  <div className="cta">
                    <span className="ctaText">
                      {props.feature2Button ?? (
                        <Fragment>
                          <span className="t">View Work</span>
                        </Fragment>
                      )}
                    </span>
                    <span className="arrow" aria-hidden="true">
                      →
                    </span>
                  </div>
                </div>
              </a>
            </Link>

            {/* ANIMATION */}
            <Link href="/work-animation" legacyBehavior>
              <a className="card" aria-label="Animation & Motion — View work">
                <div className="imgWrap">
                  <img
                    alt={props.feature3ImageAlt}
                    src={props.feature3ImageSrc || '/home/hw-03.jpg'}
                    className="img"
                    loading="lazy"
                  />
                  <div className="shade" />
                  <div className="badge">03</div>
                </div>

                <div className="content">
                  <h3 className="h3">
                    {props.feature3Title ?? (
                      <Fragment>
                        <span className="t">Animation &amp; Motion</span>
                      </Fragment>
                    )}
                  </h3>

                  <p className="p thq-body-small">
                    {props.feature3Description ?? (
                      <Fragment>
                        <span className="t">
                          Motion crafted with rhythm, clarity, and intentional detail.
                        </span>
                      </Fragment>
                    )}
                  </p>

                  <div className="cta">
                    <span className="ctaText">
                      {props.feature3Button ?? (
                        <Fragment>
                          <span className="t">View Work</span>
                        </Fragment>
                      )}
                    </span>
                    <span className="arrow" aria-hidden="true">
                      →
                    </span>
                  </div>
                </div>
              </a>
            </Link>

            {/* PHOTO */}
            <Link href="/work-photography" legacyBehavior>
              <a className="card" aria-label="Photography — View work">
                <div className="imgWrap">
                  <img
                    alt={props.feature4ImageAlt}
                    src={props.feature4ImageSrc || '/home/hw-04.jpg'}
                    className="img"
                    loading="lazy"
                  />
                  <div className="shade" />
                  <div className="badge">04</div>
                </div>

                <div className="content">
                  <h3 className="h3">
                    {props.feature4Title ?? (
                      <Fragment>
                        <span className="t">Photography</span>
                      </Fragment>
                    )}
                  </h3>

                  <p className="p thq-body-small">
                    {props.feature4Description ?? (
                      <Fragment>
                        <span className="t">
                          Still imagery with cinematic tone, texture, and atmosphere.
                        </span>
                      </Fragment>
                    )}
                  </p>

                  <div className="cta">
                    <span className="ctaText">
                      {props.feature4Button ?? (
                        <Fragment>
                          <span className="t">View Work</span>
                        </Fragment>
                      )}
                    </span>
                    <span className="arrow" aria-hidden="true">
                      →
                    </span>
                  </div>
                </div>
              </a>
            </Link>
          </div>
        </div>
      </section>

      <style jsx>{`
        .hw {
          width: 100%;
          position: relative;
          overflow: visible; /* ✅ keep sticky nav working */
          padding-top: 72px; /* less aggressive than 112 */
        }

        .hwMax {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 22px;
          align-items: center;
        }

        .hwHeader {
          width: 100%;
          text-align: center;
          max-width: 980px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .kicker {
          font-size: 11px;
          letter-spacing: 0.28em;
          font-weight: 900;
          color: rgba(245, 244, 244, 0.72);
        }

        .title {
          margin: 0;
          font-size: 34px;
          color: #f5f4f4;
          letter-spacing: -0.02em;
          text-shadow: 0 18px 42px rgba(0, 0, 0, 0.42);
        }

        .desc {
          margin: 4px auto 0;
          color: rgba(245, 244, 244, 0.76);
          line-height: 1.7;
          font-size: 15px;
          max-width: 70ch;
        }

        .grid {
          width: 100%;
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          gap: 14px;
        }

        .card {
          grid-column: span 6;
          display: flex;
          flex-direction: column;
          border-radius: 18px;
          overflow: hidden;
          text-decoration: none !important;
          border: 1px solid rgba(245, 244, 244, 0.1);
          background: rgba(10, 10, 10, 0.55);
          box-shadow: 0 18px 40px rgba(0, 0, 0, 0.42);
          transition: transform 220ms ease, border-color 220ms ease;
          transform: translateZ(0);
        }

        .imgWrap {
          position: relative;
          height: 280px;
          overflow: hidden;
          background: #0b0b0b;
        }

        .img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transform: scale(1.03);
          filter: saturate(0.92) contrast(1.06) brightness(0.9);
          transition: transform 600ms ease, filter 600ms ease;
        }

        .shade {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            rgba(0, 0, 0, 0.12) 0%,
            rgba(0, 0, 0, 0.05) 45%,
            rgba(0, 0, 0, 0.65) 100%
          );
          pointer-events: none;
        }

        .badge {
          position: absolute;
          left: 14px;
          top: 14px;
          font-size: 11px;
          font-weight: 900;
          letter-spacing: 0.18em;
          color: #25c3e2;
          border: 1px solid rgba(37, 195, 226, 0.35);
          background: rgba(37, 195, 226, 0.1);
          padding: 7px 10px;
          border-radius: 999px;
          box-shadow: 0 10px 22px rgba(0, 0, 0, 0.35);
        }

        .content {
          padding: 16px 16px 18px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          align-items: center;
          text-align: center;
        }

        .h3 {
          margin: 0;
          color: #f5f4f4;
          font-size: 18px;
          letter-spacing: -0.01em;
        }

        .p {
          margin: 0;
          color: rgba(245, 244, 244, 0.76);
          line-height: 1.65;
          font-size: 14px;
          max-width: 52ch;
        }

        .cta {
          margin-top: 6px;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 10px 14px;
          border-radius: 999px;
          border: 1px solid rgba(245, 244, 244, 0.14);
          background: rgba(255, 255, 255, 0.03);
          color: rgba(245, 244, 244, 0.9);
          font-size: 12px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          transition: background 200ms ease, border-color 200ms ease, transform 200ms ease;
        }

        .arrow {
          color: #25c3e2;
          font-weight: 900;
          transform: translateY(-1px);
        }

        .card:hover {
          transform: translateY(-2px);
          border-color: rgba(37, 195, 226, 0.22);
        }

        .card:hover .img {
          transform: scale(1.09);
          filter: saturate(1) contrast(1.1) brightness(0.98);
        }

        .card:hover .cta {
          background: rgba(245, 244, 244, 0.06);
          border-color: rgba(37, 195, 226, 0.22);
          transform: translateY(-1px);
        }

        @media (max-width: 991px) {
          .card {
            grid-column: span 12;
          }
          .imgWrap {
            height: 260px;
          }
        }

        @media (max-width: 520px) {
          .imgWrap {
            height: 220px;
          }
        }
      `}</style>
    </>
  )
}

HomeWork01.defaultProps = {
  rootClassName: '',

  // ✅ defaults to /public/home/ filenames
  feature1ImageAlt: 'Film Production',
  feature2ImageAlt: 'Audio Production',
  feature3ImageAlt: 'Animation & Motion',
  feature4ImageAlt: 'Photography',

  feature1ImageSrc: '/home/hw-01.jpg',
  feature2ImageSrc: '/home/hw-02.jpg',
  feature3ImageSrc: '/home/hw-03.jpg',
  feature4ImageSrc: '/home/hw-04.jpg',

  feature1Title: undefined,
  feature2Title: undefined,
  feature3Title: undefined,
  feature4Title: undefined,

  feature1Description: undefined,
  feature2Description: undefined,
  feature3Description: undefined,
  feature4Description: undefined,

  feature1Button: undefined,
  feature2Button: undefined,
  feature3Button: undefined,
  feature4Button: undefined,
}

HomeWork01.propTypes = {
  rootClassName: PropTypes.string,

  feature1ImageAlt: PropTypes.string,
  feature2ImageAlt: PropTypes.string,
  feature3ImageAlt: PropTypes.string,
  feature4ImageAlt: PropTypes.string,

  feature1ImageSrc: PropTypes.string,
  feature2ImageSrc: PropTypes.string,
  feature3ImageSrc: PropTypes.string,
  feature4ImageSrc: PropTypes.string,

  feature1Title: PropTypes.element,
  feature2Title: PropTypes.element,
  feature3Title: PropTypes.element,
  feature4Title: PropTypes.element,

  feature1Description: PropTypes.element,
  feature2Description: PropTypes.element,
  feature3Description: PropTypes.element,
  feature4Description: PropTypes.element,

  feature1Button: PropTypes.element,
  feature2Button: PropTypes.element,
  feature3Button: PropTypes.element,
  feature4Button: PropTypes.element,
}

export default HomeWork01