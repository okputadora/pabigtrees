import React from 'react'
import PropTypes from 'prop-types'

import './header.scss'

const Header = ({ text }) => <h2 className="header-container">{text}</h2>

Header.propTypes = {
  text: PropTypes.string.isRequired,
}

export default Header
