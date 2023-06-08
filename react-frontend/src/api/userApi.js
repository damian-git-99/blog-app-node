import axios from 'axios'

const URL = `${import.meta.env.VITE_API_URL}/users`

export const userProfile = async () => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true
  }
  try {
    const { data } = await axios.get(`${URL}/profile`, config)
    return data
  } catch (error) {
    const message = error?.response?.data?.error || error.message
    const err = new Error(message)
    throw err
  }
}

export const editProfile = async (userId, user) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true
  }
  try {
    const { data } = await axios.put(`${URL}/profile/${userId}`, user, config)
    return data
  } catch (error) {
    const message = error?.response?.data?.error || error.message
    const err = new Error(message)
    throw err
  }
}
