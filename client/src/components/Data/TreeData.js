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
      county: row.County ? row.County.county : null,
      genus: row.Species && row.Species.Genus && row.Species.Genus.t_genus,
      species: row.Species && row.Species.t_species,
      commonName: row.Species && row.Species.t_common,
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

  componentDidUpdate({ filters: prevFilters }) {
    const { filters } = this.props
    const updatedFilters = Object.keys(prevFilters).filter((key) => prevFilters[key] !== filters[key])
    if (updatedFilters.length > 0) {
      this.fetchPage(filters)
    }
  }

  async fetchPage(filters) {
    console.log({ filters })
    const { data } = await API.getTrees(filters)
    // format data
    console.log(data)
    const formattedData = formatData(data.trees)
    this.setState({ data: formattedData })
  }

  render() {
    const { children } = this.props
    const { data } = this.state
    console.log(data)
    return children({ data })
  }
}

TreeData.propTypes = {
  children: PropTypes.func.isRequired,
}

export default TreeData
