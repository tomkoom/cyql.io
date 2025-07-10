import { useProjects, useQueryParams } from "@/hooks"
import { LoadingModal } from "@/modals"
import React, { FC } from "react"
import ReactPaginate from "react-paginate"
import "./Pagination.css"

// state
import { useAppSelector } from "@/hooks/useRedux"
import { selectPaginated, selectPaginatedIsLoading } from "@/state/projects/paginated"

const Pagination: FC = (): JSX.Element => {
  const { refreshPaginated } = useProjects()
  const { queryParams } = useQueryParams()
  const isLoading = useAppSelector(selectPaginatedIsLoading)
  const page = queryParams.selectedPage - 1

  // pagination
  const paginated = useAppSelector(selectPaginated)
  const projects = paginated.data
  const totalItems = paginated.totalItems
  const totalPages = paginated.totalPages
  const startIndex = paginated.startIndex
  const endIndex = paginated.endIndex

  const handlePageClick = async (event: any): Promise<void> => {
    try {
      await refreshPaginated({
        ...queryParams,
        selectedPage: event.selected + 1,
      })
    } catch (error) {
      throw new Error(error)
    }
  }

  if (projects.length < 1) {
    return null
  }

  return (
    <div className="pagination">
      <LoadingModal isOpen={isLoading} />

      <div className="main">
        <span>
          {totalItems.toString()} total items, showing {(startIndex + 1).toString()}-{endIndex < totalItems ? endIndex.toString() : totalItems.toString()} items
        </span>

        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={totalPages}
          previousLabel="< prev"
          renderOnZeroPageCount={null}
          // styles
          containerClassName="containerClassName"
          pageLinkClassName="pageLinkClassName"
          previousLinkClassName="previousLinkClassName"
          nextLinkClassName="nextLinkClassName"
          breakLinkClassName="breakLinkClassName"
          // ...
          activeLinkClassName="activeLinkClassName"
          // sync components
          forcePage={page}
        />
      </div>
    </div>
  )
}

export default Pagination
