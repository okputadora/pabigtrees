/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react'

import Tree from './Tree'
import * as API from '@/api/tree'
import Filters from './Filters'
import './trees.scss'

// @TODO Move this to utils
const formatTableData = (rawData) => rawData.map((row) => (
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

const formatData = (rawData) => rawData.map((tree) => (
  {
    county: tree.County ? tree.County.county : null,
    genus: tree.Species && tree.Species.Genus && tree.Species.Genus.t_genus,
    species: tree.Species && tree.Species.t_species,
    commonName: tree.Species && tree.Species.t_common,
    points: tree.i_points,
    address: tree.t_address,
    id: tree.id,
    circumference: tree.i_circum_inchs,
    isMultiStemmed: tree.f_multistemmed === 1,
    spread: tree.i_spread_feet,
    height: tree.i_height_feet,
    measuringCrew: tree.t_measuring_crew,
    originalNominator: tree.t_original_nominator,
    comments: tree.t_comments,
    measuringTechnique: tree.k_techniques,
    yearNominated: tree.d_nominated,
    yearLastMeasured: tree.d_last_measured,
  }
))

const initialFilters = {
  activeGenus: { name: 'All', id: 'All' },
  activeSpecies: { name: 'All', id: 'All' },
  keyword: '',
  sortField: 'points',
  sortOrder: 'DESC',
  page: 1,
  pageSize: 20,
}
class Trees extends Component {
  state = {
    species: [initialFilters.activeSpecies],
    genera: [initialFilters.activeGenus],
    columns: ['county', 'genus', 'species', 'common name', 'points', 'address'],
    data: null,
    tableData: null,
    filters: initialFilters,
    selectedTreeId: null,
  }

  componentDidMount() {
    this.fetchTrees()
    this.fetchSpeciesAndGenusLists()
  }

  fetchTrees = async () => {
    const { filters } = this.state
    try {
      const { data: { trees } } = await API.getTrees(filters)
      this.setState({ tableData: formatTableData(trees), data: formatData(trees) })
    } catch (e) {
      alert('Something went wrong! Try again in a few seconds')
    }
  }

  setSortBy = (e) => {
    e.persist()
    this.setState((prevState) => {
      const sameField = prevState.filters.sortField.toLowerCase() === e.target.id.toLowerCase()
      const sortOrder = sameField && prevState.filters.sortOrder === 'DESC' ? 'ASC' : 'DESC'
      return {
        filters: {
          ...prevState.filters,
          sortField: e.target.id,
          sortOrder,
        },
      }
    }, () => this.fetchTrees())
  }

  setFilter = (updatedFilter) => {
    this.setState((prevState) => ({ filters: { ...prevState.filters, ...updatedFilter, page: 1 } }), () => {
      this.fetchTrees()
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

  getNextPage = () => {
    this.setState((prevState) => ({ filters: { ...prevState.filters, page: prevState.filters.page + 1 } }), this.fetchTrees)
  }

  goToTreePage = (id) => {
    this.setState({ selectedTreeId: id })
  }

  render() {
    const {
      tableData,
      data, species, genera, filters, columns, selectedTreeId,
    } = this.state
    return (
      !selectedTreeId ? (
        <div className="tree-data-page">
          {species.length > 1 && <Filters species={species} genera={genera} setFilter={this.setFilter} filters={filters} />}
          <div className="tree-data-container">
            <table className="table">
              <thead><tr>{columns.map((col) => <th onClick={this.setSortBy} id={col} key={col} className="table-header">{col}</th>)}</tr></thead>
              <tbody>
                {tableData ? tableData.map((row, i) => (
                  <tr onClick={() => this.goToTreePage(row.id)} className={`row ${i % 2 === 0 ? 'even' : 'odd'}`} key={row.id}>
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
          <div className="tree-data-pagination">
            {filters.page > 1 && <button onClick={this.getPrevPage}>Prev</button>}
            {new Array(10).fill().map((_, i) => (
              <button
                key={filters.page + i}
                onClick={this.getPage}
                id={filters.page + i}
              >
                {filters.page + i}
              </button>
            ))}
            <button onClick={this.getNextPage}>Next</button>
          </div>
        </div>
      ) : <Tree tree={data.filter((t) => t.id === selectedTreeId)[0]} />
    )
  }
}

export default Trees
