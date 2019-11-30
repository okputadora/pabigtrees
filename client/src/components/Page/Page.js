import React from 'react'
import PropTypes from 'prop-types'

import './page.scss'
import renderer from '@/utils/renderer'
// import samplePageData from '@/utils/samplePageData'

const Page = (props) => {
  const { isAdmin, handleEdit, data } = props
  return data ? <div className="page">{renderer(data, isAdmin, handleEdit)}</div> : <div>loading</div>
}

Page.defaultProps = {
  isAdmin: false,
  handleEdit: null,
  data: null,
}

Page.propTypes = {
  isAdmin: PropTypes.bool,
  handleEdit: PropTypes.func,
  match: PropTypes.shape({
    path: PropTypes.string,
  }).isRequired,
  data: PropTypes.shape({}),
}

export default Page
