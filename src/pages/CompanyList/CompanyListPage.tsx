import { getCompaniesApi } from '../../apis/company.api'
import CompanyCard from '../../components/CompanyCard'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '../../components/ui/pagination'
import { useFetchDataWithPagination } from '../../hooks/useFetchDataWithPagination'
import { ICompany } from '../../interfaces/schemas'

export default function CompanyListPage() {
  const {
    data: companies,
    total,
    current,
    pageSize,
    setCurrent,
  } = useFetchDataWithPagination<ICompany>(getCompaniesApi, 8)

  const totalPages = Math.ceil(total / pageSize)

  const handlePageChange = (page: number) => {
    setCurrent(page)
  }

  const renderPageNumbers = () => {
    const pages = []
    const maxVisiblePages = 1
    let startPage = Math.max(1, current - Math.floor(maxVisiblePages / 2))
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1)
    }

    if (startPage > 1) {
      pages.push(
        <PaginationItem key="first">
          <PaginationLink onClick={() => handlePageChange(1)}>1</PaginationLink>
        </PaginationItem>
      )
      if (startPage > 2) {
        pages.push(<PaginationEllipsis key="ellipsis-start" />)
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <PaginationItem key={i}>
          <PaginationLink
            onClick={() => handlePageChange(i)}
            isActive={i === current}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      )
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(<PaginationEllipsis key="ellipsis-end" />)
      }
      pages.push(
        <PaginationItem key="last">
          <PaginationLink onClick={() => handlePageChange(totalPages)}>
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      )
    }

    return pages
  }

  return (
    <>
      <div className="max-w-7xl mx-auto p-4 mt-8">
        <div className="flex flex-row justify-between">
          <h2 className="text-4xl font-medium mb-8 text-center">
            Nhà tuyển dụng hàng đầu
          </h2>
          <div>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => handlePageChange(Math.max(1, current - 1))}
                  />
                </PaginationItem>
                {renderPageNumbers()}
                <PaginationItem>
                  <PaginationNext
                    onClick={() =>
                      handlePageChange(Math.min(totalPages, current + 1))
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            {companies &&
              companies.map(({ _id, name, logo }) => (
                <CompanyCard _id={_id!} name={name!} logo={logo} />
              ))}
          </div>
        </div>
      </div>
    </>
  )
}
