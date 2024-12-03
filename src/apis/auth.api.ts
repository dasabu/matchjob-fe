import {
  IAccount,
  IBackendResponse,
  IGetAccount,
  IUser,
} from '../interfaces/schemas'
import axiosInstance from '../lib/axios'

export const signUpApi = (
  name: string,
  email: string,
  password: string,
  age: number,
  gender: string,
  address: string
) => {
  return axiosInstance.post<IBackendResponse<IUser>>('/api/v1/auth/register', {
    name,
    email,
    password,
    age,
    gender,
    address,
  })
}

export const signInApi = (username: string, password: string) => {
  return axiosInstance.post<IBackendResponse<IAccount>>('/api/v1/auth/login', {
    username,
    password,
  })
}

export const getAccountApi = () => {
  return axiosInstance.get<IBackendResponse<IGetAccount>>(
    '/api/v1/auth/account'
  )
}

export const refreshTokenApi = () => {
  return axiosInstance.get<IBackendResponse<IAccount>>('/api/v1/auth/refresh')
}

export const signOutApi = () => {
  return axiosInstance.post<IBackendResponse<string>>('/api/v1/auth/logout')
}
