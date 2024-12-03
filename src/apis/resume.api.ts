import { IBackendResponse, IPagination, IResume } from '../interfaces/schemas'
import axiosInstance from '../lib/axios'

export const getResumesApi = (query: string) => {
  return axiosInstance.get<IBackendResponse<IPagination<IResume>>>(
    `/api/v1/resumes?${query}`
  )
}

export const getResumeByIdApi = (id: string) => {
  return axiosInstance.get<IBackendResponse<IResume>>(`/api/v1/resumes/${id}`)
}

export const getResumeByUserApi = () => {
  return axiosInstance.post<IBackendResponse<IResume[]>>(
    `/api/v1/resumes/by-user`
  )
}

export const createResumeApi = async (
  url: string,
  companyId: any,
  jobId: any
) => {
  return await axiosInstance.post<IBackendResponse<IResume>>(
    '/api/v1/resumes',
    {
      url,
      companyId,
      jobId,
    }
  )
}

export const updateResumeStatusApi = (id: any, status: string) => {
  return axiosInstance.patch<IBackendResponse<IResume>>(
    `/api/v1/resumes/${id}`,
    { status }
  )
}

export const deleteResumeApi = (id: string) => {
  return axiosInstance.delete<IBackendResponse<IResume>>(
    `/api/v1/resumes/${id}`
  )
}
