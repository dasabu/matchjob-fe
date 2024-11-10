import { columns } from './columns'

import { deleteCompanyApi } from '../../../apis/company.api'
import { useFetchDataWithPagination } from '../../../hooks/useFetchDataWithPagination'
import { ICompany, IJob } from '../../../interfaces/schemas'
import { usePagination } from '../../../hooks/usePagination'
import { useEffect, useState } from 'react'

import { LEVEL_LIST, PAGINATION_OPTIONS } from '../../../utils/constants'

import { Plus, RotateCcw } from 'lucide-react'
import { Input } from '../../../components/ui/input'
import { Button } from '../../../components/ui/button'
import { DataTable } from '../../../components/ui/data-table'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../components/ui/select'
import PaginationComponent from '../../../components/PaginationComponent'
import { toast } from '../../../hooks/use-toast'
import { getJobsApi } from '../../../apis/job.api'
import { useNavigate } from 'react-router'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '../../../components/ui/breadcrumb'
import { Link } from 'react-router-dom'

export default function CompanyManagementPage() {
  const navigate = useNavigate()
  // Pagination
  const [rowsPerPage, setRowsPerPage] = useState<number>(10)
  // Filtering
  const [searchParams, setSearchParams] = useState({
    name: '',
    salary: '',
    level: '',
  })

  const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false)
  const [deletedJobId, setDeletedJobId] = useState<string | undefined>()

  const {
    data,
    total,
    current,
    pageSize,
    setCurrent,
    setPageSize,
    setFilter,
    setSort,
    refetch,
  } = useFetchDataWithPagination<IJob>(getJobsApi, rowsPerPage)

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

  const handleSearchChange = (
    field: 'name' | 'salary' | 'level',
    value: string
  ) => {
    setSearchParams((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSearchSubmit = () => {
    const filter: Record<string, string> = {}
    if (searchParams.name) {
      filter.name = `/${searchParams.name}/i`
    }
    if (searchParams.salary) {
      filter.salary = `/${searchParams.salary}/i`
    }
    if (searchParams.level) {
      filter.level = `/${searchParams.level}/i`
    }
    setFilter(filter)
    setCurrent(1)
  }

  const handleEditJob = (jobId: string | undefined) => {
    navigate(`upsert?id=${jobId}`)
  }

  const handleDeleteJob = (jobId: string | undefined) => {
    setDeletedJobId(jobId)
    setIsOpenDialog(true)
  }

  return (
    <div className="max-w-7xl mx-auto lg:p-10 p-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink className="font-normal">
              <Link to="/admin/jobs">Job Management</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      {/* Filtering */}
      <div className="flex flex-row justify-evenly mt-6 mb-8 gap-2 items-center">
        <Input
          placeholder="Tên công việc..."
          value={searchParams.name}
          onChange={(e) => handleSearchChange('name', e.target.value)}
        />
        <Input
          placeholder="Mức lương..."
          value={searchParams.salary}
          onChange={(e) => handleSearchChange('salary', e.target.value)}
        />

        <Select
          value={searchParams.level}
          onValueChange={(value) => handleSearchChange('level', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Level..." />
          </SelectTrigger>
          <SelectContent>
            {LEVEL_LIST.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button onClick={handleSearchSubmit}>Tìm kiếm</Button>
      </div>
      {/* Functions */}
      <div className="flex flex-row justify-between items-center mb-3">
        {/* Functional buttons */}
        <div className="flex flex-row gap-2">
          <Button
            className="flex flex-row items-center justify-center"
            onClick={() => navigate('upsert')}
          >
            <Plus className="h-4 w-4" />
            Thêm công việc
          </Button>
          <Button
            variant="ghost"
            className="flex flex-row items-center justify-center"
            onClick={() => refetch()}
          >
            <RotateCcw className="h-4 w-4" />
            Refresh
          </Button>
        </div>
        {/* Pagination component */}
        <PaginationComponent
          current={current}
          onPageChange={setCurrent}
          renderPageNumbers={renderPageNumbers}
          handleNext={handleNext}
          handlePrevious={handlePrevious}
        />
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
      </div>
      {/* Main table */}
      <div className="mb-4">
        {data && (
          <DataTable
            columns={columns(setSort, handleEditJob, handleDeleteJob)}
            data={data}
          />
        )}
      </div>
      {/* Delete company alert dialog */}
      {/* <CompanyDeleteDialog
        isOpenDialog={isOpenDialog}
        setIsOpenDialog={setIsOpenDialog}
        onConfirm={confirmDeleteCompany}
        onCancel={() => {
          setIsOpenDialog(false)
          setDeletedCompanyId(undefined)
        }}
      /> */}
    </div>
  )
}
