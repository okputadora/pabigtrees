import React from 'react'

import './homepage.scss'

const Homepage = () => (
  <div className="homepage">
    <div className="homepage-header">
      <div className="homepage-title">What literally covers the Commonwealth of Pennsylvania from A to Z? Trees! Trees of all kinds--from Abies to Ziziphus. Some of the largest of each species, are found here recorded on this website.</div>
      <img className="homepage-image" src="http://www.pabigtrees.com/images/long_big_small1.jpg" alt="homepage-tree" />
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
)

export default Homepage
