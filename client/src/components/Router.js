import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Banner from './Banner'
import Navbar from './Navbar/Navbar'
import Homepage from './Homepage/Homepage'
import Login from './Login/Login'
import Signup from './Signup/Signup'

import '@/styles/common.scss'

const AppRouter = () => (
  <Router>
    <div className="fullPage">
      <Banner />
      <Navbar />
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
      </Switch>
    </div>
  </Router>
)

export default AppRouter
