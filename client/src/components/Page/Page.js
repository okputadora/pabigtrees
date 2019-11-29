import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './page.scss'
import renderer from '@/utils/renderer'
// import samplePageData from '@/utils/samplePageData'
import * as API from '@/api/page'

const paths = {
  '/': '5de12e6538a99e3154370d02',
  '/measurement': 'measurement',
}
class Page extends Component {
  state = {
    pageData: null,
  }

  async componentDidMount() {
    const { data, match } = this.props
    if (!data) {
      const { path } = match
      const id = paths[path]
      const { data: pageData } = await API.getPageData(id)
      this.setState({ pageData })
    } else {
      this.setState({ pageData: data })
    }
  }

  render() {
    const { isAdmin, handleEdit } = this.props
    const { pageData } = this.state
    return pageData ? <div className="page">{renderer(pageData, isAdmin, handleEdit)}</div> : <div>loading</div>
  }
}

Page.defaultProps = {
  isAdmin: false,
  handleEdit: null,
}

Page.propTypes = {
  isAdmin: PropTypes.bool,
  handleEdit: PropTypes.func,
  match: PropTypes.shape({
    path: PropTypes.string,
  }).isRequired,
}

export default Page
