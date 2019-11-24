import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const CustomLink = ({ className, text, href }) => (<Link to={href}>{text}</Link>)

CustomLink.defaultProps = {
  className: null,
}

CustomLink.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
}

export default CustomLink
