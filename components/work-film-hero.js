import React, { Fragment } from 'react'

import PropTypes from 'prop-types'
import { useTranslations } from 'next-intl'

const WorkFilmHero = (props) => {
  return (
    <>
      <div className="work-film-hero-container1 thq-section-padding">
        <img
          alt={props.videoSrc2}
          src={props.videoSrc2}
          className="work-film-hero-image"
        />
        <div className="work-film-hero-container2">
          <video
            src={props.videoSrc2}
            loop="true"
            muted="true"
            poster="https://play.teleporthq.io/static/svg/videoposter.svg"
            autoPlay="true"
            playsInline="true"
            className="work-film-hero-video"
          ></video>
          <div className="work-film-hero-thq-column-elm">
            <div className="work-film-hero-thq-content-elm">
              <h1 className="thq-heading-2 work-film-hero-thq-text-elm1">
                {props.heading1 ?? (
                  <Fragment>
                    <span className="work-film-hero-text1">
                      Cinematic work shaped by story, mood, and intention.
                    </span>
                  </Fragment>
                )}
              </h1>
              <p className="thq-body-large work-film-hero-thq-text-elm2">
                {props.content1 ?? (
                  <Fragment>
                    <span className="work-film-hero-text2">
                      Narrative-driven films where image, motion, and sound come
                      together.
                    </span>
                  </Fragment>
                )}
              </p>
              <div className="work-film-hero-container3">
                <input
                  type="email"
                  placeholder={props.textinputPlaceholder}
                  className="work-film-hero-textinput thq-input"
                />
                <div className="work-film-hero-container4">
                  <button className="work-film-hero-thq-button-elm thq-button-filled">
                    <span className="thq-body-small">
                      {props.action3 ?? (
                        <Fragment>
                          <span className="work-film-hero-text3">
                            Explore Work
                          </span>
                        </Fragment>
                      )}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .work-film-hero-container1 {
            width: 100%;
            height: 1015px;
            display: flex;
            position: relative;
            align-items: center;
            flex-direction: row;
          }
          .work-film-hero-image {
            top: 0px;
            left: 0px;
            right: 0px;
            width: 100%;
            height: 100%;
            margin: auto;
            position: absolute;
            object-fit: cover;
          }
          .work-film-hero-container2 {
            flex: 0 0 auto;
            width: auto;
            height: auto;
            display: flex;
            flex-direction: column;
          }
          .work-film-hero-video {
            top: 0px;
            left: 0px;
            right: 0px;
            width: 100%;
            height: 100%;
            margin: auto;
            position: absolute;
            object-fit: cover;
          }
          .work-film-hero-thq-column-elm {
            gap: 24px;
            width: auto;
            display: flex;
            z-index: 1;
            max-width: 560px;
            align-items: flex-start;
            flex-shrink: 0;
            flex-direction: column;
          }
          .work-film-hero-thq-content-elm {
            gap: var(--dl-layout-space-oneandhalfunits);
            display: flex;
            align-self: stretch;
            align-items: flex-start;
            animation-name: fadeInLeft;
            flex-direction: column;
            animation-delay: 0s;
            animation-duration: 500ms;
            animation-direction: normal;
            animation-iteration-count: 1;
            animation-timing-function: ease;
          }
          .work-film-hero-container3 {
            gap: var(--dl-layout-space-oneandhalfunits);
            flex: 0 0 auto;
            display: flex;
            align-self: stretch;
            align-items: center;
            flex-direction: row;
            justify-content: flex-start;
          }
          .work-film-hero-textinput {
            width: 70%;
            background-color: transparent;
          }
          .work-film-hero-container4 {
            flex: 1;
            display: flex;
            align-items: flex-start;
          }
          .work-film-hero-thq-button-elm {
            gap: var(--dl-layout-space-halfunit);
            flex: 1;
            display: flex;
            box-sizing: content-box;
            align-items: center;
            border-color: var(--dl-color-theme-primary1);
            border-style: solid;
            border-width: 1px;
            justify-content: center;
            background-color: var(--dl-color-theme-primary1);
          }
          .work-film-hero-text1 {
            display: inline-block;
          }
          .work-film-hero-text2 {
            display: inline-block;
          }
          .work-film-hero-text3 {
            display: inline-block;
          }
          @media (max-width: 991px) {
            .work-film-hero-thq-column-elm {
              align-self: center;
            }
          }
          @media (max-width: 767px) {
            .work-film-hero-thq-column-elm {
              width: 100%;
            }
            .work-film-hero-thq-text-elm1 {
              text-align: center;
            }
            .work-film-hero-thq-text-elm2 {
              text-align: center;
            }
            .work-film-hero-container3 {
              flex-direction: column;
            }
            .work-film-hero-textinput {
              width: 100%;
            }
            .work-film-hero-container4 {
              width: 100%;
            }
            .work-film-hero-thq-button-elm {
              width: 100%;
            }
          }
          @media (max-width: 479px) {
            .work-film-hero-container4 {
              width: 100%;
            }
            .work-film-hero-thq-button-elm {
              width: 100%;
            }
          }
        `}
      </style>
    </>
  )
}

WorkFilmHero.defaultProps = {
  heading1: undefined,
  content1: undefined,
  textinputPlaceholder: 'Create together',
  action3: undefined,
  videoSrc2: '/Film/film%20production%2002.mov',
}

WorkFilmHero.propTypes = {
  heading1: PropTypes.element,
  content1: PropTypes.element,
  textinputPlaceholder: PropTypes.string,
  action3: PropTypes.element,
  videoSrc2: PropTypes.string,
}

export default WorkFilmHero
