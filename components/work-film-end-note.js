import React, { Fragment } from 'react'

import PropTypes from 'prop-types'
import { useTranslations } from 'next-intl'

const WorkFilmEndNote = (props) => {
  return (
    <>
      <div
        className={`work-film-end-note-container thq-section-padding ${props.rootClassName} `}
      >
        <div className="work-film-end-note-thq-max-width-elm thq-section-max-width">
          <div className="work-film-end-note-thq-content-elm thq-flex-column">
            <ul className="work-film-end-note-ul thq-flex-column">
              <li className="list-item">
                <h3 className="thq-heading-3">
                  {props.heading2 ?? (
                    <Fragment>
                      <span className="work-film-end-note-text2">
                        Film Production
                      </span>
                    </Fragment>
                  )}
                </h3>
                <p className="thq-body-small">
                  {props.content2 ?? (
                    <Fragment>
                      <span className="work-film-end-note-text1">
                        Each project opens into a dedicated case study,
                        presenting the film as a complete visual work.
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
          .work-film-end-note-container {
            width: 100%;
            height: auto;
            display: flex;
            position: relative;
            align-items: center;
            flex-direction: column;
          }
          .work-film-end-note-thq-max-width-elm {
            width: 100%;
            display: flex;
            max-width: var(--dl-layout-size-maxwidth);
            align-items: center;
            flex-direction: column;
          }
          .work-film-end-note-thq-content-elm {
            align-self: stretch;
            align-items: flex-start;
          }
          .work-film-end-note-ul {
            align-items: flex-start;
          }
          .work-film-end-note-text1 {
            display: inline-block;
          }
          .work-film-end-note-text2 {
            display: inline-block;
          }
        `}
      </style>
    </>
  )
}

WorkFilmEndNote.defaultProps = {
  content2: undefined,
  rootClassName: '',
  heading2: undefined,
}

WorkFilmEndNote.propTypes = {
  content2: PropTypes.element,
  rootClassName: PropTypes.string,
  heading2: PropTypes.element,
}

export default WorkFilmEndNote
