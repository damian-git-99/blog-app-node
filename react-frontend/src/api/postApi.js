import axios from 'axios'

const URL = `${import.meta.env.VITE_API_URL}/posts`

export const createPost = async (post) => {
  const { data } = await axios.post(`${URL}`, post)
  return data
}

export const getPosts = async () => {
  const { data } = await axios.get(`${URL}`)
  return data
}

export const getMyPosts = async () => {
  const { data } = await axios.get(`${URL}/my-posts`)
  return data
}

export const getPostsByUsername = async (username) => {
  const { data } = await axios.get(`${URL}/by-username/${username}`)
  return data
}

export const deletePostById = async (postId) => {
  const { data } = await axios.delete(`${URL}/${postId}`)
  return data
}

export const getPostById = async (postId) => {
  const { data } = await axios.get(`${URL}/${postId}`)
  return data
}

export const editPost = async (postId, post) => {
  const { data } = await axios.put(`${URL}/${postId}`, post)
  return data
}

export const togglePublicationStatus = async (postId) => {
  const { data } = await axios.put(`${URL}/toggle-status/${postId}`, '')
  return data
}

export const createComment = async (postId, comment) => {
  const { data } = await axios.post(`${URL}/${postId}/comments`, comment)
  return data
}
