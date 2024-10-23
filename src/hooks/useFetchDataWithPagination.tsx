import { useState } from 'react'
import { keepPreviousData, useQuery } from '@tanstack/react-query'

export const useFetchDataWithPagination = <T,>(
  apiFn: (query: string) => Promise<any>,
  _pageSize: number
) => {
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
    queryKey: [query],
    queryFn: () => apiFn(query),
    placeholderData: keepPreviousData,
  })

  return {
    data: data?.data?.data?.result as T[] | null,
    total: data?.data?.data?.meta.total || 0,
    current,
    pageSize,
    setCurrent,
    setPageSize,
    setFilter,
    setSortQuery,
  }
}
