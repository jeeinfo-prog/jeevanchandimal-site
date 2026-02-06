import React, { Fragment } from 'react'

import PropTypes from 'prop-types'
import { useTranslations } from 'next-intl'

const WorkAudioEndNote = (props) => {
  return (
    <>
      <div className="work-audio-end-note-container thq-section-padding">
        <div className="work-audio-end-note-thq-max-width-elm thq-section-max-width">
          <div className="work-audio-end-note-thq-content-elm thq-flex-column">
            <ul className="work-audio-end-note-ul thq-flex-column">
              <li className="list-item">
                <h3 className="thq-heading-3">
                  {props.heading2 ?? (
                    <Fragment>
                      <span className="work-audio-end-note-text2">
                        Audio Production
                      </span>
                    </Fragment>
                  )}
                </h3>
                <p className="thq-body-small">
                  {props.content2 ?? (
                    <Fragment>
                      <span className="work-audio-end-note-text1">
                        Each piece is presented with embedded audio players and
                        supporting visuals, allowing sound to be experienced in
                        context.
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
          .work-audio-end-note-container {
            width: 100%;
            height: auto;
            display: flex;
            position: relative;
            align-items: center;
            flex-direction: column;
          }
          .work-audio-end-note-thq-max-width-elm {
            width: 100%;
            display: flex;
            max-width: var(--dl-layout-size-maxwidth);
            align-items: center;
            flex-direction: column;
          }
          .work-audio-end-note-thq-content-elm {
            align-self: stretch;
            align-items: flex-start;
          }
          .work-audio-end-note-ul {
            align-items: flex-start;
          }
          .work-audio-end-note-text1 {
            display: inline-block;
          }
          .work-audio-end-note-text2 {
            display: inline-block;
          }
        `}
      </style>
    </>
  )
}

WorkAudioEndNote.defaultProps = {
  content2: undefined,
  heading2: undefined,
}

WorkAudioEndNote.propTypes = {
  content2: PropTypes.element,
  heading2: PropTypes.element,
}

export default WorkAudioEndNote
