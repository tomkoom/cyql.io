import { useProjectsQuery, useQueryParams } from "@/hooks"
import ReactPaginate from "react-paginate"

interface ProjectsCountProps {
  totalItems: number
  startIndex: number
  endIndex: number
  isFiltered: boolean
}

const ProjectsCount = ({ totalItems, startIndex, endIndex, isFiltered }: ProjectsCountProps) => (
  <div>
    {isFiltered ? (
      <span className="text-coolgray-500 text-sm">
        {totalItems} project{totalItems !== 1 ? "s" : ""} found.
      </span>
    ) : (
      <span className="text-coolgray-500 text-sm">
        {totalItems} project{totalItems !== 1 ? "s" : ""} total.
      </span>
    )}{" "}
    {totalItems > 0 && (
      <span className="text-coolgray-500 text-sm">
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

  if (isLoading) {
    return <div className="text-coolgray-500 text-sm">Loading...</div>
  }

  return (
    <div className="w-full">
      <div className="my-4 flex flex-wrap items-center justify-between gap-4">
        <ProjectsCount totalItems={totalItems} startIndex={startIndex} endIndex={endIndex} isFiltered={isFiltered} />

        <ReactPaginate
          breakLabel="..."
          nextLabel="Next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={totalPages}
          previousLabel="< Prev"
          renderOnZeroPageCount={null}
          // styles
          containerClassName="flex items-center gap-1 flex-wrap"
          pageLinkClassName="w-9 h-9 flex items-center justify-center text-sm border border-coolgray-900 text-coolgray-300 hover:bg-coolgray-900 transition-colors cursor-pointer rounded-md"
          previousLinkClassName="px-3 py-2 text-sm border border-coolgray-900 text-coolgray-300 hover:bg-coolgray-900 transition-colors cursor-pointer rounded-md"
          nextLinkClassName="px-3 py-2 text-sm border border-coolgray-900 text-coolgray-300 hover:bg-coolgray-900 transition-colors cursor-pointer rounded-md"
          breakLinkClassName="w-9 h-9 flex items-center justify-center text-sm border border-coolgray-900 text-coolgray-300 hover:bg-coolgray-900 transition-colors cursor-pointer rounded-md"
          activeLinkClassName="!bg-accent-2 !border-accent-2 !text-white"
          // sync
          forcePage={page}
        />
      </div>
    </div>
  )
}
