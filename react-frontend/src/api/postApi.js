import axios from 'axios'
import { getErrorMessage } from '../utils/handleErrors'

const URL = `${import.meta.env.VITE_API_URL}/posts`

const config = {
  withCredentials: true
}

export const createPost = async (post) => {
  try {
    const { data } = await axios.post(`${URL}`, post, config)
    return data
  } catch (error) {
    const message = getErrorMessage(error)
    throw new Error(message)
  }
}

export const getPosts = async () => {
  try {
    const { data } = await axios.get(`${URL}`, config)
    return data
  } catch (error) {
    const message = getErrorMessage(error)
    throw new Error(message)
  }
}

export const getMyPosts = async () => {
  try {
    const { data } = await axios.get(`${URL}/my-posts`, config)
    return data
  } catch (error) {
    const message = getErrorMessage(error)
    throw new Error(message)
  }
}

export const getPostsByUsername = async (username) => {
  try {
    const { data } = await axios.get(`${URL}/by-username/${username}`, config)
    return data
  } catch (error) {
    const message = getErrorMessage(error)
    throw new Error(message)
  }
}

export const deletePostById = async (postId) => {
  try {
    const { data } = await axios.delete(`${URL}/${postId}`, config)
    return data
  } catch (error) {
    const message = getErrorMessage(error)
    throw new Error(message)
  }
}

export const getPostById = async (postId) => {
  try {
    const { data } = await axios.get(`${URL}/${postId}`, config)
    return data
  } catch (error) {
    const message = getErrorMessage(error)
    throw new Error(message)
  }
}

export const editPost = async (postId, post) => {
  try {
    const { data } = await axios.put(`${URL}/${postId}`, post, config)
    return data
  } catch (error) {
    const message = getErrorMessage(error)
    throw new Error(message)
  }
}

export const togglePublicationStatus = async (postId) => {
  try {
    const { data } = await axios.put(`${URL}/toggle-status/${postId}`, '', config)
    return data
  } catch (error) {
    const message = getErrorMessage(error)
    throw new Error(message)
  }
}
