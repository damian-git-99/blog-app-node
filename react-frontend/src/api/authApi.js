import axios from 'axios'

const URL = import.meta.env.VITE_API_URL

export const registerRequest = async (user) => {
  const config = {
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json'
    }
  }
  const { data } = await axios.post(`${URL}/register`, user, config)
  return data
}

export const loginRequest = async (user) => {
  const config = {
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json'
    }
  }
  const { data } = await axios.post(`${URL}/login`, user, config)
  return data
}

export const logoutRequest = async (user) => {
  const config = {
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json'
    }
  }
  const { data } = await axios.post(`${URL}/logout`, user, config)
  return data
}

export const verifyTokenRequest = async () => {
  const config = {
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json'
    }
  }
  const { data } = await axios.get(`${URL}/verify-token`, config)
  return data
}
