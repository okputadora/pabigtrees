import React from 'react'
import PropTypes from 'prop-types'

import './twoCol.scss'

const TwoCol = ({ col1, col2 }) => (
  <div className="homepage-grid-container">
    <div className="col">
      {col1.map((comp) => comp)}
    </div>
    <div className="col">
      {col2.map((comp) => comp)}
    </div>
  </div>
)

TwoCol.propTypes = {
  col1: PropTypes.arrayOf(PropTypes.node).isRequired,
  col2: PropTypes.arrayOf(PropTypes.node).isRequired,
}

export default TwoCol
