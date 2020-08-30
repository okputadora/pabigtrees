import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Dialog, Intent } from '@blueprintjs/core'
import { Formik } from 'formik'

import Form from '@/components/Forms/Form'
import InputField from '@/components/Forms/InputField'
import SelectField from '@/components/Forms/SelectField'
import ImageUpload from '@/components/ImageUpload'
import { createSection, uploadImages } from '@/api/page'

const AddSection = ({ pageId, onCreateSuccess }) => {
  const [isOpen, setIsOpen] = useState(false)
  const addSection = useCallback(async (values) => {
    try {
      await createSection({ page_id: pageId, ...values })
      setIsOpen(false)
      onCreateSuccess()
    } catch (err) {
      alert(err)
    }
  }, [pageId])

  const handleUploadSuccess = (files) => {
    console.log(files)
    // alert('Your images were uploaded successfully')
  }


  return (
    <>
      <Dialog isOpen={isOpen}>
        <Formik
          initialValues={{
            section_type: '',
            content: '',
            secondary_content: '',
          }}
          onSubmit={addSection}
        >
          {({ handleSubmit, values }) => (
            <Form>
              <SelectField
                name="section_type"
                items={['paragraph', 'header', 'image', 'link'].map((x) => ({ name: x, id: x }))}
                labelProps={{ label: 'Section Type' }}
                activeItem={{ id: values.sectionType, name: values.sectionType }}
              />
              <InputField name="content" labelProps={{ label: 'Content' }} inputProps={{ textArea: true }} />
              {values.section_type === 'image' ? <ImageUpload upload={uploadImages} onUpload={handleUploadSuccess} /> : <InputField name="secondary_content" labelProps={{ label: 'Secondary Content' }} inputProps={{ textArea: true }} />}
              <Button onClick={() => setIsOpen(false)}>Cancel</Button>
              <Button onClick={handleSubmit} intent={Intent.PRIMARY}>Submit</Button>
            </Form>
          )}
        </Formik>
      </Dialog>
      <Button intent={Intent.SUCCESS} onClick={() => setIsOpen(true)}>Add Section</Button>
    </>
  )
}

AddSection.propTypes = {
  pageId: PropTypes.number.isRequired,
  onCreateSuccess: PropTypes.func.isRequired,
}

export default AddSection
