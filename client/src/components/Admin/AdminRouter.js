import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import AdminBanner from './AdminBanner'
import AdminNav from './AdminNav'
import AdminSummary from './AdminSummary'
import ContentManager from './ContentManager/ContentManager'
import DatabaseManager from './DatabaseManager'
import NominationManager from './NominationManager/NominationManager'
import NominationViewer from './NominationManager/NominationViewer'
import TreeEditor from './TreeEditor'
import Confirmation from './Confirmation'
import BlogManager from './BlogManager/BlogManager'
import Logout from './Logout'

import './admin.scss'

const Admin = () => (
  <div className="admin-container">
    <Router>
      <AdminBanner />
      <AdminNav />
      <div className="admin-page">
        <Switch>
          <Route path="/admin/contentManager" component={ContentManager} />
          <Route path="/admin/databaseManager/:id" component={TreeEditor} />
          <Route path="/admin/databaseManager" component={DatabaseManager} />
          <Route path="/admin/nominationManager" component={NominationManager} />
          <Route path="/admin/nomination/:id" component={NominationViewer} />
          <Route path="/admin/confirmation" component={Confirmation} />
          <Route path="/admin/blogManager" component={BlogManager} />
          <Route path="/admin/logout" component={Logout} />
          <Route path="/admin" component={AdminSummary} />
        </Switch>
      </div>
    </Router>
  </div>

)

export default Admin
