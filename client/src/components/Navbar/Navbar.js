import React from 'react'
import { Link } from 'react-router-dom'

import './navbar.scss'

const Navabr = () => {
  const links = [
    { name: 'home', path: '/' },
    { name: 'tree listings', path: '/tree-listings' },
    { name: 'tallest trees', path: '/tallest-trees' },
    { name: 'measurement', path: '/measurement' },
    { name: 'News/Updates', path: '/news' },
    { name: 'Links/Resources', path: '/links-resource' },
    { name: 'Nomination Form', path: '/nomination-form' },
    { name: 'About', path: '/about' },
  ]
  return (
    <nav className="nav-container">
      <ul className="navigation">
        {links.map((link) => <Link key={link.name} className="nav-item" to={link.path}>{link.name}</Link>)}
      </ul>
    </nav>
  )
}

export default Navabr
