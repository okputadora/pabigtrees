import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import { Formik, Form } from 'formik'
import { Dialog, Button, Intent } from '@blueprintjs/core'
import InputField from '@/components/Forms/InputField'

import ImageUpload from '@/components/ImageUpload'
import { uploadNewsImage } from '@/api/news'

import './blogManager.scss'

const EntryForm = ({ entry, children, handleSubmit }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [imagePaths, setImagePaths] = useState([])


  const uploadImages = useCallback(async (imgs) => uploadNewsImage(imgs), [])
  const onUploadSuccess = useCallback((imgs) => {
    setImagePaths(imgs.map((img) => img.imagePath))
  }, [])

  const onSubmit = useCallback(async (values) => {
    await handleSubmit(values, imagePaths)
    setIsOpen(false)
  }, [handleSubmit])

  return (
    <>
      {children({ setIsOpen })}
      <Dialog isOpen={isOpen}>
        <div className="create-entry">
          <Formik
            initialValues={entry ? { title: entry.news_title, body: entry.news_body } : { title: '', body: '' }}
            onSubmit={onSubmit}
          >
            {({ handleSubmit: handleFormikSubmit }) => (
              <Form>
                <InputField name="title" labelProps={{ label: 'Title' }} />
                <InputField name="body" inputProps={{ textArea: true }} labelProps={{ label: 'Body' }} />
                <ImageUpload upload={uploadImages} onUpload={onUploadSuccess} />
                <Button type="button" className="button-cancel" onClick={() => setIsOpen(false)}>Cancel</Button>
                <Button type="submit" intent={Intent.SUCCESS} className="button-submit" onClick={handleFormikSubmit}>Submit</Button>
              </Form>
            )}
          </Formik>
        </div>
      </Dialog>
    </>
  )
}

EntryForm.defaultProps = {
  entry: null,
}
EntryForm.propTypes = {
  entry: PropTypes.shape({
    news_title: PropTypes.string,
    news_body: PropTypes.string,
  }),
  handleSubmit: PropTypes.func.isRequired,
  children: PropTypes.func.isRequired,
}

export default EntryForm
