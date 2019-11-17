import React from 'react'
import { Link } from 'react-router-dom'

import './homepage.scss'

const Homepage = () => (
  <div className="container">
    <div className="children">
      <Link to="/login">Login</Link>
      <Link to="/signup">Signup</Link>
    </div>
  </div>
)

export default Homepage
