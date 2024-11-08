import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  // // Pagination
  // getPaginationRowModel,
  // // Sorting
  // SortingState,
  // getSortedRowModel,
  // // Filtering
  // ColumnFiltersState,
  // getFilteredRowModel,
  // // Visibility
  // VisibilityState,
} from '@tanstack/react-table'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table'

interface IDataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

// const PAGINATION_OPTIONS = [3, 5, 10, 15, 20, 30, 40, 50]

export function DataTable<TData, TValue>({
  columns,
  data,
}: IDataTableProps<TData, TValue>) {
  // // For sorting
  // const [sorting, setSorting] = React.useState<SortingState>([])
  // // For filtering
  // const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
  //   []
  // )
  // // For visibility
  // const [columnVisibility, setColumnVisibility] =
  //   React.useState<VisibilityState>({})

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    // // Pagination
    // getPaginationRowModel: getPaginationRowModel(),
    // // Sorting
    // onSortingChange: setSorting,
    // getSortedRowModel: getSortedRowModel(),
    // // Filtering
    // onColumnFiltersChange: setColumnFilters,
    // getFilteredRowModel: getFilteredRowModel(),
    // // Visibility
    // onColumnVisibilityChange: setColumnVisibility,
    // state: {
    //   sorting,
    //   columnFilters,
    //   columnVisibility,
    // },
  })

  return (
    <div>
      {/* Filtering && Visibility */}
      <div className="flex items-center">
        {/* Filtering */}
        {/* Visibility */}
        {/* <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="font-normal ml-auto">
              Columns
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu> */}
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  // Get width from column meta
                  const widthClass =
                    header.column.columnDef.meta?.width || 'w-auto'
                  return (
                    <TableHead
                      key={header.id}
                      className={`${widthClass} border-r last:border-r-0 border-gray-200`}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {/* Pagination */}
      {/* <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{' '}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="flex items-center space-x-6 lg:space-x-8">
          <div className="flex items-center space-x-2">
            <p className="text-sm font-light">Rows per page</p>
            <Select
              value={`${table.getState().pagination.pageSize}`}
              onValueChange={(value) => {
                table.setPageSize(Number(value))
              }}
            >
              <SelectTrigger className="h-8 w-[70px]">
                <SelectValue
                  placeholder={table.getState().pagination.pageSize}
                />
              </SelectTrigger>
              <SelectContent side="top">
                {PAGINATION_OPTIONS.map((pageSize) => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex w-[100px] items-center justify-center text-sm font-light">
            Page {table.getState().pagination.pageIndex + 1} /{' '}
            {table.getPageCount()}
          </div>

          <div className="flex flex-row items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronsLeft />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <ChevronsRight />
            </Button>
          </div>
        </div>
      </div> */}
    </div>
  )
}
