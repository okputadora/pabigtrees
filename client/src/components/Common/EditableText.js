import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'

import { EditableText as BPEditableText } from '@blueprintjs/core'

const EditableText = ({ text, handleEdit, multiline }) => {
  const inputEl = useRef(null)
  const [isEditing, toggleIsEditing] = useState(false)
  console.log({ text })
  return (
    <BPEditableText
      ref={inputEl}
      alwaysRenderInput
      onEdit={() => toggleIsEditing(true)}
      defaultValue={text}
      onConfirm={(newText) => { toggleIsEditing(false); handleEdit(newText) }}
      multiline={multiline}
      className={isEditing && 'editor'}
    />
  )
}

EditableText.defaultProps = {
  multiline: false,
}

EditableText.propTypes = {
  text: PropTypes.string.isRequired,
  handleEdit: PropTypes.func.isRequired,
  multiline: PropTypes.bool,
}

export default EditableText
