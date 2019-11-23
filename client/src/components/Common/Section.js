import React from 'react'
import PropTypes from 'prop-types'

import './section.scss'

const Section = ({ children }) => (<div className="section">{children}</div>)

Section.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Section
