import React, { Fragment, useEffect, useMemo, useRef, useState } from 'react'
import PropTypes from 'prop-types'

const WorkCinematicGallery = (props) => {

  /* ================= STATIC FALLBACK ================= */

  const staticFallback = useMemo(() =>
    Array.from({ length: 12 }, (_, i) => {
      const n = String(i + 1).padStart(2, '0')
      return {
        src: `/work/photography/cg-${n}.jpg`,
        alt: `Gallery image ${i + 1}`,
        href: props.storeHref || '/store'
      }
    }), [props.storeHref]
  )

  const [items, setItems] = useState(staticFallback)
  const [loading, setLoading] = useState(false)
  const [activeIdx, setActiveIdx] = useState(-1)

  const mountedRef = useRef(true)

  useEffect(() => {
    mountedRef.current = true
    return () => { mountedRef.current = false }
  }, [])

  /* ================= HERO IMAGE ================= */

  const hero = useMemo(() => {

    if (items?.length && items[0]?.src) {
      return items[0].src
    }

    if (props.heroImageSrc) {
      return props.heroImageSrc
    }

    return staticFallback[0].src

  }, [items, props.heroImageSrc, staticFallback])

  /* ================= FETCH IMAGES ================= */

  async function loadRandom() {

    if (!props.apiEndpoint) return

    try {

      setLoading(true)

      const res = await fetch(props.apiEndpoint, {
        headers: { Accept: 'application/json' }
      })

      if (!res.ok) throw new Error(res.status)

      const data = await res.json()

      const list = Array.isArray(data?.images) ? data.images : []

      const normalized = list
        .map((x, i) => {

          if (typeof x === 'string') {
            return {
              src: x,
              alt: `Gallery image ${i + 1}`,
              href: props.storeHref
            }
          }

          return {
            src: x?.src || x?.url,
            alt: x?.alt || `Gallery image ${i + 1}`,
            href: x?.href || props.storeHref
          }

        })
        .filter(x => x?.src)

      if (!mountedRef.current) return

      if (normalized.length) {

        /* preload hero image */
        const img = new Image()
        img.src = normalized[0].src

        setItems(normalized)

      }

    } catch (err) {

      if (props.fallbackToStaticOnError) {
        setItems(staticFallback)
      }

    } finally {

      if (mountedRef.current) {
        setLoading(false)
      }

    }
  }

  /* ================= INITIAL LOAD ================= */

  useEffect(() => {
    loadRandom()
  }, [props.apiEndpoint])

  /* ================= LIGHTBOX ================= */

  const active = activeIdx >= 0 ? items[activeIdx] : null

  /* ================= RENDER ================= */

  return (
    <>

      <section className={`wrap thq-section-padding ${props.rootClassName || ''}`}>

        <div className="shell thq-section-max-width">

          {/* HERO */}

          <header className="hero">

            <div className="heroBg">

              <div
                className="heroImg"
                style={{ backgroundImage: `url(${hero})` }}
              />

              <div className="heroOverlay"/>

            </div>

            <div className="heroInner">

              <h2 className="title thq-heading-2">
                {props.heading1 ?? <span>Cinematic Gallery</span>}
              </h2>

              <p className="desc thq-body-large">
                {props.content1 ??
                  <span>
                    A curated selection of visual studies exploring atmosphere,
                    light, and composition.
                  </span>}
              </p>

              <div className="heroActions">

                <button
                  className="btnGhost"
                  onClick={loadRandom}
                  disabled={loading}
                >
                  {loading ? 'Loading…' : 'Refresh Images'}
                </button>

                <a
                  className="btnPrimary"
                  href={props.storeHref || '/store'}
                >
                  Open Store →
                </a>

              </div>

            </div>

          </header>

          {/* GRID */}

          <div className="grid">

            {items.map((it, i) => (

              <button
                key={`${it.src}-${i}`}
                className="tile"
                onClick={() => setActiveIdx(i)}
              >

                <img
                  src={it.src}
                  alt={it.alt}
                  loading="lazy"
                  className="img"
                />

              </button>

            ))}

          </div>

        </div>

      </section>

      {/* LIGHTBOX */}

      {active && (

        <div
          className="lightbox"
          onClick={() => setActiveIdx(-1)}
        >

          <img
            src={active.src}
            alt={active.alt}
            className="lightboxImg"
          />

        </div>

      )}

      <style jsx>{`

      .hero {
        position:relative;
        border-radius:20px;
        overflow:hidden;
      }

      .heroBg{
        position:absolute;
        inset:0;
      }

      .heroImg{
        position:absolute;
        inset:0;
        background-size:cover;
        background-position:center;
        filter:brightness(.7);
      }

      .heroOverlay{
        position:absolute;
        inset:0;
        background:linear-gradient(
          to bottom,
          rgba(0,0,0,.3),
          rgba(0,0,0,.8)
        );
      }

      .heroInner{
        position:relative;
        padding:40px;
      }

      .grid{
        display:grid;
        grid-template-columns:repeat(4,1fr);
        gap:14px;
        margin-top:18px;
      }

      .tile{
        border:none;
        padding:0;
        overflow:hidden;
        border-radius:14px;
        cursor:pointer;
      }

      .img{
        width:100%;
        height:100%;
        object-fit:cover;
      }

      .lightbox{
        position:fixed;
        inset:0;
        background:rgba(0,0,0,.9);
        display:flex;
        align-items:center;
        justify-content:center;
        z-index:9999;
      }

      .lightboxImg{
        max-width:90vw;
        max-height:90vh;
      }

      @media(max-width:900px){
        .grid{grid-template-columns:repeat(2,1fr)}
      }

      `}</style>

    </>
  )
}

WorkCinematicGallery.defaultProps = {

  apiEndpoint: '/api/gallery/random?limit=12',
  storeHref: '/store',

  fallbackToStaticOnError: true

}

WorkCinematicGallery.propTypes = {

  heading1: PropTypes.element,
  content1: PropTypes.element,

  heroImageSrc: PropTypes.string,

  apiEndpoint: PropTypes.string,
  storeHref: PropTypes.string

}

export default WorkCinematicGallery