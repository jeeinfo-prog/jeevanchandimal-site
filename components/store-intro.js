import React, { Fragment } from 'react'

import PropTypes from 'prop-types'
import { useTranslations } from 'next-intl'

const StoreIntro = (props) => {
  return (
    <>
      <div
        className={`store-intro-container thq-section-padding ${props.rootClassName} `}
      >
        <div className="store-intro-thq-max-width-elm thq-section-max-width">
          <div className="store-intro-thq-content-elm thq-flex-column">
            <ul className="store-intro-ul thq-flex-column">
              <li className="thq-flex-column list-item">
                <h2 className="store-intro-thq-heading1-elm thq-heading-2">
                  {props.heading1 ?? (
                    <Fragment>
                      <span className="store-intro-text5">
                        This is not a stock library.
                      </span>
                    </Fragment>
                  )}
                </h2>
                <p className="thq-body-small">
                  {props.content1 ?? (
                    <Fragment>
                      <span className="store-intro-text1">
                        <span>
                          Each image in this collection is captured with
                          intention, shaped by light, mood, and narrative
                          presence.
                        </span>
                        <br></br>
                        <span>
                          The store offers carefully selected visuals for
                          filmmakers, brands, designers, and storytellers who
                          value depth over volume — imagery designed to support
                          meaningful work.
                        </span>
                      </span>
                    </Fragment>
                  )}
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .store-intro-container {
            width: 100%;
            height: auto;
            display: flex;
            position: relative;
            align-items: center;
            flex-direction: column;
          }
          .store-intro-thq-max-width-elm {
            width: 100%;
            display: flex;
            max-width: var(--dl-layout-size-maxwidth);
            align-items: center;
            flex-direction: column;
          }
          .store-intro-thq-content-elm {
            align-self: stretch;
            align-items: flex-start;
          }
          .store-intro-ul {
            align-items: flex-start;
          }
          .store-intro-thq-heading1-elm {
            align-self: flex-start;
            text-align: center;
          }
          .store-intro-text1 {
            display: inline-block;
          }
          .store-intro-text5 {
            display: inline-block;
          }
        `}
      </style>
    </>
  )
}

StoreIntro.defaultProps = {
  content1: undefined,
  heading1: undefined,
  rootClassName: '',
}

StoreIntro.propTypes = {
  content1: PropTypes.element,
  heading1: PropTypes.element,
  rootClassName: PropTypes.string,
}

export default StoreIntro
