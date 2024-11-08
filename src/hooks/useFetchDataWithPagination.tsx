import { useState } from 'react'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { IBackendResponse, IPagination } from '../interfaces/schemas'
import { AxiosResponse } from 'axios'
import { buildQuery } from '../utils/helpers'

export const useFetchDataWithPagination = <T,>(
  apiFn: (
    query: string
  ) => Promise<AxiosResponse<IBackendResponse<IPagination<T>>>>,
  _pageSize: number,
  _current: number = 1,
  _filter: Record<string, string> = {},
  _sort: string = ''
) => {
  const [current, setCurrent] = useState(_current)
  const [pageSize, setPageSize] = useState(_pageSize)
  const [filter, setFilter] = useState(_filter)
  const [sort, setSort] = useState(_sort)

  const query = buildQuery(current, pageSize, filter, sort)

  const { data, refetch } = useQuery({
    queryKey: [query],
    queryFn: async () => await apiFn(query),
    placeholderData: keepPreviousData,
  })

  return {
    data: data?.data?.data?.result as T[] | null,
    total: data?.data?.data?.meta?.total || 0,
    current,
    pageSize,
    setCurrent,
    setPageSize,
    setFilter,
    setSort,
    refetch,
  }
}
