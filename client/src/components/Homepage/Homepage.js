import React from 'react'

import Image from '@/components/Common/Image'
import Header from '@/components/Common/Header'
import homepagepic from './long_big_small1.jpg'
import BlogSummary from '@/components/BlogSummary/BlogSummary'
import Section from '@/components/Common/Section'
import './homepage.scss'

const Homepage = () => (
  <div className="homepage">
    <div className="homepage-grid-container">
      <div className="col">
        <p>What literally covers the Commonwealth of Pennsylvania from A to Z? Trees! Trees of all kinds--from Abies to Ziziphus. Some of the largest of each species, are found here recorded on this website.</p>
        <Image src={homepagepic} alt="Longfellow Pine at Cook Forest State Park" text="Longfellow Pine at Cook Forest State Park. This Eastern White Pine is the tallest tree in all of Northeastern United States at 184.7 feet tall, Clarion County" />
        <Header align="left">Who are we?</Header>
        <p>The Pennsylvania Forestry Association is a broad-based citizen's organization that provides leadership and education in sound, science-based forest management and promotes stewardship to ensure the sustainability of all forest resources, resulting in benefits for all, today and into the future. The Champion Tree Program is one of the many resources we provide to achieve our goals. A champion tree represents the laregest of each species of tree found in the state. Finding, measuring and nominating big trees is an enjoyable outdoor hobby. Join us!</p>
      </div>
      <div className="col">
        <BlogSummary />
        <Section>
          <Header>Big Trees of Pennsylvania Register</Header>
          <p>Thanks to all for your continued support of this program. We have over 1000 trees listed across the state that are big locally, or are the biggest in the state. You can submit trees for consideration for champion status to this website. In turn, trees that have National champion potential will be forwarded to American Forests.</p>
        </Section>
        <Section>
          <Header>Order your register today!</Header>
          <p>The 2011 edition of our book is available through this website for just $15 delivered. Please contact us for bulk/wholesale prices.</p>
        </Section>
      </div>
    </div>
  </div>
)

export default Homepage
