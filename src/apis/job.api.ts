import { IBackendResponse, IPagination, IJob } from '../interfaces/schemas'
import axiosInstance from '../utils/axiosInstance'

export const getJobsApi = (query: string) => {
  return axiosInstance.get<IBackendResponse<IPagination<IJob>>>(
    `/api/v1/jobs?${query}`
  )
}

export const getJobByIdApi = (id: string) => {
  return axiosInstance.get<IBackendResponse<IJob>>(`/api/v1/jobs/${id}`)
}
