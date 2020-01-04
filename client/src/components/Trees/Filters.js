import React, { Component } from 'react'
import { Formik, Form } from 'formik'

import SearchField from '@/components/Forms/SearchField'
import './filters.scss'

class Filters extends Component {
  state = {
    filters: {
      species: 'all',
      genus: 'all',
      counties: 'all',
      keyword: ' ',
    },
  }

  handleSubmit = ({ keyword }) => this.setState({ keyword })

  render() {
    const { children } = this.props
    const { keyword } = this.state
    return (
      <>
        <Formik
          initialValues={{ keyword: keyword || '' }}
          enableReinitialize
          onSubmit={this.handleSubmit}
        >
          {() => (
            <Form>
              <div>filters</div>
              <SearchField name="keyword" />
              <button type="submit">Search</button>
            </Form>
          )}
        </Formik>
        {children(this.state)}
      </>
    )
  }
}

export default Filters
