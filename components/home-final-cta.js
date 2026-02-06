import React, { Fragment } from 'react'

import PropTypes from 'prop-types'
import { useTranslations } from 'next-intl'

const HomeFinalCTA = (props) => {
  return (
    <>
      <div
        className={`home-final-cta-container thq-section-padding ${props.rootClassName} `}
      >
        <div className="home-final-cta-thq-max-width-elm thq-section-max-width">
          <div className="home-final-cta-thq-content-elm">
            <h2 className="home-final-cta-thq-heading1-elm thq-heading-2">
              {props.heading1 ?? (
                <Fragment>
                  <span className="home-final-cta-text3">
                    Have a project in mind?
                  </span>
                </Fragment>
              )}
            </h2>
            <p className="home-final-cta-thq-content1-elm thq-body-large">
              {props.content1 ?? (
                <Fragment>
                  <span className="home-final-cta-text1">
                    Let’s create something with clarity, depth, and cinematic
                    presence.
                  </span>
                </Fragment>
              )}
            </p>
            <div className="home-final-cta-thq-actions-elm">
              <button className="thq-button-outline home-final-cta-thq-button-elm">
                <span className="home-final-cta-thq-action2-elm thq-body-small">
                  {props.action2 ?? (
                    <Fragment>
                      <span className="home-final-cta-text2">
                        Create Together
                      </span>
                    </Fragment>
                  )}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .home-final-cta-container {
            gap: var(--dl-layout-space-threeunits);
            display: flex;
            overflow: hidden;
            position: relative;
            flex-direction: column;
          }
          .home-final-cta-thq-max-width-elm {
            width: 100%;
            display: flex;
            max-width: var(--dl-layout-size-maxwidth);
            align-items: center;
            flex-direction: column;
          }
          .home-final-cta-thq-content-elm {
            gap: var(--dl-layout-space-oneandhalfunits);
            display: flex;
            align-self: stretch;
            align-items: flex-start;
            flex-direction: column;
          }
          .home-final-cta-thq-heading1-elm {
            text-align: center;
          }
          .home-final-cta-thq-content1-elm {
            text-align: center;
          }
          .home-final-cta-thq-actions-elm {
            gap: var(--dl-layout-space-oneandhalfunits);
            display: flex;
            align-items: flex-start;
          }
          .home-final-cta-thq-action2-elm {
            text-align: center;
          }
          .home-final-cta-text1 {
            display: inline-block;
          }
          .home-final-cta-text2 {
            display: inline-block;
          }
          .home-final-cta-text3 {
            display: inline-block;
          }

          @media (max-width: 479px) {
            .home-final-cta-thq-actions-elm {
              width: 100%;
              flex-direction: column;
            }
            .home-final-cta-thq-button-elm {
              width: 100%;
            }
          }
        `}
      </style>
    </>
  )
}

HomeFinalCTA.defaultProps = {
  content1: undefined,
  action2: undefined,
  heading1: undefined,
  rootClassName: '',
}

HomeFinalCTA.propTypes = {
  content1: PropTypes.element,
  action2: PropTypes.element,
  heading1: PropTypes.element,
  rootClassName: PropTypes.string,
}

export default HomeFinalCTA
