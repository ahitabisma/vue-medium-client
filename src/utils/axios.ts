import axios from 'axios'

// Setel opsi default untuk Axios
axios.defaults.withCredentials = true

// Membuat instance klien HTTP
export const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
  headers: {
    'Access-Control-Allow-Origin': 'application/json',
    'Content-Type': 'application/json'
  }
})

// Membuat instance klien HTTP untuk akses pribadi (jika diperlukan)
export const axiosPrivateInstance = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
  headers: {
    'Access-Control-Allow-Origin': 'application/json',
    'Content-Type': 'application/json'
  }
})
