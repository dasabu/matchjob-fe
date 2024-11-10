import { IBackendResponse, IPagination, IJob } from '../interfaces/schemas'
import axiosInstance from '../lib/axios'

export const getJobsApi = async (query: string) => {
  return await axiosInstance.get<IBackendResponse<IPagination<IJob>>>(
    `/api/v1/jobs?${query}`
  )
}

export const getJobByIdApi = (id: string) => {
  return axiosInstance.get<IBackendResponse<IJob>>(`/api/v1/jobs/${id}`)
}

export const createJobApi = (job: IJob) => {
  return axiosInstance.post<IBackendResponse<IJob>>('/api/v1/jobs', { ...job })
}

export const updateJobApi = (job: IJob, id: string) => {
  return axiosInstance.patch<IBackendResponse<IJob>>(`/api/v1/jobs/${id}`, {
    ...job,
  })
}

export const deleteJobApi = (id: string) => {
  return axiosInstance.delete<IBackendResponse<IJob>>(`/api/v1/jobs/${id}`)
}
