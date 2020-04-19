import React, { useCallback, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Select } from '@blueprintjs/select'
import { useFormikContext } from 'formik'
import classNames from 'classnames'

import './inputField.scss'

const SelectField = ({
  activeItem: activeItemProp,
  name: fieldName,
  items,
  handleSelect,
  labelProps,
  canAdd,
}) => {
  const [activeItem, setActiveItem] = useState(activeItemProp)
  const { setFieldValue, errors, touched } = useFormikContext()
  const error = errors[fieldName]
  const isTouched = touched[fieldName]
  useEffect(() => {
    setActiveItem(activeItemProp)
    if (activeItemProp.id) setFieldValue(fieldName, activeItemProp.id)
  }, [activeItemProp.id, fieldName])

  const renderItem = useCallback(({ name, id }, { handleClick, modifiers }) => {
    if (!modifiers.matchesPredicate) {
      return null
    }
    return <div key={id} id={id} onClick={handleClick} tabIndex={0} onKeyPress={handleClick} role="button">{name}</div>
  }, [])

  const filterItems = (query, { name }) => name.toLowerCase().indexOf(query.toLowerCase()) >= 0

  const selectItem = (item) => {
    setActiveItem(item)
    setFieldValue(fieldName, item.id === 'NEW' ? item.name : item.id)
    if (handleSelect) handleSelect(item)
  }
  if (fieldName === 'county') {
    console.log({ activeItem })
  }

  const createItem = (query) => ({ name: query, id: 'NEW' })

  const labelClasses = classNames({
    'inputField-label': true,
    'inputField-label-error': error && isTouched,
  })

  const createNewItemRenderer = (newItem, active, handleClick) => (
    <button onClick={handleClick} type="button">
      <i className="fas fa-plus select-field-icon" />
      <span>{newItem}</span>
    </button>
  )
  return (
    <div>
      <div className="inputField-container">
        <div className={labelClasses}>{labelProps.label}</div>
        <div className="inputField-input select-field">
          <Select
            items={items}
            itemPredicate={filterItems}
            itemRenderer={renderItem}
            onItemSelect={selectItem}
            createNewItemFromQuery={createItem}
            createNewItemRenderer={canAdd && createNewItemRenderer}
          >
            <div className="select-activeItem">{activeItem.name || `Click to select a ${labelProps.label}`}</div>
          </Select>
          {activeItem.id && <i className="fas fa-times" role="button" onClick={() => selectItem({})} />}
        </div>
      </div>
      {isTouched && error && <div className="form-error">{error}</div>}
    </div>
  )
}

SelectField.defaultProps = {
  handleSelect: null,
  activeItem: {},
  canAdd: false,
}

SelectField.propTypes = {
  activeItem: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
  canAdd: PropTypes.bool,
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
