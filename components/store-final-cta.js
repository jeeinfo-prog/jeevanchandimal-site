import React, { Fragment } from 'react'
import Link from 'next/link'

import PropTypes from 'prop-types'
import { useTranslations } from 'next-intl'

const StoreFinalCTA = (props) => {
  return (
    <>
      <div
        className={`store-final-cta-container thq-section-padding ${props.rootClassName} `}
      >
        <div className="store-final-cta-thq-max-width-elm thq-section-max-width">
          <div className="store-final-cta-thq-content-elm">
            <h2 className="store-final-cta-thq-heading1-elm thq-heading-2">
              {props.heading1 ?? (
                <Fragment>
                  <span className="store-final-cta-text1">
                    Looking for imagery with depth and intention?
                  </span>
                </Fragment>
              )}
            </h2>
            <p className="store-final-cta-thq-content1-elm thq-body-large">
              {props.content1 ?? (
                <Fragment>
                  <span className="store-final-cta-text2">
                    Let’s find the right visual for your story.
                  </span>
                </Fragment>
              )}
            </p>
            <div className="store-final-cta-thq-actions-elm">
              <button className="thq-button-outline store-final-cta-thq-button-elm">
                <Link href="/store-collection">
                  <a className="store-final-cta-link thq-body-small">
                    {props.action2 ?? (
                      <Fragment>
                        <span className="store-final-cta-text3">
                          Browse the Collection
                        </span>
                      </Fragment>
                    )}
                  </a>
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .store-final-cta-container {
            gap: var(--dl-layout-space-threeunits);
            display: flex;
            overflow: hidden;
            position: relative;
            flex-direction: column;
          }
          .store-final-cta-thq-max-width-elm {
            width: 100%;
            display: flex;
            max-width: var(--dl-layout-size-maxwidth);
            align-items: center;
            flex-direction: column;
          }
          .store-final-cta-thq-content-elm {
            gap: var(--dl-layout-space-oneandhalfunits);
            display: flex;
            align-self: stretch;
            align-items: flex-start;
            flex-direction: column;
          }
          .store-final-cta-thq-heading1-elm {
            text-align: center;
          }
          .store-final-cta-thq-content1-elm {
            text-align: center;
          }
          .store-final-cta-thq-actions-elm {
            gap: var(--dl-layout-space-oneandhalfunits);
            display: flex;
            align-items: flex-start;
          }
          .store-final-cta-link {
            text-align: center;
            text-decoration: none;
          }
          .store-final-cta-text1 {
            display: inline-block;
          }
          .store-final-cta-text2 {
            display: inline-block;
          }
          .store-final-cta-text3 {
            display: inline-block;
          }

          @media (max-width: 479px) {
            .store-final-cta-thq-actions-elm {
              width: 100%;
              flex-direction: column;
            }
            .store-final-cta-thq-button-elm {
              width: 100%;
            }
          }
        `}
      </style>
    </>
  )
}

StoreFinalCTA.defaultProps = {
  heading1: undefined,
  rootClassName: '',
  content1: undefined,
  action2: undefined,
}

StoreFinalCTA.propTypes = {
  heading1: PropTypes.element,
  rootClassName: PropTypes.string,
  content1: PropTypes.element,
  action2: PropTypes.element,
}

export default StoreFinalCTA
