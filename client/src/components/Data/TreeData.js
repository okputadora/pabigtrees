import { Component } from 'react'
import PropTypes from 'prop-types'
import * as API from '@/api/tree'

// @TODO FETCH THIS INFORMATION
const paths = {
  '': '5de12e6538a99e3154370d02',
  measurement: '5de12ed038a99e3154370d03',
}

class TreeData extends Component {
  state = {
    data: null,
  }

  // @TODO data fetching should be moved out of here to a HOC
  componentDidMount() {
    this.fetchPage()
  }

  componentDidUpdate(prevProps) {
    // const { match: { params: { pathName } } } = this.props
    // if (prevProps.match.params.pathName !== pathName) {
    //   this.fetchPage()
    // }
  }

  async fetchPage() {
    const { data } = await API.getTrees()
    console.log(data)
    this.setState({ data })
  }

  render() {
    const { children } = this.props
    const { data } = this.state
    return children({ data: data && data.trees, ...this.props })
  }
}

TreeData.propTypes = {
  children: PropTypes.func.isRequired,
}

export default TreeData
