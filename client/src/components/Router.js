import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Main from './Main'
import AuthRoute from './Admin/AuthRoute'
import Login from './Login/Login'
import AdminRouter from './Admin/AdminRouter'
import '@/styles/common.scss'

const AppRouter = () => (
  <Router>
    <Switch>
      <AuthRoute path="/admin" component={AdminRouter} />
      <Route path="/login" component={Login} />
      <Route path="/" component={Main} />
    </Switch>
  </Router>
)

export default AppRouter
