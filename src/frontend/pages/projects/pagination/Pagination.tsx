import React, { FC } from "react"
import ReactPaginate from "react-paginate"
import "./Pagination.css"
import { useBackend, useQueryParams } from "@/hooks/_index"
import { LoadingModal } from "@/modals/_index"
import { RefreshProjectsArgs } from "@/state/_types/curated_projects_types"

// state
import { useAppSelector } from "@/hooks/useRedux"
import { selectPaginated, selectPaginatedIsLoading } from "@/state/projects/paginated"

const Pagination: FC = (): JSX.Element => {
  const { refreshPaginated } = useBackend()
  const { searchQuery, selectedPage, itemsPerPage, category } = useQueryParams()
  const isLoading = useAppSelector(selectPaginatedIsLoading)

  // pagination
  const paginated = useAppSelector(selectPaginated)
  const projects = paginated.data
  const totalItems = paginated.totalItems
  const totalPages = paginated.totalPages
  const startIndex = paginated.startIndex
  const endIndex = paginated.endIndex

  const handlePageClick = async (event: any): Promise<void> => {
    try {
      const args: RefreshProjectsArgs = {
        category,
        // filterByOpenSource: openSource === "true" ? [true] : openSource === "false" ? [false] : [],
        // filterByOnchain: onChain === "true" ? [true] : onChain === "false" ? [false] : [],
        // sort: getSort(sort),
        selectedPage: event.selected + 1,
        itemsPerPage,
      }
      await refreshPaginated(args)
    } catch (error) {
      throw new Error(error)
    }
  }

  if (projects.length < 1) {
    return null
  }

  if (searchQuery) {
    return null
  }

  return (
    <div className="pagination">
      <LoadingModal isOpen={isLoading} />
      {totalItems > itemsPerPage && (
        <div className="main">
          <span>
            {totalItems.toString()} total items, showing {(startIndex + 1).toString()}-
            {endIndex < totalItems ? endIndex.toString() : totalItems.toString()} items
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
            forcePage={selectedPage - 1}
          />
        </div>
      )}
    </div>
  )
}

export default Pagination
