import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import './paragraph.scss'

const Paragraph = ({ text, className }) => {
  const pClasses = classNames({
    paragraph: true,
    [className]: true,
  })
  return (<p className={pClasses}>{text}</p>)
}

Paragraph.defaultProps = {
  className: null,
}

Paragraph.propTypes = {
  text: PropTypes.string.isRequired,
  className: PropTypes.string,
}

export default Paragraph
