import { useMemo } from 'react'

interface IPaginationConfigProps {
  total: number
  current: number
  pageSize: number
  onPageChange: (page: number) => void
  maxVisiblePages?: number
}

export interface IPage {
  type: 'page' | 'ellipsis'
  number?: number
}

export const usePagination = ({
  total,
  current,
  pageSize,
  onPageChange,
  maxVisiblePages = 3,
}: IPaginationConfigProps) => {
  const totalPages = Math.ceil(total / pageSize)

  const handlePrevious = () => {
    onPageChange(Math.max(1, current - 1))
  }

  const handleNext = () => {
    onPageChange(Math.min(totalPages, current + 1))
  }

  const renderPageNumbers = useMemo(() => {
    const pages: IPage[] = []
    let startPage = Math.max(1, current - Math.floor(maxVisiblePages / 2))
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1)
    }

    if (startPage > 1) {
      pages.push({ type: 'page', number: 1 })
      if (startPage > 2) pages.push({ type: 'ellipsis' })
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push({ type: 'page', number: i })
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) pages.push({ type: 'ellipsis' })
      pages.push({ type: 'page', number: totalPages })
    }

    return pages
  }, [current, totalPages, maxVisiblePages])

  return {
    totalPages,
    renderPageNumbers,
    handlePrevious,
    handleNext,
  }
}
