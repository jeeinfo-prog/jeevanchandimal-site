import React, { useState, Fragment } from 'react'

import PropTypes from 'prop-types'
import { useTranslations } from 'next-intl'

const ProjectList = (props) => {
  const [isRefundVisible, setIsRefundVisible] = useState(false)
  const [isTermsVisible, setIsTermsVisible] = useState(true)
  const [isPrivacyVisible, setIsPrivacyVisible] = useState(false)
  return (
    <>
      <div className="project-list-container1 thq-section-padding">
        <div className="project-list-thq-max-width-elm thq-section-max-width">
          <div className="project-list-container2 thq-flex-column">
            {isTermsVisible === true && (
              <button
                onClick={() => {
                  setIsPrivacyVisible(false)
                  setIsRefundVisible(false)
                  setIsTermsVisible(true)
                }}
                className="thq-button-filled"
              >
                <span>
                  {props.button ?? (
                    <Fragment>
                      <span className="project-list-text41">
                        Terms of service
                      </span>
                    </Fragment>
                  )}
                </span>
              </button>
            )}
            {isTermsVisible === false && (
              <button
                onClick={() => {
                  setIsPrivacyVisible(false)
                  setIsRefundVisible(false)
                  setIsTermsVisible(true)
                }}
                className="thq-button-outline"
              >
                <span>
                  {props.button ?? (
                    <Fragment>
                      <span className="project-list-text41">
                        Terms of service
                      </span>
                    </Fragment>
                  )}
                </span>
              </button>
            )}
            {isPrivacyVisible === false && (
              <button
                onClick={() => {
                  setIsPrivacyVisible(true)
                  setIsTermsVisible(false)
                  setIsRefundVisible(false)
                }}
                className="thq-button-outline"
              >
                <span>
                  {props.button1 ?? (
                    <Fragment>
                      <span className="project-list-text40">
                        Privacy statement
                      </span>
                    </Fragment>
                  )}
                </span>
              </button>
            )}
            {isPrivacyVisible === true && (
              <button
                onClick={() => {
                  setIsPrivacyVisible(true)
                  setIsTermsVisible(false)
                  setIsRefundVisible(false)
                }}
                className="thq-button-filled"
              >
                <span>
                  {props.button1 ?? (
                    <Fragment>
                      <span className="project-list-text40">
                        Privacy statement
                      </span>
                    </Fragment>
                  )}
                </span>
              </button>
            )}
            {isRefundVisible === false && (
              <button
                onClick={() => {
                  setIsTermsVisible(false)
                  setIsRefundVisible(true)
                  setIsPrivacyVisible(false)
                }}
                className="thq-button-outline"
              >
                <span>
                  {props.button2 ?? (
                    <Fragment>
                      <span className="project-list-text24">Refund Policy</span>
                    </Fragment>
                  )}
                </span>
              </button>
            )}
            {isRefundVisible === true && (
              <button
                onClick={() => {
                  setIsPrivacyVisible(false)
                  setIsTermsVisible(false)
                  setIsRefundVisible(true)
                }}
                className="thq-button-filled"
              >
                <span>
                  {props.button2 ?? (
                    <Fragment>
                      <span className="project-list-text24">Refund Policy</span>
                    </Fragment>
                  )}
                </span>
              </button>
            )}
          </div>
          <div className="project-list-container3 thq-flex-column">
            {isTermsVisible === true && (
              <div className="project-list-container4">
                <ul className="project-list-ul1 thq-flex-column">
                  <li className="project-list-li10 thq-flex-column list-item">
                    <h2 className="project-list-thq-heading7-elm thq-heading-2">
                      {props.heading7 ?? (
                        <Fragment>
                          <span className="project-list-text29">
                            Terms of service
                          </span>
                        </Fragment>
                      )}
                    </h2>
                    <p className="thq-body-small">
                      {props.content7 ?? (
                        <Fragment>
                          <span className="project-list-text31">
                            Lorem ipsum dolor sit amet. Vel dolores illum est
                            aperiam quis nam voluptatem quia et omnis autem qui
                            dolore ullam sed fugiat cumque! Qui accusamus
                            assumenda et molestias eius et error sunt. Id
                            recusandae nostrum ea officiis voluptatem in nisi
                            consequatur sed quia tenetur sit alias molestias qui
                            illum soluta. Est nesciunt perferendis eum sint
                            rerum 33 cupiditate dolorem id corrupti laboriosam
                            ut debitis veniam ut ipsam fugit vel sunt
                            consequatur. Et nobis quasi et cumque adipisci aut
                            molestiae eligendi quo inventore dicta ea suscipit
                            sequi sed veritatis nemo.
                          </span>
                        </Fragment>
                      )}
                    </p>
                    <ul className="project-list-ul2 thq-flex-column">
                      <li className="list-item">
                        <h3 className="thq-heading-3">
                          {props.heading8 ?? (
                            <Fragment>
                              <span className="project-list-text36">
                                General Terms and Conditions
                              </span>
                            </Fragment>
                          )}
                        </h3>
                        <p className="thq-body-small">
                          {props.content2 ?? (
                            <Fragment>
                              <span className="project-list-text16">
                                Explore a selection of Jeevan Chandimal&apos;s
                                film, photography, sound, and animation
                                projects.
                              </span>
                            </Fragment>
                          )}
                        </p>
                      </li>
                      <li className="list-item">
                        <h3 className="thq-heading-3">
                          {props.heading9 ?? (
                            <Fragment>
                              <span className="project-list-text43">
                                Products and Services
                              </span>
                            </Fragment>
                          )}
                        </h3>
                        <p className="thq-body-small">
                          {props.content9 ?? (
                            <Fragment>
                              <span className="project-list-text33">
                                Lorem ipsum dolor sit amet. Est vitae blanditiis
                                ab aliquam tempore aut ipsam iusto in sunt
                                repellat ex voluptatum inventore ab facilis
                                galisum ea consequatur consequuntur. Ab voluptas
                                voluptatem eum consequatur aspernatur non
                                laboriosam atque est labore asperiores a neque
                                quos. Ea nemo modi hic dicta saepe et veritatis
                                maiores At praesentium aliquid. Sed dolores
                                architecto non doloribus quia eos consectetur
                                commodi non tenetur vitae est neque omnis. Non
                                perspiciatis velit At aliquam rerum ut officiis
                                ipsa id minima eius ut sapiente nobis et nemo
                                neque. Aut maiores tempora in officiis sunt eum
                                voluptatem tenetur sit iste reprehenderit ea
                                nisi dolor. Ea impedit omnis ad internos autem
                                ut esse sunt ad saepe maiores vel perferendis
                                veritatis. Ex magni fugiat ut reprehenderit
                                laudantium sit galisum ipsam eos tempora
                                doloribus sed accusantium nobis eum praesentium
                                quod.
                              </span>
                            </Fragment>
                          )}
                        </p>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            )}
            {isPrivacyVisible === true && (
              <div className="project-list-container5">
                <ul className="thq-flex-column">
                  <li className="project-list-li13 thq-flex-column list-item">
                    <h1 className="project-list-thq-heading1-elm thq-heading-2">
                      {props.heading1 ?? (
                        <Fragment>
                          <span className="project-list-text19">
                            About Jeevan Chandimal
                          </span>
                        </Fragment>
                      )}
                    </h1>
                    <span className="thq-body-small">
                      {props.content1 ?? (
                        <Fragment>
                          <span className="project-list-text35">
                            Learn more about the filmmaker and visual
                            storyteller behind the projects.
                          </span>
                        </Fragment>
                      )}
                    </span>
                    <ul className="project-list-ul4 thq-flex-column">
                      <li className="list-item">
                        <h1 className="thq-heading-3">
                          {props.heading2 ?? (
                            <Fragment>
                              <span className="project-list-text18">
                                Portfolio
                              </span>
                            </Fragment>
                          )}
                        </h1>
                        <p className="thq-body-small">
                          {props.content2 ?? (
                            <Fragment>
                              <span className="project-list-text16">
                                Explore a selection of Jeevan Chandimal&apos;s
                                film, photography, sound, and animation
                                projects.
                              </span>
                            </Fragment>
                          )}
                        </p>
                      </li>
                      <li className="list-item">
                        <h1 className="thq-heading-3">
                          {props.heading3 ?? (
                            <Fragment>
                              <span className="project-list-text34">
                                Services
                              </span>
                            </Fragment>
                          )}
                        </h1>
                        <span className="thq-body-small">
                          {props.content3 ?? (
                            <Fragment>
                              <span className="project-list-text23">
                                Discover the end-to-end visual production
                                services offered by Jeevan Chandimal.
                              </span>
                            </Fragment>
                          )}
                        </span>
                      </li>
                      <li className="list-item">
                        <h1 className="thq-heading-3">
                          {props.heading4 ?? (
                            <Fragment>
                              <span className="project-list-text25">
                                Approach
                              </span>
                            </Fragment>
                          )}
                        </h1>
                        <span className="thq-body-small">
                          {props.content4 ?? (
                            <Fragment>
                              <span className="project-list-text28">
                                Understand the cinematic intent and meticulous
                                approach taken in each project.
                              </span>
                            </Fragment>
                          )}
                        </span>
                      </li>
                      <li className="list-item">
                        <h1 className="thq-heading-3">
                          {props.heading5 ?? (
                            <Fragment>
                              <span className="project-list-text42">
                                Contact
                              </span>
                            </Fragment>
                          )}
                        </h1>
                        <span className="thq-body-small">
                          {props.content5 ?? (
                            <Fragment>
                              <span className="project-list-text21">
                                Get in touch to collaborate on your next visual
                                storytelling endeavor.
                              </span>
                            </Fragment>
                          )}
                        </span>
                      </li>
                      <li className="list-item">
                        <h1 className="thq-heading-3">
                          {props.heading6 ?? (
                            <Fragment>
                              <span className="project-list-text17">
                                Cookies
                              </span>
                            </Fragment>
                          )}
                        </h1>
                        <span className="thq-body-small">
                          {props.content6 ?? (
                            <Fragment>
                              <span className="project-list-text37">
                                Ut doloremque aliquam qui veniam deserunt sit
                                voluptates iusto et unde quod ut quam unde ut
                                nemo eius! Ut saepe consequuntur non quibusdam
                                soluta aut maiores eaque et rerum error nam
                                incidunt saepe aut nihil voluptatem. 33 nulla
                                quaerat est doloremque voluptatem ut libero
                                magnam id placeat aliquid. Ea minus totam est
                                inventore minus sed temporibus aperiam At
                                ratione maiores eum libero consequatur aut
                                laborum exercitationem.
                              </span>
                            </Fragment>
                          )}
                        </span>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            )}
            {isRefundVisible === true && (
              <div className="project-list-container6">
                <ul className="project-list-ul5 thq-flex-column">
                  <li className="project-list-li19 thq-flex-column list-item">
                    <h1 className="project-list-thq-heading10-elm thq-heading-2">
                      {props.heading10 ?? (
                        <Fragment>
                          <span className="project-list-text30">
                            Refund Policy
                          </span>
                        </Fragment>
                      )}
                    </h1>
                    <span className="thq-body-small">
                      {props.content10 ?? (
                        <Fragment>
                          <span className="project-list-text27">
                            Lorem ipsum dolor sit amet. Vel dolores illum est
                            aperiam quis nam voluptatem quia et omnis autem qui
                            dolore ullam sed fugiat cumque! Qui accusamus
                            assumenda et molestias eius et error sunt. Id
                            recusandae nostrum ea officiis voluptatem in nisi
                            consequatur sed quia tenetur sit alias molestias qui
                            illum soluta. Est nesciunt perferendis eum sint
                            rerum 33 cupiditate dolorem id corrupti laboriosam
                            ut debitis veniam ut ipsam fugit vel sunt
                            consequatur. Et nobis quasi et cumque adipisci aut
                            molestiae eligendi quo inventore dicta ea suscipit
                            sequi sed veritatis nemo.
                          </span>
                        </Fragment>
                      )}
                    </span>
                    <ul className="project-list-ul6 thq-flex-column">
                      <li className="list-item">
                        <h1 className="thq-heading-3">
                          {props.heading11 ?? (
                            <Fragment>
                              <span className="project-list-text20">
                                General
                              </span>
                            </Fragment>
                          )}
                        </h1>
                        <span className="thq-body-small">
                          {props.content11 ?? (
                            <Fragment>
                              <span className="project-list-text26">
                                Lorem ipsum dolor sit amet. Nam nihil facilis
                                sit consequuntur internos qui minima rerum ut
                                molestias laudantium aut iusto deserunt. Aut
                                voluptatibus excepturi qui officia laudantium
                                est repellendus tempore hic sunt debitis. Ut
                                galisum tempore in enim fugit eum pariatur
                                possimus est tenetur nemo et sint sint et
                                dolores Quis. Aut illum perspiciatis rem
                                architecto culpa et fuga aliquid. Est omnis
                                praesentium ut nisi internos rem quod totam et
                                similique quis. Est tempore cumque aut
                                recusandae labore qui error molestiae et
                                possimus quia! Eum Quis asperiores non nihil
                                tempora qui quia voluptatem aut aspernatur
                                aspernatur aut asperiores labore et sapiente
                                quaerat qui suscipit quia. Ea nesciunt iste aut
                                temporibus culpa sit dignissimos quaerat eum
                                architecto voluptatum et nemo velit At harum
                                harum.
                              </span>
                            </Fragment>
                          )}
                        </span>
                      </li>
                      <li className="list-item">
                        <h1 className="thq-heading-3">
                          {props.heading12 ?? (
                            <Fragment>
                              <span className="project-list-text39">
                                Damages and issues
                              </span>
                            </Fragment>
                          )}
                        </h1>
                        <span className="thq-body-small">
                          {props.content12 ?? (
                            <Fragment>
                              <span className="project-list-text32">
                                Lorem ipsum dolor sit amet. Est vitae blanditiis
                                ab aliquam tempore aut ipsam iusto in sunt
                                repellat ex voluptatum inventore ab facilis
                                galisum ea consequatur consequuntur. Ab voluptas
                                voluptatem eum consequatur aspernatur non
                                laboriosam atque est labore asperiores a neque
                                quos. Ea nemo modi hic dicta saepe et veritatis
                                maiores At praesentium aliquid. Sed dolores
                                architecto non doloribus quia eos consectetur
                                commodi non tenetur vitae est neque omnis. Non
                                perspiciatis velit At aliquam rerum ut officiis
                                ipsa id minima eius ut sapiente nobis et nemo
                                neque. Aut maiores tempora in officiis sunt eum
                                voluptatem tenetur sit iste reprehenderit ea
                                nisi dolor. Ea impedit omnis ad internos autem
                                ut esse sunt ad saepe maiores vel perferendis
                                veritatis. Ex magni fugiat ut reprehenderit
                                laudantium sit galisum ipsam eos tempora
                                doloribus sed accusantium nobis eum praesentium
                                quod.
                              </span>
                            </Fragment>
                          )}
                        </span>
                      </li>
                      <li className="list-item">
                        <h1 className="thq-heading-3">
                          {props.heading13 ?? (
                            <Fragment>
                              <span className="project-list-text38">
                                Refunds
                              </span>
                            </Fragment>
                          )}
                        </h1>
                        <span className="thq-body-small">
                          {props.content13 ?? (
                            <Fragment>
                              <span className="project-list-text22">
                                Lorem ipsum dolor sit amet. Est vitae blanditiis
                                ab aliquam tempore aut ipsam iusto in sunt
                                repellat ex voluptatum inventore ab facilis
                                galisum ea consequatur consequuntur. Ab voluptas
                                voluptatem eum consequatur aspernatur non
                                laboriosam atque est labore asperiores a neque
                                quos. Ea nemo modi hic dicta saepe et veritatis
                                maiores At praesentium aliquid. Sed dolores
                                architecto non doloribus quia eos consectetur
                                commodi non tenetur vitae est neque omnis. Non
                                perspiciatis velit At aliquam rerum ut officiis
                                ipsa id minima eius ut sapiente nobis et nemo
                                neque. Aut maiores tempora in officiis sunt eum
                                voluptatem tenetur sit iste reprehenderit ea
                                nisi dolor. Ea impedit omnis ad internos autem
                                ut esse sunt ad saepe maiores vel perferendis
                                veritatis. Ex magni fugiat ut reprehenderit
                                laudantium sit galisum ipsam eos tempora
                                doloribus sed accusantium nobis eum praesentium
                                quod.
                              </span>
                            </Fragment>
                          )}
                        </span>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .project-list-container1 {
            width: 100%;
            height: auto;
            display: flex;
            position: relative;
            align-items: center;
            flex-direction: column;
          }
          .project-list-thq-max-width-elm {
            width: 100%;
            display: flex;
            max-width: var(--dl-layout-size-maxwidth);
            align-items: flex-start;
            flex-direction: row;
          }
          .project-list-container2 {
            flex: 0 0 auto;
            width: auto;
            display: flex;
            align-items: stretch;
            padding-top: var(--dl-layout-space-threeunits);
            flex-direction: column;
            justify-content: center;
          }
          .project-list-container3 {
            width: auto;
            padding: var(--dl-layout-space-twounits);
            align-items: flex-start;
          }
          .project-list-container4 {
            align-self: stretch;
            align-items: flex-start;
          }
          .project-list-ul1 {
            align-items: flex-start;
          }
          .project-list-li10 {
            align-items: flex-start;
          }
          .project-list-thq-heading7-elm {
            align-self: center;
            text-align: center;
          }
          .project-list-ul2 {
            align-items: flex-start;
            padding-left: var(--dl-layout-space-fiveunits);
          }
          .project-list-container5 {
            align-self: stretch;
            align-items: flex-start;
          }
          .project-list-li13 {
            align-items: flex-start;
          }
          .project-list-thq-heading1-elm {
            align-self: center;
            text-align: center;
          }
          .project-list-ul4 {
            align-items: flex-start;
            padding-left: var(--dl-layout-space-fiveunits);
          }
          .project-list-container6 {
            align-self: stretch;
            align-items: flex-start;
          }
          .project-list-ul5 {
            align-items: flex-start;
          }
          .project-list-li19 {
            align-items: flex-start;
          }
          .project-list-thq-heading10-elm {
            align-self: center;
            text-align: center;
          }
          .project-list-ul6 {
            align-items: flex-start;
            padding-left: var(--dl-layout-space-fiveunits);
          }
          .project-list-text16 {
            display: inline-block;
          }
          .project-list-text17 {
            display: inline-block;
          }
          .project-list-text18 {
            display: inline-block;
          }
          .project-list-text19 {
            display: inline-block;
          }
          .project-list-text20 {
            display: inline-block;
          }
          .project-list-text21 {
            display: inline-block;
          }
          .project-list-text22 {
            display: inline-block;
          }
          .project-list-text23 {
            display: inline-block;
          }
          .project-list-text24 {
            display: inline-block;
          }
          .project-list-text25 {
            display: inline-block;
          }
          .project-list-text26 {
            display: inline-block;
          }
          .project-list-text27 {
            display: inline-block;
          }
          .project-list-text28 {
            display: inline-block;
          }
          .project-list-text29 {
            display: inline-block;
          }
          .project-list-text30 {
            display: inline-block;
          }
          .project-list-text31 {
            display: inline-block;
          }
          .project-list-text32 {
            display: inline-block;
          }
          .project-list-text33 {
            display: inline-block;
          }
          .project-list-text34 {
            display: inline-block;
          }
          .project-list-text35 {
            display: inline-block;
          }
          .project-list-text36 {
            display: inline-block;
          }
          .project-list-text37 {
            display: inline-block;
          }
          .project-list-text38 {
            display: inline-block;
          }
          .project-list-text39 {
            display: inline-block;
          }
          .project-list-text40 {
            display: inline-block;
          }
          .project-list-text41 {
            display: inline-block;
          }
          .project-list-text42 {
            display: inline-block;
          }
          .project-list-text43 {
            display: inline-block;
          }
          @media (max-width: 767px) {
            .project-list-thq-max-width-elm {
              align-items: center;
              flex-direction: column;
            }
            .project-list-container2 {
              align-self: center;
            }
            .project-list-container3 {
              padding-left: 0px;
              padding-right: 0px;
            }
            .project-list-ul2 {
              padding-left: var(--dl-layout-space-threeunits);
            }
            .project-list-ul4 {
              padding-left: var(--dl-layout-space-threeunits);
            }
            .project-list-ul6 {
              padding-left: var(--dl-layout-space-threeunits);
            }
          }
          @media (max-width: 479px) {
            .project-list-thq-max-width-elm {
              flex-direction: column;
            }
            .project-list-container2 {
              align-self: center;
            }
            .project-list-ul2 {
              padding-left: var(--dl-layout-space-oneandhalfunits);
            }
            .project-list-ul4 {
              padding-left: var(--dl-layout-space-oneandhalfunits);
            }
            .project-list-ul6 {
              padding-left: var(--dl-layout-space-oneandhalfunits);
            }
          }
        `}
      </style>
    </>
  )
}

ProjectList.defaultProps = {
  content2: undefined,
  heading6: undefined,
  heading2: undefined,
  heading1: undefined,
  heading11: undefined,
  content5: undefined,
  content13: undefined,
  content3: undefined,
  button2: undefined,
  heading4: undefined,
  content11: undefined,
  content10: undefined,
  content4: undefined,
  heading7: undefined,
  heading10: undefined,
  content7: undefined,
  content12: undefined,
  content9: undefined,
  heading3: undefined,
  content1: undefined,
  heading8: undefined,
  content6: undefined,
  heading13: undefined,
  heading12: undefined,
  button1: undefined,
  button: undefined,
  heading5: undefined,
  heading9: undefined,
}

ProjectList.propTypes = {
  content2: PropTypes.element,
  heading6: PropTypes.element,
  heading2: PropTypes.element,
  heading1: PropTypes.element,
  heading11: PropTypes.element,
  content5: PropTypes.element,
  content13: PropTypes.element,
  content3: PropTypes.element,
  button2: PropTypes.element,
  heading4: PropTypes.element,
  content11: PropTypes.element,
  content10: PropTypes.element,
  content4: PropTypes.element,
  heading7: PropTypes.element,
  heading10: PropTypes.element,
  content7: PropTypes.element,
  content12: PropTypes.element,
  content9: PropTypes.element,
  heading3: PropTypes.element,
  content1: PropTypes.element,
  heading8: PropTypes.element,
  content6: PropTypes.element,
  heading13: PropTypes.element,
  heading12: PropTypes.element,
  button1: PropTypes.element,
  button: PropTypes.element,
  heading5: PropTypes.element,
  heading9: PropTypes.element,
}

export default ProjectList
