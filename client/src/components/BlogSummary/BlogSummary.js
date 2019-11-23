import React from 'react'
import { Link } from 'react-router-dom'

import Header from '@/components/Common/Header'

import './blogSummary.scss'

const BlogSummary = () => (
  <div>
    <Header alignment="center">What's New</Header>
    <div className="blogSummary-container">
      <div className="blogSummary-date">Friday, November 22, 2019</div>
      <div className="blogSummary-title">New Coordinator Found</div>
      <div className="blogSummary-content">Please join me in welcoming Aaron Greenberg as the new coordinator for the champion tree program. Aaron is a certified arborist with the International Society of Arboriculture. He works at the West Laurel</div>
      <Link to="blog" className="blogSummary-link">More</Link>
    </div>
  </div>
)

export default BlogSummary
