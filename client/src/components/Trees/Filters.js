/* eslint-disable react/destructuring-assignment */
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Formik, Form } from 'formik'
import { Select } from '@blueprintjs/select'

import SearchField from '@/components/Forms/SearchField'
import './filters.scss'

class Filters extends PureComponent {
  renderItem = ({ name, id }, { handleClick, modifiers }) => {
    if (!modifiers.matchesPredicate) {
      return null
    }
    return <div key={id} id={id} onClick={handleClick} tabIndex={0} onKeyPress={handleClick} role="button">{name}</div>
  }

  // Just so you dont get confused later...we're filtering the list of species/genus here...not the actual tree data.
  // This is when the user types in the search box in one of the dropdown filters
  filterItems = (query, { name }) => name.toLowerCase().indexOf(query.toLowerCase()) >= 0

  selectGenus = (activeGenus) => this.props.setFilter({ activeGenus })

  selectSpecies = (activeSpecies) => this.props.setFilter({ activeSpecies })

  render() {
    const {
      genera,
      species,
      filters: { activeGenus, activeSpecies, keyword },
    } = this.props
    return (
      <>
        <div className="filters">
          <div>filters</div>
          <div className="dropdowns">
            <div className="filter-dropdown-container">
              <div>Genus</div>
              <div className="filter-dropdown">
                <Select
                  items={genera}
                  itemPredicate={this.filterItems}
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
                  itemPredicate={this.filterItems}
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
      </>
    )
  }
}

const listItemPropType = PropTypes.shape({
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
}).isRequired

Filters.propTypes = {
  filters: PropTypes.shape({
    keyword: PropTypes.string,
    activeSpecies: listItemPropType,
    activeGenus: listItemPropType,
  }).isRequired,
  species: PropTypes.arrayOf(listItemPropType).isRequired,
  genera: PropTypes.arrayOf(listItemPropType).isRequired,
  setFilter: PropTypes.func.isRequired,
}

export default Filters
