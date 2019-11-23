import React from 'react'
import { Link } from 'react-router-dom'

import './adminNav.scss'

const AdminNav = () => (
  <nav className="adminNav-container">
    <ul className="adminNav-nav">
      <li><Link className="adminNav-navItem" to="/admin">Admin Summary</Link></li>
      <li><Link className="adminNav-navItem" to="/admin/contentManager">Content Manager</Link></li>
      <li><Link className="adminNav-navItem" to="/admin/databseManager">Database Manager</Link></li>
      <li><Link className="adminNav-navItem" to="/admin/submissionManager">Submission Manager</Link></li>
    </ul>
  </nav>
)

export default AdminNav
