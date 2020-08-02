
import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import { Redirect, Route } from 'react-router-dom'


function AuthRoute({ component }) {
  if (localStorage.getItem('token')) {
    return (<Route component={component} />)
  }

  return (
    <Redirect to={{ pathname: '/login' }} />
  )
}

AuthRoute.propTypes = {
  component: PropTypes.func.isRequired,
}

export default withRouter(AuthRoute)
