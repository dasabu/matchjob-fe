import { Link } from 'react-router-dom'
import JobSearchForm from '../../components/JobSearchForm'
import Navbar from '../../components/Navbar'
import { Separator } from '../../components/ui/separator'
import { useFetchCompanies } from '../../hooks/useFetchCompanies'
import CompanyCard from '../../components/CompanyCard'

export const HomePage = () => {
  const { companies } = useFetchCompanies()

  return (
    <>
      {/* Navbar */}
      <Navbar />
      {/* Hero Section */}
      <div className="flex flex-col items-center">
        <h1 className="text-6xl font-semibold text-[#ea1e30] mb-10 mt-20">
          MatchJob
        </h1>
        <h2 className="text-transform: uppercase text-4xl font-semibold mb-8">
          Việc Làm IT Cho Developer
        </h2>
        <JobSearchForm />
      </div>
      {/* Separator */}
      <Separator />
      {/* Companies */}
      <div className="max-w-7xl mx-auto p4 my-16">
        <div className="flex flex-row justify-between items-center mb-4">
          <h2 className="text-4xl font-medium mb-2">Nhà tuyển dụng hàng đầu</h2>
          <Link
            to="companies"
            className="text-blue-500 font-normal hover:underline"
          >
            Xem tất cả
          </Link>
        </div>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {companies &&
              companies.map(({ _id, name, logo }) => (
                <CompanyCard _id={_id!} name={name!} logo={logo} />
              ))}
          </div>
        </div>
      </div>
      {/* Separator */}
      <Separator />
      {/* Jobs */}
    </>
  )
}
