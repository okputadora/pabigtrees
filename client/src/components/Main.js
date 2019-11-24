import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Page from '@/components/Page/Page'
import Banner from './Banner'
import Navbar from './Navbar/Navbar'
import Login from './Login/Login'
import Signup from './Signup/Signup'

import './main.scss'

const Main = () => (
  <div className="fullPage">

    <Router>
      <Banner />
      <Navbar />
      <div className="main">
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />

          {/* <Route path="/tree-listings" component={Table} /> */}
          {/* <Route path="/measurement" component={Page} /> */}
          <Route path="/" component={Page} />
        </Switch>
      </div>
    </Router>
  </div>

)

export default Main
