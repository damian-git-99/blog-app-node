import axios from 'axios'

const URL = `${import.meta.env.VITE_API_URL}/users`

const config = {
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
}

export const userProfile = async () => {
  const { data } = await axios.get(`${URL}/profile`, config)
  return data
}

export const editProfile = async (userId, user) => {
  const { data } = await axios.put(`${URL}/profile/${userId}`, user, config)
  return data
}

export const addFavoritePost = async (postId) => {
  const { data } = await axios.post(`${URL}/add-favorite-post/${postId}`, undefined, config)
  return data
}

export const deleteFavoritePost = async (postId) => {
  const { data } = await axios.delete(`${URL}/delete-favorite-post/${postId}`, config)
  return data
}

export const isPostMarkedAsFavorite = async (postId) => {
  const { data } = await axios.get(`${URL}/is-favorite-post/${postId}`, config)
  const { isMarked } = data
  return {
    isMarkedAsFavorite: isMarked
  }
}

export const getFavoritePosts = async () => {
  const { data } = await axios.get(`${URL}/favorite-posts`, config)
  return data
}
