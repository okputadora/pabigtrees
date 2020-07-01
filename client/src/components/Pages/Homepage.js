import React from 'react'

import cover from './hemlock1.jpg'
import amSycamore from './Am-Sycamore.jpg'
import pinoak from './pinoak.png'
import './homepage.scss'

const Homepage = () => (
  <div className="homepage">
    <div>
      <img className="homepage-image" src={cover} alt="homepage-tree" />
      <img className="homepage-image absolute-image" src={amSycamore} alt="homepage-tree" />
    </div>
    <div>
      <div className="homepage-header">
        <div className="homepage-title">What literally covers the Commonwealth of Pennsylvania from A to Z? Trees! Trees of all kinds--from Abies to Ziziphus. Some of the largest of each species, are found here recorded on this website.</div>
      </div>
      <div className="homepage-section">
        <div className="homepage-section-title">Who are we?</div>
        <p className="homepage-section-body">The Pennsylvania Forestry Association is a broad-based citizen's organization that provides leadership and education in sound, science-based forest management and promotes stewardship to ensure the sustainability of all forest resources, resulting in benefits for all, today and into the future. The Champion Tree Program is one of the many resources we provide to achieve our goals. A champion tree represents the laregest of each species of tree found in the state. Finding, measuring and nominating big trees is an enjoyable outdoor hobby. Join us!</p>
      </div>
      <div className="homepage-section">
        <div className="homepage-section-title">What's new?</div>
        <p className="homepage-section-body">The Pennsylvania Forestry Association is a broad-based citizen's organization that provides leadership and education in sound, science-based forest management and promotes stewardship to ensure the sustainability of all forest resources, resulting in benefits for all, today and into the future. The Champion Tree Program is one of the many resources we provide to achieve our goals. A champion tree represents the laregest of each species of tree found in the state. Finding, measuring and nominating big trees is an enjoyable outdoor hobby. Join us!</p>
      </div>
      <div className="homepage-section">
        <div className="homepage-section-title">Big Trees of Pennsylvania Register</div>
        <p className="homepage-section-body">Thanks to all for your continued support of this program. We have over 1000 trees listed across the state that are big locally, or are the biggest in the state. You can submit trees for consideration for champion status to this website. In turn, trees that have National champion potential will be forwarded to American Forests.</p>
      </div>
    </div>
    <div>
      <img className="homepage-image homepage-mirror-image" src={cover} alt="homepage-tree" />
      <img className="homepage-image homepage-mirror-image absolute-image-right" width={600} src={pinoak} alt="pin-oak" />
    </div>
  </div>
)

export default Homepage
