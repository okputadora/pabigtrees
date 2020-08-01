import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Page from './Page/Page'
import PageData from './Data/PageData'
import Banner from './Banner'
import Navbar from './Navbar/Navbar'
import Trees from './Trees/TreesTable'
import Nomination from './Nomination/Nomination'
import Confirmation from './Common/Confirmation'
import News from './News/News'
import Homepage from './Pages/Homepage'

import './main.scss'

const Main = () => (
  <div className="fullPage">
    <Router>
      <Banner />
      <Navbar />
      <div className="main">
        <Switch>
          <Route
            path="/tree-listings/:id"
            component={Trees}
          />
          <Route
            path="/tree-listings"
            component={Trees}
          />
          {/* <Route path="/measurement" component={Page} /> */}
          <Route
            path="/nomination-form"
            component={Nomination}
          />
          <Route
            path="/confirmation"
            component={Confirmation}
          />
          <Route
            path="/news"
            component={News}
          />
          <Route
            path="/:pathName"
            render={
              (props) => <PageData {...props}>{(pageProps) => <Page {...props} {...pageProps} />}</PageData>
            }
          />
          <Route
            path="/"
            component={Homepage}
          />
          <Route
            path="/"
            render={
              (props) => <PageData {...props}>{(pageProps) => <Page {...props} {...pageProps} />}</PageData>
            }
          />
        </Switch>
      </div>
    </Router>
  </div>

)

export default Main
