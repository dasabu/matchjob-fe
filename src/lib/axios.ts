import axios, { AxiosInstance } from 'axios'
class AxiosClient {
  instance: AxiosInstance
  constructor() {
    this.instance = axios.create({
      baseURL: 'http://localhost:8000',
      timeout: 10000, // 10s
      headers: {
        'Content-Type': 'application/json',
      },
    })
    // Check if access_token exists in Local Storage
    this.instance.interceptors.request.use((config) => {
      if (
        typeof window !== 'undefined' &&
        window.localStorage.getItem('access_token')
      ) {
        config.headers.Authorization =
          'Bearer ' + window.localStorage.getItem('access_token')
      }
      if (!config.headers.Accept && config.headers['Content-Type']) {
        config.headers.Accept = 'application/json'
        config.headers['Content-Type'] = 'application/json; charset=utf-8'
      }
      return config
    })
  }
}

const axiosInstance = new AxiosClient().instance

export default axiosInstance
