import React from 'react'
import PropTypes from 'prop-types'

import './Card.scss'

const Card = (props) => {
  const {
    children,
    title,
  } = props


  return (
    <div className="homepage-section">
      <div className="homepage-section-title">
        {title}
      </div>
      <p className="homepage-section-body">{children}</p>
    </div>
  )
}
Card.defaultProps = {
  title: null,
}

Card.propTypes = {
  children: PropTypes.string.isRequired,
  title: PropTypes.string,
}

export default Card
