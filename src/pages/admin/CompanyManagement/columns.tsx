import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, FilePenLine, Trash2 } from 'lucide-react'

import { ICompany } from '../../../interfaces/schemas'
import dayjs from 'dayjs'
import { shortenObjectId } from '../../../utils/helpers'
import { Button } from '../../../components/ui/button'

// Extend the ColumnMeta interface
declare module '@tanstack/react-table' {
  interface ColumnMeta<TData, TValue> {
    width?: string
  }
}

// export type ICompanyTableData = Pick<
//   ICompany,
//   '_id' | 'name' | 'address' | 'createdAt' | 'updatedAt'
// >

export const columnWidths = {
  _id: 'w-[150px]',
  name: 'w-[200px]',
  address: 'w-[350px]',
  createdAt: 'w-[200px]',
  updatedAt: 'w-[200px]',
  actions: 'w-[100px]',
}

export const columns = (
  setSort: (sortQuery: string) => void,
  handleEdit: (company: ICompany) => void,
  handleDelete: (companyId: string | undefined) => void
): ColumnDef<ICompany>[] => [
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
    id: 'address',
    accessorKey: 'address',
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
        Address
        <ArrowUpDown className="h-4 w-4" />
      </button>
    ),
    meta: {
      width: columnWidths['address'],
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
          <Button onClick={() => handleEdit(row.original)} variant="ghost">
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
