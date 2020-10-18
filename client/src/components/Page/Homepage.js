import React from 'react'
import PropTypes from 'prop-types'

import cover from './hemlock1.jpg'
import amSycamore from './Am-Sycamore.jpg'
import pinoak from './pinoak.png'
import './homepage.scss'

const Homepage = ({ children }) => (
  <div className="homepage">
    <div className="background-container">
      <div>
        <img className="imageLeft" src={cover} alt="homepage-tree" />
        <img className="homepage-mirror-image imageRight" src={cover} alt="homepage-tree" />
      </div>
      <div className="homepage-images-row2">
        <img className="imageLeft" src={amSycamore} alt="homepage-tree" />
        <img className="homepage-mirror-image imageRight" width={600} src={pinoak} alt="pin-oak" />
      </div>
    </div>
    <div className="homepage-main">
      {children}
    </div>
  </div>
)

Homepage.propTypes = {
  children: PropTypes.node.isRequired,
}
export default Homepage
