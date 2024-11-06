import { ColumnDef } from '@tanstack/react-table'

import { ArrowUpDown, FilePenLine, Trash2 } from 'lucide-react'
import { Button } from '../../ui/button'

export type Payment = {
  _id: string
  amount: number
  status: 'pending' | 'processing' | 'success' | 'failed'
  email: string
}

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: 'status',
    header: 'Status',
  },
  {
    accessorKey: 'email',
    // Sorting
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: 'amount',
    // Cell formatting
    header: 'Amount',
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('amount'))
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(amount)

      return <div className="font-normal">{formatted}</div>
    },
  },
  {
    id: 'actions',
    header: () => <div className="text-center">Actions</div>,
    cell: ({ row }) => {
      return (
        <div className="flex flex-row justify-center">
          <Button variant="ghost">
            <FilePenLine className="h-4 w-4" />
          </Button>
          <Button variant="ghost">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      )
    },
  },
]
