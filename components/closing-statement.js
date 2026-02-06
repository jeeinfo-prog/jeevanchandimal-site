import React, { Fragment } from 'react'

import PropTypes from 'prop-types'
import { useTranslations } from 'next-intl'

const ClosingStatement = (props) => {
  return (
    <>
      <div className="closing-statement-thq-layout186-elm thq-section-padding">
        <div className="thq-section-max-width thq-flex-column">
          <h2 className="closing-statement-thq-text-elm1 thq-heading-2">
            {props.feature1Title ?? (
              <Fragment>
                <span className="closing-statement-text1">
                  Let’s create something that lasts.
                </span>
              </Fragment>
            )}
          </h2>
          <p className="closing-statement-thq-text-elm2 thq-body-large">
            {props.feature1Description ?? (
              <Fragment>
                <span className="closing-statement-text2">
                  I create work that lives beyond the screen - projects built
                  with atmosphere, intention, and cinematic depth.
                </span>
              </Fragment>
            )}
          </p>
        </div>
      </div>
      <style jsx>
        {`
          .closing-statement-thq-layout186-elm {
            width: 100%;
            height: auto;
            display: flex;
            overflow: hidden;
            position: relative;
            align-items: center;
            flex-shrink: 0;
            flex-direction: column;
            justify-content: center;
          }
          .closing-statement-thq-text-elm1 {
            z-index: 2;
            text-align: center;
          }
          .closing-statement-thq-text-elm2 {
            z-index: 2;
            text-align: center;
          }
          .closing-statement-text1 {
            display: inline-block;
          }
          .closing-statement-text2 {
            display: inline-block;
          }
        `}
      </style>
    </>
  )
}

ClosingStatement.defaultProps = {
  feature1Title: undefined,
  feature1Description: undefined,
}

ClosingStatement.propTypes = {
  feature1Title: PropTypes.element,
  feature1Description: PropTypes.element,
}

export default ClosingStatement
