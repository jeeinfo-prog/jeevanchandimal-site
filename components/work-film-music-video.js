import React, { Fragment } from 'react'

import PropTypes from 'prop-types'
import { useTranslations } from 'next-intl'

const WorkFilmMusicVideo = (props) => {
  return (
    <>
      <div className="work-film-music-video-thq-layout300-elm thq-section-padding">
        <div className="work-film-music-video-thq-max-width-elm thq-section-max-width">
          <div className="work-film-music-video-thq-section-title-elm">
            <div className="work-film-music-video-thq-content-elm1">
              <h2 className="work-film-music-video-thq-text-elm1 thq-heading-2">
                {props.heading1 ?? (
                  <Fragment>
                    <span className="work-film-music-video-text6">
                      Music Video
                    </span>
                  </Fragment>
                )}
              </h2>
              <span className="work-film-music-video-thq-text-elm2 thq-body-large">
                {props.content1 ?? (
                  <Fragment>
                    <span className="work-film-music-video-text3">
                      Music-driven visual pieces where rhythm, movement, and
                      image work together as a unified experience. Each video is
                      shaped to support the sound while maintaining cinematic
                      structure and restraint.
                    </span>
                  </Fragment>
                )}
              </span>
            </div>
          </div>
          <div className="work-film-music-video-thq-content-elm2">
            <div className="work-film-music-video-thq-row-elm thq-flex-row">
              <div className="work-film-music-video-thq-feature1-elm">
                <img
                  alt={props.feature1ImageAlt}
                  src={props.feature1ImageSrc}
                  className="thq-img-ratio-4-3"
                />
                <div className="work-film-music-video-thq-content-elm3">
                  <h3 className="work-film-music-video-thq-feature1-title-elm thq-heading-3">
                    {props.feature1Title ?? (
                      <Fragment>
                        <span className="work-film-music-video-text7">
                          Song 01
                        </span>
                      </Fragment>
                    )}
                  </h3>
                  <span className="thq-body-small">
                    {props.feature1Description ?? (
                      <Fragment>
                        <span className="work-film-music-video-text5">
                          Professional film production services tailored to your
                          needs.
                        </span>
                      </Fragment>
                    )}
                  </span>
                </div>
              </div>
              <div className="work-film-music-video-thq-feature2-elm">
                <img
                  alt={props.feature2ImageAlt}
                  src={props.feature2ImageSrc}
                  className="thq-img-ratio-4-3"
                />
                <div className="work-film-music-video-thq-content-elm4">
                  <h3 className="thq-heading-3">
                    {props.feature2Title ?? (
                      <Fragment>
                        <span className="work-film-music-video-text4">
                          Song 02
                        </span>
                      </Fragment>
                    )}
                  </h3>
                  <span className="thq-body-small">
                    {props.feature2Description ?? (
                      <Fragment>
                        <span className="work-film-music-video-text1">
                          High-quality audio production services for a variety
                          of projects.
                        </span>
                      </Fragment>
                    )}
                  </span>
                </div>
              </div>
              <div className="work-film-music-video-thq-feature3-elm">
                <img
                  alt={props.feature3ImageAlt}
                  src={props.feature3ImageSrc}
                  className="thq-img-ratio-4-3"
                />
                <div className="work-film-music-video-thq-content-elm5">
                  <h3 className="thq-heading-3">
                    {props.feature3Title ?? (
                      <Fragment>
                        <span className="work-film-music-video-text8">
                          Song 03
                        </span>
                      </Fragment>
                    )}
                  </h3>
                  <span className="thq-body-small">
                    {props.feature3Description ?? (
                      <Fragment>
                        <span className="work-film-music-video-text2">
                          Customized animation and graphics services to bring
                          your ideas to life.
                        </span>
                      </Fragment>
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .work-film-music-video-thq-layout300-elm {
            width: 100%;
            height: auto;
            display: flex;
            overflow: hidden;
            position: relative;
            align-items: center;
            flex-shrink: 0;
            flex-direction: column;
          }
          .work-film-music-video-thq-max-width-elm {
            gap: var(--dl-layout-space-threeunits);
            width: 100%;
            display: flex;
            align-items: center;
            flex-direction: column;
          }
          .work-film-music-video-thq-section-title-elm {
            gap: 16px;
            width: 100%;
            display: flex;
            max-width: 800px;
            align-items: center;
            flex-shrink: 0;
            flex-direction: column;
          }
          .work-film-music-video-thq-content-elm1 {
            gap: 24px;
            display: flex;
            align-self: stretch;
            align-items: center;
            flex-direction: column;
          }
          .work-film-music-video-thq-text-elm1 {
            text-align: center;
          }
          .work-film-music-video-thq-text-elm2 {
            text-align: center;
          }
          .work-film-music-video-thq-content-elm2 {
            gap: 48px;
            display: flex;
            align-self: stretch;
            align-items: center;
            flex-direction: column;
          }
          .work-film-music-video-thq-row-elm {
            display: flex;
            align-self: stretch;
            align-items: flex-start;
            flex-shrink: 0;
            justify-content: center;
          }
          .work-film-music-video-thq-feature1-elm {
            gap: var(--dl-layout-space-twounits);
            flex: 1;
            width: 100%;
            display: flex;
            overflow: hidden;
            align-items: flex-start;
            flex-shrink: 0;
            flex-direction: column;
          }
          .work-film-music-video-thq-content-elm3 {
            gap: var(--dl-layout-space-oneandhalfunits);
            display: flex;
            align-self: stretch;
            align-items: flex-start;
            flex-direction: column;
          }
          .work-film-music-video-thq-feature1-title-elm {
            text-align: center;
          }
          .work-film-music-video-thq-feature2-elm {
            gap: var(--dl-layout-space-twounits);
            flex: 1;
            width: 100%;
            display: flex;
            overflow: hidden;
            align-items: flex-start;
            flex-shrink: 0;
            flex-direction: column;
          }
          .work-film-music-video-thq-content-elm4 {
            gap: var(--dl-layout-space-oneandhalfunits);
            display: flex;
            align-self: stretch;
            align-items: flex-start;
            flex-direction: column;
          }
          .work-film-music-video-thq-feature3-elm {
            gap: var(--dl-layout-space-twounits);
            flex: 1;
            width: 100%;
            display: flex;
            overflow: hidden;
            align-items: flex-start;
            flex-shrink: 0;
            flex-direction: column;
          }
          .work-film-music-video-thq-content-elm5 {
            gap: var(--dl-layout-space-oneandhalfunits);
            display: flex;
            align-self: stretch;
            align-items: flex-start;
            flex-direction: column;
          }
          .work-film-music-video-text1 {
            display: inline-block;
          }
          .work-film-music-video-text2 {
            display: inline-block;
          }
          .work-film-music-video-text3 {
            display: inline-block;
          }
          .work-film-music-video-text4 {
            display: inline-block;
          }
          .work-film-music-video-text5 {
            display: inline-block;
          }
          .work-film-music-video-text6 {
            display: inline-block;
          }
          .work-film-music-video-text7 {
            display: inline-block;
          }
          .work-film-music-video-text8 {
            display: inline-block;
          }
          @media (max-width: 991px) {
            .work-film-music-video-thq-section-title-elm {
              width: 100%;
            }
          }
          @media (max-width: 767px) {
            .work-film-music-video-thq-max-width-elm {
              gap: var(--dl-layout-space-oneandhalfunits);
            }
            .work-film-music-video-thq-section-title-elm {
              width: auto;
            }
            .work-film-music-video-thq-text-elm1 {
              text-align: center;
            }
            .work-film-music-video-thq-row-elm {
              flex-direction: column;
            }
            .work-film-music-video-thq-feature2-elm {
              width: auto;
            }
            .work-film-music-video-thq-feature3-elm {
              width: auto;
            }
          }
        `}
      </style>
    </>
  )
}

WorkFilmMusicVideo.defaultProps = {
  feature1ImageSrc:
    '/BTS/16700628_1374379425955621_7053396137455087587_o-1400w.jpg',
  feature2Description: undefined,
  feature3Description: undefined,
  feature2ImageSrc:
    '/BTS/16797711_1374354599291437_7873776139061673970_o-1400w.jpg',
  content1: undefined,
  feature2Title: undefined,
  feature2ImageAlt: 'Audio Production Image',
  feature1Description: undefined,
  heading1: undefined,
  feature1ImageAlt: 'Film Production Image',
  feature3ImageSrc:
    '/BTS/16722449_1374429735950590_5008325424875823082_o-1400w.jpg',
  feature1Title: undefined,
  feature3ImageAlt: 'Animation & Graphics Image',
  feature3Title: undefined,
}

WorkFilmMusicVideo.propTypes = {
  feature1ImageSrc: PropTypes.string,
  feature2Description: PropTypes.element,
  feature3Description: PropTypes.element,
  feature2ImageSrc: PropTypes.string,
  content1: PropTypes.element,
  feature2Title: PropTypes.element,
  feature2ImageAlt: PropTypes.string,
  feature1Description: PropTypes.element,
  heading1: PropTypes.element,
  feature1ImageAlt: PropTypes.string,
  feature3ImageSrc: PropTypes.string,
  feature1Title: PropTypes.element,
  feature3ImageAlt: PropTypes.string,
  feature3Title: PropTypes.element,
}

export default WorkFilmMusicVideo
