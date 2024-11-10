import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, FilePenLine, Trash2 } from 'lucide-react'

import { IJob } from '../../../interfaces/schemas'
import dayjs from 'dayjs'
import { formatSalary, shortenObjectId } from '../../../utils/helpers'
import { Button } from '../../../components/ui/button'
import { Badge } from '../../../components/ui/badge'

// Extend the ColumnMeta interface
declare module '@tanstack/react-table' {
  interface ColumnMeta<TData, TValue> {
    width?: string
  }
}

export const columnWidths = {
  _id: 'w-[100px]',
  name: 'w-[450px]',
  salary: 'w-[150px]',
  level: 'w-[100px]',
  isActive: 'w-[100px]',
  createdAt: 'w-[150px]',
  updatedAt: 'w-[150px]',
  actions: 'w-[100px]',
}

export const columns = (
  setSort: (sortQuery: string) => void,
  handleEdit: (jobId: string | undefined) => void,
  handleDelete: (jobId: string | undefined) => void
): ColumnDef<IJob>[] => [
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
    id: 'name',
    accessorKey: 'name',
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
        Name
        <ArrowUpDown className="h-4 w-4" />
      </button>
    ),
    meta: {
      width: columnWidths['name'],
    },
  },
  {
    id: 'salary',
    accessorKey: 'salary',
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
        Salary
        <ArrowUpDown className="h-4 w-4" />
      </button>
    ),
    cell: ({ row }) => `${formatSalary(row.original.salary)} đ`,
    meta: {
      width: columnWidths['salary'],
    },
  },
  {
    id: 'level',
    accessorKey: 'level',
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
        Level
        <ArrowUpDown className="h-4 w-4" />
      </button>
    ),
    cell: ({ row }) => (
      <Badge className="font-normal bg-gray-100 text-gray-800 hover:bg-gray-50">
        {row.original.level}
      </Badge>
    ),
    meta: {
      width: columnWidths['level'],
    },
  },
  {
    id: 'isActive',
    accessorKey: 'isActive',
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
    cell: ({ row }) =>
      row.original.isActive ? (
        <Badge className="font-normal bg-green-200 text-green-700 hover:bg-green-100">
          ACTIVE
        </Badge>
      ) : (
        <Badge className="font-normal bg-red-200 text-red-700 hover:bg-red-100">
          INACTIVE
        </Badge>
      ),
    // (
    //   <Badge className="font-normal bg-gray-100 text-gray-800 hover:bg-gray-50">
    //     {row.original.isActive}
    //   </Badge>
    // ),
    meta: {
      width: columnWidths['level'],
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
      dayjs(row.original.createdAt).format('DD-MM-YYYY HH:mm:ss'),
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
        <div className="flex flex-row justify-center">
          <Button onClick={() => handleEdit(row.original._id)} variant="ghost">
            <FilePenLine className="h-4 w-4" />
          </Button>
          <Button
            onClick={() => handleDelete(row.original._id)}
            variant="ghost"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      )
    },
  },
]
