import React from 'react'
import PropTypes from 'prop-types'

import './fullPage.scss'

const FullPage = ({ content }) => (
  <div className="fullPage">
    {content}
  </div>
)

FullPage.propTypes = {
  content: PropTypes.node.isRequired,
}

export default FullPage
