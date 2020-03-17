/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react'

// import TreeData from '@/components/Data/TreeData'
import * as API from '@/api/tree'
import Filters from './Filters'
import './trees.scss'

// @TODO Move this to utils
const formatData = (rawData) => rawData.map((row) => (
  {
    county: row.County ? row.County.county : null,
    genus: row.Species && row.Species.Genus && row.Species.Genus.t_genus,
    species: row.Species && row.Species.t_species,
    commonName: row.Species && row.Species.t_common,
    points: row.i_points,
    address: row.t_address,
    id: row.id,
  }
))

const initialFilters = {
  activeGenus: { name: 'All', id: 'All' },
  activeSpecies: { name: 'All', id: 'All' },
  keyword: '',
}
class Trees extends Component {
  state = {
    sortField: 'points',
    sortOrder: 'DESC',
    species: [initialFilters.activeSpecies],
    genera: [initialFilters.activeGenus],
    columns: ['county', 'genus', 'species', 'common name', 'points', 'address'],
    data: null,
    filters: initialFilters,
  }

  componentDidMount() {
    this.fetchTrees()
    this.fetchSpeciesAndGenusLists()
  }

  fetchTrees = async () => {
    const { filters } = this.state
    try {
      const { data: { trees, filters: newFilters = initialFilters } } = await API.getTrees(filters)
      const formattedData = formatData(trees)
      console.log(formattedData)
      console.log(Array.isArray(formattedData))
      this.setState({ data: formattedData })
    } catch (e) {
      console.log(e)
    }
  }

  setSortBy = (e) => {
    e.persist()
    this.setState((prevState) => {
      const sameField = prevState.sortField === e.target.id
      const sortOrder = sameField && prevState.sortOrder === 'DESC' ? 'ASC' : 'DESC'
      return {
        ...prevState,
        sortField: e.target.id,
        sortOrder,
      }
    })
  }

  setFilter = (updatedFilter) => {
    let shouldUpdateSpeciesGenusLists = false
    if (updatedFilter.activeSpecies || updatedFilter.activeGenus) {
      shouldUpdateSpeciesGenusLists = true
    }
    this.setState((prevState) => ({ filters: { ...prevState.filters, ...updatedFilter } }), () => {
      // this.fetchTrees()
      if (shouldUpdateSpeciesGenusLists) this.fetchSpeciesAndGenusLists()
    })
  }

  fetchSpeciesAndGenusLists = async () => {
    try {
      const { filters } = this.state
      const { data: { species, genera } } = await API.getSpeciesAndGenera(filters)
      this.setState({ genera: [initialFilters.activeGenus, ...genera], species: [initialFilters.activeSpecies, ...species] })
    } catch (e) {
      // dosplay error
    }
  }

  render() {
    const {
      data, species, genera, filters, columns,
    } = this.state
    return (
      <div className="tree-data-page">
        <Filters species={species} genera={genera} setFilter={this.setFilter} filters={filters} />
        <div className="tree-data-container">
          <table className="table">
            <thead><tr>{columns.map((col) => <th onClick={this.setSortBy} id={col} key={col} className="table-header">{col}</th>)}</tr></thead>
            <tbody>
              {data ? data.map((row, i) => (
                <tr className={`row ${i % 2 === 0 ? 'even' : 'odd'}`} key={row.id}>
                  {Object.keys(row).filter((k) => k !== 'id').map((key) => <td key={`${row.id}=${row[key]}`} className="cell">{row[key]}</td>)}
                </tr>
              )) : new Array(20).fill('ROW').map((row, i) => (
                <tr key={i} className={`row ${i % 2 === 0 ? 'even' : 'odd'}`}>
                  {new Array(7).fill('CELL').map((key, x) => <td key={`${i}${x}`} className="cell">{row[key]}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

export default Trees
