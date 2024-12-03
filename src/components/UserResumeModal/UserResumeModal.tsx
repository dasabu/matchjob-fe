import { getResumeByUserApi } from '../../apis/resume.api'
import { useQuery } from '@tanstack/react-query'
import { IResume } from '../../interfaces/schemas'
import { ColumnDef } from '@tanstack/react-table'
import { shortenObjectId } from '../../utils/helpers'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog'
import { DataTable } from '../ui/data-table'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { Badge } from '../ui/badge'

interface IUserResumeModalProps {
  open: boolean
  onOpenChange: (v: boolean) => void
}

export default function UserResumeModal({
  open,
  onOpenChange,
}: IUserResumeModalProps) {
  // Fetch data using react-query
  const { data, isLoading, isError } = useQuery({
    queryKey: ['user-resumes'],
    queryFn: async () => await getResumeByUserApi(),
  })

  const [resumes, setResumes] = useState<IResume[]>([])

  useEffect(() => {
    if (data?.data) {
      setResumes(data.data)
    }
  }, [data?.data])

  // Define table columns
  const columns: ColumnDef<IResume>[] = [
    {
      id: '_id',
      accessorKey: '_id',
      header: 'ID',
      cell: ({ row }) => shortenObjectId(row.original._id),
    },
    {
      id: 'companyId',
      accessorKey: 'companyId',
      header: 'Công ty',
      cell: ({ row }) => row.original.companyId.name,
    },
    {
      id: 'jobId',
      accessorKey: 'jobId',
      header: 'Công việc',
      cell: ({ row }) => row.original.jobId?.name,
    },
    {
      id: 'status',
      accessorKey: 'status',
      header: 'Trạng thái',
      cell: ({ row }) => (
        <Badge className="font-light">{row.original.status}</Badge>
      ),
    },
    {
      id: 'createdAt',
      accessorKey: 'createdAt',
      header: 'Ngày tạo',
      cell: ({ row }) =>
        dayjs(row.original.createdAt).format('DD-MM-YYYY HH:mm:ss'),
    },
    {
      id: 'actions',
      cell: ({ row }) => (
        <a
          href={`http://localhost:8000/images/resume/${row.original.url}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          Chi tiết
        </a>
      ),
    },
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Danh sách CV</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          {isLoading && <p>Đang tải dữ liệu...</p>}
          {isError && (
            <p className="text-red-500">
              Không thể tải danh sách CV. Vui lòng thử lại sau.
            </p>
          )}
          {data?.data ? (
            <DataTable data={resumes.data} columns={columns} />
          ) : (
            !isLoading && <p>Không có CV nào</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
