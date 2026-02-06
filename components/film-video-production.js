import React from 'react'

import PropTypes from 'prop-types'
import { useTranslations } from 'next-intl'

const FilmVideoProduction = (props) => {
  return (
    <>
      <div
        className={`film-video-production-thq-header13-elm ${props.rootClassName} `}
      >
        <video
          src={props.video1Src}
          loop="true"
          muted="true"
          poster={props.video1Src}
          autoPlay="true"
          className="film-video-production-video"
        ></video>
      </div>
      <style jsx>
        {`
          .film-video-production-thq-header13-elm {
            width: 100%;
            display: flex;
            position: relative;
            align-items: center;
            flex-direction: column;
          }
          .film-video-production-video {
            width: 100%;
            min-height: 700px;
            object-fit: cover;
          }

          @media (max-width: 991px) {
            .film-video-production-video {
              min-height: 580px;
            }
          }
          @media (max-width: 767px) {
            .film-video-production-video {
              min-height: 400px;
            }
          }
          @media (max-width: 479px) {
            .film-video-production-video {
              min-height: 250px;
            }
          }
        `}
      </style>
    </>
  )
}

FilmVideoProduction.defaultProps = {
  video1Src: '/Film/film%20production%2002.mov',
  rootClassName: '',
}

FilmVideoProduction.propTypes = {
  video1Src: PropTypes.string,
  rootClassName: PropTypes.string,
}

export default FilmVideoProduction
