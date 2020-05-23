import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { useField } from 'formik'

import './inputField.scss'

const InputField = ({ name, labelProps, inputProps }) => {
  const [field, { error, touched }] = useField(name)
  const labelClasses = classNames({
    'inputField-label': true,
    'inputField-label-error': error && touched,
  })
  if (name === 'species') {
    console.log(field)
  }
  return (
    <div>
      <div className="inputField-container">
        <div className={labelClasses}>
          <span>{labelProps.label}</span>
          <span>{field.isRequired && '*'}</span>
        </div>
        {inputProps.textArea
          ? <textarea className="inputField-input_textArea" {...field} value={field.value || ''} />
          : <input className="inputField-input" {...field} value={field.value || ''} />}
      </div>
      {error && touched && <div className="form-error">{error}</div>}
    </div>
  )
}


InputField.defaultProps = {
  inputProps: {},
}

InputField.propTypes = {
  name: PropTypes.string.isRequired,
  labelProps: PropTypes.shape({
    label: PropTypes.string.isRequired,
  }).isRequired,
  inputProps: PropTypes.shape({ textArea: PropTypes.bool }),
}
export default InputField
