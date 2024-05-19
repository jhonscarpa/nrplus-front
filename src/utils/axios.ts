import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://54.232.62.196:3333',

  headers: { 'Content-Type': 'application/json' },
})
