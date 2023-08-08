import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const PublicRouter = ({isAutenticate}) => {
  return (
    <div>
    {
      isAutenticate ? <Navigate to={'/administrator'} /> : <Outlet />
    }
  </div>
  )
}

export default PublicRouter