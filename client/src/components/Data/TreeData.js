import { Component } from 'react'
import PropTypes from 'prop-types'
import * as API from '@/api/tree'

// @TODO FETCH THIS INFORMATION
const paths = {
  '': '5de12e6538a99e3154370d02',
  measurement: '5de12ed038a99e3154370d03',
}

const formatData = (rawData) => {
  const data = rawData.map((row) => {
    const formattedRow = {
      county: row.County.county,
      genus: row.Species.Genus.t_genus,
      species: row.Species.t_species,
      commonName: row.Species.t_common,
      points: row.i_points,
      address: row.t_address,
      id: row.id,
    }
    return formattedRow
  })
  const columns = Object.keys(data[0])
  const formattedData = { columns, data }

  return formattedData
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
    // format data
    const formattedData = formatData(data.trees)
    this.setState({ data: formattedData })
  }

  render() {
    const { children } = this.props
    const { data } = this.state
    return children({ data })
  }
}

TreeData.propTypes = {
  children: PropTypes.func.isRequired,
}

export default TreeData
