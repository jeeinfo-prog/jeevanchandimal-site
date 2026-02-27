import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const SelectedFilmWork = (props) => {
  return (
    <>
      <div
        id="selected-film-work"
        className={`selected-film-work-thq-gallery3-elm thq-section-padding ${props.rootClassName}`}
      >
        <div className="selected-film-work-thq-max-width-elm thq-section-max-width">
          <div className="selected-film-work-thq-section-title-elm">
            <h2 className="selected-film-work-thq-text-elm1 thq-heading-2">
              {props.heading1 ?? (
                <Fragment>
                  <span className="selected-film-work-text1">
                    Selected Film Work
                  </span>
                </Fragment>
              )}
            </h2>

            <span className="selected-film-work-thq-text-elm2 thq-body-large">
              {props.content1 ?? (
                <Fragment>
                  <span className="selected-film-work-text2">
                    A curated selection of commercial, documentary, and
                    narrative projects — each built with atmosphere, clarity,
                    and purpose.
                  </span>
                </Fragment>
              )}
            </span>
          </div>

          <div className="selected-film-work-container1">
            <div className="selected-film-work-thq-content-elm">
              {/* Column 1 */}
              <div className="selected-film-work-container2">
                <img
                  alt={props.image1Alt}
                  src={props.image1Src}
                  className="selected-film-work-thq-image1-elm thq-img-ratio-1-1"
                />
                <img
                  alt={props.image2Alt}
                  src={props.image2Src}
                  className="selected-film-work-thq-image2-elm thq-img-ratio-1-1"
                />
              </div>

              {/* Column 2 */}
              <div className="selected-film-work-container3">
                <img
                  alt={props.image3Alt}
                  src={props.image3Src}
                  className="selected-film-work-thq-image3-elm thq-img-ratio-4-3"
                />
                <img
                  alt={props.image4Alt}
                  src={props.image4Src}
                  className="selected-film-work-thq-image4-elm thq-img-ratio-1-1"
                />
                <img
                  alt={props.image5Alt}
                  src={props.image5Src}
                  className="selected-film-work-thq-image5-elm thq-img-ratio-4-3"
                />
              </div>

              {/* Column 3 */}
              <div className="selected-film-work-container4">
                <img
                  alt={props.image6Alt}
                  src={props.image6Src}
                  className="selected-film-work-thq-image6-elm thq-img-ratio-1-1"
                />
                <img
                  alt={props.image7Alt}
                  src={props.image7Src}
                  className="selected-film-work-thq-image7-elm thq-img-ratio-1-1"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .selected-film-work-thq-gallery3-elm {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .selected-film-work-thq-max-width-elm {
          gap: var(--dl-layout-space-threeunits);
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .selected-film-work-thq-section-title-elm {
          gap: 24px;
          max-width: 800px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .selected-film-work-thq-text-elm1,
        .selected-film-work-thq-text-elm2 {
          text-align: center;
        }

        .selected-film-work-container1 {
          width: 100%;
          display: flex;
          justify-content: center;
        }

        .selected-film-work-thq-content-elm {
          gap: var(--dl-layout-space-oneandhalfunits);
          width: 100%;
          display: flex;
        }

        .selected-film-work-container2,
        .selected-film-work-container3,
        .selected-film-work-container4 {
          gap: var(--dl-layout-space-oneandhalfunits);
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .selected-film-work-thq-image1-elm,
        .selected-film-work-thq-image2-elm,
        .selected-film-work-thq-image4-elm,
        .selected-film-work-thq-image6-elm,
        .selected-film-work-thq-image7-elm {
          width: 100%;
          height: 440px;
          object-fit: cover;
        }

        .selected-film-work-thq-image3-elm,
        .selected-film-work-thq-image5-elm {
          width: 100%;
          height: 240px;
          object-fit: cover;
        }

        @media (max-width: 991px) {
          .selected-film-work-thq-content-elm {
            flex-direction: column;
          }
        }
      `}</style>
    </>
  )
}

SelectedFilmWork.defaultProps = {
  image2Src: '/BTS/17016087_1391531737573723_1598652838037874774_o-1500w.jpg',
  image1Src: '/BTS/16707268_1374396669287230_7276897030479156402_o-1500w.jpg',
  image4Src: '/BTS/16797595_1374407882619442_6509026956266989204_o-1500w.jpg',
  image5Src: '/BTS/17038856_1391520974241466_5297898758385405400_o-1500w.jpg',
  image6Src: '/BTS/1146949_555509387842633_203488368_o-1500w.jpg',
  image7Src: '/BTS/16716053_1374388602621370_5959989464476088896_o-1500w.jpg',
  image3Src: '/BTS/16819426_1374418422618388_5562315324761799189_o-1500w.jpg',
  heading1: undefined,
  content1: undefined,
  image1Alt: 'Professional Film Production',
  image2Alt: 'High-Quality Audio Production',
  image3Alt: 'Creative Animation & Graphics',
  image4Alt: 'Stunning Photography Services',
  image5Alt: 'Customized Solutions for Clients',
  image6Alt: 'Intuitive Design Services',
  image7Alt: 'Dedicated Customer Support',
  rootClassName: '',
}

SelectedFilmWork.propTypes = {
  image1Src: PropTypes.string,
  image2Src: PropTypes.string,
  image3Src: PropTypes.string,
  image4Src: PropTypes.string,
  image5Src: PropTypes.string,
  image6Src: PropTypes.string,
  image7Src: PropTypes.string,
  heading1: PropTypes.element,
  content1: PropTypes.element,
  image1Alt: PropTypes.string,
  image2Alt: PropTypes.string,
  image3Alt: PropTypes.string,
  image4Alt: PropTypes.string,
  image5Alt: PropTypes.string,
  image6Alt: PropTypes.string,
  image7Alt: PropTypes.string,
  rootClassName: PropTypes.string,
}

export default SelectedFilmWork