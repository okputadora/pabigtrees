import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import { Select } from '@blueprintjs/select'
import { useFormikContext } from 'formik'

import './inputField.scss'

const SelectField = ({
  name: fieldName, items, handleSelect, labelProps,
}) => {
  const [activeItem, setActiveItem] = useState({})
  const { setFieldValue } = useFormikContext()
  const renderItem = useCallback(({ name, id }, { handleClick, modifiers }) => {
    if (!modifiers.matchesPredicate) {
      return null
    }
    return <div key={id} id={id} onClick={handleClick} tabIndex={0} onKeyPress={handleClick} role="button">{name}</div>
  }, [])

  // Just so you dont get confused later...we're filtering the list of species/genus here...not the actual tree data.
  // This is when the user types in the search box in one of the dropdown filters
  const filterItems = (query, { name }) => name.toLowerCase().indexOf(query.toLowerCase()) >= 0

  const selectItem = (item) => {
    setActiveItem(item)
    setFieldValue(fieldName)(item.id)
    if (handleSelect) handleSelect(item)
  }
  console.log(items)
  return (
    <div className="inputField-container">
      <div className="inputField-label">{labelProps.label}</div>
      <Select
        items={items}
        itemPredicate={filterItems}
        itemRenderer={renderItem}
        onItemSelect={selectItem}
        className="inputField-input select-field"
      >
        <div className="select-activeItem">{activeItem.name || `Click to select a ${fieldName}`}</div>
      </Select>
    </div>
  )
}

SelectField.defaultProps = {
  handleSelect: null,
}

SelectField.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  })).isRequired,
  handleSelect: PropTypes.func,
  name: PropTypes.string.isRequired,
}

export default SelectField
