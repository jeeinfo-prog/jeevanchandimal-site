import React, { Fragment } from 'react'

import PropTypes from 'prop-types'
import { useTranslations } from 'next-intl'

const ServiceIntro = (props) => {
  return (
    <>
      <div className="service-intro-container thq-section-padding">
        <div className="service-intro-thq-max-width-elm thq-section-max-width">
          <div className="service-intro-thq-content-elm thq-flex-column">
            <ul className="service-intro-ul thq-flex-column">
              <li className="thq-flex-column list-item">
                <h2 className="service-intro-thq-heading1-elm thq-heading-2">
                  {props.heading1 ?? (
                    <Fragment>
                      <span className="service-intro-text2">
                        End-to-end visual production, built with cinematic
                        intent.
                      </span>
                    </Fragment>
                  )}
                </h2>
                <p className="thq-body-small">
                  {props.content1 ?? (
                    <Fragment>
                      <span className="service-intro-text1">
                        I work across film, photography, sound, and animation —
                        offering complete creative solutions from concept to
                        final delivery. Each project is approached with care,
                        precision, and a strong sense of atmosphere.
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
          .service-intro-container {
            width: 100%;
            height: auto;
            display: flex;
            position: relative;
            align-items: center;
            flex-direction: column;
          }
          .service-intro-thq-max-width-elm {
            width: 100%;
            display: flex;
            max-width: var(--dl-layout-size-maxwidth);
            align-items: center;
            flex-direction: column;
          }
          .service-intro-thq-content-elm {
            align-self: stretch;
            align-items: flex-start;
          }
          .service-intro-ul {
            align-items: flex-start;
          }
          .service-intro-thq-heading1-elm {
            align-self: flex-start;
          }
          .service-intro-text1 {
            display: inline-block;
          }
          .service-intro-text2 {
            display: inline-block;
          }
        `}
      </style>
    </>
  )
}

ServiceIntro.defaultProps = {
  content1: undefined,
  heading1: undefined,
}

ServiceIntro.propTypes = {
  content1: PropTypes.element,
  heading1: PropTypes.element,
}

export default ServiceIntro
