import React, { Fragment } from 'react'

import PropTypes from 'prop-types'
import { useTranslations } from 'next-intl'

const WorkHero = (props) => {
  return (
    <>
      <div
        className={`work-hero-container1 thq-section-padding ${props.rootClassName} `}
      >
        <img
          alt={props.image1Alt}
          src={props.image1Src}
          className="work-hero-image"
        />
        <div className="work-hero-thq-column-elm">
          <div className="work-hero-thq-content-elm">
            <h1 className="thq-heading-2 work-hero-thq-text-elm1">
              {props.heading1 ?? (
                <Fragment>
                  <span className="work-hero-text1">
                    Selected work across film, photography, sound, and motion.
                  </span>
                </Fragment>
              )}
            </h1>
            <p className="thq-body-large work-hero-thq-text-elm2">
              {props.content1 ?? (
                <Fragment>
                  <span className="work-hero-text3">
                    Explore each discipline as a focused body of work.
                  </span>
                </Fragment>
              )}
            </p>
            <div className="work-hero-container2">
              <input
                type="email"
                placeholder={props.textinputPlaceholder}
                className="work-hero-textinput thq-input"
              />
              <div className="work-hero-container3">
                <button className="work-hero-thq-button-elm thq-button-filled">
                  <span className="thq-body-small">
                    {props.action3 ?? (
                      <Fragment>
                        <span className="work-hero-text2">Explore Work</span>
                      </Fragment>
                    )}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .work-hero-container1 {
            width: 100%;
            height: 1015px;
            display: flex;
            position: relative;
            align-items: center;
            flex-direction: row;
          }
          .work-hero-image {
            top: 0px;
            left: 0px;
            right: 0px;
            width: 100%;
            height: 100%;
            margin: auto;
            position: absolute;
            object-fit: cover;
          }
          .work-hero-thq-column-elm {
            gap: 24px;
            width: auto;
            display: flex;
            z-index: 1;
            max-width: 560px;
            align-items: flex-start;
            flex-shrink: 0;
            flex-direction: column;
          }
          .work-hero-thq-content-elm {
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
          .work-hero-container2 {
            gap: var(--dl-layout-space-oneandhalfunits);
            flex: 0 0 auto;
            display: flex;
            align-self: stretch;
            align-items: center;
            flex-direction: row;
            justify-content: flex-start;
          }
          .work-hero-textinput {
            width: 70%;
            background-color: transparent;
          }
          .work-hero-container3 {
            flex: 1;
            display: flex;
            align-items: flex-start;
          }
          .work-hero-thq-button-elm {
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
          .work-hero-text1 {
            display: inline-block;
          }
          .work-hero-text2 {
            display: inline-block;
          }
          .work-hero-text3 {
            display: inline-block;
          }

          @media (max-width: 991px) {
            .work-hero-thq-column-elm {
              align-self: center;
            }
          }
          @media (max-width: 767px) {
            .work-hero-thq-column-elm {
              width: 100%;
            }
            .work-hero-thq-text-elm1 {
              text-align: center;
            }
            .work-hero-thq-text-elm2 {
              text-align: center;
            }
            .work-hero-container2 {
              flex-direction: column;
            }
            .work-hero-textinput {
              width: 100%;
            }
            .work-hero-container3 {
              width: 100%;
            }
            .work-hero-thq-button-elm {
              width: 100%;
            }
          }
          @media (max-width: 479px) {
            .work-hero-container3 {
              width: 100%;
            }
            .work-hero-thq-button-elm {
              width: 100%;
            }
          }
        `}
      </style>
    </>
  )
}

WorkHero.defaultProps = {
  heading1: undefined,
  rootClassName: '',
  image1Alt: 'Professional film production equipment',
  image1Src:
    'https://images.pexels.com/photos/2883160/pexels-photo-2883160.jpeg?auto=compress&cs=tinysrgb&w=1500',
  action3: undefined,
  content1: undefined,
  textinputPlaceholder: 'Create Together',
}

WorkHero.propTypes = {
  heading1: PropTypes.element,
  rootClassName: PropTypes.string,
  image1Alt: PropTypes.string,
  image1Src: PropTypes.string,
  action3: PropTypes.element,
  content1: PropTypes.element,
  textinputPlaceholder: PropTypes.string,
}

export default WorkHero
