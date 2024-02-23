import { useUserStore } from '../store/user-store'

/**
 * Custom hook for managing global user information and authentication state.
 * This hook abstracts the implementation details of the UserContext, allowing
 * components to interact with global user state without knowing its internal structure.
 */
export const useUserInfo = () => {
  const login = useUserStore((state) => state.login)
  const register = useUserStore((state) => state.register)
  const verifyToken = useUserStore((state) => state.checkToken)
  const logout = useUserStore((state) => state.logout)
  const loginWithData = useUserStore((state) => state.loginWithData)
  const state = useUserStore((state) => state.state)
  return { state, login, verifyToken, logout, register, loginWithData }
}
