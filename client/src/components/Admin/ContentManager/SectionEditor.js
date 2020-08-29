import React, { useState, useCallback } from 'react'
import { Formik } from 'formik'
import {
  Button, Dialog, Intent, Alert,
} from '@blueprintjs/core'
import PropTypes from 'prop-types'

import Form from '@/components/Forms/Form'
import InputField from '@/components/Forms/InputField'
import renderer from '@/utils/renderer'
import { updateSection } from '@/api/page'

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
        initialValues={{ content: section.content, secondary_content: section.secondary_content }}
        onSubmit={handleEdit}
        enableReinitialize
      >
        {({ handleSubmit }) => (
          <Dialog
            isOpen={isOpen}
          >
            <>
              <div className="title">{section.section_type}</div>
              <Form>
                <InputField name="content" labelProps={{ label: 'content' }} inputProps={{ textArea: true }} />
                <InputField name="secondary_content" labelProps={{ label: 'link' }} inputProps={{ textArea: true }} />
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
  }).isRequired,
  onEditSuccess: PropTypes.func.isRequired,
}

export default SectionEditor
