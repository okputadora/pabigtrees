import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Dialog, Intent } from '@blueprintjs/core'
import { Formik } from 'formik'

import Form from '@/components/Forms/Form'
import InputField from '@/components/Forms/InputField'
import SelectField from '@/components/Forms/SelectField'

const AddSection = ({ sectionId }) => {
  const [isOpen, setIsOpen] = useState(false)
  const addSection = useCallback(async (values) => {
    console.log({ sectionId, values })
  })

  return (
    <>
      <Dialog isOpen={isOpen}>
        <Formik
          initialValues={{
            sectionType: '',
            content: '',
            secondaryContent: '',
          }}
          onSubmit={addSection}
        >
          {({ handleSubmit, values }) => (
            <Form>
              <SelectField
                name="sectionType"
                items={['paragraph', 'header', 'image', 'link'].map((x) => ({ name: x, id: x }))}
                labelProps={{ label: 'Section Type' }}
                activeItem={{ id: values.sectionType, name: values.sectionType }}
              />
              <InputField name="content" labelProps={{ label: 'Content' }} inputProps={{ textArea: true }} />
              <InputField name="secondaryContent" labelProps={{ label: 'Secondary Content' }} inputProps={{ textArea: true }} />
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
  sectionId: PropTypes.number.isRequired,
}

export default AddSection
