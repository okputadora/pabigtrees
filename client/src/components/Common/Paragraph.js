import React from 'react'
import PropTypes from 'prop-types'

const Paragraph = ({ text, className }) => (<p className={className}>{text}</p>)

Paragraph.defaultProps = {
  className: null,
}

Paragraph.propTypes = {
  text: PropTypes.string.isRequired,
  className: PropTypes.string,
}

export default Paragraph
