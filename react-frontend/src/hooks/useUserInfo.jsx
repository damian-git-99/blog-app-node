import { useContext } from 'react'
import { UserContext } from '../context/userContext'

/**
 * Custom hook for managing global user information and authentication state.
 * This hook abstracts the implementation details of the UserContext, allowing
 * components to interact with global user state without knowing its internal structure.
 */
export const useUserInfo = () => {
  const { state, login, verifyToken, logout, register, loginWithData } = useContext(UserContext)
  return { state, login, verifyToken, logout, register, loginWithData }
}
