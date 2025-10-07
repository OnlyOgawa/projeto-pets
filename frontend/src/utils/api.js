import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:5000'
})

// Antes de cada requisição, adiciona o token automaticamente
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${JSON.parse(token)}`
  }
  return config
})

export default api