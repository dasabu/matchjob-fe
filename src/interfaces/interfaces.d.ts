export interface IBackendResponse<T> {
  error?: string | string[]
  message: string
  statusCode: number | string
  data?: T
}

export interface IPagination<T> {
  meta: {
    current: number
    pageSize: number
    pages: number
    total: number
  }
  result: T[]
}

export interface ICompany {
  _id?: string
  name?: string
  address?: string
  logo: string
  description?: string
  createdBy?: string
  isDeleted?: boolean
  deletedAt?: boolean | null
  createdAt?: string
  updatedAt?: string
}
