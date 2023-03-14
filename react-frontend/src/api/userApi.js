import axios from 'axios';

const URL = 'http://localhost:4000/users'

export const userProfile = async () => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true
  };
  try {
    const { data } = await axios.get(`${URL}/profile`, config);
    return data;
  } catch (error) {
    const message = error?.response?.data?.error || error.message;
    const err = new Error(message);
    throw err;
  }
}