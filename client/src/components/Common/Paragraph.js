import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import './paragraph.scss'

const Paragraph = (props) => {
  const {
    className,
    children,
    isPreviousInline,
    isNextInline,
  } = props
  const pClasses = classNames({
    paragraph: true,
    [className]: true,
    inline: isPreviousInline || isNextInline,
  })
  return (
    <p className={pClasses}>
      {children}
      {isNextInline ? ' ' : ''}
    </p>
  )
}

Paragraph.defaultProps = {
  className: null,
  isNextInline: false,
  isPreviousInline: false,
}

Paragraph.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  isNextInline: PropTypes.bool,
  isPreviousInline: PropTypes.bool,
}

export default Paragraph
