import { getJobsApi } from '../../apis/job.api'
import JobCard from '../../components/JobCard'
import PaginationComponent from '../../components/PaginationComponent'
import { useFetchDataWithPagination } from '../../hooks/useFetchDataWithPagination'
import { usePagination } from '../../hooks/usePagination'
import { IJob } from '../../interfaces/schemas'

export default function JobListPage() {
  const {
    data: jobs,
    total,
    current,
    pageSize,
    setCurrent,
  } = useFetchDataWithPagination<IJob>(getJobsApi, 8)

  const { renderPageNumbers, handlePrevious, handleNext } = usePagination({
    total,
    current,
    pageSize,
    onPageChange: setCurrent,
  })

  return (
    <>
      <div className="max-w-7xl mx-auto p-4 mt-8">
        <div className="flex flex-row justify-between">
          <h2 className="text-4xl font-medium mb-8 text-center">
            Công việc mới nhất
          </h2>
          <div>
            <PaginationComponent
              current={current}
              onPageChange={setCurrent}
              renderPageNumbers={renderPageNumbers}
              handlePrevious={handlePrevious}
              handleNext={handleNext}
            />
          </div>
        </div>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {jobs &&
              jobs.map(
                ({ _id, name, company, salary, location, updatedAt }) => (
                  <JobCard
                    key={_id!}
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
