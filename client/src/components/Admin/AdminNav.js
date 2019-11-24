import React from 'react'
import { Link } from 'react-router-dom'

import './adminNav.scss'

const AdminNav = () => (
  <nav className="adminNav-container">
    <ul className="adminNav-nav">
      <Link className="adminNav-navItem" to="/admin">Admin Summary</Link>
      <Link className="adminNav-navItem" to="/admin/contentManager">Content Manager</Link>
      <Link className="adminNav-navItem" to="/admin/databseManager">Database Manager</Link>
      <Link className="adminNav-navItem" to="/admin/submissionManager">Submission Manager</Link>
    </ul>
  </nav>
)

export default AdminNav
