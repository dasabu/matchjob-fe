import { Link } from 'react-router-dom'
import JobSearchForm from '../../components/JobSearchForm'
import { Separator } from '../../components/ui/separator'
import CompanyCard from '../../components/CompanyCard'
import { useFetchDataWithPagination } from '../../hooks/useFetchDataWithPagination'
import { getCompaniesApi } from '../../apis/company.api'
import { ICompany, IJob } from '../../interfaces/schemas'
import { getJobsApi } from '../../apis/job.api'
import JobCard from '../../components/JobCard'

export default function HomePage() {
  const { data: companies } = useFetchDataWithPagination<ICompany>(
    getCompaniesApi,
    4
  )

  const { data: jobs } = useFetchDataWithPagination<IJob>(getJobsApi, 6)

  return (
    <div className="max-w-7xl mx-auto p-4">
      {/* Hero Section */}
      <div className="flex flex-col items-center">
        <h1 className="text-6xl font-medium text-[#ea1e30] mb-10 mt-20">
          MatchJob
        </h1>
        <h2 className="text-4xl font-medium mb-8">Việc Làm IT Cho Developer</h2>
        <JobSearchForm />
      </div>
      {/* Separator */}
      <Separator />
      {/* Newest Jobs */}
      <div className="px-2 py-4 mt-12 mb-16">
        <div className="flex flex-row justify-between items-center mb-4">
          <h2 className="text-4xl font-medium mb-2">Công việc mới nhất</h2>
          <Link
            to="/jobs"
            className="text-blue-500 font-normal hover:underline"
          >
            Xem tất cả
          </Link>
        </div>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {jobs &&
              jobs.map((job) => (
                <JobCard
                  key={job._id!}
                  _id={job._id!}
                  logo={job.company?.logo!}
                  name={job.name}
                  salary={job.salary}
                  location={job.location}
                  updatedAt={job.updatedAt!}
                />
              ))}
          </div>
        </div>
      </div>
      {/* Separator */}
      <Separator />
      {/* Top Companies */}
      <div className="px-2 py-4 mt-12 mb-16">
        <div className="flex flex-row justify-between items-center mb-4">
          <h2 className="text-4xl font-medium mb-2">Nhà tuyển dụng hàng đầu</h2>
          <Link
            to="/companies"
            className="text-blue-500 font-normal hover:underline"
          >
            Xem tất cả
          </Link>
        </div>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {companies &&
              companies.map(({ _id, name, logo }) => (
                <CompanyCard key={_id!} _id={_id!} name={name!} logo={logo} />
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}
