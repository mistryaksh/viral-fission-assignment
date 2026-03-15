import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import type { IVideoPaginationProps } from "@/interface"
import type { FC } from "react"

export const VideoPagination: FC<{
  pagination: IVideoPaginationProps
  page: number
  setPage: React.Dispatch<React.SetStateAction<number>>
}> = ({ pagination, page, setPage }) => {
  return (
    <Pagination className="flex justify-end">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => pagination.hasPrev && setPage((prev) => prev - 1)}
            className={
              !pagination.hasPrev
                ? "pointer-events-none opacity-50"
                : "cursor-pointer"
            }
          />
        </PaginationItem>

        {Array.from({ length: pagination.totalPages }, (_, index) => {
          const pageNumber = index + 1

          return (
            <PaginationItem key={pageNumber}>
              <PaginationLink
                isActive={page === pageNumber}
                onClick={() => setPage(pageNumber)}
              >
                {pageNumber}
              </PaginationLink>
            </PaginationItem>
          )
        })}

        <PaginationItem>
          <PaginationNext
            onClick={() => pagination.hasNext && setPage((prev) => prev + 1)}
            className={
              !pagination.hasNext
                ? "pointer-events-none opacity-50"
                : "cursor-pointer"
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
