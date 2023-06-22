import axios from 'axios'
import { getErrorMessage } from '../utils/handleErrors'

axios.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    const message = getErrorMessage(error)
    throw new Error(message)
  }
)
