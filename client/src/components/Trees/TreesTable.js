/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Tree from './Tree'
import * as API from '@/api/tree'
import Filters from './Filters'
import Table from './Table'
import { formatData } from '@/utils/tree'
import './trees.scss'

const MAP_URL = 'https://www.google.com/maps/d/embed?mid=1La6-BnwentXnVHErI39FQrIjyaroGVu1'
// @TODO Move this to utils
const formatTableData = (rawData) => rawData.map((row) => (
  {
    county: row.county ? row.county.county : null,
    genus: row.species && row.species.genus && row.species.genus.t_genus,
    species: row.species && row.species.t_species,
    commonName: row.species && row.species.t_common,
    height: row.i_height_feet,
    spread: row.i_spread_feet,
    circumference: row.i_circum_inches,
    points: row.i_points,
    address: row.t_address,
    'additional info': [row.f_national_champ, row.f_tallest],
    id: row.id,
  }
))

const initialFilters = {
  activeGenus: { name: 'All', id: 'All' },
  activeSpecies: { name: 'All', id: 'All' },
  activeCounty: { name: 'All', id: 'All' },
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
    counties: [initialFilters.activeCounty],
    columns: [
      { name: 'county', id: 'county' },
      { name: 'genus', id: 'genus' },
      { name: 'species', id: 'species' },
      { name: 'common name', id: 'commonName' },
      { name: 'height (ft)', id: 'height' },
      { name: 'spread (ft)', id: 'spread' },
      { name: 'circumference (in)', id: 'circumference' },
      { name: 'points', id: 'points' },
      { name: 'address', id: 'address' },
      { name: 'additional info', id: 'additionalInfo' },
    ],
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
    const { isAdmin } = this.props
    try {
      const { data: { trees, count } } = await API.getTrees(filters, isAdmin)
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

  // @TODO Rename fetchFilterListss
  fetchSpeciesAndGenusLists = async () => {
    try {
      const { filters } = this.state
      const { data: { species, genera, counties } } = await API.getSpeciesAndGenera(filters)
      this.setState({
        genera: [initialFilters.activeGenus, ...genera],
        species: [initialFilters.activeSpecies, ...species],
        counties: [initialFilters.activeCounty, ...counties],
      })
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
      counties,
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
              counties={counties}
              setFilter={this.setFilter}
              filters={filters}
              toggleShowMap={this.toggleShowMap}
              isShowingMap={isShowingMap}
            />
          )}
          {isShowingMap ? (
            <div className="map-container">
              <iframe title="map" src={MAP_URL} width="100%" height="600" />
            </div>
          )
            : tableData && (
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
      ) : data && <Tree tree={data.filter((t) => t.id === id)[0]} isAdmin={isAdmin} />
    )
  }
}

Trees.defaultProps = {
  isAdmin: false,
}

Trees.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  }).isRequired,
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
  location: PropTypes.shape({ pathname: PropTypes.string }).isRequired,
  isAdmin: PropTypes.bool,
}

export default Trees
