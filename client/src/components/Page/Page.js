import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './page.scss'
import renderer from '@/utils/renderer'
import samplePageData from '@/utils/samplePageData'

class Page extends Component {
  state = {
    pageData: {},
  }

  componentDidMount() {
    // fetch page Data
    console.log(this.props)
  }

  render() {
    const { isAdmin, handleEdit } = this.props
    return <div className="page">{renderer(samplePageData, isAdmin, handleEdit)}</div>
  }
}

Page.defaultProps = {
  isAdmin: false,
  handleEdit: null,
}

Page.propTypes = {
  isAdmin: PropTypes.bool,
  handleEdit: PropTypes.func,
}

export default Page
