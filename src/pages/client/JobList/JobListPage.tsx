import { getJobsApi } from '../../../apis/job.api'
import JobCard from '../../../components/JobCard'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '../../../components/ui/pagination'
import { useFetchDataWithPagination } from '../../../hooks/useFetchDataWithPagination'
import { IJob } from '../../../interfaces/schemas'

export default function JobListPage() {
  const {
    data: jobs,
    total,
    current,
    pageSize,
    setCurrent,
  } = useFetchDataWithPagination<IJob>(getJobsApi, 8)
  console.log(jobs)
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
            Công việc mới nhất
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {jobs &&
              jobs.map(
                ({ _id, name, company, salary, location, updatedAt }) => (
                  <JobCard
                    _id={_id!}
                    logo={company?.logo!}
                    name={name}
                    salary={salary}
                    location={location}
                    updatedAt={updatedAt!}
                  />
                )
              )}
          </div>
        </div>
      </div>
    </>
  )
}
