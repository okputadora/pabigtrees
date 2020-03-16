import { Component } from 'react'
import PropTypes from 'prop-types'
import * as API from '@/api/tree'

const formatData = (rawData) => {
  const formattedData = rawData.map((row) => {
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
  const columns = Object.keys(formattedData[0]).filter((key) => key !== 'id')
  const data = { columns, formattedData }

  return data
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
    const { data } = await API.getTrees(filters)
    const formattedData = formatData(data.trees)
    this.setState({ data: formattedData })
  }

  render() {
    const { children } = this.props
    const { data } = this.state
    console.log({ data })
    return children({ data })
  }
}

TreeData.defaultProps = {
  filters: {},
}

TreeData.propTypes = {
  children: PropTypes.func.isRequired,
  filters: PropTypes.shape({}),
}

export default TreeData
