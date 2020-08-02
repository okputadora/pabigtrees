import React, { Component } from 'react'
import { Formik, Field, Form } from 'formik'
import * as Yup from 'yup'
import { withRouter } from 'react-router-dom'

// import Form from '@/components/Forms/Form'
import * as auth from '@/api/auth'
import './login.scss'

const schema = Yup.object().shape({
  username: Yup.string().required(),
  password: Yup.string().required(),
})
class Login extends Component {
  state = { error: null }

  handleSubmit = async (values) => {
    try {
      const { data: { token } } = await auth.login(values)
      localStorage.setItem('token', token)
      this.props.history.push('/admin')
    } catch (err) {
      this.setState({ error: err.message })
    }
  }

  render() {
    const { error } = this.state
    return (
      <Formik
        initialValues={{ username: '', password: '' }}
        validationSchema={schema}
        onSubmit={this.handleSubmit}
      >
        {({ isSubmitting, dirty, errors }) => (
          <div className="login">
            <h1>PA Big Trees Admin Portal</h1>
            <div className="login-container">
              <h2>Login</h2>
              <Form>
                <div className="login-form">
                  <Field name="username">
                    {(props) => <input {...props.field} />}
                  </Field>
                  {dirty.username && <div className="error">{errors.username}</div>}
                  <Field name="password" type="password">
                    {(props) => <input {...props.field} />}
                  </Field>
                  {dirty.password && <div className="error">{errors.password}</div>}
                  <button className="testClass" type="submit" disabled={!dirty || isSubmitting}>submit</button>
                </div>
              </Form>
              {error && <div className="error">{error}</div>}
            </div>
          </div>
        )}
      </Formik>
    )
  }
}

export default withRouter(Login)
