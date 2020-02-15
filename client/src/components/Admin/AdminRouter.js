import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import AdminBanner from './AdminBanner'
import AdminNav from './AdminNav'
import AdminSummary from './AdminSummary'
import ContentManager from './ContentManager/ContentManager'
import DatabaseManager from './DatabaseManager'
import NominationManager from './NominationManager/NominationManager'
import NominationViewer from './NominationManager/NominationViewer'

import './admin.scss'

const Admin = () => (
  <div className="admin-container">
    <Router>
      <AdminBanner />
      <AdminNav />
      <div className="admin-page">
        <Switch>
          <Route path="/admin/contentManager" component={ContentManager} />
          <Route path="/admin/databaseManager" component={DatabaseManager} />
          <Route path="/admin/nominationManager" component={NominationManager} />
          <Route path="/admin/nomination/:id" component={NominationViewer} />
          <Route path="/admin" component={AdminSummary} />
        </Switch>
      </div>
    </Router>
  </div>

)

export default Admin
