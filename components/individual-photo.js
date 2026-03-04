import React, { Fragment } from 'react'

import PropTypes from 'prop-types'
import { useTranslations } from 'next-intl'

import Pricing9 from './pricing9'

const IndividualPhoto = (props) => {
  return (
    <>
      <div className="individual-photo-thq-layout223-elm thq-section-padding">
        <div className="individual-photo-thq-max-width-elm thq-button-filled">
          <div className="individual-photo-container1 thq-flex-column">
            <img
              alt={props.featureImageAlt}
              src={props.featureImageSrc}
              className="individual-photo-thq-placeholder-image-elm thq-img-ratio-4-3"
            />
            <div className="individual-photo-container2 thq-flex-column">
              <span className="individual-photo-thq-text-elm thq-body-small">
                {props.text3 ?? (
                  <Fragment>
                    <span className="individual-photo-text37">
                      <span>IMAGE DETAILS</span>
                      <br></br>
                      <span>Contributor:Joana Kruse</span>
                      <br></br>
                      <span>
                        File size:76.5 MB (3.8 MB Compressed download)
                      </span>
                      <br></br>
                      <span>
                        Releases:Model - no | Property - noDo I need a release?
                      </span>
                      <br></br>
                      <span>
                        Dimensions:6333 x 4222 px | 53.6 x 35.7 cm | 21.1 x 14.1
                        inches | 300dpi
                      </span>
                      <br></br>
                      <span>Date taken:30 November 2019</span>
                      <br></br>
                      <span>Location:Cuba</span>
                      <br></br>
                    </span>
                  </Fragment>
                )}
              </span>
            </div>
          </div>
          <Pricing9
            text={
              <Fragment>
                <span className="individual-photo-text10">
                  Taxes may apply to prices shown.
                </span>
              </Fragment>
            }
            plan1={
              <Fragment>
                <span className="individual-photo-text11">Basic Plan</span>
              </Fragment>
            }
            text1={
              <Fragment>
                <span className="individual-photo-text12">$ 40</span>
              </Fragment>
            }
            plan11={
              <Fragment>
                <span className="individual-photo-text13">Basic plan</span>
              </Fragment>
            }
            content1={
              <Fragment>
                <span className="individual-photo-text14">
                  Affordable Pricing Plans to Get You Started
                </span>
              </Fragment>
            }
            content2={
              <Fragment>
                <span className="individual-photo-text15">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  <span
                    dangerouslySetInnerHTML={{
                      __html: ' ',
                    }}
                  />
                </span>
              </Fragment>
            }
            heading1={
              <Fragment>
                <span className="individual-photo-text16">Pricing plan</span>
              </Fragment>
            }
            plan1Price={
              <Fragment>
                <span className="individual-photo-text17">$99</span>
              </Fragment>
            }
            plan1Action={
              <Fragment>
                <span className="individual-photo-text18">Get Started</span>
              </Fragment>
            }
            plan1Detail={
              <Fragment>
                <span className="individual-photo-text19">
                  Ideal for small projects
                </span>
              </Fragment>
            }
            plan1Price1={
              <Fragment>
                <span className="individual-photo-text20">$200/yr</span>
              </Fragment>
            }
            plan1Action1={
              <Fragment>
                <span className="individual-photo-text21">Get started</span>
              </Fragment>
            }
            plan1Action2={
              <Fragment>
                <span className="individual-photo-text22">
                  Buy and download now
                </span>
              </Fragment>
            }
            plan1Action3={
              <Fragment>
                <span className="individual-photo-text23">Add to Cart</span>
              </Fragment>
            }
            plan1Detail1={
              <Fragment>
                <span className="individual-photo-text24">
                  Lorem ipsum dolor sit amet
                </span>
              </Fragment>
            }
            plan1Feature1={
              <Fragment>
                <span className="individual-photo-text25">Film Production</span>
              </Fragment>
            }
            plan1Feature2={
              <Fragment>
                <span className="individual-photo-text26">
                  Audio Production
                </span>
              </Fragment>
            }
            plan1Feature3={
              <Fragment>
                <span className="individual-photo-text27">
                  Animation &amp; Graphics
                </span>
              </Fragment>
            }
            plan1Feature4={
              <Fragment>
                <span className="individual-photo-text28">Photography</span>
              </Fragment>
            }
            plan1Feature5={
              <Fragment>
                <span className="individual-photo-text29">
                  Feature text goes here
                </span>
              </Fragment>
            }
            plan1Feature6={
              <Fragment>
                <span className="individual-photo-text30">
                  Feature text goes here
                </span>
              </Fragment>
            }
            rootClassName="pricing9root-class-name"
            plan1Feature11={
              <Fragment>
                <span className="individual-photo-text31">
                  Feature text goes here
                </span>
              </Fragment>
            }
            plan1Feature21={
              <Fragment>
                <span className="individual-photo-text32">
                  Feature text goes here
                </span>
              </Fragment>
            }
            plan1Feature31={
              <Fragment>
                <span className="individual-photo-text33">
                  Feature text goes here
                </span>
              </Fragment>
            }
            plan1Feature41={
              <Fragment>
                <span className="individual-photo-text34">
                  Feature text goes here
                </span>
              </Fragment>
            }
            plan1Feature51={
              <Fragment>
                <span className="individual-photo-text35">
                  Feature text goes here
                </span>
              </Fragment>
            }
            plan1Feature61={
              <Fragment>
                <span className="individual-photo-text36">
                  Feature text goes here
                </span>
              </Fragment>
            }
          ></Pricing9>
        </div>
      </div>
      <style jsx>
        {`
          .individual-photo-thq-layout223-elm {
            width: 100%;
            height: auto;
            display: flex;
            padding: var(--dl-layout-space-twounits);
            overflow: hidden;
            position: relative;
            align-items: center;
            flex-shrink: 0;
            flex-direction: row;
            justify-content: center;
          }
          .individual-photo-thq-max-width-elm {
            width: 100%;
            align-self: flex-start;
            border-width: 0px;
            background-color: transparent;
          }
          .individual-photo-container1 {
            align-items: flex-start;
          }
          .individual-photo-thq-placeholder-image-elm {
            width: 1277px;
            height: 959px;
          }
          .individual-photo-container2 {
            flex: 0 0 auto;
            width: 643px;
            height: 179px;
            display: flex;
            align-self: flex-start;
            align-items: flex-start;
            flex-direction: column;
          }
          .individual-photo-thq-text-elm {
            justify-self: stretch;
          }
          .individual-photo-text10 {
            display: inline-block;
          }
          .individual-photo-text11 {
            display: inline-block;
          }
          .individual-photo-text12 {
            display: inline-block;
          }
          .individual-photo-text13 {
            display: inline-block;
          }
          .individual-photo-text14 {
            display: inline-block;
          }
          .individual-photo-text15 {
            display: inline-block;
          }
          .individual-photo-text16 {
            display: inline-block;
          }
          .individual-photo-text17 {
            display: inline-block;
          }
          .individual-photo-text18 {
            display: inline-block;
          }
          .individual-photo-text19 {
            display: inline-block;
          }
          .individual-photo-text20 {
            display: inline-block;
          }
          .individual-photo-text21 {
            display: inline-block;
          }
          .individual-photo-text22 {
            display: inline-block;
          }
          .individual-photo-text23 {
            display: inline-block;
          }
          .individual-photo-text24 {
            display: inline-block;
          }
          .individual-photo-text25 {
            display: inline-block;
          }
          .individual-photo-text26 {
            display: inline-block;
          }
          .individual-photo-text27 {
            display: inline-block;
          }
          .individual-photo-text28 {
            display: inline-block;
          }
          .individual-photo-text29 {
            display: inline-block;
          }
          .individual-photo-text30 {
            display: inline-block;
          }
          .individual-photo-text31 {
            display: inline-block;
          }
          .individual-photo-text32 {
            display: inline-block;
          }
          .individual-photo-text33 {
            display: inline-block;
          }
          .individual-photo-text34 {
            display: inline-block;
          }
          .individual-photo-text35 {
            display: inline-block;
          }
          .individual-photo-text36 {
            display: inline-block;
          }
          .individual-photo-text37 {
            display: inline-block;
            align-self: flex-start;
            font-weight: 400;
          }
          @media (max-width: 991px) {
            .individual-photo-thq-layout223-elm {
              flex-direction: column;
            }
          }
          @media (max-width: 479px) {
            .individual-photo-thq-max-width-elm {
              width: 100%;
            }
          }
        `}
      </style>
    </>
  )
}

IndividualPhoto.defaultProps = {
  text3: undefined,
  featureImageSrc: '/Photography/Medium/gangarama%20perahera%2008-1000h.jpg',
  featureImageAlt: 'Film Production Image',
}

IndividualPhoto.propTypes = {
  text3: PropTypes.element,
  featureImageSrc: PropTypes.string,
  featureImageAlt: PropTypes.string,
}

export default IndividualPhoto
