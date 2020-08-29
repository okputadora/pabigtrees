import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import './header.scss'

const Header = (props) => {
  const { children, alignment } = props
  const hClasses = classNames({
    headerContainer: true,
    [alignment]: true,
  })
  return (
    <h2 className={hClasses}>
      {children}
    </h2>
  )
}

Header.defaultProps = {
  alignment: null,
}

Header.propTypes = {
  children: PropTypes.node.isRequired,
  alignment: PropTypes.oneOf(['center', 'right']),
}

export default Header
