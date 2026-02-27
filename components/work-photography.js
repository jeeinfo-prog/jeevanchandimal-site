import React, { Fragment, useMemo } from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'

const WorkPhotography = (props) => {
  // ✅ Edit only this list to update images / titles / links
  // Put images in: /public/work/photography/wp-01.jpg (etc)
  const ITEMS = useMemo(
    () => [
      {
        key: 'feature1',
        img: '/work/photography/wp-01.jpg',
        alt: 'Cinematic gallery',
        title: 'Cinematic gallery',
        desc:
          'A mood-driven selection shaped by light, texture, and cinematic framing.',
        href: '/work-photography/cinematic',
        cta: 'Explore',
      },
      {
        key: 'feature2',
        img: '/work/photography/wp-02.jpg',
        alt: 'Editorial',
        title: 'Editorial',
        desc:
          'Editorial storytelling with a clean visual language and strong narrative rhythm.',
        href: '/work-photography/editorial',
        cta: 'Discover',
      },
      {
        key: 'feature3',
        img: '/work/photography/wp-03.jpg',
        alt: 'Personal projects',
        title: 'Personal projects',
        desc:
          'Personal explorations, experiments, and long-form photographic studies.',
        href: '/work-photography/personal',
        cta: 'View',
      },
      {
        key: 'feature4',
        img: '/work/photography/wp-04.jpg',
        alt: 'Stock previews',
        title: 'Stock previews',
        desc:
          'Curated previews available for licensing — cohesive sets and standalone frames.',
        href: '/work-photography/stock',
        cta: 'Browse',
      },
    ],
    []
  )

  // Optional: allow props override (if you still want to control from outside)
  const sectionTitleNode =
    props.sectionTitle ?? (
      <Fragment>
        <span className="titleText">Photography</span>
      </Fragment>
    )

  const descriptionNode =
    props.text ?? (
      <Fragment>
        <span>
          This archive brings together photographic work shaped by light,
          atmosphere, and quiet observation. Each image is created with a
          cinematic sensibility — focused on mood, texture, and the emotional
          weight of a moment.
          <br />
          <br />
          The collection spans personal exploration, editorial storytelling, and
          curated imagery available for licensing, presented as distinct but
          connected bodies of work.
        </span>
      </Fragment>
    )

  return (
    <>
      <section className="wrap thq-section-padding">
        <div className="shell thq-section-max-width">
          <header className="head">
            <h2 className="title thq-heading-2">{sectionTitleNode}</h2>
            <p className="desc thq-body-small">{descriptionNode}</p>
          </header>

          <div className="grid">
            {ITEMS.map((it) => (
              <article key={it.key} className="card">
                <Link href={it.href} className="media" aria-label={it.title}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img className="img" src={it.img} alt={it.alt} />
                  <div className="shade" />
                  <div className="badge">Photography</div>
                </Link>

                <div className="body">
                  <div className="top">
                    <h3 className="cardTitle thq-heading-3">{it.title}</h3>
                    <p className="cardDesc thq-body-small">{it.desc}</p>
                  </div>

                  <div className="actions">
                    <Link href={it.href} className="btn">
                      <span className="thq-body-small">{it.cta}</span>
                      <svg viewBox="0 0 1024 1024" className="icon">
                        <path d="M426 256l256 256-256 256-60-60 196-196-196-196z" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <style jsx>{`
        .wrap {
          width: 100%;
          position: relative;
          overflow: hidden;
        }

        .shell {
          display: flex;
          flex-direction: column;
          gap: 26px;
        }

        .head {
          text-align: center;
          max-width: 860px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .titleText {
          display: inline-block;
          letter-spacing: 0.2px;
        }

        .title {
          margin: 0;
        }

        .desc {
          margin: 0;
          opacity: 0.88;
          line-height: 1.65;
        }

        .grid {
          width: 100%;
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          gap: 18px;
        }

        .card {
          grid-column: span 3;
          border: 1px solid rgba(245, 244, 244, 0.1);
          border-radius: 18px;
          overflow: hidden;
          background: rgba(34, 34, 34, 0.35);
          backdrop-filter: blur(10px);
          transition: transform 0.18s ease, border-color 0.18s ease,
            box-shadow 0.18s ease;
          display: flex;
          flex-direction: column;
          min-height: 100%;
        }

        .card:hover {
          transform: translateY(-3px);
          border-color: rgba(120, 166, 255, 0.35);
          box-shadow: 0 18px 40px rgba(0, 0, 0, 0.35);
        }

        .media {
          position: relative;
          display: block;
          overflow: hidden;
          aspect-ratio: 4 / 3;
          background: rgba(0, 0, 0, 0.25);
        }

        .img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transform: scale(1.02);
          transition: transform 0.28s ease;
        }

        .card:hover .img {
          transform: scale(1.07);
        }

        .shade {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0.0),
            rgba(0, 0, 0, 0.55)
          );
          pointer-events: none;
        }

        .badge {
          position: absolute;
          left: 12px;
          top: 12px;
          font-size: 12px;
          letter-spacing: 0.3px;
          padding: 7px 10px;
          border-radius: 999px;
          border: 1px solid rgba(245, 244, 244, 0.14);
          background: rgba(0, 0, 0, 0.35);
          backdrop-filter: blur(8px);
        }

        .body {
          padding: 14px 14px 16px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 14px;
          flex: 1;
        }

        .top {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .cardTitle {
          margin: 0;
          text-align: left;
        }

        .cardDesc {
          margin: 0;
          opacity: 0.86;
          line-height: 1.55;
          text-align: left;
        }

        .actions {
          display: flex;
          justify-content: flex-start;
        }

        .btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 12px;
          border-radius: 999px;
          border: 1px solid rgba(245, 244, 244, 0.14);
          background: rgba(255, 255, 255, 0.06);
          text-decoration: none;
          transition: transform 0.15s ease, border-color 0.15s ease,
            background 0.15s ease;
        }

        .btn:hover {
          transform: translateY(-1px);
          border-color: rgba(120, 166, 255, 0.45);
          background: rgba(120, 166, 255, 0.12);
        }

        .icon {
          width: 18px;
          height: 18px;
        }

        /* Responsive */
        @media (max-width: 991px) {
          .card {
            grid-column: span 6;
          }
        }

        @media (max-width: 767px) {
          .grid {
            gap: 14px;
          }
          .card {
            grid-column: span 12;
          }
          .head {
            text-align: left;
          }
        }
      `}</style>
    </>
  )
}

WorkPhotography.defaultProps = {
  sectionTitle: undefined,
  text: undefined,
}

WorkPhotography.propTypes = {
  sectionTitle: PropTypes.element,
  text: PropTypes.element,
}

export default WorkPhotography