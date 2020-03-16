import React, { Component } from 'react'
import { Formik, Form } from 'formik'
import { Select } from '@blueprintjs/select'

import * as API from '@/api/tree'
import SearchField from '@/components/Forms/SearchField'
import './filters.scss'

const initialActiveGenera = { name: 'All', id: 'All' }
const initialActiveSpecies = { name: 'All', id: 'All' }
class Filters extends Component {
  state = {
    species: [],
    genera: [],
    filters: {
      activeSpecies: initialActiveSpecies,
      activeGenus: initialActiveGenera,
      keyword: '',
    },

  }

  async componentDidMount() {
    // get filters
    try {
      const { data: { species, genera } } = await API.getFilterLists()
      species.unshift(initialActiveSpecies)
      genera.unshift(initialActiveGenera)
      this.setState({
        species, genera, filters: { keyword: '', activeGenus: genera[0], activeSpecies: species[0] },
      })
    } catch (e) {
      console.log(e)
    }
  }

  handleSubmit = ({ keyword }) => this.setState({ keyword })

  renderItem = ({ name, id }, { handleClick, modifiers }) => {
    if (!modifiers.matchesPredicate) {
      return null
    }
    return <div key={id} id={id} onClick={handleClick} tabIndex={0} onKeyPress={handleClick} role="button">{name}</div>
  }

  // Just so you dont get confused later...we're filtering the list of filters here...not the actual tree data.
  // This is when the user types in the search box in one of the dropdown filters
  filterItems = (query, { name }) => {
    console.log({ query, name })
    return name.toLowerCase().indexOf(query.toLowerCase()) >= 0
  }

  selectGenus = (activeGenus) => this.setState(({ filters: prevFilters }) => ({ filters: { ...prevFilters, activeGenus } }))

  selectSpecies = (activeSpecies) => this.setState(({ filters: prevFilters }) => ({ filters: { ...prevFilters, activeSpecies } }))

  render() {
    const { children } = this.props
    const {
      keyword,
      genera,
      species,
      filters,
      filters: { activeGenus, activeSpecies },
    } = this.state
    console.log(activeGenus)
    return (
      <>
        <div className=" filters">
          <div>filters</div>
          <div className="dropdowns">
            <div className="filter-dropdown-container">
              <div>Genus</div>
              <div className="filter-dropdown">
                <Select
                  items={genera}
                  itemPredicate={this.filterGenus}
                  itemRenderer={this.renderItem}
                  onItemSelect={this.selectGenus}
                >
                  <div className="filter-item">{activeGenus.name}</div>
                </Select>
              </div>
            </div>
            <div className="filter-dropdown-container">
              <div>Species</div>
              <div className="filter-dropdown">
                <Select
                  items={species}
                  itemRenderer={this.renderItem}
                  onItemSelect={this.selectSpecies}
                >
                  <div className="filter-item">{activeSpecies.name}</div>
                </Select>
              </div>
            </div>
          </div>
          <Formik
            initialValues={{ keyword: keyword || '' }}
            enableReinitialize
            onSubmit={this.handleSubmit}
          >
            {() => (
              <Form>
                <SearchField name="keyword" />
                <button type="submit">Search</button>
              </Form>
            )}
          </Formik>
        </div>
        {children({ ...filters, activeGenus: activeGenus.id || 'All', activeSpecies: activeSpecies.id || 'All' })}
      </>
    )
  }
}

export default Filters
