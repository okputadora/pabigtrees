import React from 'react'
import PropTypes from 'prop-types'

import './image.scss'

const Image = (props) => {
  const {
    src, alt, text,
  } = props
  return (
    <div className="image-container">
      <img className="image-image" src={src} alt={alt || text.split(0, text.indexOf('.'))} />
      <p className="image-text">{text}</p>
    </div>
  )
}

Image.defaultProps = {
  text: '',
}

Image.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  text: PropTypes.string,
}

export default Image
