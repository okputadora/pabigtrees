import React, { useState } from 'react'
import PropTypes from 'prop-types'

import EditableText from './EditableText'
import './image.scss'

const AdminImage = ({
  src, alt, text, handleEdit,
}) => {
  const [isEditingSrc, toggleEditSrc] = useState(false)
  return (
    <div className="image-container">
      {!isEditingSrc
        ? <img className="image-image" src={src} alt={text.substring(0, text.indexOf('.'))} onClick={() => toggleEditSrc(true)} />
        : <EditableText text={src} handleEdit={(editedSrc) => { toggleEditSrc(false); handleEdit(editedSrc, 'src') }} />}
      <div className="image-text"><EditableText multiline text={text} handleEdit={(editedText) => handleEdit(editedText, 'text')} /></div>
    </div>
  )
}

AdminImage.defaultProps = {
  text: '',
  handleEdit: () => { },
}

AdminImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  text: PropTypes.string,
  handleEdit: PropTypes.func,
}

export default AdminImage
