import React, { Component } from 'react'
import { Formik, Field } from 'formik'
import { Link } from 'react-router-dom'
import * as Yup from 'yup'

import Form from '@/components/Forms/Form'
import * as auth from '@/api/auth'
import './login.scss'
// import PropTypes from 'prop-types'

const schema = Yup.object().shape({
  username: Yup.string().email().required(),
  password: Yup.string().required(),
})
class Login extends Component {
  handleSubmit = (values) => {
    auth.login(values)
  }

  render() {
    return (
      <Formik
        initialValues={{ username: '', password: '' }}
        validationSchema={schema}
        onSubmit={this.handleSubmit}
      >
        {({ isSubmitting, dirty }) => (
          <>
            <h1>Login</h1>
            <Form>
              <Field name="username">
                {(props) => <input {...props.field} />}
              </Field>
              <Field name="password">
                {(props) => <input {...props.field} />}
              </Field>
              <button className="testClass" type="submit" disabled={!dirty || isSubmitting}>submit</button>
            </Form>
            <Link to="signup">Signup</Link>
          </>
        )}
      </Formik>
    )
  }
}

export default Login
