import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, Eye, Trash2 } from 'lucide-react'

import { ICompany, IJob, IResume } from '../../../interfaces/schemas'
import dayjs from 'dayjs'
import { toast } from '../../../hooks/use-toast'
import { useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '../../../components/ui/select'
import { RESUME_STATUSES } from '../../../utils/constants'
import { updateResumeStatusApi } from '../../../apis/resume.api'
import { shortenObjectId } from '../../../utils/helpers'
import { Button } from '../../../components/ui/button'

// Extend the ColumnMeta interface
declare module '@tanstack/react-table' {
  interface ColumnMeta<TData, TValue> {
    width?: string
  }
}

export const columnWidths = {
  _id: 'w-[100px]',
  email: 'w-[150px]',
  status: 'w-[150px]',
  job: 'w-[300px]',
  company: 'w-[100px]',
  createdAt: 'w-[150px]',
  updatedAt: 'w-[150px]',
  actions: 'w-[100px]',
}

export const columns = (
  setSort: (sortQuery: string) => void,
  companies: ICompany[],
  jobs: IJob[],
  handleView: () => void,
  handleDelete: (id: string | undefined) => void
): ColumnDef<IResume>[] => [
  {
    id: '_id',
    accessorKey: '_id',
    header: 'ID',
    meta: {
      width: columnWidths['_id'],
    },
    cell: ({ row }) => shortenObjectId(row.original._id),
  },
  {
    id: 'email',
    accessorKey: 'email',
    header: ({ column }) => (
      <button
        className="flex flex-row gap-2 px-2 py-1 rounded-lg hover:bg-accent hover:text-accent-foreground"
        onClick={() => {
          if (column.getIsSorted() === 'asc') {
            setSort(`-${column.id}`)
          } else {
            setSort(column.id)
          }
          column.toggleSorting(column.getIsSorted() === 'asc')
        }}
      >
        Email
        <ArrowUpDown className="h-4 w-4" />
      </button>
    ),
    meta: {
      width: columnWidths['email'],
    },
  },
  {
    id: 'status',
    accessorKey: 'status',
    header: ({ column }) => (
      <button
        className="flex flex-row gap-2 px-2 py-1 rounded-lg hover:bg-accent hover:text-accent-foreground"
        onClick={() => {
          if (column.getIsSorted() === 'asc') {
            setSort(`-${column.id}`)
          } else {
            setSort(column.id)
          }
          column.toggleSorting(column.getIsSorted() === 'asc')
        }}
      >
        Status
        <ArrowUpDown className="h-4 w-4" />
      </button>
    ),
    meta: {
      width: columnWidths['status'],
    },
    cell: ({ row }) => {
      const { _id: resumeId, status: resumeStatus } = row.original
      const [currentStatus, setCurrentStatus] = useState<string>(resumeStatus)

      const handleChange = async (newStatus: string) => {
        if (newStatus === currentStatus) return
        try {
          const response = await updateResumeStatusApi(resumeId, newStatus)
          if (
            response.data.statusCode === 200 ||
            response.data.statusCode === 201
          ) {
            toast({
              title:
                response.data.message ||
                'Cập nhật trạng thái Resume thành công',
            })
            setCurrentStatus(newStatus)
          } else {
            toast({
              title: 'Cập nhật trạng thái Resume thất bại',
              description: response.data.message,
              variant: 'destructive',
            })
          }
        } catch (error: any) {
          toast({
            title: 'Có lỗi xảy ra trong quá trình cập nhật trạng thái Resume',
            description: error.response?.data?.message,
            variant: 'destructive',
          })
        }
      }

      return (
        <Select value={currentStatus} onValueChange={handleChange}>
          <SelectTrigger className="w-full">{currentStatus}</SelectTrigger>
          <SelectContent>
            {RESUME_STATUSES.map((status) => (
              <SelectItem key={status} value={status}>
                {status}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )
    },
  },
  {
    id: 'jobId',
    accessorKey: 'jobId',
    header: ({ column }) => (
      <button
        className="flex flex-row gap-2 px-2 py-1 rounded-lg hover:bg-accent hover:text-accent-foreground"
        onClick={() => {
          if (column.getIsSorted() === 'asc') {
            setSort(`-${column.id}`)
          } else {
            setSort(column.id)
          }
          column.toggleSorting(column.getIsSorted() === 'asc')
        }}
      >
        Job
        <ArrowUpDown className="h-4 w-4" />
      </button>
    ),
    meta: {
      width: columnWidths['job'],
    },
    cell: ({ row }) => {
      const jobId = row.original.jobId
      return jobs.find((job) => job._id === jobId)?.name
    },
  },
  {
    id: 'companyId',
    accessorKey: 'companyId',
    header: ({ column }) => (
      <button
        className="flex flex-row gap-2 px-2 py-1 rounded-lg hover:bg-accent hover:text-accent-foreground"
        onClick={() => {
          if (column.getIsSorted() === 'asc') {
            setSort(`-${column.id}`)
          } else {
            setSort(column.id)
          }
          column.toggleSorting(column.getIsSorted() === 'asc')
        }}
      >
        Company
        <ArrowUpDown className="h-4 w-4" />
      </button>
    ),
    meta: {
      width: columnWidths['company'],
    },
    cell: ({ row }) => {
      const companyId = row.original.companyId
      return companies.find((company) => company._id === companyId)?.name
    },
  },
  {
    id: 'createdAt',
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <button
        className="flex flex-row gap-2 px-2 py-1 rounded-lg hover:bg-accent hover:text-accent-foreground"
        onClick={() => {
          if (column.getIsSorted() === 'asc') {
            setSort(`-${column.id}`)
          } else {
            setSort(column.id)
          }
          column.toggleSorting(column.getIsSorted() === 'asc')
        }}
      >
        Created At
        <ArrowUpDown className="h-4 w-4" />
      </button>
    ),
    meta: {
      width: columnWidths['createdAt'],
    },
    cell: ({ row }) =>
      dayjs(row.original.updatedAt).format('DD-MM-YYYY HH:mm:ss'),
  },
  {
    id: 'updatedAt',
    accessorKey: 'updatedAt',
    header: ({ column }) => (
      <button
        className="flex flex-row gap-2 px-2 py-1 rounded-lg hover:bg-accent hover:text-accent-foreground"
        onClick={() => {
          if (column.getIsSorted() === 'asc') {
            setSort(`-${column.id}`)
          } else {
            setSort(column.id)
          }
          column.toggleSorting(column.getIsSorted() === 'asc')
        }}
      >
        Updated At
        <ArrowUpDown className="h-4 w-4" />
      </button>
    ),
    meta: {
      width: columnWidths['updatedAt'],
    },
    cell: ({ row }) =>
      dayjs(row.original.updatedAt).format('DD-MM-YYYY HH:mm:ss'),
  },
  {
    id: 'actions',
    accessorKey: 'actions',
    header: () => <div className="text-center">Actions</div>,
    meta: {
      width: columnWidths['actions'],
    },
    cell: ({ row }) => {
      return (
        <div className="flex flex-row justify-center space-x-2">
          <Button
            onClick={() => handleView(row.original.url)}
            variant="ghost"
            size="icon"
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button
            onClick={() => handleDelete(row.original._id)}
            variant="ghost"
            size="icon"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      )
    },
  },
]
