/* eslint-disable react/no-did-update-set-state */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Select } from '@blueprintjs/select'
import { Checkbox, Tooltip } from '@blueprintjs/core'
// import SearchField from '@/components/Forms/SearchField'
import './filters.scss'

class Filters extends Component {
  state = {
    filteredSpecies: this.props.species || [],
  }

  componentDidUpdate({ filters: { activeGenus: prevActiveGenus } }) {
    const { filters: { activeGenus }, species, setFilter } = this.props
    if (prevActiveGenus.id !== activeGenus.id) {
      setFilter({ activeSpecies: { id: 'All', name: 'All' } })
      if (activeGenus === 'All') {
        this.setState({ filteredSpecies: species })
      } else {
        const updatedSpecies = species.filter((s) => s.genusId === activeGenus.id)
        this.setState({ filteredSpecies: updatedSpecies })
      }
    }
  }

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

  selectCounty = (activeCounty) => this.props.setFilter({ activeCounty })

  toggleMultiStemmed = () => this.props.setFilter({ isMultiStemmedIncluded: !this.props.filters.isMultiStemmedIncluded })

  toggleTallest = () => this.props.setFilter({ isTallestOfSpecies: !this.props.filters.isTallestOfSpecies })

  toggleChamp = () => this.props.setFilter({ isNationalChamp: !this.props.filters.isNationalChamp })

  render() {
    const {
      genera,
      species,
      counties,
      filters: {
        activeGenus,
        activeSpecies,
        activeCounty,
        isMultiStemmedIncluded,
        isTallestOfSpecies,
        isNationalChamp,
      },
      isShowingMap,
      toggleShowMap,
    } = this.props
    const { filteredSpecies } = this.state
    return (
      <div>
        <div className="filters">
          <div className="filters-title">Filters</div>
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
                  items={filteredSpecies || species}
                  itemPredicate={this.filterItems}
                  itemRenderer={this.renderItem}
                  onItemSelect={this.selectSpecies}
                >
                  <div className="filter-item">{activeSpecies.name}</div>
                </Select>
              </div>
            </div>
            <div className="filter-dropdown-container">
              <div>Counties</div>
              <div className="filter-dropdown">
                <Select
                  items={counties}
                  itemPredicate={this.filterItems}
                  itemRenderer={this.renderItem}
                  onItemSelect={this.selectCounty}
                >
                  <div className="filter-item">{activeCounty.name}</div>
                </Select>
              </div>
            </div>
          </div>
          <div className="filter-additional">
            <Checkbox checked={isMultiStemmedIncluded} onChange={this.toggleMultiStemmed}>
              <Tooltip content="Multi-stemmed trees cannot be National Champs">
                <strong>Include Multi-Stemmed Trees</strong>
              </Tooltip>
            </Checkbox>
            <Checkbox checked={isTallestOfSpecies} onChange={this.toggleTallest}>
              <strong>Only Show Tallest of Each Species</strong>
            </Checkbox>
            <Checkbox checked={isNationalChamp} onChange={this.toggleChamp}>
              <strong>Only Show National Champs</strong>
            </Checkbox>
          </div>
          <button type="button" onClick={toggleShowMap}>
            {isShowingMap
              ? (
                <span>
                  <i className="fas fa-table" />
                  {' '}
                  Show Table
                </span>
              )
              : (
                <span>
                  <i className="fas fa-map-marked-alt" />
                  {' '}
                  Show Map
                </span>
              )}
          </button>
        </div>
      </div>
    )
  }
}

const listItemPropType = PropTypes.shape({
  name: PropTypes.string.isRequired,
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
}).isRequired

Filters.propTypes = {
  filters: PropTypes.shape({
    keyword: PropTypes.string,
    activeSpecies: listItemPropType,
    activeGenus: listItemPropType,
    activeCounty: listItemPropType,
    counties: PropTypes.arrayOf(PropTypes.shape({})),
    isMultiStemmedIncluded: PropTypes.bool,
    isTallestOfSpecies: PropTypes.bool,
    isNationalChamp: PropTypes.bool,
  }).isRequired,
  species: PropTypes.arrayOf(listItemPropType).isRequired,
  genera: PropTypes.arrayOf(listItemPropType).isRequired,
  counties: PropTypes.arrayOf(listItemPropType).isRequired,
  setFilter: PropTypes.func.isRequired,
  isShowingMap: PropTypes.bool.isRequired,
  toggleShowMap: PropTypes.func.isRequired,
}

export default Filters
