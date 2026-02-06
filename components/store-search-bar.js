import React from 'react'

import { useTranslations } from 'next-intl'

const StoreSearchBar = (props) => {
  return (
    <>
      <div className="store-search-bar-thq-contact1-elm thq-section-padding">
        <div className="store-search-bar-thq-max-width-elm thq-section-max-width">
          <div className="store-search-bar-container1">
            <form
              data-form-id="23758f79-2132-4ea3-8406-ea2df64e66c9"
              className="store-search-bar-form thq-card"
            >
              <div className="store-search-bar-container2">
                <div className="store-search-bar-thq-input-elm thq-flex-row">
                  <input
                    type="text"
                    id="contact-form-1-name"
                    name="contact-form-1-name"
                    placeholder="Search For Images"
                    data-form-field-id="contact-form-1-name"
                    className="store-search-bar-thq-text-input-elm thq-input"
                  />
                </div>
              </div>
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                className="store-search-bar-icon1 thq-icon-small"
              >
                <path
                  d="M10 16a5.99 5.99 0 0 0 9.471 4.885L24.586 26L26 24.586l-5.115-5.115A5.997 5.997 0 1 0 10 16m2 0a4 4 0 1 1 4 4a4.005 4.005 0 0 1-4-4"
                  fill="currentColor"
                ></path>
                <path
                  d="M29 7h-6.46l-1.71-2.55A1 1 0 0 0 20 4h-8a1 1 0 0 0-.83.45L9.46 7H3a1.003 1.003 0 0 0-1 1v17a1.003 1.003 0 0 0 1 1h9v-2H4V9h6a1 1 0 0 0 .83-.45L12.54 6h6.92l1.71 2.55A1 1 0 0 0 22 9h6v12h2V8a1.003 1.003 0 0 0-1-1"
                  fill="currentColor"
                ></path>
              </svg>
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                className="store-search-bar-icon4 thq-icon-small"
              >
                <path
                  d="m29 27.586l-7.552-7.552a11.018 11.018 0 1 0-1.414 1.414L27.586 29ZM4 13a9 9 0 1 1 9 9a9.01 9.01 0 0 1-9-9"
                  fill="currentColor"
                ></path>
              </svg>
            </form>
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .store-search-bar-thq-contact1-elm {
            display: flex;
            position: relative;
            align-items: center;
            padding-top: var(--dl-layout-space-twounits);
            flex-direction: column;
            padding-bottom: var(--dl-layout-space-twounits);
          }
          .store-search-bar-thq-max-width-elm {
            display: flex;
            align-items: center;
            flex-direction: column;
          }
          .store-search-bar-container1 {
            display: flex;
            align-items: stretch;
            flex-direction: column;
          }
          .store-search-bar-form {
            gap: var(--dl-layout-space-halfunit);
            align-items: center;
            padding-top: 0px;
            border-color: var(--dl-color-theme-primary1);
            border-width: 1px;
            padding-left: var(--dl-layout-space-halfunit);
            border-radius: var(--dl-layout-radius-buttonradius);
            padding-right: var(--dl-layout-space-halfunit);
            flex-direction: row;
            padding-bottom: 0px;
          }
          .store-search-bar-container2 {
            gap: var(--dl-layout-space-oneandhalfunits);
            display: flex;
            align-self: stretch;
            align-items: stretch;
            flex-direction: column;
            justify-content: center;
          }
          .store-search-bar-thq-input-elm {
            color: var(--dl-color-theme-secondary2);
            width: 100%;
            align-self: flex-start;
            align-items: center;
            border-radius: var(--dl-layout-radius-buttonradius);
            justify-content: center;
          }
          .store-search-bar-thq-text-input-elm {
            fill: var(--dl-color-theme-secondary2);
            flex: 1;
            width: 420px;
            border-width: 0px;
            background-color: transparent;
          }
          .store-search-bar-icon1 {
            color: var(--dl-color-theme-secondary2);
            transition: 0.3s;
          }
          .store-search-bar-icon1:hover {
            color: var(--dl-color-theme-primary2);
          }
          .store-search-bar-icon4 {
            color: var(--dl-color-theme-secondary2);
            transition: 0.3s;
          }
          .store-search-bar-icon4:hover {
            color: var(--dl-color-theme-primary2);
          }
          @media (max-width: 991px) {
            .store-search-bar-thq-input-elm {
              align-items: center;
              flex-direction: row;
            }
          }
        `}
      </style>
    </>
  )
}

export default StoreSearchBar
