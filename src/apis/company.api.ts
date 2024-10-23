import { IBackendResponse, ICompany, IPagination } from '../interfaces/schemas'
import axiosInstance from '../utils/axiosInstance'

export const getCompaniesApi = (query: string) => {
  return axiosInstance.get<IBackendResponse<IPagination<ICompany>>>(
    `/api/v1/companies?${query}`
  )
}
