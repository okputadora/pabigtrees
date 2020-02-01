import React from 'react'
import PropTypes from 'prop-types'
import { useField } from 'formik'

import './inputField.scss'

const InputField = ({ name, labelProps }) => {
  const [field] = useField(name)
  return (
    <div className="inputField-container">
      <div className="inputField-label">{labelProps.label}</div>
      <input className="inputField-input" {...field} />
    </div>
  )
}

InputField.propTypes = {
  name: PropTypes.string.isRequired,
  labelProps: PropTypes.shape({
    label: PropTypes.string.isRequired,
  }).isRequired,
}
export default InputField
