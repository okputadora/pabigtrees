import { Component } from 'react'
import PropTypes from 'prop-types'
import * as API from '@/api/page'

// @TODO FETCH THIS INFORMATION
const paths = {
  '/': '2',
  measurement: '1',
}

class PageData extends Component {
  state = {
    data: null,
  }

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
    console.log({ data })
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
