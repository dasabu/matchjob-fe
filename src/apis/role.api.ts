import { IBackendResponse, IPagination, IRole } from '../interfaces/schemas'
import axiosInstance from '../lib/axios'

export const getRolesApi = (query: string) => {
  return axiosInstance.get<IBackendResponse<IPagination<IRole>>>(
    `/api/v1/roles?${query}`
  )
}
