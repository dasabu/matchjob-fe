import { IBackendResponse, IPagination, IUser } from '../interfaces/schemas'
import axiosInstance from '../lib/axios'

export const getUsersApi = async (query: string) => {
  return await axiosInstance.get<IBackendResponse<IPagination<IUser>>>(
    `/api/v1/users?${query}`
  )
}

export const getUserByIdApi = async (id: string) => {
  return await axiosInstance.get<IBackendResponse<IUser>>(`/api/v1/users/${id}`)
}

export const createUserApi = async (user: IUser) => {
  return await axiosInstance.post<IBackendResponse<IUser>>('/api/v1/users', {
    ...user,
  })
}

export const updateUserApi = async (user: IUser) => {
  return await axiosInstance.patch<IBackendResponse<IUser>>(`/api/v1/users`, {
    ...user,
  })
}

export const deleteUserApi = async (id: string) => {
  return await axiosInstance.delete<IBackendResponse<IUser>>(
    `/api/v1/users/${id}`
  )
}
