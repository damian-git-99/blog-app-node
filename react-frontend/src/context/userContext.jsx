/* eslint-disable react/prop-types */
import React, { useReducer } from 'react'
import { loginRequest, logoutRequest } from '../api/authApi'
import { CheckTokenTypes, LoginTypes, LogoutTypes, userReducer } from './UserReducers'
import { userProfile } from '../api/userApi'

export const UserContext = React.createContext({})

const initialState = {
  userInfo: null,
  login: {
    loading: false,
    error: null
  },
  logout: {
    loading: false,
    error: null
  },
  checkToken: {
    loading: false,
    error: null
  }
}

export const UserContextProvider = (props) => {
  const [state, dispatch] = useReducer(userReducer, initialState)

  const login = async (email, password) => {
    try {
      dispatch({
        type: LoginTypes.loading
      })
      const data = await loginRequest({ email, password })
      dispatch({
        type: LoginTypes.success,
        payload: data
      })
    } catch (error) {
      dispatch({
        type: LoginTypes.error,
        payload: error.message
      })
    }
  }

  const logout = async () => {
    await logoutRequest()
    dispatch({
      type: LogoutTypes.logout
    })
  }

  const verifyToken = async () => {
    try {
      dispatch({
        type: CheckTokenTypes.loading
      })
      const data = await userProfile()
      dispatch({
        type: CheckTokenTypes.success,
        payload: data
      })
    } catch (error) {
      dispatch({
        type: CheckTokenTypes.error,
        payload: error.message
      })
    }
  }

  return (
    <UserContext.Provider value={{ state, login, logout, verifyToken }}>
      {props.children}
    </UserContext.Provider>
  )
}
