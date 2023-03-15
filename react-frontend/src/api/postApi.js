import axios from 'axios';

const URL = 'http://localhost:4000/posts'

export const createPost = async (post) => {
  const config = {
    withCredentials: true
  };
  try {
    const { data } = await axios.post(`${URL}`, post, config);
    return data;
  } catch (error) {
    const message = error?.response?.data?.error || error.message;
    const err = new Error(message);
    throw err;
  }
}

export const getPosts = async () => {
  const config = {
    withCredentials: true
  };
  try {
    const { data } = await axios.get(`${URL}`, config);
    return data;
  } catch (error) {
    const message = error?.response?.data?.error || error.message;
    const err = new Error(message);
    throw err;
  }
}

export const getMyPosts = async () => {
  const config = {
    withCredentials: true
  };
  try {
    const { data } = await axios.get(`${URL}/my-posts`, config);
    return data;
  } catch (error) {
    const message = error?.response?.data?.error || error.message;
    const err = new Error(message);
    throw err;
  }
}