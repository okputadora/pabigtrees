import React, { Component } from 'react'
import { Formik, Field } from 'formik'
import * as Yup from 'yup'

import Form from '@/components/Forms/Form'
import { signup } from '@/api/auth'
import './signup.scss'
import '@/styles/common.scss'
// import PropTypes from 'prop-types'

const schema = Yup.object().shape({
  username: Yup.string().email().required(),
  password: Yup.string().required(),
})
class Signup extends Component {
  handleSubmit = (values) => signup(values)

  render() {
    return (
      <div className="fullPage">
        <Formik
          initialValues={{ username: '', password: '' }}
          validationSchema={schema}
          onSubmit={this.handleSubmit}
        >
          {({ isSubmitting, dirty }) => (
            <Form>
              <h1>Signup</h1>
              <Field name="username">
                {(props) => <input {...props.field} />}
              </Field>
              <Field name="password">
                {(props) => <input {...props.field} />}
              </Field>
              <button className="testClass" type="submit" disabled={!dirty || isSubmitting}>submit</button>
            </Form>
          )}
        </Formik>
      </div>
    )
  }
}

export default Signup
