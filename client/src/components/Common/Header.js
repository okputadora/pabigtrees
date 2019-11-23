import React from 'react'
import PropTypes from 'prop-types'

import './header.scss'

const Header = ({ children }) => <h2 className="header-container">{children}</h2>

Header.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Header
