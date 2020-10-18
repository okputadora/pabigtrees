import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const CustomLink = ({
  text, href, inline,
}) => {
  if (inline) return <span style={{ fontSize: 18 }}><Link to={href}>{text}</Link></span>
  return <Link to={href}>{text}</Link>
}

CustomLink.defaultProps = {
  inline: null,
}

CustomLink.propTypes = {
  text: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  inline: PropTypes.string,
}

export default CustomLink
