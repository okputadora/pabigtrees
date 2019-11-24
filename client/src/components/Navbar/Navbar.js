import React from 'react'
import { Link } from 'react-router-dom'

import './navbar.scss'

const Navabr = () => {
  const links = ['Home', 'Tree Listings', 'Tallest Trees', 'Measurement', 'News/Updates', 'Links/Resources', 'Nomination Form', 'About']
  return (
    <nav className="nav-container">
      <ul className="navigation">
        {links.map((link) => <Link key={link} className="nav-item" to={link}>{link}</Link>)}
      </ul>
    </nav>
  )
}

export default Navabr
