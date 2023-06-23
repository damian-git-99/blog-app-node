import { useContext } from 'react'
import { UserContext } from '../context/userContext'

export const useUserInfo = () => {
  const { state, login, verifyToken, logout, register } = useContext(UserContext)
  return { state, login, verifyToken, logout, register }
}
