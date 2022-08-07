import axios from 'axios'

const API = axios.create({
  baseURL: "https://app-yourtube.herokuapp.com/api",
  withCredentials: true,
})

export { API }
