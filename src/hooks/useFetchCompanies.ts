import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { getCompaniesApi } from '../apis/company.api'
import { ICompany } from '../interfaces/interfaces'

export const useFetchCompanies = (_pageSize: number = 4) => {
  const [current, setCurrent] = useState(1)
  const [pageSize, setPageSize] = useState(_pageSize)
  const [filter, setFilter] = useState('')
  const [sortQuery, setSortQuery] = useState('sort=-updatedAt')

  let query = `current=${current}&pageSize=${pageSize}`
  if (filter) {
    query += `&${filter}`
  }
  if (sortQuery) {
    query += `&${sortQuery}`
  }

  const { data } = useQuery({
    queryKey: ['companies', query],
    queryFn: () => getCompaniesApi(query),
    placeholderData: keepPreviousData,
  })

  return {
    companies: data?.data?.data?.result as ICompany[] | null,
    total: data?.data?.data?.meta.total || 0,
    current,
    pageSize,
    setCurrent,
    setPageSize,
    setFilter,
    setSortQuery,
  }
}
