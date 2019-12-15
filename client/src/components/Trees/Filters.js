import React, { Component } from 'react'
import { Formik } from 'formik'

import SearchField from '@/components/Forms/SearchField'
import './filters.scss'

class Filters extends Component {
  state = {
    filters: {
      species: 'all',
      genus: 'all',
      counties: 'all',
    },
  }

  handleSubmit = (values) => {

  }

  render() {
    return (
      <Formik
        initialValues={{ keyword: '' }}
        onSubmit={this.handleSubmit}
      >
        {({ handleSubmit }) => (
          <>
            <div>filters</div>
            <SearchField name="keyword" />
          </>
        )}
      </Formik>
    )
  }
}

export default Filters
