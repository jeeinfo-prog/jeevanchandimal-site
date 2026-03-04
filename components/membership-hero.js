import React, { Fragment } from 'react'

import PropTypes from 'prop-types'
import { useTranslations } from 'next-intl'

const MembershipHero = (props) => {
  return (
    <>
      <div className="membership-hero-container1 thq-section-padding">
        <div className="membership-hero-thq-column-elm">
          <div className="membership-hero-thq-content-elm">
            <h1 className="thq-heading-2 membership-hero-thq-text-elm1">
              {props.heading1 ?? (
                <Fragment>
                  <span className="membership-hero-text20">
                    A Private Cinematic Library
                  </span>
                </Fragment>
              )}
            </h1>
            <h1 className="thq-heading-3 membership-hero-thq-text-elm2">
              {props.heading111 ?? (
                <Fragment>
                  <span className="membership-hero-text21">
                    <span>
                      Built for creators who understand that visuals are not
                      decoration -
                    </span>
                    <br></br>
                    <span>they are presence.</span>
                  </span>
                </Fragment>
              )}
            </h1>
            <p className="thq-body-large membership-hero-thq-text-elm3">
              {props.content1 ?? (
                <Fragment>
                  <span className="membership-hero-text14">
                    <span>
                      Jeevan Chandimal Membership grants access to a carefully
                      maintained archive of cinematic imagery,
                    </span>
                    <br></br>
                    <span>
                      created and curated with the discipline of film — not the
                      habits of stock.
                    </span>
                  </span>
                </Fragment>
              )}
            </p>
            <h1 className="thq-heading-3 membership-hero-thq-text-elm4">
              {props.heading11 ?? (
                <Fragment>
                  <span className="membership-hero-text18">
                    Nothing excessive.
                  </span>
                </Fragment>
              )}
            </h1>
            <h1 className="thq-heading-3 membership-hero-thq-text-elm5">
              {props.heading112 ?? (
                <Fragment>
                  <span className="membership-hero-text10">
                    <span>Nothing accidental.</span>
                    <br></br>
                  </span>
                </Fragment>
              )}
            </h1>
            <h1 className="thq-heading-3 membership-hero-thq-text-elm6">
              {props.heading1121 ?? (
                <Fragment>
                  <span className="membership-hero-text19">
                    Only work that endures.
                  </span>
                </Fragment>
              )}
            </h1>
            <div className="membership-hero-container2">
              <div className="membership-hero-container3">
                <button className="membership-hero-thq-button-elm thq-button-filled">
                  <span className="thq-body-small">
                    {props.action3 ?? (
                      <Fragment>
                        <span className="membership-hero-text13">
                          Join Membership
                        </span>
                      </Fragment>
                    )}
                  </span>
                </button>
              </div>
              <input
                type="email"
                placeholder={props.textinputPlaceholder}
                className="membership-hero-textinput thq-input"
              />
            </div>
          </div>
        </div>
        <video
          src={props.videoSrc}
          loop="true"
          muted="true"
          poster="https://play.teleporthq.io/static/svg/videoposter.svg"
          autoPlay="true"
          playsInline="true"
          className="membership-hero-video"
        ></video>
      </div>
      <style jsx>
        {`
          .membership-hero-container1 {
            width: 100%;
            height: 1015px;
            display: flex;
            position: relative;
            align-items: center;
            flex-direction: row;
          }
          .membership-hero-thq-column-elm {
            gap: 24px;
            width: auto;
            display: flex;
            z-index: 1;
            max-width: 560px;
            align-items: flex-start;
            flex-shrink: 0;
            flex-direction: column;
          }
          .membership-hero-thq-content-elm {
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
          .membership-hero-container2 {
            gap: var(--dl-layout-space-oneandhalfunits);
            flex: 0 0 auto;
            display: flex;
            align-self: stretch;
            align-items: center;
            flex-direction: row;
            justify-content: flex-start;
          }
          .membership-hero-container3 {
            flex: 1;
            display: flex;
            align-items: flex-start;
          }
          .membership-hero-thq-button-elm {
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
          .membership-hero-textinput {
            width: 70%;
            background-color: transparent;
          }
          .membership-hero-video {
            top: 0px;
            left: 0px;
            right: 0px;
            width: 100%;
            height: 100%;
            margin: auto;
            position: absolute;
            object-fit: cover;
          }
          .membership-hero-text10 {
            display: inline-block;
          }
          .membership-hero-text13 {
            display: inline-block;
          }
          .membership-hero-text14 {
            display: inline-block;
          }
          .membership-hero-text18 {
            display: inline-block;
          }
          .membership-hero-text19 {
            display: inline-block;
          }
          .membership-hero-text20 {
            display: inline-block;
          }
          .membership-hero-text21 {
            display: inline-block;
          }
          @media (max-width: 991px) {
            .membership-hero-thq-column-elm {
              align-self: center;
            }
          }
          @media (max-width: 767px) {
            .membership-hero-thq-column-elm {
              width: 100%;
            }
            .membership-hero-thq-text-elm1 {
              text-align: center;
            }
            .membership-hero-thq-text-elm2 {
              text-align: center;
            }
            .membership-hero-thq-text-elm3 {
              text-align: center;
            }
            .membership-hero-thq-text-elm4 {
              text-align: center;
            }
            .membership-hero-thq-text-elm5 {
              text-align: center;
            }
            .membership-hero-thq-text-elm6 {
              text-align: center;
            }
            .membership-hero-container2 {
              flex-direction: column;
            }
            .membership-hero-container3 {
              width: 100%;
            }
            .membership-hero-thq-button-elm {
              width: 100%;
            }
            .membership-hero-textinput {
              width: 100%;
            }
          }
          @media (max-width: 479px) {
            .membership-hero-container3 {
              width: 100%;
            }
            .membership-hero-thq-button-elm {
              width: 100%;
            }
          }
        `}
      </style>
    </>
  )
}

MembershipHero.defaultProps = {
  heading112: undefined,
  textinputPlaceholder: 'Browse Gallery',
  action3: undefined,
  content1: undefined,
  heading11: undefined,
  heading1121: undefined,
  heading1: undefined,
  heading111: undefined,
  videoSrc: '/Film/grok-video-33cfd57e-0433-445a-9498-04c1c29067df-2.mp4',
}

MembershipHero.propTypes = {
  heading112: PropTypes.element,
  textinputPlaceholder: PropTypes.string,
  action3: PropTypes.element,
  content1: PropTypes.element,
  heading11: PropTypes.element,
  heading1121: PropTypes.element,
  heading1: PropTypes.element,
  heading111: PropTypes.element,
  videoSrc: PropTypes.string,
}

export default MembershipHero
