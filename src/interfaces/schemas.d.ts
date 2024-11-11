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

export interface IJob {
  _id?: string
  name: string
  skills: string[]
  company?: {
    _id: string
    name: string
    logo?: string
  }
  location: string
  salary: number
  quantity: number
  level: string
  description: string
  startDate: Date
  endDate: Date
  isActive: boolean

  createdBy?: string
  isDeleted?: boolean
  deletedAt?: boolean | null
  createdAt?: string
  updatedAt?: string
}

export interface IUser {
  _id?: string
  name: string
  email: string
  password?: string
  age: number
  gender: string
  address: string
  role?: {
    _id: string
    name: string
  }

  company?: {
    _id: string
    name: string
  }
  createdBy?: string
  isDeleted?: boolean
  deletedAt?: boolean | null
  createdAt?: string
  updatedAt?: string
}
