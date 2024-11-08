import { IBackendResponse, ICompany, IPagination } from '../interfaces/schemas'
import axiosInstance from '../utils/axiosInstance'

export const getCompaniesApi = async (query: string) => {
  const result = await axiosInstance.get<
    IBackendResponse<IPagination<ICompany>>
  >(`/api/v1/companies?${query}`)
  return result
}

export const getCompanyByIdApi = async (id: string) => {
  return await axiosInstance.get<IBackendResponse<ICompany>>(
    `/api/v1/companies/${id}`
  )
}

export const createCompanyApi = async (
  name: string,
  address: string,
  description: string,
  logo: string
) => {
  return await axiosInstance.post<IBackendResponse<ICompany>>(
    '/api/v1/companies',
    {
      name,
      address,
      description,
      logo,
    }
  )
}

export const updateCompanyApi = (
  id: string,
  name: string,
  address: string,
  description: string,
  logo: string
) => {
  return axiosInstance.patch<IBackendResponse<ICompany>>(
    `/api/v1/companies/${id}`,
    {
      name,
      address,
      description,
      logo,
    }
  )
}

export const deleteCompanyApi = (id: string) => {
  return axiosInstance.delete<IBackendResponse<ICompany>>(
    `/api/v1/companies/${id}`
  )
}
