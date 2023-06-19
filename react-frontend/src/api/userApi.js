import axios from 'axios'
import { getErrorMessage } from '../utils/handleErrors'

const URL = `${import.meta.env.VITE_API_URL}/users`

const config = {
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
}

export const userProfile = async () => {
  try {
    const { data } = await axios.get(`${URL}/profile`, config)
    return data
  } catch (error) {
    const message = getErrorMessage(error)
    throw new Error(message)
  }
}

export const editProfile = async (userId, user) => {
  try {
    const { data } = await axios.put(`${URL}/profile/${userId}`, user, config)
    return data
  } catch (error) {
    const message = getErrorMessage(error)
    throw new Error(message)
  }
}

export const addFavoritePost = async (postId) => {
  try {
    const { data } = await axios.post(`${URL}/add-favorite-post/${postId}`, undefined, config)
    return data
  } catch (error) {
    const message = getErrorMessage(error)
    throw new Error(message)
  }
}

export const deleteFavoritePost = async (postId) => {
  try {
    const { data } = await axios.delete(`${URL}/delete-favorite-post/${postId}`, config)
    return data
  } catch (error) {
    const message = getErrorMessage(error)
    throw new Error(message)
  }
}
