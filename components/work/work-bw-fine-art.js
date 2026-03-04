import React, { Fragment } from 'react'

import PropTypes from 'prop-types'
import { useTranslations } from 'next-intl'

const WorkBWFineArt = (props) => {
  return (
    <>
      <div className="work-bw-fine-art-thq-header30-elm thq-section-padding">
        <img
          alt={props.image1Alt}
          src={props.image1Src}
          className="work-bw-fine-art-image"
        />
        <div className="work-bw-fine-art-container"></div>
        <div className="work-bw-fine-art-thq-max-width-elm thq-section-max-width">
          <div className="work-bw-fine-art-thq-content-elm">
            <h1 className="work-bw-fine-art-thq-text-elm1 thq-heading-1">
              {props.heading1 ?? (
                <Fragment>
                  <span className="work-bw-fine-art-text1">
                    Black &amp; White Photography
                  </span>
                </Fragment>
              )}
            </h1>
            <p className="work-bw-fine-art-thq-text-elm2 thq-body-large">
              {props.content1 ?? (
                <Fragment>
                  <span className="work-bw-fine-art-text2">
                    Tailored solutions to meet your creative needs
                  </span>
                </Fragment>
              )}
            </p>
            <div className="work-bw-fine-art-thq-actions-elm">
              <button className="thq-button-filled work-bw-fine-art-thq-button-elm1">
                <span className="work-bw-fine-art-thq-text-elm3 thq-body-small">
                  {props.action1 ?? (
                    <Fragment>
                      <span className="work-bw-fine-art-text4">Learn More</span>
                    </Fragment>
                  )}
                </span>
              </button>
              <button className="thq-button-outline work-bw-fine-art-thq-button-elm2">
                <span className="work-bw-fine-art-thq-text-elm4 thq-body-small">
                  {props.action2 ?? (
                    <Fragment>
                      <span className="work-bw-fine-art-text3">
                        Get Started
                      </span>
                    </Fragment>
                  )}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .work-bw-fine-art-thq-header30-elm {
            gap: var(--dl-layout-space-twounits);
          }
          .work-bw-fine-art-image {
            top: 0px;
            left: 0px;
            width: 100%;
            height: 100%;
            position: absolute;
            object-fit: cover;
          }
          .work-bw-fine-art-container {
            top: 0px;
            left: 0px;
            right: 0px;
            width: 100%;
            bottom: 0px;
            height: 100%;
            display: flex;
            position: absolute;
            align-items: flex-start;
            flex-direction: column;
            background-color: rgba(0, 0, 0, 0.68);
          }
          .work-bw-fine-art-thq-max-width-elm {
            gap: var(--dl-layout-space-oneandhalfunits);
            width: 100%;
            display: flex;
            z-index: 1;
            align-items: center;
            flex-direction: column;
          }
          .work-bw-fine-art-thq-content-elm {
            gap: var(--dl-layout-space-oneandhalfunits);
            display: flex;
            align-self: stretch;
            align-items: center;
            flex-direction: column;
          }
          .work-bw-fine-art-thq-text-elm1 {
            text-align: center;
          }
          .work-bw-fine-art-thq-text-elm2 {
            text-align: center;
          }
          .work-bw-fine-art-thq-actions-elm {
            gap: var(--dl-layout-space-unit);
            display: flex;
            align-items: flex-start;
          }
          .work-bw-fine-art-thq-text-elm3 {
            text-align: center;
          }
          .work-bw-fine-art-thq-text-elm4 {
            text-align: center;
          }
          .work-bw-fine-art-text1 {
            display: inline-block;
          }
          .work-bw-fine-art-text2 {
            display: inline-block;
          }
          .work-bw-fine-art-text3 {
            display: inline-block;
          }
          .work-bw-fine-art-text4 {
            display: inline-block;
          }
          @media (max-width: 991px) {
            .work-bw-fine-art-thq-text-elm1 {
              text-align: center;
            }
            .work-bw-fine-art-thq-text-elm2 {
              text-align: center;
            }
          }
          @media (max-width: 479px) {
            .work-bw-fine-art-thq-actions-elm {
              width: 100%;
              flex-direction: column;
            }
            .work-bw-fine-art-thq-button-elm1 {
              width: 100%;
            }
            .work-bw-fine-art-thq-button-elm2 {
              width: 100%;
            }
          }
        `}
      </style>
    </>
  )
}

WorkBWFineArt.defaultProps = {
  image1Alt: 'Creative Services',
  heading1: undefined,
  content1: undefined,
  action2: undefined,
  image1Src:
    'https://images.unsplash.com/photo-1732459651512-7ad07161a684?ixid=M3w5MTMyMXwwfDF8c2VhcmNofDIyN3x8YnxlbnwwfHx8fDE3NjkxOTMzOTJ8MA&ixlib=rb-4.1.0&w=1500',
  action1: undefined,
}

WorkBWFineArt.propTypes = {
  image1Alt: PropTypes.string,
  heading1: PropTypes.element,
  content1: PropTypes.element,
  action2: PropTypes.element,
  image1Src: PropTypes.string,
  action1: PropTypes.element,
}

export default WorkBWFineArt
