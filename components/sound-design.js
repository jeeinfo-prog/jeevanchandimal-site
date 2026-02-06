import React, { Fragment } from 'react'
import Link from 'next/link'

import PropTypes from 'prop-types'
import { useTranslations } from 'next-intl'

const SoundDesign = (props) => {
  return (
    <>
      <div className="sound-design-thq-header13-elm">
        <div className="sound-design-thq-content-elm thq-section-padding">
          <div className="sound-design-thq-max-width-elm thq-section-max-width thq-flex-row">
            <div className="sound-design-thq-column-elm1">
              <h1 className="thq-heading-1 sound-design-thq-text-elm1">
                {props.heading1 ?? (
                  <Fragment>
                    <span className="sound-design-text3">Sound design</span>
                  </Fragment>
                )}
              </h1>
            </div>
            <div className="sound-design-thq-column-elm2">
              <p className="thq-body-large sound-design-thq-text-elm2">
                {props.content1 ?? (
                  <Fragment>
                    <span className="sound-design-text4">
                      Expert soundtrack composition, sound design and audio
                      post-production for film, TV, and digital media. We bring
                      your vision to life with professional and creative audio
                      solutions.
                    </span>
                  </Fragment>
                )}
              </p>
              <div className="sound-design-thq-actions-elm">
                <button className="thq-button-filled sound-design-thq-button-elm1">
                  <Link href="/services-audio">
                    <a className="sound-design-link1 thq-body-small">
                      {props.action1 ?? (
                        <Fragment>
                          <span className="sound-design-text1">
                            Explore Services
                          </span>
                        </Fragment>
                      )}
                    </a>
                  </Link>
                </button>
                <button className="thq-button-outline sound-design-thq-button-elm2">
                  <Link href="/work-audio">
                    <a className="sound-design-link2 thq-body-small">
                      {props.action2 ?? (
                        <Fragment>
                          <span className="sound-design-text2">Learn More</span>
                        </Fragment>
                      )}
                    </a>
                  </Link>
                </button>
              </div>
            </div>
          </div>
        </div>
        <video
          src={props.videoSrc1}
          loop="true"
          muted="true"
          poster={props.videoSrc1}
          autoPlay="true"
          className="sound-design-video"
        ></video>
      </div>
      <style jsx>
        {`
          .sound-design-thq-header13-elm {
            width: 100%;
            display: flex;
            position: relative;
            align-items: center;
            flex-direction: column;
          }
          .sound-design-thq-content-elm {
            display: flex;
            justify-content: center;
          }
          .sound-design-thq-max-width-elm {
            align-self: center;
            align-items: flex-start;
          }
          .sound-design-thq-column-elm1 {
            flex: 1;
            width: auto;
            display: flex;
            align-items: flex-start;
            flex-shrink: 0;
            flex-direction: column;
          }
          .sound-design-thq-column-elm2 {
            gap: var(--dl-layout-space-oneandhalfunits);
            flex: 1;
            width: auto;
            display: flex;
            align-items: flex-start;
            flex-shrink: 0;
            flex-direction: column;
          }
          .sound-design-thq-actions-elm {
            gap: var(--dl-layout-space-unit);
            display: flex;
            align-items: flex-start;
          }
          .sound-design-link1 {
            text-decoration: none;
          }
          .sound-design-link2 {
            text-decoration: none;
          }
          .sound-design-video {
            width: 100%;
            min-height: 700px;
            object-fit: cover;
          }
          .sound-design-text1 {
            display: inline-block;
          }
          .sound-design-text2 {
            display: inline-block;
          }
          .sound-design-text3 {
            display: inline-block;
          }
          .sound-design-text4 {
            display: inline-block;
          }
          @media (max-width: 991px) {
            .sound-design-video {
              min-height: 580px;
            }
          }
          @media (max-width: 767px) {
            .sound-design-thq-max-width-elm {
              flex-direction: column;
            }
            .sound-design-thq-text-elm1 {
              text-align: center;
            }
            .sound-design-thq-text-elm2 {
              text-align: center;
            }
            .sound-design-thq-actions-elm {
              width: 100%;
              justify-content: center;
            }
            .sound-design-video {
              min-height: 400px;
            }
          }
          @media (max-width: 479px) {
            .sound-design-thq-actions-elm {
              flex-direction: column;
            }
            .sound-design-thq-button-elm1 {
              width: 100%;
            }
            .sound-design-thq-button-elm2 {
              width: 100%;
            }
            .sound-design-video {
              min-height: 250px;
            }
          }
        `}
      </style>
    </>
  )
}

SoundDesign.defaultProps = {
  action1: undefined,
  videoSrc1: '/Audio/audio%20production%2003.mov',
  action2: undefined,
  heading1: undefined,
  content1: undefined,
}

SoundDesign.propTypes = {
  action1: PropTypes.element,
  videoSrc1: PropTypes.string,
  action2: PropTypes.element,
  heading1: PropTypes.element,
  content1: PropTypes.element,
}

export default SoundDesign
