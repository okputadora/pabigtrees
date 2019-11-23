import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Homepage from './Homepage/Homepage'
import Banner from './Banner'
import Navbar from './Navbar/Navbar'
import Login from './Login/Login'
import Signup from './Signup/Signup'

const Main = () => (
  <Router>
    <div className="fullPage">
      <Banner />
      <Navbar />
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/" component={Homepage} />
      </Switch>
    </div>
  </Router>

)

export default Main
