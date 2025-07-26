import { useProjectsQuery, useQueryParams } from "@/hooks"
import { LoadingModal } from "@/modals"
import ReactPaginate from "react-paginate"
import "./Pagination.css"

interface ProjectsCountProps {
  totalItems: number
  startIndex: number
  endIndex: number
  isFiltered: boolean
}

const ProjectsCount = ({ totalItems, startIndex, endIndex, isFiltered }: ProjectsCountProps) => (
  <div>
    {isFiltered ? (
      <span className="!text-coolgray-500 !text-sm">
        {totalItems} project{totalItems !== 1 ? "s" : ""} found.
      </span>
    ) : (
      <span className="!text-coolgray-500 !text-sm">
        {totalItems} project{totalItems !== 1 ? "s" : ""} total.
      </span>
    )}{" "}
    {totalItems > 0 && (
      <span className="!text-coolgray-500 !text-sm">
        Showing {startIndex + 1}-{endIndex} of {totalItems}
      </span>
    )}
  </div>
)

export default function Pagination() {
  const { queryParams, updateQueryParam } = useQueryParams()
  const { data: projectsData, isLoading } = useProjectsQuery()

  const page = queryParams.selectedPage - 1

  const projects = projectsData?.data || []
  const totalItems = projectsData?.totalItems || 0
  const totalPages = projectsData?.totalPages || 0
  const startIndex = projectsData?.startIndex || 0
  const endIndex = projectsData?.endIndex || 0

  // Check if any filters are applied
  const isFiltered = queryParams.q !== "" || queryParams.category !== "All" || queryParams.openSource.length > 0 || queryParams.onChain.length > 0

  const handlePageClick = (event: any): void => {
    updateQueryParam("selectedPage", (event.selected + 1).toString())
  }

  if (projects.length < 1) {
    return null
  }

  return (
    <div className="pagination">
      <LoadingModal isOpen={isLoading} />

      <div className="main flex items-center justify-between">
        <ProjectsCount totalItems={totalItems} startIndex={startIndex} endIndex={endIndex} isFiltered={isFiltered} />

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
