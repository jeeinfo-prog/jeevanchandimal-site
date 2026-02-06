import React, { Fragment } from 'react'

import PropTypes from 'prop-types'
import { useTranslations } from 'next-intl'

const StoreWhyThisCollection = (props) => {
  return (
    <>
      <div
        className={`store-why-this-collection-container thq-section-padding ${props.rootClassName} `}
      >
        <div className="store-why-this-collection-thq-max-width-elm thq-section-max-width">
          <div className="store-why-this-collection-thq-content-elm thq-flex-column">
            <ul className="store-why-this-collection-ul thq-flex-column">
              <li className="thq-flex-column list-item">
                <h2 className="store-why-this-collection-thq-heading1-elm thq-heading-2">
                  {props.heading1 ?? (
                    <Fragment>
                      <span className="store-why-this-collection-text2">
                        Why This Collection
                      </span>
                    </Fragment>
                  )}
                </h2>
                <p className="thq-body-small">
                  {props.content1 ?? (
                    <Fragment>
                      <span className="store-why-this-collection-text1">
                        This archive is built slowly and intentionally —
                        prioritizing quality, coherence, and atmosphere over
                        volume. New work is added regularly, reflecting ongoing
                        journeys, projects, and visual exploration.
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
          .store-why-this-collection-container {
            width: 100%;
            height: auto;
            display: flex;
            position: relative;
            align-items: center;
            flex-direction: column;
          }
          .store-why-this-collection-thq-max-width-elm {
            width: 100%;
            display: flex;
            max-width: var(--dl-layout-size-maxwidth);
            align-items: center;
            flex-direction: column;
          }
          .store-why-this-collection-thq-content-elm {
            align-self: stretch;
            align-items: flex-start;
          }
          .store-why-this-collection-ul {
            align-items: flex-start;
          }
          .store-why-this-collection-thq-heading1-elm {
            align-self: flex-start;
            text-align: center;
          }
          .store-why-this-collection-text1 {
            display: inline-block;
          }
          .store-why-this-collection-text2 {
            display: inline-block;
          }
        `}
      </style>
    </>
  )
}

StoreWhyThisCollection.defaultProps = {
  rootClassName: '',
  content1: undefined,
  heading1: undefined,
}

StoreWhyThisCollection.propTypes = {
  rootClassName: PropTypes.string,
  content1: PropTypes.element,
  heading1: PropTypes.element,
}

export default StoreWhyThisCollection
