import { useEffect } from 'react'
import { withRouter } from 'react-router-dom'

import { logout } from '@/api/auth'

const Logout = (props) => {
  useEffect(() => {
    window.localStorage.removeItem('token')
    const logoutUser = async () => {
      await logout()
      props.history.push('/')
      window.location.reload()
    }
    logoutUser()
  }, [])
  return null
}

export default withRouter(Logout)
