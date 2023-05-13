import { useContext } from 'react'
import { UserContext } from '../context/userContext'

export const useUserInfo = () => {
  const { userInfo, setUserInfo } = useContext(UserContext)
  return { userInfo, setUserInfo }
}
