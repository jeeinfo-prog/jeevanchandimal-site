import React, { Fragment } from 'react'

import PropTypes from 'prop-types'
import { useTranslations } from 'next-intl'

const WorkAnimationEndNote = (props) => {
  return (
    <>
      <div
        className={`work-animation-end-note-container thq-section-padding ${props.rootClassName} `}
      >
        <div className="work-animation-end-note-thq-max-width-elm thq-section-max-width">
          <div className="work-animation-end-note-thq-content-elm thq-flex-column">
            <ul className="work-animation-end-note-ul thq-flex-column">
              <li className="list-item">
                <h3 className="thq-heading-3">
                  {props.heading2 ?? (
                    <Fragment>
                      <span className="work-animation-end-note-text1">
                        Animation &amp; Motion
                      </span>
                    </Fragment>
                  )}
                </h3>
                <p className="thq-body-small">
                  {props.content2 ?? (
                    <Fragment>
                      <span className="work-animation-end-note-text2">
                        When movement is shaped with intent, it becomes part of
                        the story itself.
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
          .work-animation-end-note-container {
            width: 100%;
            height: auto;
            display: flex;
            position: relative;
            align-items: center;
            flex-direction: column;
          }
          .work-animation-end-note-thq-max-width-elm {
            width: 100%;
            display: flex;
            max-width: var(--dl-layout-size-maxwidth);
            align-items: center;
            flex-direction: column;
          }
          .work-animation-end-note-thq-content-elm {
            align-self: stretch;
            align-items: flex-start;
          }
          .work-animation-end-note-ul {
            align-items: flex-start;
          }
          .work-animation-end-note-text1 {
            display: inline-block;
          }
          .work-animation-end-note-text2 {
            display: inline-block;
          }
        `}
      </style>
    </>
  )
}

WorkAnimationEndNote.defaultProps = {
  rootClassName: '',
  heading2: undefined,
  content2: undefined,
}

WorkAnimationEndNote.propTypes = {
  rootClassName: PropTypes.string,
  heading2: PropTypes.element,
  content2: PropTypes.element,
}

export default WorkAnimationEndNote
