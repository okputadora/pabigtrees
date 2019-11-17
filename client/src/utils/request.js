import axios from 'axios'

// @ todo get token from cookies to sned w/ req
export const request = axios.create({
  baseURL: 'http://localhost:4000/',
  // @TODO set headers
})

export default {}
