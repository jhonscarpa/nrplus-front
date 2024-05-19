import axios from 'axios'
import { ENV } from './env'

export const api = axios.create({
  baseURL: ENV.VITE_DATABASE_URL,

  headers: { 'Content-Type': 'application/json' },
})
