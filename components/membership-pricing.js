import React, { useState, Fragment } from 'react'

import PropTypes from 'prop-types'
import { useTranslations } from 'next-intl'

const MembershipPricing = (props) => {
  const [isMonthly, setIsMonthly] = useState(true)
  return (
    <>
      <div
        className={`membership-pricing-thq-pricing23-elm thq-section-padding ${props.rootClassName} `}
      >
        <div className="membership-pricing-thq-max-width-elm thq-section-max-width">
          <div className="membership-pricing-thq-section-title-elm">
            <span className="membership-pricing-thq-text-elm10 thq-body-small">
              {props.content1 ?? (
                <Fragment>
                  <span className="membership-pricing-text17">
                    Choose the perfect plan for you
                  </span>
                </Fragment>
              )}
            </span>
            <div className="membership-pricing-thq-content-elm">
              <h2 className="membership-pricing-thq-text-elm11 thq-heading-2">
                {props.heading1 ?? (
                  <Fragment>
                    <span className="membership-pricing-text38">
                      MEMBERSHIP OPTIONS
                    </span>
                  </Fragment>
                )}
              </h2>
              <p className="membership-pricing-thq-text-elm12 thq-body-large">
                {props.content2 ?? (
                  <Fragment>
                    <span className="membership-pricing-text24">
                      <span>Choose the level of access that matches </span>
                      <span>the way you work.</span>
                    </span>
                  </Fragment>
                )}
              </p>
            </div>
          </div>
          <div className="membership-pricing-thq-tabs-elm">
            {isMonthly === true && (
              <button
                onClick={() => setIsMonthly(true)}
                className="membership-pricing-button1 thq-button-filled thq-button-animated"
              >
                <span className="thq-body-small">Monthly</span>
              </button>
            )}
            {isMonthly === false && (
              <button
                onClick={() => setIsMonthly(true)}
                className="membership-pricing-button2 thq-button-animated thq-button-outline"
              >
                <span className="thq-body-small">Monthly</span>
              </button>
            )}
            {isMonthly === false && (
              <button
                onClick={() => setIsMonthly(false)}
                className="membership-pricing-button3 thq-button-filled thq-button-animated"
              >
                <span className="thq-body-small">Yearly</span>
              </button>
            )}
            {isMonthly === true && (
              <button
                onClick={() => setIsMonthly(false)}
                className="membership-pricing-button4 thq-button-animated thq-button-outline"
              >
                <span className="thq-body-small">Yearly</span>
              </button>
            )}
          </div>
          {isMonthly === true && (
            <div className="membership-pricing-container1">
              <div className="membership-pricing-thq-column-elm1 thq-card">
                <div className="membership-pricing-thq-price-elm10">
                  <div className="membership-pricing-thq-price-elm11">
                    <p className="membership-pricing-thq-text-elm17 thq-body-large">
                      {props.plan1 ?? (
                        <Fragment>
                          <span className="membership-pricing-text35">
                            ESSENTIAL
                          </span>
                        </Fragment>
                      )}
                    </p>
                    <div className="membership-pricing-thq-list-elm1">
                      <div className="membership-pricing-thq-list-item-elm10">
                        <span className="thq-body-small">
                          {props.plan1Feature1 ?? (
                            <Fragment>
                              <span className="membership-pricing-text41">
                                A refined starting point.
                              </span>
                            </Fragment>
                          )}
                        </span>
                      </div>
                      <div className="membership-pricing-thq-list-item-elm11">
                        <span className="thq-body-small">
                          {props.plan1Feature34 ?? (
                            <Fragment>
                              <span className="membership-pricing-text18">
                                <span>
                                  Access to a rotating selection of cinematic
                                  imagery,
                                </span>
                                <br></br>
                                <span>
                                  prepared for professional creative use.
                                </span>
                              </span>
                            </Fragment>
                          )}
                        </span>
                      </div>
                      <div className="membership-pricing-thq-list-item-elm12"></div>
                    </div>
                    <h3 className="membership-pricing-thq-text-elm20 thq-heading-3">
                      {props.plan1Price ?? (
                        <Fragment>
                          <span className="membership-pricing-text28">
                            $39 / month
                          </span>
                        </Fragment>
                      )}
                    </h3>
                    <p className="thq-body-large">
                      {props.plan1Yearly ?? (
                        <Fragment>
                          <span className="membership-pricing-text23">
                            or $390 / year
                          </span>
                        </Fragment>
                      )}
                    </p>
                  </div>
                  <div className="membership-pricing-thq-list-elm2">
                    <div className="membership-pricing-thq-list-item-elm13">
                      <span className="thq-body-small">
                        {props.plan1Feature35 ?? (
                          <Fragment>
                            <span className="membership-pricing-text51">
                              <span>Best suited for individual creators</span>
                              <br></br>
                              <span>
                                and small studios establishing visual language.
                              </span>
                            </span>
                          </Fragment>
                        )}
                      </span>
                    </div>
                  </div>
                </div>
                <button className="membership-pricing-thq-button-elm1 thq-button-animated thq-button-outline">
                  <span className="thq-body-small">
                    {props.plan1Action ?? (
                      <Fragment>
                        <span className="membership-pricing-text83">
                          Proceed to Membership
                        </span>
                      </Fragment>
                    )}
                  </span>
                </button>
              </div>
              <div className="membership-pricing-thq-column-elm2 thq-card">
                <div className="membership-pricing-thq-price-elm12">
                  <div className="membership-pricing-thq-price-elm13">
                    <p className="membership-pricing-thq-text-elm24 thq-body-large">
                      {props.plan2 ?? (
                        <Fragment>
                          <span className="membership-pricing-text27">
                            SIGNATURE
                          </span>
                        </Fragment>
                      )}
                    </p>
                    <div className="membership-pricing-thq-list-elm3">
                      <div className="membership-pricing-thq-list-item-elm14">
                        <span className="thq-body-small">
                          {props.plan2Feature1 ?? (
                            <Fragment>
                              <span className="membership-pricing-text74">
                                For expanded continuity and scale.
                              </span>
                            </Fragment>
                          )}
                        </span>
                      </div>
                      <div className="membership-pricing-thq-list-item-elm15">
                        <span className="thq-body-small">
                          {props.plan2Feature2 ?? (
                            <Fragment>
                              <span className="membership-pricing-text44">
                                <span>
                                  Broader access to the complete Essential
                                  collection,
                                </span>
                                <br></br>
                                <span>
                                  with extended environments, priority releases,
                                </span>
                                <br></br>
                                <span>and expanded commercial usage.</span>
                              </span>
                            </Fragment>
                          )}
                        </span>
                      </div>
                    </div>
                    <h3 className="membership-pricing-thq-text-elm27 thq-heading-3">
                      {props.plan2Price ?? (
                        <Fragment>
                          <span className="membership-pricing-text16">
                            $119 / month
                          </span>
                        </Fragment>
                      )}
                    </h3>
                    <p className="thq-body-large">
                      {props.plan2Yearly ?? (
                        <Fragment>
                          <span className="membership-pricing-text50">
                            or $1,190 / year
                          </span>
                        </Fragment>
                      )}
                    </p>
                  </div>
                  <div className="membership-pricing-thq-list-elm4">
                    <div className="membership-pricing-thq-list-item-elm16">
                      <span className="thq-body-small">
                        {props.plan2Feature32 ?? (
                          <Fragment>
                            <span className="membership-pricing-text30">
                              <span>Designed for studios and brands</span>
                              <br></br>
                              <span>working across multiple projects.</span>
                            </span>
                          </Fragment>
                        )}
                      </span>
                    </div>
                  </div>
                </div>
                <button className="membership-pricing-thq-button-elm2 thq-button-filled thq-button-animated">
                  <span className="thq-body-small">
                    {props.plan2Action ?? (
                      <Fragment>
                        <span className="membership-pricing-text34">
                          Proceed to Membership
                        </span>
                      </Fragment>
                    )}
                  </span>
                </button>
              </div>
              <div className="membership-pricing-thq-column-elm3 thq-card">
                <div className="membership-pricing-thq-price-elm14">
                  <div className="membership-pricing-thq-price-elm15">
                    <p className="membership-pricing-thq-text-elm31 thq-body-large">
                      {props.plan3 ?? (
                        <Fragment>
                          <span className="membership-pricing-text76">
                            PRIVATE ACCESS
                          </span>
                        </Fragment>
                      )}
                    </p>
                  </div>
                  <div className="membership-pricing-thq-list-elm5">
                    <div className="membership-pricing-thq-list-item-elm17">
                      <span className="thq-body-small">
                        {props.plan3Feature1 ?? (
                          <Fragment>
                            <span className="membership-pricing-text82">
                              Invitation only.
                            </span>
                          </Fragment>
                        )}
                      </span>
                    </div>
                    <div className="membership-pricing-thq-list-item-elm18">
                      <span className="thq-body-small">
                        {props.plan3Feature2 ?? (
                          <Fragment>
                            <span className="membership-pricing-text11">
                              <span>Full access to Signature,</span>
                              <br></br>
                              <span>
                                alongside private collections not publicly
                                available.
                              </span>
                              <br></br>
                            </span>
                          </Fragment>
                        )}
                      </span>
                    </div>
                    <div className="membership-pricing-thq-list-item-elm19">
                      <span className="thq-body-small">
                        {props.plan3Feature3 ?? (
                          <Fragment>
                            <span className="membership-pricing-text56">
                              <span>Early releases.</span>
                              <br></br>
                              <span>Limited materials.</span>
                              <br></br>
                              <span>Priority collaboration consideration.</span>
                            </span>
                          </Fragment>
                        )}
                      </span>
                    </div>
                    <div className="membership-pricing-thq-list-item-elm20">
                      <span className="thq-body-large">
                        {props.plan3Feature4 ?? (
                          <Fragment>
                            <span className="membership-pricing-text71">
                              By invitation
                            </span>
                          </Fragment>
                        )}
                      </span>
                    </div>
                    <div className="membership-pricing-thq-list-item-elm21">
                      <span className="thq-body-small">
                        {props.plan3Feature5 ?? (
                          <Fragment>
                            <span className="membership-pricing-text43">
                              Request access to be considered.
                            </span>
                          </Fragment>
                        )}
                      </span>
                      <span className="thq-body-small">
                        {props.plan3Feature53 ?? (
                          <Fragment>
                            <span className="membership-pricing-text42">.</span>
                          </Fragment>
                        )}
                      </span>
                    </div>
                  </div>
                </div>
                <button className="membership-pricing-thq-button-elm3 thq-button-filled thq-button-animated">
                  <span className="thq-body-small">
                    {props.plan3Action ?? (
                      <Fragment>
                        <span className="membership-pricing-text40">
                          Proceed to Membership
                        </span>
                      </Fragment>
                    )}
                  </span>
                </button>
              </div>
            </div>
          )}
          {isMonthly === false && (
            <div className="membership-pricing-container2">
              <div className="membership-pricing-thq-column-elm4 thq-card">
                <div className="membership-pricing-thq-price-elm16">
                  <div className="membership-pricing-thq-price-elm17">
                    <span className="membership-pricing-thq-text-elm39 thq-body-large">
                      {props.plan11 ?? (
                        <Fragment>
                          <span className="membership-pricing-text36">
                            Basic plan
                          </span>
                        </Fragment>
                      )}
                    </span>
                    <h3 className="membership-pricing-thq-text-elm40 thq-heading-3">
                      {props.plan1Price1 ?? (
                        <Fragment>
                          <span className="membership-pricing-text65">
                            $199
                          </span>
                        </Fragment>
                      )}
                    </h3>
                    <span className="thq-body-large">
                      {props.plan1Yearly1 ?? (
                        <Fragment>
                          <span className="membership-pricing-text73">
                            $1999
                          </span>
                        </Fragment>
                      )}
                    </span>
                  </div>
                  <div className="membership-pricing-thq-list-elm6">
                    <div className="membership-pricing-thq-list-item-elm22">
                      <svg viewBox="0 0 1024 1024" className="thq-icon-small">
                        <path d="M384 690l452-452 60 60-512 512-238-238 60-60z"></path>
                      </svg>
                      <span className="thq-body-small">
                        {props.plan1Feature11 ?? (
                          <Fragment>
                            <span className="membership-pricing-text70">
                              Customized Solutions
                            </span>
                          </Fragment>
                        )}
                      </span>
                    </div>
                    <div className="membership-pricing-thq-list-item-elm23">
                      <svg viewBox="0 0 1024 1024" className="thq-icon-small">
                        <path d="M384 690l452-452 60 60-512 512-238-238 60-60z"></path>
                      </svg>
                      <span className="thq-body-small">
                        {props.plan1Feature21 ?? (
                          <Fragment>
                            <span className="membership-pricing-text75">
                              Dedicated Customer Support
                            </span>
                          </Fragment>
                        )}
                      </span>
                    </div>
                    <div className="membership-pricing-thq-list-item-elm24">
                      <svg viewBox="0 0 1024 1024" className="thq-icon-small">
                        <path d="M384 690l452-452 60 60-512 512-238-238 60-60z"></path>
                      </svg>
                      <span className="thq-body-small">
                        {props.plan1Feature31 ?? (
                          <Fragment>
                            <span className="membership-pricing-text55">
                              Powerful Analytics Tools
                            </span>
                          </Fragment>
                        )}
                      </span>
                    </div>
                  </div>
                </div>
                <button className="membership-pricing-thq-button-elm4 thq-button-animated thq-button-outline">
                  <span className="thq-body-small">
                    {props.plan1Action1 ?? (
                      <Fragment>
                        <span className="membership-pricing-text67">
                          Contact Us
                        </span>
                      </Fragment>
                    )}
                  </span>
                </button>
              </div>
              <div className="membership-pricing-thq-column-elm5 thq-card">
                <div className="membership-pricing-thq-price-elm18">
                  <div className="membership-pricing-thq-price-elm19">
                    <span className="membership-pricing-thq-text-elm46 thq-body-large">
                      {props.plan21 ?? (
                        <Fragment>
                          <span className="membership-pricing-text66">
                            Business plan
                          </span>
                        </Fragment>
                      )}
                    </span>
                    <h3 className="membership-pricing-thq-text-elm47 thq-heading-3">
                      {props.plan2Price1 ?? (
                        <Fragment>
                          <span className="membership-pricing-text64">
                            $299/yr
                          </span>
                        </Fragment>
                      )}
                    </h3>
                    <span className="thq-body-large">
                      {props.plan2Yearly1 ?? (
                        <Fragment>
                          <span className="membership-pricing-text69">
                            or $29 monthly
                          </span>
                        </Fragment>
                      )}
                    </span>
                  </div>
                  <div className="membership-pricing-thq-list-elm7">
                    <div className="membership-pricing-thq-list-item-elm25">
                      <svg viewBox="0 0 1024 1024" className="thq-icon-small">
                        <path d="M384 690l452-452 60 60-512 512-238-238 60-60z"></path>
                      </svg>
                      <span className="thq-body-small">
                        {props.plan2Feature11 ?? (
                          <Fragment>
                            <span className="membership-pricing-text72">
                              Feature text goes here
                            </span>
                          </Fragment>
                        )}
                      </span>
                    </div>
                    <div className="membership-pricing-thq-list-item-elm26">
                      <svg viewBox="0 0 1024 1024" className="thq-icon-small">
                        <path d="M384 690l452-452 60 60-512 512-238-238 60-60z"></path>
                      </svg>
                      <span className="thq-body-small">
                        {props.plan2Feature21 ?? (
                          <Fragment>
                            <span className="membership-pricing-text79">
                              Feature text goes here
                            </span>
                          </Fragment>
                        )}
                      </span>
                    </div>
                    <div className="membership-pricing-thq-list-item-elm27">
                      <svg viewBox="0 0 1024 1024" className="thq-icon-small">
                        <path d="M384 690l452-452 60 60-512 512-238-238 60-60z"></path>
                      </svg>
                      <span className="thq-body-small">
                        {props.plan2Feature31 ?? (
                          <Fragment>
                            <span className="membership-pricing-text81">
                              Feature text goes here
                            </span>
                          </Fragment>
                        )}
                      </span>
                    </div>
                    <div className="membership-pricing-thq-list-item-elm28">
                      <svg viewBox="0 0 1024 1024" className="thq-icon-small">
                        <path d="M384 690l452-452 60 60-512 512-238-238 60-60z"></path>
                      </svg>
                      <span className="thq-body-small">
                        {props.plan2Feature41 ?? (
                          <Fragment>
                            <span className="membership-pricing-text37">
                              Feature text goes here
                            </span>
                          </Fragment>
                        )}
                      </span>
                    </div>
                  </div>
                </div>
                <button className="membership-pricing-thq-button-elm5 thq-button-filled thq-button-animated">
                  <span className="thq-body-small">
                    {props.plan2Action1 ?? (
                      <Fragment>
                        <span className="membership-pricing-text29">
                          Get started
                        </span>
                      </Fragment>
                    )}
                  </span>
                </button>
              </div>
              <div className="membership-pricing-thq-column-elm6 thq-card">
                <div className="membership-pricing-thq-price-elm20">
                  <div className="membership-pricing-thq-price-elm21">
                    <span className="membership-pricing-thq-text-elm54 thq-body-large">
                      {props.plan31 ?? (
                        <Fragment>
                          <span className="membership-pricing-text80">
                            Enterprise plan
                          </span>
                        </Fragment>
                      )}
                    </span>
                    <h3 className="membership-pricing-thq-text-elm55 thq-heading-3">
                      {props.plan3Price1 ?? (
                        <Fragment>
                          <span className="membership-pricing-text22">
                            $499/yr
                          </span>
                        </Fragment>
                      )}
                    </h3>
                    <span className="thq-body-large">
                      {props.plan3Yearly1 ?? (
                        <Fragment>
                          <span className="membership-pricing-text39">
                            or $49 monthly
                          </span>
                        </Fragment>
                      )}
                    </span>
                  </div>
                  <div className="membership-pricing-thq-list-elm8">
                    <div className="membership-pricing-thq-list-item-elm29">
                      <svg viewBox="0 0 1024 1024" className="thq-icon-small">
                        <path d="M384 690l452-452 60 60-512 512-238-238 60-60z"></path>
                      </svg>
                      <span className="thq-body-small">
                        {props.plan3Feature11 ?? (
                          <Fragment>
                            <span className="membership-pricing-text77">
                              Feature text goes here
                            </span>
                          </Fragment>
                        )}
                      </span>
                    </div>
                    <div className="membership-pricing-thq-list-item-elm30">
                      <svg viewBox="0 0 1024 1024" className="thq-icon-small">
                        <path d="M384 690l452-452 60 60-512 512-238-238 60-60z"></path>
                      </svg>
                      <span className="thq-body-small">
                        {props.plan3Feature21 ?? (
                          <Fragment>
                            <span className="membership-pricing-text63">
                              Feature text goes here
                            </span>
                          </Fragment>
                        )}
                      </span>
                    </div>
                    <div className="membership-pricing-thq-list-item-elm31">
                      <svg viewBox="0 0 1024 1024" className="thq-icon-small">
                        <path d="M384 690l452-452 60 60-512 512-238-238 60-60z"></path>
                      </svg>
                      <span className="thq-body-small">
                        {props.plan3Feature31 ?? (
                          <Fragment>
                            <span className="membership-pricing-text62">
                              Feature text goes here
                            </span>
                          </Fragment>
                        )}
                      </span>
                    </div>
                    <div className="membership-pricing-thq-list-item-elm32">
                      <svg viewBox="0 0 1024 1024" className="thq-icon-small">
                        <path d="M384 690l452-452 60 60-512 512-238-238 60-60z"></path>
                      </svg>
                      <span className="thq-body-small">
                        {props.plan3Feature41 ?? (
                          <Fragment>
                            <span className="membership-pricing-text78">
                              Feature text goes here
                            </span>
                          </Fragment>
                        )}
                      </span>
                    </div>
                    <div className="membership-pricing-thq-list-item-elm33">
                      <svg viewBox="0 0 1024 1024" className="thq-icon-small">
                        <path d="M384 690l452-452 60 60-512 512-238-238 60-60z"></path>
                      </svg>
                      <span className="thq-body-small">
                        {props.plan3Feature51 ?? (
                          <Fragment>
                            <span className="membership-pricing-text10">
                              Feature text goes here
                            </span>
                          </Fragment>
                        )}
                      </span>
                    </div>
                  </div>
                </div>
                <button className="membership-pricing-thq-button-elm6 thq-button-filled thq-button-animated">
                  <span className="thq-body-small">
                    {props.plan3Action1 ?? (
                      <Fragment>
                        <span className="membership-pricing-text68">
                          Get started
                        </span>
                      </Fragment>
                    )}
                  </span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <style jsx>
        {`
          .membership-pricing-thq-pricing23-elm {
            width: 100%;
            height: auto;
            display: flex;
            overflow: hidden;
            position: relative;
            align-items: center;
            flex-shrink: 0;
            flex-direction: column;
          }
          .membership-pricing-thq-max-width-elm {
            gap: var(--dl-layout-space-threeunits);
            width: 100%;
            display: flex;
            align-items: center;
            flex-direction: column;
          }
          .membership-pricing-thq-section-title-elm {
            gap: var(--dl-layout-space-unit);
            width: 100%;
            display: flex;
            max-width: 800px;
            align-items: center;
            flex-shrink: 0;
            flex-direction: column;
          }
          .membership-pricing-thq-text-elm10 {
            text-align: center;
          }
          .membership-pricing-thq-content-elm {
            gap: var(--dl-layout-space-oneandhalfunits);
            width: 100%;
            display: flex;
            max-width: 800px;
            align-self: stretch;
            align-items: center;
            flex-direction: column;
          }
          .membership-pricing-thq-text-elm11 {
            text-align: center;
          }
          .membership-pricing-thq-text-elm12 {
            text-align: center;
          }
          .membership-pricing-thq-tabs-elm {
            display: flex;
            align-items: flex-start;
          }
          .membership-pricing-button1 {
            gap: var(--dl-layout-space-halfunit);
            color: var(--dl-color-theme-neutral-light);
            width: 120px;
            height: 60px;
            border-top-left-radius: var(--dl-layout-radius-buttonradius);
            border-top-right-radius: 0;
            border-bottom-left-radius: var(--dl-layout-radius-buttonradius);
            border-bottom-right-radius: 0;
          }
          .membership-pricing-button2 {
            gap: var(--dl-layout-space-halfunit);
            width: 120px;
            height: 60px;
            border-style: solid;
            border-top-left-radius: var(--dl-layout-radius-buttonradius);
            border-top-right-radius: 0;
            border-bottom-left-radius: var(--dl-layout-radius-buttonradius);
            border-bottom-right-radius: 0;
          }
          .membership-pricing-button3 {
            gap: var(--dl-layout-space-halfunit);
            color: var(--dl-color-theme-neutral-light);
            width: 120px;
            height: 60px;
            border-top-left-radius: 0;
            border-top-right-radius: var(--dl-layout-radius-buttonradius);
            border-bottom-left-radius: 0;
            border-bottom-right-radius: var(--dl-layout-radius-buttonradius);
          }
          .membership-pricing-button4 {
            gap: var(--dl-layout-space-halfunit);
            width: 120px;
            height: 60px;
            border-style: solid;
            border-top-left-radius: 0;
            border-top-right-radius: var(--dl-layout-radius-buttonradius);
            border-bottom-left-radius: 0;
            border-bottom-right-radius: var(--dl-layout-radius-buttonradius);
          }
          .membership-pricing-container1 {
            gap: var(--dl-layout-space-twounits);
            width: 100%;
            display: flex;
            align-self: stretch;
            align-items: flex-start;
            flex-shrink: 0;
            animation-name: fadeIn;
            animation-delay: 0s;
            animation-duration: 300ms;
            animation-direction: normal;
            animation-iteration-count: 1;
            animation-timing-function: ease;
          }
          .membership-pricing-thq-column-elm1 {
            gap: var(--dl-layout-space-twounits);
            flex: 1;
            width: 100%;
            display: flex;
            flex-grow: 1;
            align-self: stretch;
            align-items: center;
            border-color: var(--dl-color-theme-neutral-dark);
            border-style: solid;
            border-width: 1px;
            flex-direction: column;
          }
          .membership-pricing-thq-price-elm10 {
            gap: var(--dl-layout-space-twounits);
            display: flex;
            flex-grow: 1;
            align-self: stretch;
            align-items: center;
            flex-direction: column;
          }
          .membership-pricing-thq-price-elm11 {
            gap: var(--dl-layout-space-halfunit);
            display: flex;
            align-self: stretch;
            align-items: center;
            flex-direction: column;
          }
          .membership-pricing-thq-text-elm17 {
            font-style: normal;
            font-weight: 600;
          }
          .membership-pricing-thq-list-elm1 {
            gap: var(--dl-layout-space-unit);
            display: flex;
            align-self: stretch;
            align-items: flex-start;
            flex-direction: column;
          }
          .membership-pricing-thq-list-item-elm10 {
            gap: var(--dl-layout-space-unit);
            display: flex;
            align-self: stretch;
            align-items: flex-start;
            flex-shrink: 0;
          }
          .membership-pricing-thq-list-item-elm11 {
            gap: var(--dl-layout-space-unit);
            display: flex;
            align-self: stretch;
            align-items: flex-start;
            flex-shrink: 0;
          }
          .membership-pricing-thq-list-item-elm12 {
            gap: var(--dl-layout-space-unit);
            border: 2px dashed rgba(120, 120, 120, 0.4);
            display: flex;
            align-self: stretch;
            align-items: flex-start;
            flex-shrink: 0;
          }
          .membership-pricing-thq-text-elm20 {
            font-size: 48px;
          }
          .membership-pricing-thq-list-elm2 {
            gap: var(--dl-layout-space-unit);
            display: flex;
            align-self: stretch;
            align-items: flex-start;
            flex-direction: column;
          }
          .membership-pricing-thq-list-item-elm13 {
            gap: var(--dl-layout-space-unit);
            display: flex;
            align-self: stretch;
            align-items: flex-start;
            flex-shrink: 0;
          }
          .membership-pricing-thq-button-elm1 {
            width: 100%;
          }
          .membership-pricing-thq-column-elm2 {
            gap: var(--dl-layout-space-twounits);
            flex: 1;
            width: 100%;
            display: flex;
            flex-grow: 1;
            align-self: stretch;
            align-items: center;
            border-color: var(--dl-color-theme-neutral-dark);
            border-style: solid;
            border-width: 1px;
            flex-direction: column;
            background-color: var(--dl-color-theme-neutral-light);
          }
          .membership-pricing-thq-price-elm12 {
            gap: var(--dl-layout-space-twounits);
            display: flex;
            flex-grow: 1;
            align-self: stretch;
            align-items: center;
            flex-direction: column;
          }
          .membership-pricing-thq-price-elm13 {
            gap: var(--dl-layout-space-halfunit);
            display: flex;
            align-self: stretch;
            align-items: center;
            flex-direction: column;
          }
          .membership-pricing-thq-text-elm24 {
            font-style: normal;
            font-weight: 600;
          }
          .membership-pricing-thq-list-elm3 {
            gap: var(--dl-layout-space-unit);
            display: flex;
            align-self: stretch;
            align-items: flex-start;
            flex-direction: column;
          }
          .membership-pricing-thq-list-item-elm14 {
            gap: var(--dl-layout-space-unit);
            display: flex;
            align-self: stretch;
            align-items: flex-start;
            flex-shrink: 0;
          }
          .membership-pricing-thq-list-item-elm15 {
            gap: var(--dl-layout-space-unit);
            display: flex;
            align-self: stretch;
            align-items: flex-start;
            flex-shrink: 0;
          }
          .membership-pricing-thq-text-elm27 {
            font-size: 48px;
          }
          .membership-pricing-thq-list-elm4 {
            gap: var(--dl-layout-space-unit);
            display: flex;
            align-self: stretch;
            align-items: flex-start;
            flex-direction: column;
          }
          .membership-pricing-thq-list-item-elm16 {
            gap: var(--dl-layout-space-unit);
            display: flex;
            align-self: stretch;
            align-items: flex-start;
            flex-shrink: 0;
          }
          .membership-pricing-thq-button-elm2 {
            width: 100%;
          }
          .membership-pricing-thq-column-elm3 {
            gap: var(--dl-layout-space-twounits);
            flex: 1;
            width: 100%;
            display: flex;
            flex-grow: 1;
            align-items: center;
            flex-shrink: 0;
            border-color: var(--dl-color-theme-neutral-dark);
            border-style: solid;
            border-width: 1px;
            flex-direction: column;
            background-color: var(--dl-color-theme-neutral-light);
          }
          .membership-pricing-thq-price-elm14 {
            gap: var(--dl-layout-space-twounits);
            display: flex;
            align-self: stretch;
            align-items: center;
            flex-direction: column;
          }
          .membership-pricing-thq-price-elm15 {
            gap: var(--dl-layout-space-halfunit);
            display: flex;
            align-self: stretch;
            align-items: center;
            flex-direction: column;
          }
          .membership-pricing-thq-text-elm31 {
            font-style: normal;
            font-weight: 600;
          }
          .membership-pricing-thq-list-elm5 {
            gap: var(--dl-layout-space-unit);
            display: flex;
            align-self: stretch;
            align-items: flex-start;
            flex-direction: column;
          }
          .membership-pricing-thq-list-item-elm17 {
            gap: var(--dl-layout-space-unit);
            display: flex;
            align-self: stretch;
            align-items: flex-start;
            flex-shrink: 0;
          }
          .membership-pricing-thq-list-item-elm18 {
            gap: var(--dl-layout-space-unit);
            display: flex;
            align-self: stretch;
            align-items: flex-start;
            flex-shrink: 0;
          }
          .membership-pricing-thq-list-item-elm19 {
            gap: var(--dl-layout-space-unit);
            display: flex;
            align-self: stretch;
            align-items: flex-start;
            flex-shrink: 0;
          }
          .membership-pricing-thq-list-item-elm20 {
            gap: var(--dl-layout-space-unit);
            display: flex;
            align-self: stretch;
            align-items: flex-start;
            flex-shrink: 0;
          }
          .membership-pricing-thq-list-item-elm21 {
            gap: var(--dl-layout-space-unit);
            display: flex;
            align-self: stretch;
            align-items: flex-start;
            flex-shrink: 0;
            flex-direction: column;
          }
          .membership-pricing-thq-button-elm3 {
            width: 100%;
          }
          .membership-pricing-container2 {
            gap: 32px;
            width: 100%;
            display: flex;
            align-self: stretch;
            align-items: flex-start;
            flex-shrink: 0;
            animation-name: fadeIn;
            animation-delay: 0s;
            animation-duration: 300ms;
            animation-direction: normal;
            animation-iteration-count: 1;
            animation-timing-function: ease;
          }
          .membership-pricing-thq-column-elm4 {
            gap: var(--dl-layout-space-twounits);
            flex: 1;
            width: 100%;
            display: flex;
            flex-grow: 1;
            align-self: stretch;
            align-items: center;
            border-color: var(--dl-color-theme-neutral-dark);
            border-style: solid;
            border-width: 1px;
            flex-direction: column;
          }
          .membership-pricing-thq-price-elm16 {
            gap: var(--dl-layout-space-twounits);
            display: flex;
            flex-grow: 1;
            align-self: stretch;
            align-items: center;
            flex-direction: column;
          }
          .membership-pricing-thq-price-elm17 {
            gap: var(--dl-layout-space-halfunit);
            display: flex;
            align-self: stretch;
            align-items: center;
            flex-direction: column;
          }
          .membership-pricing-thq-text-elm39 {
            font-style: normal;
            font-weight: 600;
          }
          .membership-pricing-thq-text-elm40 {
            font-size: 48px;
          }
          .membership-pricing-thq-list-elm6 {
            gap: var(--dl-layout-space-unit);
            display: flex;
            align-self: stretch;
            align-items: flex-start;
            flex-direction: column;
          }
          .membership-pricing-thq-list-item-elm22 {
            gap: var(--dl-layout-space-unit);
            display: flex;
            align-self: stretch;
            align-items: flex-start;
            flex-shrink: 0;
          }
          .membership-pricing-thq-list-item-elm23 {
            gap: var(--dl-layout-space-unit);
            display: flex;
            align-self: stretch;
            align-items: flex-start;
            flex-shrink: 0;
          }
          .membership-pricing-thq-list-item-elm24 {
            gap: var(--dl-layout-space-unit);
            display: flex;
            align-self: stretch;
            align-items: flex-start;
            flex-shrink: 0;
          }
          .membership-pricing-thq-button-elm4 {
            width: 100%;
          }
          .membership-pricing-thq-column-elm5 {
            gap: var(--dl-layout-space-twounits);
            flex: 1;
            width: 100%;
            display: flex;
            flex-grow: 1;
            align-self: stretch;
            align-items: center;
            border-color: var(--dl-color-theme-neutral-dark);
            border-style: solid;
            border-width: 1px;
            flex-direction: column;
            background-color: var(--dl-color-theme-accent1);
          }
          .membership-pricing-thq-price-elm18 {
            gap: var(--dl-layout-space-twounits);
            display: flex;
            flex-grow: 1;
            align-self: stretch;
            align-items: center;
            flex-direction: column;
          }
          .membership-pricing-thq-price-elm19 {
            gap: var(--dl-layout-space-halfunit);
            display: flex;
            align-self: stretch;
            align-items: center;
            flex-direction: column;
          }
          .membership-pricing-thq-text-elm46 {
            font-style: normal;
            font-weight: 600;
          }
          .membership-pricing-thq-text-elm47 {
            font-size: 48px;
          }
          .membership-pricing-thq-list-elm7 {
            gap: var(--dl-layout-space-unit);
            display: flex;
            align-self: stretch;
            align-items: flex-start;
            flex-direction: column;
          }
          .membership-pricing-thq-list-item-elm25 {
            gap: var(--dl-layout-space-unit);
            display: flex;
            align-self: stretch;
            align-items: flex-start;
            flex-shrink: 0;
          }
          .membership-pricing-thq-list-item-elm26 {
            gap: var(--dl-layout-space-unit);
            display: flex;
            align-self: stretch;
            align-items: flex-start;
            flex-shrink: 0;
          }
          .membership-pricing-thq-list-item-elm27 {
            gap: var(--dl-layout-space-unit);
            display: flex;
            align-self: stretch;
            align-items: flex-start;
            flex-shrink: 0;
          }
          .membership-pricing-thq-list-item-elm28 {
            gap: var(--dl-layout-space-unit);
            display: flex;
            align-self: stretch;
            align-items: flex-start;
            flex-shrink: 0;
          }
          .membership-pricing-thq-button-elm5 {
            width: 100%;
          }
          .membership-pricing-thq-column-elm6 {
            gap: var(--dl-layout-space-twounits);
            flex: 1;
            width: 100%;
            display: flex;
            flex-grow: 1;
            align-items: center;
            flex-shrink: 0;
            border-color: var(--dl-color-theme-neutral-dark);
            border-style: solid;
            border-width: 1px;
            flex-direction: column;
            background-color: var(--dl-color-theme-accent2);
          }
          .membership-pricing-thq-price-elm20 {
            gap: var(--dl-layout-space-twounits);
            display: flex;
            align-self: stretch;
            align-items: center;
            flex-direction: column;
          }
          .membership-pricing-thq-price-elm21 {
            gap: var(--dl-layout-space-halfunit);
            display: flex;
            align-self: stretch;
            align-items: center;
            flex-direction: column;
          }
          .membership-pricing-thq-text-elm54 {
            font-style: normal;
            font-weight: 600;
          }
          .membership-pricing-thq-text-elm55 {
            font-size: 48px;
          }
          .membership-pricing-thq-list-elm8 {
            gap: var(--dl-layout-space-unit);
            display: flex;
            align-self: stretch;
            align-items: flex-start;
            flex-direction: column;
          }
          .membership-pricing-thq-list-item-elm29 {
            gap: var(--dl-layout-space-unit);
            display: flex;
            align-self: stretch;
            align-items: flex-start;
            flex-shrink: 0;
          }
          .membership-pricing-thq-list-item-elm30 {
            gap: var(--dl-layout-space-unit);
            display: flex;
            align-self: stretch;
            align-items: flex-start;
            flex-shrink: 0;
          }
          .membership-pricing-thq-list-item-elm31 {
            gap: var(--dl-layout-space-unit);
            display: flex;
            align-self: stretch;
            align-items: flex-start;
            flex-shrink: 0;
          }
          .membership-pricing-thq-list-item-elm32 {
            gap: var(--dl-layout-space-unit);
            display: flex;
            align-self: stretch;
            align-items: flex-start;
            flex-shrink: 0;
          }
          .membership-pricing-thq-list-item-elm33 {
            gap: var(--dl-layout-space-unit);
            display: flex;
            align-self: stretch;
            align-items: flex-start;
            flex-shrink: 0;
          }
          .membership-pricing-thq-button-elm6 {
            width: 100%;
          }
          .membership-pricing-text10 {
            display: inline-block;
          }
          .membership-pricing-text11 {
            display: inline-block;
          }
          .membership-pricing-text16 {
            display: inline-block;
          }
          .membership-pricing-text17 {
            display: inline-block;
          }
          .membership-pricing-text18 {
            display: inline-block;
          }
          .membership-pricing-text22 {
            display: inline-block;
          }
          .membership-pricing-text23 {
            display: inline-block;
          }
          .membership-pricing-text24 {
            display: inline-block;
          }
          .membership-pricing-text27 {
            display: inline-block;
          }
          .membership-pricing-text28 {
            display: inline-block;
          }
          .membership-pricing-text29 {
            display: inline-block;
          }
          .membership-pricing-text30 {
            display: inline-block;
          }
          .membership-pricing-text34 {
            display: inline-block;
          }
          .membership-pricing-text35 {
            display: inline-block;
          }
          .membership-pricing-text36 {
            display: inline-block;
          }
          .membership-pricing-text37 {
            display: inline-block;
          }
          .membership-pricing-text38 {
            display: inline-block;
          }
          .membership-pricing-text39 {
            display: inline-block;
          }
          .membership-pricing-text40 {
            display: inline-block;
          }
          .membership-pricing-text41 {
            display: inline-block;
          }
          .membership-pricing-text42 {
            display: inline-block;
          }
          .membership-pricing-text43 {
            display: inline-block;
          }
          .membership-pricing-text44 {
            display: inline-block;
          }
          .membership-pricing-text50 {
            display: inline-block;
          }
          .membership-pricing-text51 {
            display: inline-block;
          }
          .membership-pricing-text55 {
            display: inline-block;
          }
          .membership-pricing-text56 {
            display: inline-block;
          }
          .membership-pricing-text62 {
            display: inline-block;
          }
          .membership-pricing-text63 {
            display: inline-block;
          }
          .membership-pricing-text64 {
            display: inline-block;
          }
          .membership-pricing-text65 {
            display: inline-block;
          }
          .membership-pricing-text66 {
            display: inline-block;
          }
          .membership-pricing-text67 {
            display: inline-block;
          }
          .membership-pricing-text68 {
            display: inline-block;
          }
          .membership-pricing-text69 {
            display: inline-block;
          }
          .membership-pricing-text70 {
            display: inline-block;
          }
          .membership-pricing-text71 {
            display: inline-block;
          }
          .membership-pricing-text72 {
            display: inline-block;
          }
          .membership-pricing-text73 {
            display: inline-block;
          }
          .membership-pricing-text74 {
            display: inline-block;
          }
          .membership-pricing-text75 {
            display: inline-block;
          }
          .membership-pricing-text76 {
            display: inline-block;
          }
          .membership-pricing-text77 {
            display: inline-block;
          }
          .membership-pricing-text78 {
            display: inline-block;
          }
          .membership-pricing-text79 {
            display: inline-block;
          }
          .membership-pricing-text80 {
            display: inline-block;
          }
          .membership-pricing-text81 {
            display: inline-block;
          }
          .membership-pricing-text82 {
            display: inline-block;
          }
          .membership-pricing-text83 {
            display: inline-block;
          }
          @media (max-width: 991px) {
            .membership-pricing-container1 {
              flex-direction: column;
            }
            .membership-pricing-thq-column-elm3 {
              width: 100%;
            }
            .membership-pricing-container2 {
              flex-direction: column;
            }
            .membership-pricing-thq-column-elm6 {
              width: 100%;
            }
          }
          @media (max-width: 479px) {
            .membership-pricing-thq-max-width-elm {
              gap: var(--dl-layout-space-oneandhalfunits);
            }
          }
        `}
      </style>
    </>
  )
}

MembershipPricing.defaultProps = {
  plan3Feature51: undefined,
  plan3Feature2: undefined,
  plan2Price: undefined,
  content1: undefined,
  plan1Feature34: undefined,
  plan3Price1: undefined,
  plan1Yearly: undefined,
  content2: undefined,
  plan2: undefined,
  plan1Price: undefined,
  plan2Action1: undefined,
  plan2Feature32: undefined,
  plan2Action: undefined,
  plan1: undefined,
  plan11: undefined,
  plan2Feature41: undefined,
  heading1: undefined,
  plan3Yearly1: undefined,
  plan3Action: undefined,
  plan1Feature1: undefined,
  plan3Feature53: undefined,
  plan3Feature5: undefined,
  plan2Feature2: undefined,
  plan2Yearly: undefined,
  plan1Feature35: undefined,
  plan1Feature31: undefined,
  plan3Feature3: undefined,
  plan3Feature31: undefined,
  rootClassName: '',
  plan3Feature21: undefined,
  plan2Price1: undefined,
  plan1Price1: undefined,
  plan21: undefined,
  plan1Action1: undefined,
  plan3Action1: undefined,
  plan2Yearly1: undefined,
  plan1Feature11: undefined,
  plan3Feature4: undefined,
  plan2Feature11: undefined,
  plan1Yearly1: undefined,
  plan2Feature1: undefined,
  plan1Feature21: undefined,
  plan3: undefined,
  plan3Feature11: undefined,
  plan3Feature41: undefined,
  plan2Feature21: undefined,
  plan31: undefined,
  plan2Feature31: undefined,
  plan3Feature1: undefined,
  plan1Action: undefined,
}

MembershipPricing.propTypes = {
  plan3Feature51: PropTypes.element,
  plan3Feature2: PropTypes.element,
  plan2Price: PropTypes.element,
  content1: PropTypes.element,
  plan1Feature34: PropTypes.element,
  plan3Price1: PropTypes.element,
  plan1Yearly: PropTypes.element,
  content2: PropTypes.element,
  plan2: PropTypes.element,
  plan1Price: PropTypes.element,
  plan2Action1: PropTypes.element,
  plan2Feature32: PropTypes.element,
  plan2Action: PropTypes.element,
  plan1: PropTypes.element,
  plan11: PropTypes.element,
  plan2Feature41: PropTypes.element,
  heading1: PropTypes.element,
  plan3Yearly1: PropTypes.element,
  plan3Action: PropTypes.element,
  plan1Feature1: PropTypes.element,
  plan3Feature53: PropTypes.element,
  plan3Feature5: PropTypes.element,
  plan2Feature2: PropTypes.element,
  plan2Yearly: PropTypes.element,
  plan1Feature35: PropTypes.element,
  plan1Feature31: PropTypes.element,
  plan3Feature3: PropTypes.element,
  plan3Feature31: PropTypes.element,
  rootClassName: PropTypes.string,
  plan3Feature21: PropTypes.element,
  plan2Price1: PropTypes.element,
  plan1Price1: PropTypes.element,
  plan21: PropTypes.element,
  plan1Action1: PropTypes.element,
  plan3Action1: PropTypes.element,
  plan2Yearly1: PropTypes.element,
  plan1Feature11: PropTypes.element,
  plan3Feature4: PropTypes.element,
  plan2Feature11: PropTypes.element,
  plan1Yearly1: PropTypes.element,
  plan2Feature1: PropTypes.element,
  plan1Feature21: PropTypes.element,
  plan3: PropTypes.element,
  plan3Feature11: PropTypes.element,
  plan3Feature41: PropTypes.element,
  plan2Feature21: PropTypes.element,
  plan31: PropTypes.element,
  plan2Feature31: PropTypes.element,
  plan3Feature1: PropTypes.element,
  plan1Action: PropTypes.element,
}

export default MembershipPricing
