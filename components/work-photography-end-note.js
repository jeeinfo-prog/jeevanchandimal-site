import React, { Fragment } from 'react'

import PropTypes from 'prop-types'
import { useTranslations } from 'next-intl'

const WorkPhotographyEndNote = (props) => {
  return (
    <>
      <div
        className={`work-photography-end-note-container thq-section-padding ${props.rootClassName} `}
      >
        <div className="work-photography-end-note-thq-max-width-elm thq-section-max-width">
          <div className="work-photography-end-note-thq-content-elm thq-flex-column">
            <ul className="work-photography-end-note-ul thq-flex-column">
              <li className="list-item">
                <h3 className="thq-heading-3">
                  {props.heading2 ?? (
                    <Fragment>
                      <span className="work-photography-end-note-text1">
                        Photography
                      </span>
                    </Fragment>
                  )}
                </h3>
                <p className="thq-body-small">
                  {props.content2 ?? (
                    <Fragment>
                      <span className="work-photography-end-note-text2">
                        Every image is created with intention — whether as art,
                        narrative support, or licensed visual material.
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
          .work-photography-end-note-container {
            width: 100%;
            height: auto;
            display: flex;
            position: relative;
            align-items: center;
            flex-direction: column;
          }
          .work-photography-end-note-thq-max-width-elm {
            width: 100%;
            display: flex;
            max-width: var(--dl-layout-size-maxwidth);
            align-items: center;
            flex-direction: column;
          }
          .work-photography-end-note-thq-content-elm {
            align-self: stretch;
            align-items: flex-start;
          }
          .work-photography-end-note-ul {
            align-items: flex-start;
          }
          .work-photography-end-note-text1 {
            display: inline-block;
          }
          .work-photography-end-note-text2 {
            display: inline-block;
          }
        `}
      </style>
    </>
  )
}

WorkPhotographyEndNote.defaultProps = {
  heading2: undefined,
  content2: undefined,
  rootClassName: '',
}

WorkPhotographyEndNote.propTypes = {
  heading2: PropTypes.element,
  content2: PropTypes.element,
  rootClassName: PropTypes.string,
}

export default WorkPhotographyEndNote
