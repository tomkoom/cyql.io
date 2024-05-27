import React, { FC } from "react"
import ReactPaginate from "react-paginate"
import "./Pagination.css"
import { useBackend } from "@/hooks/useBackend"
import { LoadingModal } from "@/modals/_index"
import { useSearchParams } from "react-router-dom"

// state
import { useAppSelector } from "@/hooks/useRedux"
import { selectPaginated, selectPaginatedIsLoading } from "@/state/projects/paginated"
import { selectSort } from "@/state/projects/sort"
import { RefreshProjectsArgs } from "@/state/_types/curated_projects_types"

const Pagination: FC = (): JSX.Element => {
  const { refreshPaginated } = useBackend()
  const sort = useAppSelector(selectSort)
  const isLoading = useAppSelector(selectPaginatedIsLoading)

  // pagination
  const paginated = useAppSelector(selectPaginated)
  const selectedPage = paginated.selectedPage
  const itemsPerPage = paginated.itemsPerPage
  const totalItems = paginated.totalItems
  const totalPages = paginated.totalPages
  const startIndex = paginated.startIndex
  const endIndex = paginated.endIndex

  // category
  const [searchParams, setSearchParams] = useSearchParams()
  const category = searchParams.get("category")

  const handlePageClick = async (event: any): Promise<void> => {
    try {
      const selected = event.selected // starts from 0
      const page = selected + 1
      const args: RefreshProjectsArgs = {
        filterByCategory: category,
        filterByOnchain: [],
        filterByOpenSource: [],
        sort,
        page,
        pageSize: itemsPerPage,
      }
      await refreshPaginated(args)
    } catch (error) {
      throw new Error(error)
    }
  }

  return (
    <div className="pagination">
      <LoadingModal isOpen={isLoading} />
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
    </div>
  )
}

export default Pagination
