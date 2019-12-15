import React from 'react'
import { useField } from 'formik'

const SearchField = (props) => {
  const { name } = props
  const [field, { error, touched }] = useField(name)
  return (
    <input {...field} />
  )
}

export default SearchField
