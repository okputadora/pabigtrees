import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Homepage from './Homepage/Homepage'
import Login from './Login/Login'
import Signup from './Signup/Signup'

const AppRouter = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Homepage} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
    </Switch>
  </Router>
)

export default AppRouter
