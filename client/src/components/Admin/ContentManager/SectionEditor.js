import React, { useState, useCallback } from 'react'
import { Formik } from 'formik'
import {
  Button, Dialog, Intent, Alert,
} from '@blueprintjs/core'
import PropTypes from 'prop-types'

import Form from '@/components/Forms/Form'
import InputField from '@/components/Forms/InputField'
import renderer from '@/utils/renderer'
import { updateSection, uploadImages } from '@/api/page'
import ImageUpload from '@/components/ImageUpload'

import './sectionEditor.scss'

const SectionEditor = ({ section, onEditSuccess }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isTrashing, setIsTrashing] = useState(false)

  const handleEdit = useCallback(async (values) => {
    try {
      await updateSection({ ...section, ...values })
      setIsOpen(false)
      onEditSuccess()
    } catch (err) {
      alert(err)
    }
  }, [section.id])

  const trashSection = useCallback(async () => {
    try {
      await updateSection({ ...section, is_trashed: 1 })
      setIsTrashing(false)
      onEditSuccess()
    } catch (err) {
      alert(err)
    }
  }, [section.id])
  return (
    <div className="section-editor">
      <div className="title">{section.section_type}</div>
      {renderer({ sections: [section] })}
      <Formik
        initialValues={{
          content: section.content,
          secondary_content: section.secondary_content,
          additional_info: section.additional_info,
        }}
        onSubmit={handleEdit}
        enableReinitialize
      >
        {({ handleSubmit }) => (
          <Dialog
            isOpen={isOpen}
            title={section.section_type}
            onClose={() => setIsOpen(false)}
          >
            <>
              <Form>
                <InputField name="content" labelProps={{ label: 'content' }} inputProps={{ textArea: true }} />
                {section.section_type === 'image' ? (<ImageUpload upload={uploadImages} />) : (
                  <InputField name="secondary_content" labelProps={{ label: 'secondary content' }} inputProps={{ textArea: true }} />

                )}
                {section.section_type === 'link' && <InputField name="additional_info" labelProps={{ label: 'additional_info' }} />}
                <Button onClick={() => setIsOpen(false)}>Cancel</Button>
                <Button onClick={handleSubmit} intent={Intent.PRIMARY}>Submit</Button>
              </Form>
            </>
          </Dialog>
        )}
      </Formik>
      <Button onClick={() => setIsOpen(true)} intent={Intent.PRIMARY} icon="edit" />
      <Button onClick={() => setIsTrashing(true)} intent={Intent.DANGER} icon="trash" />
      <Alert
        isOpen={isTrashing}
        intent={Intent.DANGER}
        icon="trash"
        confirmButtonText="Delete"
        cancelButtonText="Cancel"
        onConfirm={() => trashSection()}
        onCancel={() => setIsTrashing(false)}
      >
        <p>Are you sure you want to delete this section?</p>
      </Alert>
    </div>
  )
}

SectionEditor.propTypes = {
  section: PropTypes.shape({
    section_type: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    content: PropTypes.string,
    secondary_content: PropTypes.string,
    additional_info: PropTypes.string,
  }).isRequired,
  onEditSuccess: PropTypes.func.isRequired,
}

export default SectionEditor
