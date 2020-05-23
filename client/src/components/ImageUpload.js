import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import { useDropzone } from 'react-dropzone'
import classNames from 'classnames'

const ImageUpload = ({ images: initialImages, upload, onUpload }) => {
  const [isUploading, setUploading] = useState(false)
  const [images, setImages] = useState(initialImages)
  const handleDrop = useCallback(async (files, rejectedFiles) => {
    if (rejectedFiles.length > 0) {
      alert('some files were rejected')
    }
    if (files) {
      if (files.length > 1) {
        alert('You\'re attempting to upload too many files. The limit is 1')
      }
      try {
        setUploading(true)
        const { data: uploadedFiles } = await upload(files)
        const newImages = images.concat(files.map((file, i) => Object.assign(file, {
          preview: URL.createObjectURL(file),
          imagePath: uploadedFiles[i],
        })))
        setImages(newImages)
        onUpload(newImages)
      } catch (err) {
        alert(err.message)
      } finally {
        setUploading(false)
      }
    }
  }, [images])

  const {
    getRootProps,
    getInputProps,
    isDragActive,
  } = useDropzone({ onDrop: handleDrop, accept: 'image/*' })
  const fileDropClasses = classNames({
    'nomination-fileDrop': true,
    'fileDrop-active': isDragActive,
  })
  return (
    <>
      <div className={fileDropClasses} {...getRootProps()}>
        {isUploading && (
          <div className="loading">
            <div className="loader">Loading...</div>
          </div>
        )}
        {images.length > 0 && (
          <div className="nomination-previewImages">
            {images.map((img) => <img className="nomination-previewImage" key={img.preview} src={img.preview} alt="preview" />)}
          </div>
        )}
        <input {...getInputProps()} />
        {
          isDragActive
            ? <p>Drop the images here ...</p>
            : <p>Drag an image or click to select from your file system</p>
        }
      </div>
    </>
  )
}

ImageUpload.defaultProps = {
  images: [],
  onUpload: null,
}

ImageUpload.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string),
  upload: PropTypes.func.isRequired,
  onUpload: PropTypes.func,
}
export default ImageUpload
