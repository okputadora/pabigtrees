import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import EditableText from './EditableText'

import './paragraph.scss'

const Paragraph = (props) => {
  const { className, text, isAdmin } = props
  const pClasses = classNames({
    paragraph: true,
    [className]: true,
  })
  return (isAdmin ? <EditableText multiline {...props} /> : <p className={pClasses}>{text}</p>)
}

Paragraph.defaultProps = {
  className: null,
  isAdmin: false,
}

Paragraph.propTypes = {
  text: PropTypes.string.isRequired,
  className: PropTypes.string,
  isAdmin: PropTypes.bool,
}

export default Paragraph
