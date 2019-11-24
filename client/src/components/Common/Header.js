import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import EditableText from './EditableText'

import './header.scss'

const Header = (props) => {
  const { text, isAdmin, alignment } = props
  const hClasses = classNames({
    headerContainer: true,
    [alignment]: true,
  })
  return (
    <h2 className={hClasses}>
      {isAdmin ? <EditableText {...props} /> : text}
    </h2>
  )
}

Header.defaultProps = {
  alignment: null,
  isAdmin: false,
}

Header.propTypes = {
  text: PropTypes.string.isRequired,
  alignment: PropTypes.oneOf(['center', 'right']),
  isAdmin: PropTypes.bool,
}

export default Header
