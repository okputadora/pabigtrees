import React, { Component } from 'react'
import { Formik, Form } from 'formik'
import { Select } from '@blueprintjs/select'

import * as API from '@/api/tree'
import SearchField from '@/components/Forms/SearchField'
import './filters.scss'

class Filters extends Component {
  state = {
    species: [],
    genera: [],
    filters: {
      activeSpecies: 'All',
      activeGenus: 'All',
      keyword: '',
    },

  }

  async componentDidMount() {
    // get filters
    try {
      const { data: { species, genera } } = await API.getFilterLists()
      species.unshift('All')
      genera.unshift('All')
      this.setState({
        species, genera, filters: { keyword: '', activeGenus: genera[0], activeSpecies: species[0] },
      })
    } catch (e) {
      console.log(e)
    }
  }

  handleSubmit = ({ keyword }) => this.setState({ keyword })


  renderItem = (name, { handleClick }) => <div key={name} onClick={handleClick} tabIndex={0} onKeyPress={handleClick} role="button">{name}</div>

  selectGenus = (activeGenus) => this.setState(({ filters: prevFilters }) => ({ filters: { ...prevFilters, activeGenus } }))

  render() {
    const { children } = this.props
    const {
      keyword,
      genera,
      species,
      filters,
      filters: { activeGenus, activeSpecies },
    } = this.state
    console.log({ activeGenus })
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
                  itemRenderer={this.renderItem}
                  onItemSelect={this.selectGenus}
                >
                  <div className="filter-item">{activeGenus}</div>
                </Select>
              </div>
            </div>
            <div className="filter-dropdown-container">
              <div>Species</div>
              <div className="filter-dropdown">
                <Select
                  items={species}
                  itemRenderer={this.renderItem}
                  onItemSelect={this.selectItem}
                >
                  <div className="filter-item">{activeSpecies}</div>
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
        {children({ filters })}
      </>
    )
  }
}

export default Filters
