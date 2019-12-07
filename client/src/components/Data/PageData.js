import { Component } from 'react'
import PropTypes from 'prop-types'
import * as API from '@/api/page'

// @TODO FETCH THIS INFORMATION
const paths = {
  '/': '5de12e6538a99e3154370d02',
  measurement: '5de12ed038a99e3154370d03',
}

class PageData extends Component {
  state = {
    data: null,
  }

  // @TODO data fetching should be moved out of here to a HOC
  componentDidMount() {
    this.fetchPage()
  }

  componentDidUpdate(prevProps) {
    const { match: { params: { pathName: prevPathName = '/' } } } = prevProps
    const { match: { params: { pathName = '/' } } } = this.props
    if (prevPathName !== pathName) {
      this.fetchPage()
    }
  }

  async fetchPage() {
    const { match: { params: { pathName = '/' } } } = this.props
    const id = paths[pathName]
    const { data } = await API.getPageData(id)
    this.setState({ data })
  }

  render() {
    const { children } = this.props
    const { data } = this.state
    return children({ data, ...this.props })
  }
}

PageData.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      pathName: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  children: PropTypes.func.isRequired,
}

export default PageData
