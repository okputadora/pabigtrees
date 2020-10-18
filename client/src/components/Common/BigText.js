import React from 'react'
import PropTypes from 'prop-types'

const BigText = ({ children }) => (
  <div className="homepage-header">
    <div className="homepage-title">{children}</div>
  </div>
)

BigText.propTypes = {
  children: PropTypes.node.isRequired,
}

export default BigText
