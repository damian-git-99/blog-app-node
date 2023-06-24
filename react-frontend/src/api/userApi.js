import axios from 'axios'

const URL = `${import.meta.env.VITE_API_URL}/users`

export const userProfile = async () => {
  const { data } = await axios.get(`${URL}/profile`)
  return data
}

export const editProfile = async (userId, user) => {
  const { data } = await axios.put(`${URL}/profile/${userId}`, user)
  return data
}

export const addFavoritePost = async (postId) => {
  const { data } = await axios.post(`${URL}/add-favorite-post/${postId}`, undefined)
  return data
}

export const deleteFavoritePost = async (postId) => {
  const { data } = await axios.delete(`${URL}/delete-favorite-post/${postId}`)
  return data
}

export const isPostMarkedAsFavorite = async (postId) => {
  const { data } = await axios.get(`${URL}/is-favorite-post/${postId}`)
  const { isMarked } = data
  return {
    isMarkedAsFavorite: isMarked
  }
}

export const getFavoritePosts = async () => {
  const { data } = await axios.get(`${URL}/favorite-posts`)
  return data
}
