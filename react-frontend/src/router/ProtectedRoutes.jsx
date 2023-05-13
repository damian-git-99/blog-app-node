import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useUserInfo } from '../hooks/useUserInfo'

export const ProtectedRoutes = () => {
  const { userInfo } = useUserInfo()
  if (!userInfo) {
    return <Navigate to={'/login'} replace />
  }
  return (
    <>
      <Outlet />
    </>
  )
}
