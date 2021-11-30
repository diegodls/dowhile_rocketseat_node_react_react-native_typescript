import axios from 'axios'

export const API_BASE_URL = "http://localhost:4000/"
export const API_SOCKET_URL = "http://localhost:4000/"

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 1000 * 10,
})