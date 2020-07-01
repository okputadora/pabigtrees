/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Tree from './Tree'
import * as API from '@/api/tree'
import Filters from './Filters'
import Table from './Table'
import './trees.scss'

// @TODO Move this to utils
const formatTableData = (rawData) => rawData.map((row) => (
  {
    county: row.county ? row.county.county : null,
    genus: row.species && row.species.genus && row.species.genus.t_genus,
    species: row.species && row.species.t_species,
    commonName: row.species && row.species.t_common,
    points: row.i_points,
    address: row.t_address,
    'additional info': [row.f_national_champ, row.f_tallest],
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
    measuringTechnique: tree.k_technique,
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
  isMultiStemmedIncluded: true,
  isNationalChamp: false,
  isTallestOfSpecies: false,
}
class Trees extends Component {
  state = {
    species: [initialFilters.activeSpecies],
    genera: [initialFilters.activeGenus],
    columns: ['county', 'genus', 'species', 'common name', 'points', 'address', 'additional info'],
    data: null,
    tableData: null,
    filters: initialFilters,
    isShowingMap: false,
    count: 1800,
  }

  componentDidMount() {
    this.fetchTrees()
    this.fetchSpeciesAndGenusLists()
  }

  fetchTrees = async () => {
    const { filters } = this.state
    try {
      const { data: { trees, count } } = await API.getTrees(filters)
      this.setState({ tableData: formatTableData(trees), data: formatData(trees), count })
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
    this.setState((prevState) => ({ filters: { ...prevState.filters, ...updatedFilter, page: 1 } }), this.fetchTrees)
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

  getPrevPage = () => {
    this.setState((prevState) => ({ filters: { ...prevState.filters, page: prevState.filters.page - 1 } }), this.fetchTrees)
  }

  getPage = (pageIndex) => {
    this.setState((prevState) => ({ filters: { ...prevState.filters, page: pageIndex } }), this.fetchTrees)
  }

  goToTreePage = (id) => {
    const { history, location } = this.props
    history.push(`${location.pathname}/${id}`)
    // this.setState({ selectedTreeId: id })
  }

  toggleShowMap = () => this.setState((prevState) => ({ isShowingMap: !prevState.isShowingMap }))

  render() {
    const {
      tableData,
      isAdmin,
      data,
      species,
      genera,
      filters,
      columns,
      isShowingMap,
      count,
    } = this.state
    const { match: { params: { id } } } = this.props
    return (
      !id ? (
        <div className="tree-data-page">
          {species.length > 1 && (
            <Filters
              species={species}
              genera={genera}
              setFilter={this.setFilter}
              filters={filters}
              toggleShowMap={this.toggleShowMap}
              isShowingMap={isShowingMap}
            />
          )}
          {isShowingMap ? (
            <div className="map-container">
              <iframe title="map" src="https://www.google.com/maps/d/u/0/embed?mid=1YN9lv0OQQKbhT4QQEG2kiV7L0rHjsU6j&z=7" width="100%" height="600" />
            </div>
          )
            : (
              <Table
                columns={columns}
                tableData={tableData}
                filters={filters}
                count={count}
                getPage={this.getPage}
                getNextPage={this.getNextPage}
                getPrevPage={this.getPrevPage}
                goToTreePage={this.goToTreePage}
                setSortBy={this.setSortBy}
              />
            )}
        </div>
      ) : <Tree tree={data.filter((t) => t.id === id)[0]} isAdmin={isAdmin} />
    )
  }
}

Trees.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
  location: PropTypes.shape({ pathname: PropTypes.string }).isRequired,
}

export default Trees
