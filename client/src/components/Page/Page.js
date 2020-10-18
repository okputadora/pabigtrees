import React from 'react'
import PropTypes from 'prop-types'

import './page.scss'
import Homepage from './Homepage'
import renderer from '@/utils/renderer'

const Page = (props) => {
  const { isAdmin, handleEdit, data } = props
  const isHomepage = data && data.page.title === 'homepage'
  if (isHomepage) return <Homepage>{renderer(data, isAdmin, handleEdit)}</Homepage>
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
  data: PropTypes.shape({
    page: PropTypes.shape({ title: PropTypes.string.isRequired }),
  }),
}

export default Page
