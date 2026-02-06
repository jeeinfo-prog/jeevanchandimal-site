import React from 'react'

const Asset = ({ src, description }) => {
  return (
    <>
      {src && (
        <img
          loading="lazy"
          src={src}
          // srcSet={`${src}?w=3840&h=1920 1920w, ${src}?w=1920&h=960 1280w, ${src}?w=1280&h=640 640w`}
          alt={description ?? ""}
        />
      )}
    </>
  )
}

const CaisyDocumentLink = ({ node, children }) => {
  if (node.attrs.src) {
    return <Asset {...node.attrs} />
  }

  return (
    <>
      {children}
    </>
  )
}

export default CaisyDocumentLink


