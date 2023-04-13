import axios from 'axios'

const URL = 'http://localhost:4000/posts'
const config = {
  withCredentials: true
}

export const createPost = async (post) => {
  try {
    const { data } = await axios.post(`${URL}`, post, config)
    return data
  } catch (error) {
    const message = error?.response?.data?.error || error.message
    const err = new Error(message)
    throw err
  }
}

export const getPosts = async () => {
  try {
    const { data } = await axios.get(`${URL}`, config)
    return data
  } catch (error) {
    const message = error?.response?.data?.error || error.message
    const err = new Error(message)
    throw err
  }
}

export const getMyPosts = async () => {
  try {
    const { data } = await axios.get(`${URL}/my-posts`, config)
    return data
  } catch (error) {
    const message = error?.response?.data?.error || error.message
    const err = new Error(message)
    throw err
  }
}

export const getPostsByUsername = async (username) => {
  try {
    const { data } = await axios.get(`${URL}/by-username/${username}`, config)
    return data
  } catch (error) {
    const message = error?.response?.data?.error || error.message
    const err = new Error(message)
    throw err
  }
}

export const deletePostById = async (postId) => {
  try {
    const { data } = await axios.delete(`${URL}/${postId}`, config)
    return data
  } catch (error) {
    const message = error?.response?.data?.error || error.message
    const err = new Error(message)
    throw err
  }
}

export const getPostById = async (postId) => {
  try {
    const { data } = await axios.get(`${URL}/${postId}`, config)
    return data
  } catch (error) {
    console.log(error)
    const message = error?.response?.data?.error || error.message
    const err = new Error(message)
    throw err
  }
}

export const editPost = async (postId, post) => {
  try {
    const { data } = await axios.put(`${URL}/${postId}`, post, config)
    return data
  } catch (error) {
    console.log(error)
    const message = error?.response?.data?.error || error.message
    const err = new Error(message)
    throw err
  }
}

export const togglePublicationStatus = async (postId) => {
  try {
    const { data } = await axios.put(`${URL}/toggle-status/${postId}`, '', config)
    return data
  } catch (error) {
    console.log(error)
    const message = error?.response?.data?.error || error.message
    const err = new Error(message)
    throw err
  }
}
