import { columns } from './columns'

import { useFetchDataWithPagination } from '../../../hooks/useFetchDataWithPagination'
import { IUser } from '../../../interfaces/schemas'
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
import { toast } from '../../../hooks/use-toast'
import { deleteUserApi, getUsersApi } from '../../../apis/user.api'
import UserUpsertModal from '../../../components/admin/UserUpsertModal'
import ConfirmationDeleteDialog from '../../../components/admin/ConfirmationDeleteDialog'

export default function CompanyManagementPage() {
  // Pagination
  const [rowsPerPage, setRowsPerPage] = useState<number>(10)
  // Filtering
  const [searchParams, setSearchParams] = useState({
    name: '',
    email: '',
  })
  // Create/Update User Modal
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
  const [userData, setUserData] = useState<IUser | null>(null)

  // Delete User Alert Dialog
  const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false)
  const [deletedUserId, setDeletedUserId] = useState<string | undefined>()

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
  } = useFetchDataWithPagination<IUser>(getUsersApi, rowsPerPage)

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

  const handleSearchChange = (field: 'name' | 'email', value: string) => {
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
    if (searchParams.email) {
      filter.address = `/${searchParams.email}/i`
    }
    setFilter(filter)
    setCurrent(1)
  }

  const handleAddUser = () => {
    setUserData(null)
    setIsOpenModal(true)
  }

  const handleEditUser = (user: IUser) => {
    setUserData(user)
    setIsOpenModal(true)
  }

  const handleDeleteUser = (userId: string | undefined) => {
    setDeletedUserId(userId)
    setIsOpenDialog(true)
  }

  const confirmDeleteUser = async () => {
    if (deletedUserId) {
      try {
        const response = await deleteUserApi(deletedUserId)
        if (
          response?.data?.statusCode === 200 ||
          response?.data?.statusCode === 201
        ) {
          toast({ title: response.data.message || 'Xoá người dùng thành công' })
          refetch()
        } else {
          toast({
            title:
              response.data.message ||
              'Có lỗi xảy ra trong quá trình xoá người dùng',
            variant: 'destructive',
          })
        }
      } catch (error: any) {
        toast({
          title:
            error.response?.data?.message ||
            'Có lỗi xảy ra trong quá trình xoá người dùng',
          variant: 'destructive',
        })
      }
    } else {
      toast({ title: 'Không tìm thấy người dùng', variant: 'destructive' })
    }
  }

  return (
    <div className="max-w-7xl mx-auto lg:p-10 p-4">
      {/* Filtering */}
      <div className="flex flex-row justify-evenly mb-8 gap-2 items-center">
        <Input
          placeholder="Tên người dùng..."
          value={searchParams.name}
          onChange={(e) => handleSearchChange('name', e.target.value)}
        />
        <Input
          placeholder="Email..."
          value={searchParams.email}
          onChange={(e) => handleSearchChange('email', e.target.value)}
        />

        <Button onClick={handleSearchSubmit}>Tìm kiếm</Button>
      </div>
      {/* Functions */}
      <div className="flex flex-row justify-between items-center mb-3">
        {/* Functional buttons */}
        <div className="flex flex-row gap-2">
          <Button
            className="flex flex-row items-center justify-center"
            onClick={handleAddUser}
          >
            <Plus className="h-4 w-4" />
            Thêm người dùng
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
            columns={columns(setSort, handleEditUser, handleDeleteUser)}
            data={data}
          />
        )}
      </div>
      {/* Create/Update user modal */}
      <UserUpsertModal
        open={isOpenModal}
        onOpenChange={setIsOpenModal}
        userData={userData}
        setUserData={setUserData}
        refetch={refetch}
      />
      {/* Delete company alert dialog */}
      <ConfirmationDeleteDialog
        isOpenDialog={isOpenDialog}
        setIsOpenDialog={setIsOpenDialog}
        onConfirm={confirmDeleteUser}
        onCancel={() => {
          setIsOpenDialog(false)
          setDeletedUserId(undefined)
          refetch()
        }}
      />
    </div>
  )
}
