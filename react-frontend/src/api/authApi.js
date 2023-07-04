import axios from 'axios'

const URL = import.meta.env.VITE_API_URL

export const registerRequest = async (user) => {
  const { data } = await axios.post(`${URL}/register`, user)
  return data
}

export const loginRequest = async (user) => {
  const { data } = await axios.post(`${URL}/login`, user)
  return data
}

export const logoutRequest = async (user) => {
  const { data } = await axios.post(`${URL}/logout`, user)
  return data
}

export const verifyTokenRequest = async () => {
  const { data } = await axios.get(`${URL}/verify-token`)
  return data
}

export const recoverPassword = async (email) => {
  const { data } = await axios.post(`${URL}/recover-password`, { email })
  return data
}
