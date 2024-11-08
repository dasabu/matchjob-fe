import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '../../components/ui/pagination'
import { IPage } from '../../hooks/usePagination'

interface IPaginationComponentProps {
  current: number
  onPageChange: (page: number) => void
  renderPageNumbers: Array<IPage>
  handlePrevious: () => void
  handleNext: () => void
}

export default function PaginationComponent({
  current,
  onPageChange,
  renderPageNumbers,
  handlePrevious,
  handleNext,
}: IPaginationComponentProps) {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious onClick={handlePrevious} />
        </PaginationItem>
        {renderPageNumbers.map((page, index) => (
          <PaginationItem key={index}>
            {page.type === 'page' && page.number ? (
              <PaginationLink
                onClick={() => onPageChange(page.number!)}
                isActive={page.number === current}
              >
                {page.number}
              </PaginationLink>
            ) : (
              <PaginationEllipsis />
            )}
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext onClick={handleNext} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
