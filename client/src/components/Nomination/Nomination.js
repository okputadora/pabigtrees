import React, { useCallback } from 'react'
import { Formik } from 'formik'
import { useDropzone } from 'react-dropzone'
import classNames from 'classnames'

import { nominateTree } from '@/api/nomination'
import Form from '@/components/Forms/Form'
import InputField from '@/components/Forms/InputField'
import { initialValues } from './formData'

import './nomination.scss'

const Nomination = () => {
  const handleDrop = useCallback((files) => {
    // upload files
    console.log('handling drop')
    console.log(files)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop: handleDrop })

  const fileDropClasses = classNames({
    'nomination-fileDrop': true,
    'fileDrop-active': isDragActive,
  })
  const handleSubmit = useCallback(async (values) => {
    const result = await nominateTree(values)
    console.log(result)
  }, [])
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
              <input {...getInputProps()} />
              {
                isDragActive
                  ? <p>Drop the images here ...</p>
                  : <p>Drag n drop some images here, or click to select from your file system</p>
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
