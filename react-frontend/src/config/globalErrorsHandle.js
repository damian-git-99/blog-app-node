import axios from 'axios'
import { getErrorMessage } from '../utils/handleErrors'

/* `axios.defaults.withCredentials = true` is setting the default value of the `withCredentials`
property to `true` for all Axios requests. This property determines whether or not cross-site
Access-Control requests should be made using credentials such as cookies, authorization headers or
TLS client certificates. By setting it to `true`, the browser will include any cookies associated
with the requested domain in the request headers, allowing the server to authenticate the user and
maintain session state. */
axios.defaults.withCredentials = true

axios.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    const message = getErrorMessage(error)
    throw new Error(message)
  }
)
