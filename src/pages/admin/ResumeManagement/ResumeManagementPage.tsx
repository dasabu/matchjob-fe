import { columns } from './columns'
import { useFetchDataWithPagination } from '../../../hooks/useFetchDataWithPagination'
import { ICompany, IJob, IResume } from '../../../interfaces/schemas'
import { usePagination } from '../../../hooks/usePagination'
import { useEffect, useState } from 'react'
import { PAGINATION_OPTIONS } from '../../../utils/constants'
import { DataTable } from '../../../components/ui/data-table'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../components/ui/select'
import PaginationComponent from '../../../components/PaginationComponent'
import { getResumesApi, deleteResumeApi } from '../../../apis/resume.api'
import { useQuery } from '@tanstack/react-query'
import { getCompaniesApi } from '../../../apis/company.api'
import { getJobsApi } from '../../../apis/job.api'
import { toast } from '../../../hooks/use-toast'

export default function CompanyManagementPage() {
  // Pagination
  const [rowsPerPage, setRowsPerPage] = useState<number>(10)

  const [companies, setCompanies] = useState<ICompany[]>([])
  const [jobs, setJobs] = useState<IJob[]>([])

  const { data: fetchedCompanies } = useQuery({
    queryKey: ['companies'],
    queryFn: async () => await getCompaniesApi('current=1&pageSize=100'),
  })

  const { data: fetchedJobs } = useQuery({
    queryKey: ['jobs'],
    queryFn: async () => await getJobsApi('current=1&pageSize=100'),
  })

  useEffect(() => {
    if (fetchedCompanies?.data.data?.result) {
      setCompanies(fetchedCompanies?.data.data?.result)
    }
  }, [fetchedCompanies?.data.data?.result])

  useEffect(() => {
    if (fetchedJobs?.data.data?.result) {
      setJobs(fetchedJobs?.data.data?.result)
    }
  }, [fetchedJobs?.data.data?.result])

  const {
    data,
    total,
    current,
    pageSize,
    setCurrent,
    setPageSize,
    setSort,
    refetch,
  } = useFetchDataWithPagination<IResume>(getResumesApi, rowsPerPage)

  const { renderPageNumbers, handlePrevious, handleNext } = usePagination({
    current,
    pageSize,
    total,
    onPageChange: setCurrent,
    maxVisiblePages: 2,
  })

  useEffect(() => {
    setPageSize(rowsPerPage)
    setCurrent(1)
  }, [rowsPerPage])

  // Implement handleView function
  const handleView = (resumeUrl: string) => {
    const url = `http://localhost:8000/images/resume/${resumeUrl}`
    window.open(url, '_blank')
  }

  // Implement handleDelete function
  const handleDelete = async (resumeId: string | undefined) => {
    if (!resumeId) return
    try {
      const response = await deleteResumeApi(resumeId)
      if (
        response.data.statusCode === 200 ||
        response.data.statusCode === 201
      ) {
        toast({
          title: 'Xóa resume thành công',
          description: response.data.message,
        })
        // Refetch data after deletion
        refetch()
      } else {
        toast({
          title: 'Không thể xóa resume',
          description: response.data.message,
          variant: 'destructive',
        })
      }
    } catch (error: any) {
      toast({
        title: 'Có lỗi xảy ra khi xóa resume',
        description: error.response?.data?.message || error.message,
        variant: 'destructive',
      })
    }
  }

  return (
    <div className="max-w-7xl mx-auto lg:p-10 p-4">
      {/* Filtering */}

      {/* Functions */}
      <div className="flex flex-row justify-between items-center mb-3">
        {/* Select pagination options */}
        <div className="flex flex-row items-center">
          <p className="text-sm font-light block min-w-[100px]">
            Rows per page
          </p>{' '}
          <Select
            value={rowsPerPage.toString()}
            onValueChange={(value) => setRowsPerPage(parseInt(value))}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={rowsPerPage} />
            </SelectTrigger>
            <SelectContent>
              {PAGINATION_OPTIONS.map((option) => (
                <SelectItem
                  key={option}
                  value={`${option}`}
                  onClick={() => setRowsPerPage(option)}
                >
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {/* Pagination component */}
        <div>
          <PaginationComponent
            current={current}
            onPageChange={setCurrent}
            renderPageNumbers={renderPageNumbers}
            handleNext={handleNext}
            handlePrevious={handlePrevious}
          />
        </div>
      </div>
      {/* Main table */}
      <div className="mb-4">
        {data && (
          <DataTable
            columns={columns(
              setSort,
              companies,
              jobs,
              handleView,
              handleDelete
            )}
            data={data}
          />
        )}
      </div>
    </div>
  )
}
