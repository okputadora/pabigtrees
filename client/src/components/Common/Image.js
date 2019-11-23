import React from 'react'
import PropTypes from 'prop-types'

import './image.scss'

const Image = ({ src, alt, text }) => (
  <div className="image-container">
    <img className="image-image" src={src} alt={alt} />
    <p className="image-text">{text}</p>
  </div>
)

Image.defaultProps = {
  text: '',
}

Image.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  text: PropTypes.string,
}

export default Image
