import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { UserContext } from '../context/userContext'

export const ProtectedRoutes = () => {
  const { userInfo } = useContext(UserContext)
  if (!userInfo) {
    return <Navigate to={'/login'} replace />
  }
  return (
    <>
      <Outlet />
    </>
  )
}
