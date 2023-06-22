import axios from 'axios'

const URL = `${import.meta.env.VITE_API_URL}/posts`

const config = {
  withCredentials: true
}

export const createPost = async (post) => {
  const { data } = await axios.post(`${URL}`, post, config)
  return data
}

export const getPosts = async () => {
  const { data } = await axios.get(`${URL}`, config)
  return data
}

export const getMyPosts = async () => {
  const { data } = await axios.get(`${URL}/my-posts`, config)
  return data
}

export const getPostsByUsername = async (username) => {
  const { data } = await axios.get(`${URL}/by-username/${username}`, config)
  return data
}

export const deletePostById = async (postId) => {
  const { data } = await axios.delete(`${URL}/${postId}`, config)
  return data
}

export const getPostById = async (postId) => {
  const { data } = await axios.get(`${URL}/${postId}`, config)
  return data
}

export const editPost = async (postId, post) => {
  const { data } = await axios.put(`${URL}/${postId}`, post, config)
  return data
}

export const togglePublicationStatus = async (postId) => {
  const { data } = await axios.put(`${URL}/toggle-status/${postId}`, '', config)
  return data
}
