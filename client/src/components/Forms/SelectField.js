import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import { Select } from '@blueprintjs/select'
import { useFormikContext } from 'formik'

import './inputField.scss'

const SelectField = ({
  activeItem: activeItemProp,
  name: fieldName,
  items,
  handleSelect,
  labelProps,
}) => {
  const [activeItem, setActiveItem] = useState(activeItemProp)
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
    // console.log(setFieldValue(fieldName).toString())
    setFieldValue(fieldName, item.id)
    if (handleSelect) handleSelect(item)
  }

  const createItem = (query) => {
    console.log(query)
    return { name: query }
  }

  const createNewItemRenderer = (newItem, active, handleClick) => {
    console.log({ newItem, active, handleClick })
    return (
      <button onClick={handleClick} type="button">
        <i className="fas fa-plus select-field-icon" />
        <span>{newItem}</span>
      </button>
    )
  }
  return (
    <div className="inputField-container">
      <div className="inputField-label">{labelProps.label}</div>
      <Select
        items={items}
        itemPredicate={filterItems}
        itemRenderer={renderItem}
        onItemSelect={selectItem}
        createNewItemFromQuery={createItem}
        createNewItemRenderer={createNewItemRenderer}
        className="inputField-input select-field"
      >
        <div className="select-activeItem">{activeItem.name || `Click to select a ${labelProps.label}`}</div>
      </Select>
    </div>
  )
}

SelectField.defaultProps = {
  handleSelect: null,
  activeItem: {},
}

SelectField.propTypes = {
  activeItem: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
  items: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  })).isRequired,
  handleSelect: PropTypes.func,
  labelProps: PropTypes.shape({
    label: PropTypes.string.isRequired,
  }).isRequired,
  name: PropTypes.string.isRequired,
}

export default SelectField
