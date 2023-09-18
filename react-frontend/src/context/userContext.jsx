/* eslint-disable react/prop-types */
import React, { useReducer } from 'react'
import { loginRequest, logoutRequest, registerRequest, verifyTokenRequest } from '../api/authApi'
import { CheckTokenTypes, LoginTypes, LogoutTypes, RegisterTypes, userReducer } from './UserReducers'

export const UserContext = React.createContext({})

const initialState = {
  userInfo: undefined,
  register: {
    loading: false,
    error: undefined
  },
  login: {
    loading: false,
    error: undefined
  },
  logout: {
    loading: false,
    error: undefined
  },
  checkToken: {
    loading: false,
    error: undefined
  }
}

export const UserContextProvider = (props) => {
  const [state, dispatch] = useReducer(userReducer, initialState)

  const register = async (user) => {
    try {
      dispatch({
        type: RegisterTypes.loading
      })
      const data = await registerRequest(user)
      dispatch({
        type: RegisterTypes.success,
        payload: data
      })
    } catch (error) {
      console.log(error)
      dispatch({
        type: RegisterTypes.error,
        payload: error.message
      })
    }
  }

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

  const loginWithData = async (userData) => {
    try {
      dispatch({
        type: LoginTypes.loading
      })
      dispatch({
        type: LoginTypes.success,
        payload: userData
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
      const data = await verifyTokenRequest()
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
    <UserContext.Provider value={{ state, login, logout, verifyToken, register, loginWithData }}>
      {props.children}
    </UserContext.Provider>
  )
}
