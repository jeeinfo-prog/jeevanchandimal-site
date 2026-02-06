import React, { Fragment } from 'react'

import PropTypes from 'prop-types'
import { useTranslations } from 'next-intl'

const ServicesFilmFinalCTA = (props) => {
  return (
    <>
      <div className="services-film-final-cta-container thq-section-padding">
        <div className="services-film-final-cta-thq-max-width-elm thq-section-max-width">
          <div className="services-film-final-cta-thq-content-elm">
            <h2 className="services-film-final-cta-thq-heading1-elm thq-heading-2">
              {props.heading1 ?? (
                <Fragment>
                  <span className="services-film-final-cta-text2">
                    Have a project in mind?
                  </span>
                </Fragment>
              )}
            </h2>
            <p className="services-film-final-cta-thq-content1-elm thq-body-large">
              {props.content1 ?? (
                <Fragment>
                  <span className="services-film-final-cta-text1">
                    Let’s create something with clarity, depth, and cinematic
                    presence.
                  </span>
                </Fragment>
              )}
            </p>
            <div className="services-film-final-cta-thq-actions-elm">
              <button className="thq-button-outline services-film-final-cta-thq-button-elm">
                <span className="services-film-final-cta-thq-action2-elm thq-body-small">
                  {props.action2 ?? (
                    <Fragment>
                      <span className="services-film-final-cta-text3">
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
          .services-film-final-cta-container {
            gap: var(--dl-layout-space-threeunits);
            display: flex;
            overflow: hidden;
            position: relative;
            flex-direction: column;
          }
          .services-film-final-cta-thq-max-width-elm {
            width: 100%;
            display: flex;
            max-width: var(--dl-layout-size-maxwidth);
            align-items: center;
            flex-direction: column;
          }
          .services-film-final-cta-thq-content-elm {
            gap: var(--dl-layout-space-oneandhalfunits);
            display: flex;
            align-self: stretch;
            align-items: flex-start;
            flex-direction: column;
          }
          .services-film-final-cta-thq-heading1-elm {
            text-align: center;
          }
          .services-film-final-cta-thq-content1-elm {
            text-align: center;
          }
          .services-film-final-cta-thq-actions-elm {
            gap: var(--dl-layout-space-oneandhalfunits);
            display: flex;
            align-items: flex-start;
          }
          .services-film-final-cta-thq-action2-elm {
            text-align: center;
          }
          .services-film-final-cta-text1 {
            display: inline-block;
          }
          .services-film-final-cta-text2 {
            display: inline-block;
          }
          .services-film-final-cta-text3 {
            display: inline-block;
          }
          @media (max-width: 479px) {
            .services-film-final-cta-thq-actions-elm {
              width: 100%;
              flex-direction: column;
            }
            .services-film-final-cta-thq-button-elm {
              width: 100%;
            }
          }
        `}
      </style>
    </>
  )
}

ServicesFilmFinalCTA.defaultProps = {
  content1: undefined,
  heading1: undefined,
  action2: undefined,
}

ServicesFilmFinalCTA.propTypes = {
  content1: PropTypes.element,
  heading1: PropTypes.element,
  action2: PropTypes.element,
}

export default ServicesFilmFinalCTA
