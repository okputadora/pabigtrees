import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { useField } from 'formik'

import './inputField.scss'

const InputField = ({ name, labelProps }) => {
  const [field, { error, touched }] = useField(name)
  const labelClasses = classNames({
    'inputField-label': true,
    'inputField-label-error': error && touched,
  })
  return (
    <div>
      <div className="inputField-container">
        <div className={labelClasses}>
          <span>{labelProps.label}</span>
          <span>{field.isRequired && '*'}</span>
        </div>
        <input className="inputField-input" {...field} />
      </div>
      {error && touched && <div className="form-error">{error}</div>}
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
