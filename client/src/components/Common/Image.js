import React from 'react'
import PropTypes from 'prop-types'
import AdminImage from './AdminImage'

import './image.scss'

const Image = (props) => {
  const {
    src, alt, text, isAdmin,
  } = props
  if (isAdmin) {
    return <AdminImage {...props} />
  }
  return (
    <div className="image-container">
      <img className="image-image" src={src} alt={text.split(0, text.indexOf('.'))} />
      <p className="image-text">{text}</p>
    </div>
  )
}

Image.defaultProps = {
  text: '',
  isAdmin: false,
}

Image.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  text: PropTypes.string,
  isAdmin: PropTypes.bool,
}

export default Image
