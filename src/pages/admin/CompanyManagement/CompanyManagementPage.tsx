import { columns } from './columns'

import { deleteCompanyApi, getCompaniesApi } from '../../../apis/company.api'
import { useFetchDataWithPagination } from '../../../hooks/useFetchDataWithPagination'
import { ICompany } from '../../../interfaces/schemas'
import { usePagination } from '../../../hooks/usePagination'
import { useEffect, useState } from 'react'

import { PAGINATION_OPTIONS } from '../../../utils/constants'

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
import CompanyUpsertModal from '../../../components/admin/CompanyUpsertModal'
import CompanyDeleteDialog from '../../../components/admin/CompanyDeleteDialog'
import { toast } from '../../../hooks/use-toast'

export default function CompanyManagementPage() {
  // Pagination
  const [rowsPerPage, setRowsPerPage] = useState<number>(10)
  // Filtering
  const [searchParams, setSearchParams] = useState({
    name: '',
    address: '',
  })
  // Create/Update company Modal
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
  const [companyData, setCompanyData] = useState<ICompany | null>(null)

  // Delete company Alert Dialog
  const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false)
  const [deletedCompanyId, setDeletedCompanyId] = useState<string | undefined>()

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
  } = useFetchDataWithPagination<ICompany>(getCompaniesApi, rowsPerPage)

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

  const handleSearchChange = (field: 'name' | 'address', value: string) => {
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
    if (searchParams.address) {
      filter.address = `/${searchParams.address}/i`
    }
    setFilter(filter)
    setCurrent(1)
  }

  const handleAddCompany = () => {
    setCompanyData(null)
    setIsOpenModal(true)
  }

  const handleEditCompany = (company: ICompany) => {
    setCompanyData(company)
    setIsOpenModal(true)
  }

  const handleDeleteCompany = (companyId: string | undefined) => {
    setDeletedCompanyId(companyId)
    setIsOpenDialog(true)
  }

  const confirmDeleteCompany = async () => {
    if (deletedCompanyId) {
      const result = await deleteCompanyApi(deletedCompanyId)
      if (result?.data?.statusCode === 200) {
        toast({
          title: 'Success',
          description: 'Xoá công ty thành công',
        })
        refetch()
      } else {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Có lỗi xảy ra',
        })
      }
    } else {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Không tìm thấy công ty',
      })
    }
  }

  return (
    <div className="max-w-7xl mx-auto p-10">
      {/* Filtering */}
      <div className="flex flex-row justify-evenly mb-8 gap-2 items-center">
        <Input
          placeholder="Tên công ty..."
          value={searchParams.name}
          onChange={(e) => handleSearchChange('name', e.target.value)}
        />
        <Input
          placeholder="Địa chỉ..."
          value={searchParams.address}
          onChange={(e) => handleSearchChange('address', e.target.value)}
        />

        <Button onClick={handleSearchSubmit}>Tìm kiếm</Button>
      </div>
      {/* Functional buttons */}
      <div className="mb-3 flex flex-row gap-2">
        <Button
          className="flex flex-row items-center justify-center"
          onClick={handleAddCompany}
        >
          <Plus className="h-4 w-4" />
          Thêm công ty
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
      {/* Main table */}
      <div className="mb-4">
        {data && (
          <DataTable
            columns={columns(setSort, handleEditCompany, handleDeleteCompany)}
            data={data}
          />
        )}
      </div>
      {/* Pagination */}
      <div className="flex justify-end space-x-8">
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
      {/* Create/Update company modal */}
      <CompanyUpsertModal
        isOpenModal={isOpenModal}
        setIsOpenModal={setIsOpenModal}
        companyData={companyData}
        setCompanyData={setCompanyData}
      />
      {/* Delete company alert dialog */}
      <CompanyDeleteDialog
        isOpenDialog={isOpenDialog}
        setIsOpenDialog={setIsOpenDialog}
        onConfirm={confirmDeleteCompany}
        onCancel={() => {
          setIsOpenDialog(false)
          setDeletedCompanyId(undefined)
        }}
      />
    </div>
  )
}
