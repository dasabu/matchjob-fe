import axios, { AxiosInstance } from 'axios'
class AxiosService {
  instance: AxiosInstance
  constructor() {
    this.instance = axios.create({
      baseURL: 'http://localhost:8000',
      timeout: 10000, // 10s
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
}

const axiosInstance = new AxiosService().instance

export default axiosInstance
