import { Button } from "@/components/ui/button"
import { Icon } from "@/components/ui/Icon"
import { Input } from "@/components/ui/input"
import { useProjectsQuery, useQueryParams } from "@/hooks"
import { Search } from "lucide-react"
import { ChangeEvent, KeyboardEvent, useState } from "react"
import { Category, Filter, Pagination, ProjectsList, Sort } from "."

export default function Projects() {
  const { queryParams, updateQueryParam } = useQueryParams()
  const [searchInput, setSearchInput] = useState(queryParams.q || "")
  const { isLoading } = useProjectsQuery()

  const updateSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value)
  }

  const submitSearch = () => {
    updateQueryParam("q", searchInput)
    updateQueryParam("selectedPage", "1")
  }

  const clearSearch = () => {
    setSearchInput("")
    updateQueryParam("q", "")
    updateQueryParam("selectedPage", "1")
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      submitSearch()
    }
  }

  return (
    <div className="mx-auto mb-16 flex max-w-[1920px] flex-col gap-2">
      <div className="mb-2 flex flex-col gap-1">
        <h1 className="text-4xl font-bold">Discover New Projects</h1>
        <p className="text-coolgray-600 text-xs">Web3-native data on the Internet Computer</p>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="text-coolgray-400 absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
          <Input
            className="h-10 pr-10 pl-10 lg:h-12"
            placeholder="Search projects by name..."
            value={searchInput}
            onChange={updateSearchInput}
            onKeyDown={handleKeyDown}
          />
          {searchInput && (
            <button
              onClick={clearSearch}
              className="text-coolgray-400 hover:text-coolgray-200 bg-coolgray-900 absolute top-1/2 right-3 flex h-8 -translate-y-1/2 cursor-pointer items-center justify-center gap-1 rounded-full px-2.5 text-xs transition-colors"
            >
              Clear <Icon lucideName="X" strokeWidth={2} />
            </button>
          )}
        </div>
        <Button variant="accent" className="h-10 lg:h-12" onClick={submitSearch} disabled={isLoading}>
          {isLoading ? "Searching..." : "Search Projects"}
        </Button>
      </div>

      {/* filters */}
      <div className="mt-1 flex flex-wrap items-center justify-between gap-1">
        <div className="flex flex-wrap items-center justify-start gap-1">
          <Category />
          <Filter filterId="openSource" label="Open-source:" filter={queryParams.openSource} />
          <Filter filterId="onChain" label="On-chain:" filter={queryParams.onChain} />
        </div>

        <div className="flex flex-wrap items-center justify-start gap-1">
          <Sort />
        </div>
      </div>

      {/* table */}
      {/* <Pagination /> */}
      <ProjectsList />
      <Pagination />
    </div>
  )
}
