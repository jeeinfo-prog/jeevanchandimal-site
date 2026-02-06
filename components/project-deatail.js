import React, { Fragment } from 'react'

import { DataProvider } from '@teleporthq/react-components'
import PropTypes from 'prop-types'
import { useTranslations } from 'next-intl'

const ProjectDeatail = (props) => {
  return (
    <>
      <div className="project-deatail-thq-layout349-elm thq-section-padding">
        <div className="thq-section-max-width thq-flex-column project-deatail-thq-max-width-elm">
          <DataProvider
            fetchData={() =>
              fetch('/api/rest-api-data-b1593897', {
                headers: {
                  'Content-Type': 'application/json',
                },
              })
                .then((res) => res.json())
                .then((response) => response?.data)
            }
            resourceDefinition={{
              type: 'external-data-source',
              dataSourceId: 'b1593897-6386-4fb2-98e7-00672fcc4a9a',
              tableName: 'data',
              dataSourceType: 'rest-api',
            }}
            name={'SingleProject_data_data'}
            renderSuccess={(SingleProject_data_data) => (
              <>
                <Fragment>
                  <img
                    alt={props.featureImageAlt}
                    src={props.featureImageSrc}
                    id={SingleProject_data_data?.[0]?.featured_media}
                    className="thq-img-ratio-4-3"
                  />
                </Fragment>
              </>
            )}
            persistDataDuringLoading={true}
          />
          <div className="thq-flex-column">
            <DataProvider
              resourceDefinition={{
                type: 'external-data-source',
                dataSourceId: 'b1593897-6386-4fb2-98e7-00672fcc4a9a',
                tableName: 'data',
                dataSourceType: 'rest-api',
              }}
              name={'SingleProject_data_data'}
              renderSuccess={(SingleProject_data_data) => (
                <>
                  <Fragment>
                    <span
                      id={SingleProject_data_data?.[0]?.acf?.project_type}
                      className="project-deatail-thq-type-elm thq-body-small"
                    >
                      {props.feature1Slogan ?? (
                        <Fragment>
                          <span className="project-deatail-text1">
                            Capturing Moments, Creating Stories
                          </span>
                        </Fragment>
                      )}
                    </span>
                  </Fragment>
                </>
              )}
            />
            <DataProvider
              resourceDefinition={{
                type: 'external-data-source',
                dataSourceId: 'b1593897-6386-4fb2-98e7-00672fcc4a9a',
                tableName: 'data',
                dataSourceType: 'rest-api',
              }}
              name={'SingleProject_data_data'}
              renderSuccess={(SingleProject_data_data) => (
                <>
                  <Fragment>
                    <h2
                      id={SingleProject_data_data?.[0]?.title?.rendered}
                      className="project-deatail-thq-title-elm thq-heading-2"
                    >
                      {props.feature1Title ?? (
                        <Fragment>
                          <span className="project-deatail-text2">
                            End-to-End Visual Production
                          </span>
                        </Fragment>
                      )}
                    </h2>
                  </Fragment>
                </>
              )}
            />
            <DataProvider
              fetchData={() =>
                fetch('/api/rest-api-data-b1593897', {
                  headers: {
                    'Content-Type': 'application/json',
                  },
                })
                  .then((res) => res.json())
                  .then((response) => response?.data)
              }
              resourceDefinition={{
                type: 'external-data-source',
                dataSourceId: 'b1593897-6386-4fb2-98e7-00672fcc4a9a',
                tableName: 'data',
                dataSourceType: 'rest-api',
              }}
              name={'SingleProject_data_data'}
              renderSuccess={(SingleProject_data_data) => (
                <>
                  <Fragment>
                    <p
                      id={SingleProject_data_data?.[0]?.acf?.short_desc}
                      className="project-deatail-thq-short-desc-elm thq-body-large"
                    >
                      {props.feature1Description ?? (
                        <Fragment>
                          <span className="project-deatail-text3">
                            Experience the power of visual storytelling through
                            our carefully crafted projects that bring clarity,
                            mood, and narrative presence to life.
                          </span>
                        </Fragment>
                      )}
                    </p>
                  </Fragment>
                </>
              )}
              persistDataDuringLoading={true}
            />
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .project-deatail-thq-layout349-elm {
            width: 100%;
            height: auto;
            display: flex;
            overflow: hidden;
            position: relative;
            align-items: center;
            flex-shrink: 0;
            flex-direction: column;
          }
          .project-deatail-thq-type-elm {
            align-self: center;
            text-align: center;
          }
          .project-deatail-thq-title-elm {
            align-self: center;
            text-align: center;
          }
          .project-deatail-thq-short-desc-elm {
            align-self: center;
            text-align: center;
          }
          .project-deatail-text1 {
            display: inline-block;
          }
          .project-deatail-text2 {
            display: inline-block;
          }
          .project-deatail-text3 {
            display: inline-block;
          }
          @media (max-width: 991px) {
            .project-deatail-thq-max-width-elm {
              flex-direction: column;
            }
          }
          @media (max-width: 767px) {
            .project-deatail-thq-max-width-elm {
              width: 100%;
            }
          }
          @media (max-width: 479px) {
            .project-deatail-thq-max-width-elm {
              padding: var(--dl-layout-space-oneandhalfunits);
            }
          }
        `}
      </style>
    </>
  )
}

ProjectDeatail.defaultProps = {
  featureImageSrc:
    'https://images.unsplash.com/photo-1617396900799-f4ec2b43c7ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTc3MDMyMjU1M3w&ixlib=rb-4.1.0&q=80&w=1400',
  feature1Slogan: undefined,
  featureImageAlt: 'Visual storytelling',
  feature1Title: undefined,
  feature1Description: undefined,
}

ProjectDeatail.propTypes = {
  featureImageSrc: PropTypes.string,
  feature1Slogan: PropTypes.element,
  featureImageAlt: PropTypes.string,
  feature1Title: PropTypes.element,
  feature1Description: PropTypes.element,
}

export default ProjectDeatail
