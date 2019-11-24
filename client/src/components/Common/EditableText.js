import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { EditableText as BPEditableText } from '@blueprintjs/core'

const EditableText = ({ text, handleEdit }) => {
  const [isEditing, toggleIsEditing] = useState(false)
  return (
    <BPEditableText
      isEditing={isEditing}
      onEdit={() => toggleIsEditing(true)}
      className={isEditing && 'editor'}
      defaultValue={text}
      onConfirm={(newText) => { toggleIsEditing(false); handleEdit(newText) }}
    />
  )
}

EditableText.propTypes = {
  text: PropTypes.string.isRequired,
  handleEdit: PropTypes.func.isRequired,
}

export default EditableText
