import React from 'react'
import PropTypes from 'prop-types'

const ExternalLink = ({
  text, href, inline,
}) => {
  const link = (href.slice(0, 4) !== 'http') ? `http://${href}` : href
  if (inline) return <span style={{ fontSize: 18 }}><a href={link} rel="noopener noreferrer" target="_blank">{text}</a></span>
  return <a href={link} rel="noopener noreferrer" target="_blank">{text}</a>
}

ExternalLink.defaultProps = {
  inline: null,
}

ExternalLink.propTypes = {
  text: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  inline: PropTypes.string,
}

export default ExternalLink
