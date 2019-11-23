import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Main from './Main'
import AdminRouter from './Admin/AdminRouter'

import '@/styles/common.scss'

const AppRouter = () => (
  <Router>
    <Switch>
      <Route path="/admin" component={AdminRouter} />
      <Route path="/" component={Main} />
    </Switch>
  </Router>
)

export default AppRouter
