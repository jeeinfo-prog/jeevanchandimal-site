import React, { Fragment } from 'react'
import Link from 'next/link'

import Script from 'dangerous-html/react'
import PropTypes from 'prop-types'
import { useTranslations } from 'next-intl'

const AIAnimation = (props) => {
  return (
    <>
      <div className={`ai-animation-thq-header78-elm ${props.rootClassName} `}>
        <div className="ai-animation-thq-column-elm thq-section-max-width thq-section-padding">
          <div className="ai-animation-thq-content-elm1">
            <h1 className="ai-animation-thq-text-elm1 thq-heading-2">
              {props.heading1 ?? (
                <Fragment>
                  <span className="ai-animation-text2">AI &amp; Animation</span>
                </Fragment>
              )}
            </h1>
            <p className="ai-animation-thq-text-elm2 thq-body-large">
              {props.content1 ?? (
                <Fragment>
                  <span className="ai-animation-text1">
                    Explore our range of services including film production,
                    audio production, animation &amp; graphics, and photography.
                    We offer customized experiences tailored to your specific
                    needs with dedicated customer support.
                  </span>
                </Fragment>
              )}
            </p>
          </div>
          <div className="ai-animation-thq-actions-elm">
            <button className="thq-button-filled ai-animation-thq-button-elm1">
              <Link href="/services-animation">
                <a className="ai-animation-link1 thq-body-small">
                  {props.action1 ?? (
                    <Fragment>
                      <span className="ai-animation-text3">Get Started</span>
                    </Fragment>
                  )}
                </a>
              </Link>
            </button>
            <button className="thq-button-outline ai-animation-thq-button-elm2">
              <Link href="/work-animation">
                <a className="ai-animation-link2 thq-body-small">
                  {props.action2 ?? (
                    <Fragment>
                      <span className="ai-animation-text4">Learn More</span>
                    </Fragment>
                  )}
                </a>
              </Link>
            </button>
          </div>
        </div>
        <div className="ai-animation-thq-content-elm2">
          <div className="ai-animation-thq-row-container-elm1 thq-animated-group-container-horizontal thq-mask-image-horizontal">
            <div className="thq-animated-group-horizontal">
              <img
                alt={props.image1Alt}
                src={props.image1Src}
                className="ai-animation-thq-placeholder-image-elm10 thq-img-scale thq-img-ratio-1-1"
              />
              <img
                alt={props.image2Alt}
                src={props.image2Src}
                className="ai-animation-thq-placeholder-image-elm11 thq-img-scale thq-img-ratio-1-1"
              />
              <img
                alt={props.image3Alt}
                src={props.image3Src}
                className="ai-animation-thq-placeholder-image-elm12 thq-img-scale thq-img-ratio-1-1"
              />
              <img
                alt={props.image4Alt}
                src={props.image4Src}
                className="ai-animation-thq-placeholder-image-elm13 thq-img-scale thq-img-ratio-1-1"
              />
              <img
                alt={props.image5Alt}
                src={props.image5Src}
                className="ai-animation-thq-placeholder-image-elm14 thq-img-scale thq-img-ratio-1-1"
              />
              <img
                alt={props.image6Alt}
                src={props.image6Src}
                className="ai-animation-thq-placeholder-image-elm15 thq-img-scale thq-img-ratio-1-1"
              />
            </div>
            <div className="thq-animated-group-horizontal">
              <img
                alt={props.image1Alt}
                src={props.image1Src}
                className="ai-animation-thq-placeholder-image-elm16 thq-img-scale thq-img-ratio-1-1"
              />
              <img
                alt={props.image2Alt}
                src={props.image2Src}
                className="ai-animation-thq-placeholder-image-elm17 thq-img-scale thq-img-ratio-1-1"
              />
              <img
                alt={props.image3Alt}
                src={props.image3Src}
                className="ai-animation-thq-placeholder-image-elm18 thq-img-scale thq-img-ratio-1-1"
              />
              <img
                alt={props.image4Alt}
                src={props.image4Src}
                className="ai-animation-thq-placeholder-image-elm19 thq-img-scale thq-img-ratio-1-1"
              />
              <img
                alt={props.image5Alt}
                src={props.image5Src}
                className="ai-animation-thq-placeholder-image-elm20 thq-img-scale thq-img-ratio-1-1"
              />
              <img
                alt="Hero Image"
                src="/Animation/PIC/the%20river%20that%20climbed%20the%20sky%2002-1500w.jpg"
                className="ai-animation-thq-placeholder-image-elm21 thq-img-scale thq-img-ratio-1-1"
              />
            </div>
          </div>
          <div className="ai-animation-thq-row-container-elm2 thq-animated-group-container-horizontal thq-mask-image-horizontal">
            <div className="thq-animated-group-horizontal-reverse">
              <img
                alt={props.image7Alt}
                src={props.image7Src}
                className="ai-animation-thq-placeholder-image-elm22 thq-img-scale thq-img-ratio-1-1"
              />
              <img
                alt={props.image8Alt}
                src={props.image8Src}
                className="ai-animation-thq-placeholder-image-elm23 thq-img-scale thq-img-ratio-1-1"
              />
              <img
                alt={props.image9Alt}
                src={props.image9Src}
                className="ai-animation-thq-placeholder-image-elm24 thq-img-scale thq-img-ratio-1-1"
              />
              <img
                alt={props.image10Alt}
                src={props.image10Src}
                className="ai-animation-thq-placeholder-image-elm25 thq-img-scale thq-img-ratio-1-1"
              />
              <img
                alt={props.image11Alt}
                src={props.image11Src}
                className="ai-animation-thq-placeholder-image-elm26 thq-img-scale thq-img-ratio-1-1"
              />
              <img
                alt={props.image12Alt}
                src={props.image12Src}
                className="ai-animation-thq-placeholder-image-elm27 thq-img-scale thq-img-ratio-1-1"
              />
            </div>
            <div className="thq-animated-group-horizontal-reverse">
              <img
                alt={props.image7Alt}
                src={props.image7Src}
                className="ai-animation-thq-placeholder-image-elm28 thq-img-scale thq-img-ratio-1-1"
              />
              <img
                alt={props.image8Alt}
                src={props.image8Src}
                className="ai-animation-thq-placeholder-image-elm29 thq-img-scale thq-img-ratio-1-1"
              />
              <img
                alt={props.image9Alt}
                src={props.image9Src}
                className="ai-animation-thq-placeholder-image-elm30 thq-img-scale thq-img-ratio-1-1"
              />
              <img
                alt={props.image10Alt}
                src={props.image10Src}
                className="ai-animation-thq-placeholder-image-elm31 thq-img-scale thq-img-ratio-1-1"
              />
              <img
                alt={props.image11Alt}
                src={props.image11Src}
                className="ai-animation-thq-placeholder-image-elm32 thq-img-scale thq-img-ratio-1-1"
              />
              <img
                alt="Hero Image"
                src="https://images.unsplash.com/photo-1568214379698-8aeb8c6c6ac8?ixid=M3w5MTMyMXwwfDF8c2VhcmNofDEyfHxncmFmaWN8ZW58MHx8fHwxNzE1Nzk0OTk5fDA&amp;ixlib=rb-4.0.3&amp;w=1500"
                className="ai-animation-thq-placeholder-image-elm33 thq-img-scale thq-img-ratio-1-1"
              />
            </div>
          </div>
        </div>
        <div>
          <div className="ai-animation-container2">
            <Script
              html={`<style>
  @keyframes scroll-x {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(calc(-100% - 16px));
    }
  }

  @keyframes scroll-y {
    from {
      transform: translateY(0);
    }
    to {
      transform: translateY(calc(-100% - 16px));
    }
  }
</style>
`}
            ></Script>
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .ai-animation-thq-header78-elm {
            gap: var(--dl-layout-space-threeunits);
            width: 100%;
            height: auto;
            display: flex;
            overflow: hidden;
            position: relative;
            align-items: center;
            flex-shrink: 0;
            flex-direction: column;
          }
          .ai-animation-thq-column-elm {
            gap: var(--dl-layout-space-oneandhalfunits);
            width: auto;
            display: flex;
            align-items: center;
            flex-direction: column;
            padding-bottom: var(--dl-layout-space-unit);
          }
          .ai-animation-thq-content-elm1 {
            gap: var(--dl-layout-space-oneandhalfunits);
            display: flex;
            align-self: stretch;
            align-items: center;
            flex-direction: column;
          }
          .ai-animation-thq-text-elm1 {
            text-align: center;
          }
          .ai-animation-thq-text-elm2 {
            text-align: center;
          }
          .ai-animation-thq-actions-elm {
            gap: var(--dl-layout-space-unit);
            display: flex;
            align-items: flex-start;
            padding-top: var(--dl-layout-space-unit);
          }
          .ai-animation-link1 {
            text-decoration: none;
          }
          .ai-animation-link2 {
            text-decoration: none;
          }
          .ai-animation-thq-content-elm2 {
            gap: var(--dl-layout-space-oneandhalfunits);
            width: 100%;
            display: flex;
            position: relative;
            align-items: flex-start;
            flex-direction: column;
          }
          .ai-animation-thq-row-container-elm1 {
            width: 100%;
          }
          .ai-animation-thq-placeholder-image-elm10 {
            width: 400px;
            height: 400px;
          }
          .ai-animation-thq-placeholder-image-elm11 {
            width: 400px;
            height: 400px;
          }
          .ai-animation-thq-placeholder-image-elm12 {
            width: 400px;
            height: 400px;
          }
          .ai-animation-thq-placeholder-image-elm13 {
            width: 400px;
            height: 400px;
          }
          .ai-animation-thq-placeholder-image-elm14 {
            width: 400px;
            height: 400px;
          }
          .ai-animation-thq-placeholder-image-elm15 {
            width: 400px;
            height: 400px;
          }
          .ai-animation-thq-placeholder-image-elm16 {
            width: 400px;
            height: 400px;
          }
          .ai-animation-thq-placeholder-image-elm17 {
            width: 400px;
            height: 400px;
          }
          .ai-animation-thq-placeholder-image-elm18 {
            width: 400px;
            height: 400px;
          }
          .ai-animation-thq-placeholder-image-elm19 {
            width: 400px;
            height: 400px;
          }
          .ai-animation-thq-placeholder-image-elm20 {
            width: 400px;
            height: 400px;
          }
          .ai-animation-thq-placeholder-image-elm21 {
            width: 400px;
            height: 400px;
          }
          .ai-animation-thq-row-container-elm2 {
            width: 100%;
          }
          .ai-animation-thq-placeholder-image-elm22 {
            width: 400px;
            height: 400px;
          }
          .ai-animation-thq-placeholder-image-elm23 {
            width: 400px;
            height: 400px;
          }
          .ai-animation-thq-placeholder-image-elm24 {
            width: 400px;
            height: 400px;
          }
          .ai-animation-thq-placeholder-image-elm25 {
            width: 400px;
            height: 400px;
          }
          .ai-animation-thq-placeholder-image-elm26 {
            width: 400px;
            height: 400px;
          }
          .ai-animation-thq-placeholder-image-elm27 {
            width: 400px;
            height: 400px;
          }
          .ai-animation-thq-placeholder-image-elm28 {
            width: 400px;
            height: 400px;
          }
          .ai-animation-thq-placeholder-image-elm29 {
            width: 400px;
            height: 400px;
          }
          .ai-animation-thq-placeholder-image-elm30 {
            width: 400px;
            height: 400px;
          }
          .ai-animation-thq-placeholder-image-elm31 {
            width: 400px;
            height: 400px;
          }
          .ai-animation-thq-placeholder-image-elm32 {
            width: 400px;
            height: 400px;
          }
          .ai-animation-thq-placeholder-image-elm33 {
            width: 400px;
            height: 400px;
          }
          .ai-animation-container2 {
            display: contents;
          }
          .ai-animation-text1 {
            display: inline-block;
          }
          .ai-animation-text2 {
            display: inline-block;
          }
          .ai-animation-text3 {
            display: inline-block;
          }
          .ai-animation-text4 {
            display: inline-block;
          }

          @media (max-width: 767px) {
            .ai-animation-thq-content-elm2 {
              width: 100%;
            }
          }
          @media (max-width: 479px) {
            .ai-animation-thq-actions-elm {
              width: 100%;
              flex-direction: column;
            }
            .ai-animation-thq-button-elm1 {
              width: 100%;
            }
            .ai-animation-thq-button-elm2 {
              width: 100%;
            }
          }
        `}
      </style>
    </>
  )
}

AIAnimation.defaultProps = {
  image11Src: '/Animation/PIC/the%20clockwork%20mountain%2013-1500w.jpg',
  image9Alt: 'Hero Image',
  image1Alt: 'Film Production',
  content1: undefined,
  image11Alt: 'Hero Image',
  image1Src: '/Animation/PIC/the%20bridege%20that%20wakes%2004-1500w.jpg',
  image2Src: '/Animation/PIC/the%20bridege%20that%20wakes%2008%20a-1500w.jpg',
  image2Alt: 'Audio Production',
  image12Src: '/Animation/PIC/the%20bridege%20that%20wakes%2008%20a-1500w.jpg',
  image5Alt: 'Hero Image',
  image8Alt: 'Hero Image',
  heading1: undefined,
  image9Src: '/Animation/PIC/the%20bridege%20that%20wakes%2004-1500w.jpg',
  image10Src: '/Animation/PIC/the%20bridege%20that%20wakes%2013-1500w.jpg',
  image7Alt: 'Hero Image',
  image8Src:
    '/Animation/PIC/the%20river%20that%20climbed%20the%20sky%2004-1500w.jpg',
  image3Alt: 'Animation & Graphics',
  image10Alt: 'Hero Image',
  image3Src: '/Animation/PIC/the%20bridege%20that%20wakes%2013-1500w.jpg',
  image12Alt: 'Hero Image',
  image7Src:
    '/Animation/PIC/the%20river%20that%20climbed%20the%20sky%2002-1500w.jpg',
  action1: undefined,
  image6Alt: 'Hero Image',
  image4Alt: 'Photography',
  image6Src:
    'https://images.unsplash.com/photo-1632582204758-5ac65783517a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTc2OTA4ODcwMnw&ixlib=rb-4.1.0&q=80&w=1080',
  rootClassName: '',
  action2: undefined,
  image5Src: '/Animation/PIC/the%20clockwork%20mountain%2009-1500w.jpg',
  image4Src: '/Animation/PIC/the%20clockwork%20mountain%2006-1500w.jpg',
}

AIAnimation.propTypes = {
  image11Src: PropTypes.string,
  image9Alt: PropTypes.string,
  image1Alt: PropTypes.string,
  content1: PropTypes.element,
  image11Alt: PropTypes.string,
  image1Src: PropTypes.string,
  image2Src: PropTypes.string,
  image2Alt: PropTypes.string,
  image12Src: PropTypes.string,
  image5Alt: PropTypes.string,
  image8Alt: PropTypes.string,
  heading1: PropTypes.element,
  image9Src: PropTypes.string,
  image10Src: PropTypes.string,
  image7Alt: PropTypes.string,
  image8Src: PropTypes.string,
  image3Alt: PropTypes.string,
  image10Alt: PropTypes.string,
  image3Src: PropTypes.string,
  image12Alt: PropTypes.string,
  image7Src: PropTypes.string,
  action1: PropTypes.element,
  image6Alt: PropTypes.string,
  image4Alt: PropTypes.string,
  image6Src: PropTypes.string,
  rootClassName: PropTypes.string,
  action2: PropTypes.element,
  image5Src: PropTypes.string,
  image4Src: PropTypes.string,
}

export default AIAnimation
