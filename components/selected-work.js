import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const SelectedWork = (props) => {
  return (
    <>
      <div className="selected-work-thq-layout251-elm thq-section-padding">
        <div className="selected-work-thq-max-width-elm thq-section-max-width">
          <div className="thq-flex-row selected-work-thq-section-title-elm">
            <div className="selected-work-thq-column-elm thq-flex-column">
              <h2 className="thq-heading-2 selected-work-thq-text-elm1">
                {props.sectionTitle ?? (
                  <Fragment>
                    <span className="selected-work-text1">Selected Work</span>
                  </Fragment>
                )}
              </h2>
            </div>
            <span className="thq-body-small">
              {props.sectionDescription ?? (
                <Fragment>
                  <span className="selected-work-text2">
                    A curated selection of projects across film, photography,
                    sound, and motion - each created with clarity, mood, and
                    narrative presence.
                  </span>
                </Fragment>
              )}
            </span>
          </div>

          <div className="selected-work-thq-content-elm1">
            <div className="selected-work-thq-row-elm1 thq-flex-row">
              <div className="selected-work-thq-feature1-elm1 thq-flex-column">
                <img
                  alt={props.feature1ImageAlt}
                  src={props.feature1ImageSrc || '/BTS/58415_107800565946853_7668083_n-1400w.jpg'}
                  className="thq-img-ratio-4-3 selected-work-thq-feature1-image-elm1"
                />
              </div>
              <div className="selected-work-thq-feature2-elm1 thq-flex-column">
                <img
                  alt={props.feature2ImageAlt}
                  src={props.feature2ImageSrc || '/BTS/16905000_1391539670906263_5044795706700183659_o-300h.jpg'}
                  className="thq-img-ratio-4-3 selected-work-thq-feature2-image-elm1"
                />
              </div>
              <div className="selected-work-thq-feature3-elm1 thq-flex-column">
                <img
                  alt={props.feature3ImageAlt}
                  src={props.feature3ImageSrc || '/BTS/16716053_1374388602621370_5959989464476088896_o-300h.jpg'}
                  className="thq-img-ratio-4-3 selected-work-thq-feature3-image-elm1"
                />
              </div>
            </div>
          </div>

          <div className="selected-work-thq-content-elm2">
            <div className="selected-work-thq-row-elm2 thq-flex-row">
              <div className="selected-work-thq-feature1-elm2 thq-flex-column">
                <img
                  alt={props.feature1ImageAlt1}
                  src={props.feature1ImageSrc1 || '/BTS/241864_383625518364355_691940775_o-1400w.jpg'}
                  className="thq-img-ratio-4-3 selected-work-thq-feature1-image-elm2"
                />
              </div>
              <div className="selected-work-thq-feature2-elm2 thq-flex-column">
                <img
                  alt={props.feature2ImageAlt1}
                  src={props.feature2ImageSrc1 || '/BTS/41348474_2037791082947782_5867092503643029504_o-300h.jpg'}
                  className="thq-img-ratio-4-3 selected-work-thq-feature2-image-elm2"
                />
              </div>
              <div className="selected-work-thq-feature3-elm2 thq-flex-column">
                <img
                  alt={props.feature3ImageAlt1}
                  src={props.feature3ImageSrc1 || '/BTS/43645067_2079243978802492_1981101150438424576_o-300h.jpg'}
                  className="thq-img-ratio-4-3 selected-work-thq-feature3-image-elm2"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>
        {`
          .selected-work-thq-layout251-elm {
            width: 100%;
            height: auto;
            display: flex;
            overflow: hidden;
            position: relative;
            align-items: center;
            flex-shrink: 0;
            flex-direction: column;
          }
          .selected-work-thq-max-width-elm {
            gap: var(--dl-layout-space-threeunits);
            display: flex;
            align-items: flex-start;
            flex-direction: column;
          }
          .selected-work-thq-column-elm {
            gap: var(--dl-layout-space-halfunit);
            align-items: flex-start;
            flex-shrink: 0;
          }
          .selected-work-thq-content-elm1 {
            gap: 48px;
            display: flex;
            align-self: stretch;
            align-items: flex-start;
            flex-direction: column;
          }
          .selected-work-thq-row-elm1 {
            align-items: flex-start;
          }
          .selected-work-thq-feature1-elm1,
          .selected-work-thq-feature2-elm1,
          .selected-work-thq-feature3-elm1 {
            flex: 1;
          }
          .selected-work-thq-content-elm2 {
            gap: 48px;
            display: flex;
            align-self: stretch;
            align-items: flex-start;
            flex-direction: column;
          }
          .selected-work-thq-row-elm2 {
            align-items: flex-start;
          }
          .selected-work-thq-feature1-elm2,
          .selected-work-thq-feature2-elm2,
          .selected-work-thq-feature3-elm2 {
            flex: 1;
          }
          .selected-work-text1,
          .selected-work-text2 {
            display: inline-block;
          }
          @media (max-width: 991px) {
            .selected-work-thq-section-title-elm {
              align-items: flex-start;
              flex-direction: column;
            }
            .selected-work-thq-feature1-image-elm1,
            .selected-work-thq-feature2-image-elm1,
            .selected-work-thq-feature3-image-elm1,
            .selected-work-thq-feature1-image-elm2,
            .selected-work-thq-feature2-image-elm2,
            .selected-work-thq-feature3-image-elm2 {
              height: 260px;
            }
          }
          @media (max-width: 767px) {
            .selected-work-thq-column-elm {
              width: 100%;
            }
            .selected-work-thq-text-elm1 {
              text-align: center;
            }
            .selected-work-thq-row-elm1,
            .selected-work-thq-row-elm2 {
              flex-direction: column;
            }
            .selected-work-thq-feature1-image-elm1,
            .selected-work-thq-feature2-image-elm1,
            .selected-work-thq-feature1-image-elm2,
            .selected-work-thq-feature2-image-elm2 {
              width: 100%;
            }
            .selected-work-thq-feature2-elm1,
            .selected-work-thq-feature3-elm1,
            .selected-work-thq-feature2-elm2,
            .selected-work-thq-feature3-elm2 {
              width: auto;
            }
            .selected-work-thq-feature3-image-elm1,
            .selected-work-thq-feature3-image-elm2 {
              width: 100%;
            }
          }
        `}
      </style>
    </>
  )
}

SelectedWork.defaultProps = {
  feature2ImageAlt: 'Sound Design Image',
  feature1ImageAlt1: 'Film & Photography Image',
  feature3ImageAlt1: 'Animation Image',
  feature1ImageAlt: 'Film & Photography Image',
  feature2ImageAlt1: 'Sound Design Image',
  feature3ImageAlt: 'Animation Image',

  // Your real local BTS images (make sure these exist in /public/BTS/)
  feature1ImageSrc: '/BTS/58415_107800565946853_7668083_n-1400w.jpg',
  feature2ImageSrc: '/BTS/16905000_1391539670906263_5044795706700183659_o-300h.jpg',
  feature3ImageSrc: '/BTS/16716053_1374388602621370_5959989464476088896_o-300h.jpg',
  feature1ImageSrc1: '/BTS/241864_383625518364355_691940775_o-1400w.jpg',
  feature2ImageSrc1: '/BTS/41348474_2037791082947782_5867092503643029504_o-300h.jpg',
  feature3ImageSrc1: '/BTS/43645067_2079243978802492_1981101150438424576_o-300h.jpg',

  sectionTitle: undefined,
  sectionDescription: undefined,
}

SelectedWork.propTypes = {
  feature2ImageAlt: PropTypes.string,
  feature1ImageAlt1: PropTypes.string,
  feature3ImageSrc: PropTypes.string,
  feature2ImageSrc: PropTypes.string,
  feature1ImageSrc1: PropTypes.string,
  feature3ImageSrc1: PropTypes.string,
  sectionTitle: PropTypes.element,
  feature3ImageAlt1: PropTypes.string,
  feature1ImageAlt: PropTypes.string,
  feature2ImageSrc1: PropTypes.string,
  feature2ImageAlt1: PropTypes.string,
  sectionDescription: PropTypes.element,
  feature1ImageSrc: PropTypes.string,
  feature3ImageAlt: PropTypes.string,
}

export default SelectedWork
