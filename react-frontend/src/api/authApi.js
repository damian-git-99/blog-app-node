import axios from 'axios'
import { getErrorMessage } from '../utils/handleErrors'

const URL = import.meta.env.VITE_API_URL

export const register = async (user) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  try {
    const { data } = await axios.post(`${URL}/register`, user, config)
    return data
  } catch (error) {
    const message = getErrorMessage(error)
    throw new Error(message)
  }
}

export const login = async (user) => {
  const config = {
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json'
    }
  }
  try {
    const { data } = await axios.post(`${URL}/login`, user, config)
    return data
  } catch (error) {
    console.log(error)
    const message = getErrorMessage(error)
    throw new Error(message)
  }
}

export const logout = async (user) => {
  const config = {
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json'
    }
  }
  try {
    const { data } = await axios.post(`${URL}/logout`, user, config)
    return data
  } catch (error) {
    const message = getErrorMessage(error)
    throw new Error(message)
  }
}
