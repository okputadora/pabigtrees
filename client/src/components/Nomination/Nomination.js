import React, { useCallback, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Formik, useFormikContext } from 'formik'
import { useDropzone } from 'react-dropzone'
import { Checkbox } from '@blueprintjs/core'
import classNames from 'classnames'

import {
  nominateTree, uploadFiles, confirmNomination, removeImage,
} from '@/api/nomination'

import { getSpeciesAndGenera } from '@/api/tree'
import Form from '@/components/Forms/Form'
import InputField from '@/components/Forms/InputField'
import SelectField from '@/components/Forms/SelectField'
import { initialValues } from './formData'

import './nomination.scss'

const AdminReview = () => {
  const { values } = useFormikContext()
  const [isPublic, setIsPublic] = useState(false)
  const handleSubmit = useCallback(async () => {
    try {
      await confirmNomination({ ...values, isPublic, isApproved: true })
    } catch (e) {
      alert('something went wrong!')
    }
  }, [values])

  const deleteImage = useCallback(async (imagePath) => {
    const shouldDelete = window.confirm('Are you sure you want to remove this image? This action cannot be undone, the image will be lost forever')
    if (shouldDelete) {
      try {
        await removeImage(imagePath)
      } catch (e) {
        alert('something went wrong!')
      }
    }
  }, [])
  return (
    <>
      <div className="nomination-checkbox"><Checkbox labelElement={<span className="white">public</span>} checked={isPublic} onChange={() => setIsPublic(!isPublic)} /></div>
      <div className="nomination-review-previewImages">
        {values.imagePaths.map((img) => (
          <div className="nomination-previewContainer">
            <a href={`http://localhost:4000/uploads/${img}`} target="_blank" rel="noopener noreferrer">
              <img className="nomination-previewImage" key={img} src={`http://localhost:4000/uploads/${img}`} alt="preview" />
            </a>
            <button type="button" className="nomination-deleteImage" onClick={deleteImage}>X</button>
          </div>
        ))}
      </div>
      <button className="nomination-submit" type="button" onClick={handleSubmit}>Approve Nomination</button>
    </>
  )
}
const UserNomination = ({ images, setImages }) => {
  const [isUploading, setUploading] = useState(false)
  const { submitForm } = useFormikContext()
  const handleDrop = useCallback(async (files, rejectedFiles) => {
    if (rejectedFiles.length > 0) {
      alert('some files were rejected')
    }
    if (files) {
      if (files.length > 5) {
        alert('You\'re attempting to upload too many files. The limit is 5')
      }
      try {
        setUploading(true)
        const { data: uploadedFiles } = await uploadFiles(files)
        setImages(images.concat(files.map((file, i) => Object.assign(file, {
          preview: URL.createObjectURL(file),
          imagePath: uploadedFiles[i],
        }))))
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
            : <p>Drag up to 5 images here, or click to select from your file system</p>
        }
      </div>
      <button className="nomination-submit" type="button" onClick={submitForm}>submit</button>
    </>
  )
}

const Nomination = ({ initValues, isAdminReview }) => {
  const [images, setImages] = useState([])
  const [{ species, genera }, setTreeLists] = useState({})

  useEffect(() => {
    (async () => {
      const { data: { species: speciesList, genera: generaList, commonNames } } = await getSpeciesAndGenera()
      setTreeLists({ species: speciesList, genera: generaList })
    })()
  }, [])

  const handleSubmit = useCallback(async (values, { resetForm }) => {
    try {
      const formValues = { ...values, imagePaths: images.map((img) => img.imagePath) }
      await nominateTree(formValues)
      alert('Your nomination has been submitted!')
      resetForm()
    } catch (err) {
      alert(err)
    }
  }, [images])
  console.log({ species })
  return (
    <div className="nomination-container">
      <Formik
        onSubmit={handleSubmit}
        initialValues={initValues}
      >
        {() => (
          <Form>
            <InputField
              name="commonName"
              labelProps={{ label: 'Common Name' }}
            />
            <InputField
              name="genus"
              labelProps={{ label: 'Genus' }}
            />
            {species && (
              <SelectField
                name="species"
                items={species}
                labelProps={{ label: 'Species' }}
              />
            )}
            <InputField
              name="county"
              labelProps={{ label: 'County' }}
            />
            <InputField
              name="nominator"
              labelProps={{ label: 'Nominator' }}
            />
            <InputField
              name="address"
              labelProps={{ label: 'Address' }}
            />
            <InputField
              name="phone"
              labelProps={{ label: 'Phone' }}
            />
            <InputField
              name="email"
              labelProps={{ label: 'Email' }}
            />
            <InputField
              name="landOwner"
              labelProps={{ label: 'Land Owner' }}
            />
            <InputField
              name="ownerAddress"
              labelProps={{ label: 'Owner Address (if different)' }}
            />
            <InputField
              name="ownerPhone"
              labelProps={{ label: 'Owner Phone (if different)' }}
            />
            <InputField
              name="ownerEmail"
              labelProps={{ label: 'Owner Email (if different)' }}
            />
            <InputField
              name="locationOfTree"
              labelProps={{ label: 'Location of tree' }}
            />
            <InputField
              name="lon"
              labelProps={{ label: 'longitude' }}
            />
            <InputField
              name="lat"
              labelProps={{ label: 'latitude' }}
            />
            <InputField
              name="measuringCrew"
              labelProps={{ label: 'Measuring Crew' }}
            />
            <InputField
              name="dateMeasured"
              labelProps={{ label: 'Date Measured' }}
            />

            -----
            <InputField
              name="circumference"
              labelProps={{ label: 'Circumference (inches)' }}
            />
            <InputField
              name="height"
              labelProps={{ label: 'Height (feet)' }}
            />
            <InputField
              name="spread1"
              labelProps={{ label: 'Spread (first measurement' }}
            />
            <InputField
              name="spread2"
              labelProps={{ label: 'Spread (second measurement' }}
            />
            {/* @TODO point calculations */}
            <InputField
              name="comments"
              labelProps={{ label: 'Comments' }}
            />
            {isAdminReview ? <AdminReview images={images} setImages={setImages} /> : <UserNomination images={images} setImages={setImages} />}
          </Form>
        )}
      </Formik>
    </div>
  )
}

// AdminReview.propTypes = {
//   initValues: PropTypes.shape({
//     imagePaths: PropTypes.arrayOf(PropTypes.string),
//   }).isRequired,
// }

UserNomination.defaultProps = {
  images: [],
}

UserNomination.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string),
  setImages: PropTypes.func.isRequired,
}

Nomination.defaultProps = {
  initValues: initialValues,
  isAdminReview: false,
}

Nomination.propTypes = {
  initValues: PropTypes.shape({}),
  isAdminReview: PropTypes.bool,
}

export default Nomination
