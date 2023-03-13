import axios from 'axios';

const URL = 'http://localhost:4000'

export const register = async (user) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    }
  };
  try {
    const { data } = await axios.post(`${URL}/register`, user, config);
    return data;
  } catch (error) {
    const message = error?.response?.data?.error || error.message;
    const err = new Error(message);
    throw err;
  }
}