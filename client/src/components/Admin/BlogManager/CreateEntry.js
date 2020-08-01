import React, { useCallback, useState } from 'react'
import { Formik, Form } from 'formik'
import { Overlay } from '@blueprintjs/core'
import InputField from '@/components/Forms/InputField'

import ImageUpload from '@/components/ImageUpload'
import { createNewsEntry, uploadNewsImage } from '@/api/news'

import './blogManager.scss'

const CreateEntry = () => {
  const [isOpen, setIsOpen] = useState(true)
  const [imagePaths, setImagePaths] = useState([])

  const submit = useCallback((values) => {
    createNewsEntry({ ...values, images: imagePaths })
  }, [imagePaths])

  const uploadImages = useCallback(async (imgs) => uploadNewsImage(imgs), [])

  const onUploadSuccess = useCallback((imgs) => {
    setImagePaths(imgs.map((img) => img.imagePath))
  }, [])

  return (
    <>
      <div>
        <button type="button" onClick={() => setIsOpen(!isOpen)}>Create New Entry</button>
      </div>
      <Overlay isOpen={isOpen}>
        <div className="create-entry">
          <Formik
            initialValues={{ title: '', body: '' }}
            onSubmit={submit}
          >
            {({ handleSubmit }) => (

              <Form>
                <InputField name="title" labelProps={{ label: 'Title' }} />
                <InputField name="body" inputProps={{ textArea: true }} labelProps={{ label: 'Body' }} />
                <ImageUpload upload={uploadImages} onUpload={onUploadSuccess} />
                <button type="button" className="button-cancel" onClick={() => setIsOpen(false)}>Cancel</button>
                <button type="submit" className="button-submit" oncClick={handleSubmit}>Submit</button>
              </Form>
            )}
          </Formik>
        </div>
      </Overlay>
    </>
  )
}

export default CreateEntry
