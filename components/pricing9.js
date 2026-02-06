import React, { useState, Fragment } from 'react'

import PropTypes from 'prop-types'
import { useTranslations } from 'next-intl'

const Pricing9 = (props) => {
  const [isMonthly, setIsMonthly] = useState(true)
  return (
    <>
      <div className={`pricing9-thq-pricing8-elm ${props.rootClassName} `}>
        <div className="pricing9-thq-max-width-elm">
          <div className="pricing9-thq-section-title-elm">
            <span className="pricing9-thq-text-elm10 thq-body-small">
              {props.content1 ?? (
                <Fragment>
                  <span className="pricing9-text32">
                    Affordable Pricing Plans to Get You Started
                  </span>
                </Fragment>
              )}
            </span>
            <div className="pricing9-thq-content-elm">
              <h2 className="pricing9-thq-text-elm11 thq-heading-2">
                {props.heading1 ?? (
                  <Fragment>
                    <span className="pricing9-text25">Pricing plan</span>
                  </Fragment>
                )}
              </h2>
              <p className="pricing9-thq-text-elm12 thq-body-large">
                {props.content2 ?? (
                  <Fragment>
                    <span className="pricing9-text16">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      <span
                        dangerouslySetInnerHTML={{
                          __html: ' ',
                        }}
                      />
                    </span>
                  </Fragment>
                )}
              </p>
            </div>
          </div>
          <div className="pricing9-thq-tabs-elm">
            {isMonthly === true && (
              <button
                onClick={() => setIsMonthly(true)}
                className="pricing9-button1 thq-button-filled"
              >
                <span className="thq-body-small">Monthly</span>
              </button>
            )}
            {isMonthly === false && (
              <button
                onClick={() => setIsMonthly(true)}
                className="pricing9-button2 thq-button-outline"
              >
                <span className="thq-body-small">Monthly</span>
              </button>
            )}
            {isMonthly === true && (
              <button
                onClick={() => setIsMonthly(false)}
                className="pricing9-button3 thq-button-outline"
              >
                <span className="thq-body-small">Yearly</span>
              </button>
            )}
            {isMonthly === false && (
              <button
                onClick={() => setIsMonthly(false)}
                className="pricing9-button4 thq-button-filled"
              >
                <span className="thq-body-small">Yearly</span>
              </button>
            )}
          </div>
          {isMonthly === true && (
            <div className="pricing9-container1 thq-card">
              <div className="pricing9-thq-price-title-elm1">
                <p className="pricing9-thq-text-elm17 thq-body-large">
                  {props.plan1 ?? (
                    <Fragment>
                      <span className="pricing9-text26">Basic Plan</span>
                    </Fragment>
                  )}
                </p>
                <span className="thq-body-small">
                  {props.plan1Detail ?? (
                    <Fragment>
                      <span className="pricing9-text22">
                        Ideal for small projects
                      </span>
                    </Fragment>
                  )}
                </span>
              </div>
              <div className="thq-divider-horizontal"></div>
              <h3 className="pricing9-thq-text-elm19 thq-heading-3">
                {props.plan1Price ?? (
                  <Fragment>
                    <span className="pricing9-text30">$99</span>
                  </Fragment>
                )}
              </h3>
              <button className="pricing9-thq-button-elm1 thq-button-filled">
                <span className="thq-body-small">
                  {props.plan1Action ?? (
                    <Fragment>
                      <span className="pricing9-text18">Get Started</span>
                    </Fragment>
                  )}
                </span>
              </button>
              <div className="thq-divider-horizontal"></div>
              <div className="pricing9-thq-list-elm1">
                <div className="pricing9-thq-list-item-elm10">
                  <svg viewBox="0 0 1024 1024" className="thq-icon-small">
                    <path d="M384 690l452-452 60 60-512 512-238-238 60-60z"></path>
                  </svg>
                  <span className="thq-body-small">
                    {props.plan1Feature1 ?? (
                      <Fragment>
                        <span className="pricing9-text14">Film Production</span>
                      </Fragment>
                    )}
                  </span>
                </div>
                <div className="pricing9-thq-list-item-elm11">
                  <svg viewBox="0 0 1024 1024" className="thq-icon-small">
                    <path d="M384 690l452-452 60 60-512 512-238-238 60-60z"></path>
                  </svg>
                  <span className="thq-body-small">
                    {props.plan1Feature2 ?? (
                      <Fragment>
                        <span className="pricing9-text28">
                          Audio Production
                        </span>
                      </Fragment>
                    )}
                  </span>
                </div>
                <div className="pricing9-thq-list-item-elm12">
                  <svg viewBox="0 0 1024 1024" className="thq-icon-small">
                    <path d="M384 690l452-452 60 60-512 512-238-238 60-60z"></path>
                  </svg>
                  <span className="thq-body-small">
                    {props.plan1Feature3 ?? (
                      <Fragment>
                        <span className="pricing9-text33">
                          Animation &amp; Graphics
                        </span>
                      </Fragment>
                    )}
                  </span>
                </div>
                <div className="pricing9-thq-list-item-elm13">
                  <svg viewBox="0 0 1024 1024" className="thq-icon-small">
                    <path d="M384 690l452-452 60 60-512 512-238-238 60-60z"></path>
                  </svg>
                  <span className="thq-body-small">
                    {props.plan1Feature4 ?? (
                      <Fragment>
                        <span className="pricing9-text38">Photography</span>
                      </Fragment>
                    )}
                  </span>
                </div>
                <div className="pricing9-thq-list-item-elm14">
                  <svg viewBox="0 0 1024 1024" className="thq-icon-small">
                    <path d="M384 690l452-452 60 60-512 512-238-238 60-60z"></path>
                  </svg>
                  <span className="thq-body-small">
                    {props.plan1Feature5 ?? (
                      <Fragment>
                        <span className="pricing9-text13">
                          Feature text goes here
                        </span>
                      </Fragment>
                    )}
                  </span>
                </div>
                <div className="pricing9-thq-list-item-elm15">
                  <svg viewBox="0 0 1024 1024" className="thq-icon-small">
                    <path d="M384 690l452-452 60 60-512 512-238-238 60-60z"></path>
                  </svg>
                  <span className="thq-body-small">
                    {props.plan1Feature6 ?? (
                      <Fragment>
                        <span className="pricing9-text24">
                          Feature text goes here
                        </span>
                      </Fragment>
                    )}
                  </span>
                </div>
              </div>
            </div>
          )}
          {isMonthly === false && (
            <div className="pricing9-container2 thq-card">
              <div className="pricing9-thq-price-title-elm2">
                <span className="pricing9-thq-text-elm27 thq-body-large">
                  {props.plan11 ?? (
                    <Fragment>
                      <span className="pricing9-text35">Basic plan</span>
                    </Fragment>
                  )}
                </span>
                <span className="thq-body-small">
                  {props.plan1Detail1 ?? (
                    <Fragment>
                      <span className="pricing9-text12">
                        Lorem ipsum dolor sit amet
                      </span>
                    </Fragment>
                  )}
                </span>
              </div>
              <div className="thq-divider-horizontal"></div>
              <h3 className="pricing9-thq-text-elm29 thq-heading-3">
                {props.plan1Price1 ?? (
                  <Fragment>
                    <span className="pricing9-text37">$200/yr</span>
                  </Fragment>
                )}
              </h3>
              <button className="pricing9-thq-button-elm2 thq-button-filled">
                <span className="thq-body-small">
                  {props.plan1Action1 ?? (
                    <Fragment>
                      <span className="pricing9-text31">Get started</span>
                    </Fragment>
                  )}
                </span>
              </button>
              <div className="thq-divider-horizontal"></div>
              <div className="pricing9-thq-list-elm2">
                <div className="pricing9-thq-list-item-elm16">
                  <svg viewBox="0 0 1024 1024" className="thq-icon-small">
                    <path d="M384 690l452-452 60 60-512 512-238-238 60-60z"></path>
                  </svg>
                  <span className="thq-body-small">
                    {props.plan1Feature11 ?? (
                      <Fragment>
                        <span className="pricing9-text17">
                          Feature text goes here
                        </span>
                      </Fragment>
                    )}
                  </span>
                </div>
                <div className="pricing9-thq-list-item-elm17">
                  <svg viewBox="0 0 1024 1024" className="thq-icon-small">
                    <path d="M384 690l452-452 60 60-512 512-238-238 60-60z"></path>
                  </svg>
                  <span className="thq-body-small">
                    {props.plan1Feature21 ?? (
                      <Fragment>
                        <span className="pricing9-text20">
                          Feature text goes here
                        </span>
                      </Fragment>
                    )}
                  </span>
                </div>
                <div className="pricing9-thq-list-item-elm18">
                  <svg viewBox="0 0 1024 1024" className="thq-icon-small">
                    <path d="M384 690l452-452 60 60-512 512-238-238 60-60z"></path>
                  </svg>
                  <span className="thq-body-small">
                    {props.plan1Feature31 ?? (
                      <Fragment>
                        <span className="pricing9-text15">
                          Feature text goes here
                        </span>
                      </Fragment>
                    )}
                  </span>
                </div>
                <div className="pricing9-thq-list-item-elm19">
                  <svg viewBox="0 0 1024 1024" className="thq-icon-small">
                    <path d="M384 690l452-452 60 60-512 512-238-238 60-60z"></path>
                  </svg>
                  <span className="thq-body-small">
                    {props.plan1Feature41 ?? (
                      <Fragment>
                        <span className="pricing9-text34">
                          Feature text goes here
                        </span>
                      </Fragment>
                    )}
                  </span>
                </div>
                <div className="pricing9-thq-list-item-elm20">
                  <svg viewBox="0 0 1024 1024" className="thq-icon-small">
                    <path d="M384 690l452-452 60 60-512 512-238-238 60-60z"></path>
                  </svg>
                  <span className="thq-body-small">
                    {props.plan1Feature51 ?? (
                      <Fragment>
                        <span className="pricing9-text29">
                          Feature text goes here
                        </span>
                      </Fragment>
                    )}
                  </span>
                </div>
                <div className="pricing9-thq-list-item-elm21">
                  <svg viewBox="0 0 1024 1024" className="thq-icon-small">
                    <path d="M384 690l452-452 60 60-512 512-238-238 60-60z"></path>
                  </svg>
                  <span className="thq-body-small">
                    {props.plan1Feature61 ?? (
                      <Fragment>
                        <span className="pricing9-text21">
                          Feature text goes here
                        </span>
                      </Fragment>
                    )}
                  </span>
                </div>
              </div>
            </div>
          )}
          <div className="pricing9-container3 thq-grid-2">
            <span className="pricing9-text10 thq-heading-3">
              {props.text1 ?? (
                <Fragment>
                  <span className="pricing9-text23">$ 40</span>
                </Fragment>
              )}
            </span>
            <button className="pricing9-thq-button-elm3 thq-button-filled">
              <span className="thq-body-small">
                {props.plan1Action2 ?? (
                  <Fragment>
                    <span className="pricing9-text36">
                      Buy and download now
                    </span>
                  </Fragment>
                )}
              </span>
            </button>
            <button className="pricing9-thq-button-elm4 thq-button-filled">
              <svg width="32" height="32" viewBox="0 0 32 32">
                <circle r="2" cx="10" cy="28" fill="currentColor"></circle>
                <circle r="2" cx="24" cy="28" fill="currentColor"></circle>
                <path
                  d="M4.98 2.804A1 1 0 0 0 4 2H0v2h3.18l3.84 19.196A1 1 0 0 0 8 24h18v-2H8.82l-.8-4H26a1 1 0 0 0 .976-.783L29.244 7h-2.047l-1.999 9H7.62Z"
                  fill="currentColor"
                ></path>
                <path d="M12 6v2h10V6z" fill="currentColor"></path>
              </svg>
              <span className="thq-body-small">
                {props.plan1Action3 ?? (
                  <Fragment>
                    <span className="pricing9-text19">Add to Cart</span>
                  </Fragment>
                )}
              </span>
            </button>
            <span className="thq-body-small">
              {props.text ?? (
                <Fragment>
                  <span className="pricing9-text27">
                    Taxes may apply to prices shown.
                  </span>
                </Fragment>
              )}
            </span>
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .pricing9-thq-pricing8-elm {
            width: auto;
            height: auto;
            display: flex;
            overflow: hidden;
            position: relative;
            align-items: stretch;
            flex-shrink: 0;
            flex-direction: column;
            justify-content: space-between;
          }
          .pricing9-thq-max-width-elm {
            width: auto;
            display: block;
            align-self: center;
          }
          .pricing9-thq-section-title-elm {
            gap: 16px;
            width: 100%;
            display: flex;
            max-width: 800px;
            align-items: center;
            flex-direction: column;
          }
          .pricing9-thq-text-elm10 {
            text-align: center;
          }
          .pricing9-thq-content-elm {
            gap: var(--dl-layout-space-oneandhalfunits);
            width: 100%;
            display: flex;
            align-items: center;
            flex-direction: column;
          }
          .pricing9-thq-text-elm11 {
            text-align: center;
          }
          .pricing9-thq-text-elm12 {
            text-align: center;
          }
          .pricing9-thq-tabs-elm {
            display: flex;
            align-items: stretch;
            justify-content: center;
          }
          .pricing9-button1 {
            gap: var(--dl-layout-space-halfunit);
            width: 120px;
            height: 60px;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: var(--dl-color-theme-primary1);
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;
          }
          .pricing9-button2 {
            gap: var(--dl-layout-space-halfunit);
            width: 120px;
            height: 60px;
            display: flex;
            align-items: center;
            border-color: var(--dl-color-theme-primary1);
            border-style: solid;
            border-width: 1px;
            justify-content: center;
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;
          }
          .pricing9-button3 {
            gap: var(--dl-layout-space-halfunit);
            width: 120px;
            height: 60px;
            display: flex;
            align-items: center;
            border-color: var(--dl-color-theme-primary1);
            border-style: solid;
            border-width: 1px;
            justify-content: center;
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
          }
          .pricing9-button4 {
            gap: var(--dl-layout-space-halfunit);
            width: 120px;
            height: 60px;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: var(--dl-color-theme-primary1);
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
          }
          .pricing9-container1 {
            gap: var(--dl-layout-space-twounits);
            width: 100%;
            display: flex;
            max-width: 560px;
            align-items: flex-start;
            flex-shrink: 0;
            border-color: var(--dl-color-theme-neutral-dark);
            border-style: solid;
            border-width: 1px;
            animation-name: fadeIn;
            flex-direction: column;
            animation-delay: 0s;
            animation-duration: 300ms;
            animation-direction: normal;
            animation-iteration-count: 1;
            animation-timing-function: ease;
          }
          .pricing9-thq-price-title-elm1 {
            gap: var(--dl-layout-space-halfunit);
            display: flex;
            align-self: stretch;
            align-items: flex-start;
            flex-direction: column;
          }
          .pricing9-thq-text-elm17 {
            font-style: normal;
            font-weight: 600;
          }
          .pricing9-thq-text-elm19 {
            font-size: 32px;
          }
          .pricing9-thq-button-elm1 {
            width: 100%;
          }
          .pricing9-thq-list-elm1 {
            gap: var(--dl-layout-space-unit);
            display: flex;
            align-self: stretch;
            align-items: flex-start;
            padding-top: var(--dl-layout-space-halfunit);
            flex-direction: column;
            padding-bottom: var(--dl-layout-space-halfunit);
          }
          .pricing9-thq-list-item-elm10 {
            gap: var(--dl-layout-space-unit);
            display: flex;
            align-self: stretch;
            align-items: flex-start;
            flex-shrink: 0;
          }
          .pricing9-thq-list-item-elm11 {
            gap: var(--dl-layout-space-unit);
            display: flex;
            align-self: stretch;
            align-items: flex-start;
            flex-shrink: 0;
          }
          .pricing9-thq-list-item-elm12 {
            gap: var(--dl-layout-space-unit);
            display: flex;
            align-self: stretch;
            align-items: flex-start;
            flex-shrink: 0;
          }
          .pricing9-thq-list-item-elm13 {
            gap: var(--dl-layout-space-unit);
            display: flex;
            align-self: stretch;
            align-items: flex-start;
            flex-shrink: 0;
          }
          .pricing9-thq-list-item-elm14 {
            gap: var(--dl-layout-space-unit);
            display: flex;
            align-self: stretch;
            align-items: flex-start;
            flex-shrink: 0;
          }
          .pricing9-thq-list-item-elm15 {
            gap: var(--dl-layout-space-unit);
            display: flex;
            align-self: stretch;
            align-items: flex-start;
            flex-shrink: 0;
          }
          .pricing9-container2 {
            gap: var(--dl-layout-space-twounits);
            width: 100%;
            display: flex;
            max-width: 560px;
            align-items: flex-start;
            flex-shrink: 0;
            border-color: var(--dl-color-theme-neutral-dark);
            border-style: solid;
            border-width: 1px;
            animation-name: fadeIn;
            flex-direction: column;
            animation-delay: 0s;
            animation-duration: 300ms;
            animation-direction: normal;
            animation-iteration-count: 1;
            animation-timing-function: ease;
          }
          .pricing9-thq-price-title-elm2 {
            gap: var(--dl-layout-space-halfunit);
            display: flex;
            align-self: stretch;
            align-items: flex-start;
            flex-direction: column;
          }
          .pricing9-thq-text-elm27 {
            font-style: normal;
            font-weight: 600;
          }
          .pricing9-thq-text-elm29 {
            font-size: 48px;
          }
          .pricing9-thq-button-elm2 {
            width: 100%;
          }
          .pricing9-thq-list-elm2 {
            gap: var(--dl-layout-space-unit);
            display: flex;
            align-self: stretch;
            align-items: flex-start;
            padding-top: var(--dl-layout-space-halfunit);
            flex-direction: column;
            padding-bottom: var(--dl-layout-space-halfunit);
          }
          .pricing9-thq-list-item-elm16 {
            gap: var(--dl-layout-space-unit);
            display: flex;
            align-self: stretch;
            align-items: flex-start;
            flex-shrink: 0;
          }
          .pricing9-thq-list-item-elm17 {
            gap: var(--dl-layout-space-unit);
            display: flex;
            align-self: stretch;
            align-items: flex-start;
            flex-shrink: 0;
          }
          .pricing9-thq-list-item-elm18 {
            gap: var(--dl-layout-space-unit);
            display: flex;
            align-self: stretch;
            align-items: flex-start;
            flex-shrink: 0;
          }
          .pricing9-thq-list-item-elm19 {
            gap: var(--dl-layout-space-unit);
            display: flex;
            align-self: stretch;
            align-items: flex-start;
            flex-shrink: 0;
          }
          .pricing9-thq-list-item-elm20 {
            gap: var(--dl-layout-space-unit);
            display: flex;
            align-self: stretch;
            align-items: flex-start;
            flex-shrink: 0;
          }
          .pricing9-thq-list-item-elm21 {
            gap: var(--dl-layout-space-unit);
            display: flex;
            align-self: stretch;
            align-items: flex-start;
            flex-shrink: 0;
          }
          .pricing9-container3 {
            flex: 0 0 auto;
            width: auto;
            display: flex;
            padding: var(--dl-layout-space-twounits);
            align-items: flex-start;
            border-color: var(--dl-color-theme-neutral-dark);
            border-width: 1px;
            border-radius: var(--dl-layout-radius-cardradius);
            flex-direction: column;
          }
          .pricing9-text10 {
            font-size: 32px;
          }
          .pricing9-thq-button-elm3 {
            width: 100%;
          }
          .pricing9-thq-button-elm4 {
            width: 100%;
            background-color: transparent;
          }
          .pricing9-text12 {
            display: inline-block;
          }
          .pricing9-text13 {
            display: inline-block;
          }
          .pricing9-text14 {
            display: inline-block;
          }
          .pricing9-text15 {
            display: inline-block;
          }
          .pricing9-text16 {
            display: inline-block;
          }
          .pricing9-text17 {
            display: inline-block;
          }
          .pricing9-text18 {
            display: inline-block;
          }
          .pricing9-text19 {
            display: inline-block;
          }
          .pricing9-text20 {
            display: inline-block;
          }
          .pricing9-text21 {
            display: inline-block;
          }
          .pricing9-text22 {
            display: inline-block;
          }
          .pricing9-text23 {
            display: inline-block;
          }
          .pricing9-text24 {
            display: inline-block;
          }
          .pricing9-text25 {
            display: inline-block;
          }
          .pricing9-text26 {
            display: inline-block;
          }
          .pricing9-text27 {
            display: inline-block;
          }
          .pricing9-text28 {
            display: inline-block;
          }
          .pricing9-text29 {
            display: inline-block;
          }
          .pricing9-text30 {
            display: inline-block;
          }
          .pricing9-text31 {
            display: inline-block;
          }
          .pricing9-text32 {
            display: inline-block;
          }
          .pricing9-text33 {
            display: inline-block;
          }
          .pricing9-text34 {
            display: inline-block;
          }
          .pricing9-text35 {
            display: inline-block;
          }
          .pricing9-text36 {
            display: inline-block;
          }
          .pricing9-text37 {
            display: inline-block;
          }
          .pricing9-text38 {
            display: inline-block;
          }
          .pricing9root-class-name {
            padding-top: var(--dl-layout-space-twounits);
            padding-left: var(--dl-layout-space-twounits);
            padding-right: var(--dl-layout-space-twounits);
            padding-bottom: var(--dl-layout-space-twounits);
          }
          @media (max-width: 991px) {
            .pricing9-container1 {
              width: 100%;
              max-width: 560px;
            }
            .pricing9-container2 {
              width: 100%;
              max-width: 560px;
            }
          }
          @media (max-width: 479px) {
            .pricing9-thq-max-width-elm {
              gap: var(--dl-layout-space-oneandhalfunits);
            }
            .pricing9-thq-button-elm1 {
              width: 100%;
            }
            .pricing9-thq-button-elm2 {
              width: 100%;
            }
            .pricing9-thq-button-elm3 {
              width: 100%;
            }
            .pricing9-thq-button-elm4 {
              width: 100%;
            }
          }
        `}
      </style>
    </>
  )
}

Pricing9.defaultProps = {
  plan1Detail1: undefined,
  plan1Feature5: undefined,
  plan1Feature1: undefined,
  plan1Feature31: undefined,
  content2: undefined,
  plan1Feature11: undefined,
  plan1Action: undefined,
  plan1Action3: undefined,
  plan1Feature21: undefined,
  plan1Feature61: undefined,
  plan1Detail: undefined,
  text1: undefined,
  plan1Feature6: undefined,
  heading1: undefined,
  plan1: undefined,
  text: undefined,
  plan1Feature2: undefined,
  plan1Feature51: undefined,
  plan1Price: undefined,
  rootClassName: '',
  plan1Action1: undefined,
  content1: undefined,
  plan1Feature3: undefined,
  plan1Feature41: undefined,
  plan11: undefined,
  plan1Action2: undefined,
  plan1Price1: undefined,
  plan1Feature4: undefined,
}

Pricing9.propTypes = {
  plan1Detail1: PropTypes.element,
  plan1Feature5: PropTypes.element,
  plan1Feature1: PropTypes.element,
  plan1Feature31: PropTypes.element,
  content2: PropTypes.element,
  plan1Feature11: PropTypes.element,
  plan1Action: PropTypes.element,
  plan1Action3: PropTypes.element,
  plan1Feature21: PropTypes.element,
  plan1Feature61: PropTypes.element,
  plan1Detail: PropTypes.element,
  text1: PropTypes.element,
  plan1Feature6: PropTypes.element,
  heading1: PropTypes.element,
  plan1: PropTypes.element,
  text: PropTypes.element,
  plan1Feature2: PropTypes.element,
  plan1Feature51: PropTypes.element,
  plan1Price: PropTypes.element,
  rootClassName: PropTypes.string,
  plan1Action1: PropTypes.element,
  content1: PropTypes.element,
  plan1Feature3: PropTypes.element,
  plan1Feature41: PropTypes.element,
  plan11: PropTypes.element,
  plan1Action2: PropTypes.element,
  plan1Price1: PropTypes.element,
  plan1Feature4: PropTypes.element,
}

export default Pricing9
