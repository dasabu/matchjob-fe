import { getCompaniesApi } from '../../apis/company.api'
import CompanyCard from '../../components/CompanyCard'
import PaginationComponent from '../../components/PaginationComponent'
import { useFetchDataWithPagination } from '../../hooks/useFetchDataWithPagination'
import { usePagination } from '../../hooks/usePagination'
import { ICompany } from '../../interfaces/schemas'

export default function CompanyListPage() {
  const {
    data: companies,
    total,
    current,
    pageSize,
    setCurrent,
  } = useFetchDataWithPagination<ICompany>(getCompaniesApi, 8)

  const { renderPageNumbers, handlePrevious, handleNext } = usePagination({
    total,
    current,
    pageSize,
    onPageChange: setCurrent,
  })

  return (
    <div className="max-w-7xl mx-auto p-4 mt-8">
      <div className="flex flex-row justify-between">
        <h2 className="text-4xl font-medium mb-8 text-center">
          Nhà tuyển dụng hàng đầu
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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {companies &&
            companies.map(({ _id, name, logo }) => (
              <CompanyCard key={_id!} _id={_id!} name={name!} logo={logo} />
            ))}
        </div>
      </div>
    </div>
  )
}
