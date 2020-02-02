import React, { useCallback, useState } from 'react'
import { Formik } from 'formik'
import { useDropzone } from 'react-dropzone'
import classNames from 'classnames'

import { nominateTree, uploadFiles } from '@/api/nomination'
import Form from '@/components/Forms/Form'
import InputField from '@/components/Forms/InputField'
import { initialValues } from './formData'

import './nomination.scss'

const Nomination = () => {
  const [images, setImages] = useState([])
  const [isUploading, setUploading] = useState(false)

  const handleDrop = useCallback(async (files, rejectedFiles) => {
    console.log(rejectedFiles)
    if (rejectedFiles.length > 0) {
      alert('some files were rejected')
    }
    if (files) {
      if (files.length > 5) {
        return alert('You\'re attempting to upload too many files. The limit is 5')
      }
      try {
        setUploading(true)
        const { data: uploadedFiles } = await uploadFiles(files)
        setImages(images.concat(files.map((file, i) => Object.assign(file, {
          preview: URL.createObjectURL(file),
          imagePath: uploadedFiles[i],
        }))))
      } catch (err) {
        console.log(err)
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
  const handleSubmit = useCallback(async (values) => {
    const formValues = { ...values, imagePaths: images.map((img) => img.imagePath) }
    const result = await nominateTree(formValues)
  }, [images])
  return (
    <div className="nomination-container">
      <Formik
        onSubmit={handleSubmit}
        initialValues={initialValues}
      >
        {({ handleSubmit: handleFormikSubmit, dirty }) => (
          <Form>
            <InputField
              name="commonName"
              labelProps={{ label: 'Common Name' }}
            />
            <InputField
              name="genus"
              labelProps={{ label: 'Genus' }}
            />
            <InputField
              name="species"
              labelProps={{ label: 'Species' }}
            />
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
            {/* @TODO picture upload */}
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
            <button className="nomination-submit" type="button" onClick={handleFormikSubmit}>submit</button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default Nomination
