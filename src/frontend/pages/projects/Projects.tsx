import { Btn } from "@/components/btns"
import { TextInput2 } from "@/components/ui"
import { useQueryParams } from "@/hooks"
import { ChangeEvent, KeyboardEvent, useState } from "react"
import { Category, Filter, Pagination, ProjectsList, Sort } from "."

export default function Projects() {
  const { queryParams, updateQueryParam } = useQueryParams()
  const [searchInput, setSearchInput] = useState(queryParams.q || "")

  const updateSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value)
  }

  const submitSearch = () => {
    updateQueryParam("q", searchInput)
    updateQueryParam("selectedPage", "1")
  }

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      submitSearch()
    }
  }

  return (
    <div className="mb-16 flex flex-col gap-2">
      <h2 className="mb-4 text-2xl font-bold">Discover New Projects</h2>

      <div className="flex items-center gap-1">
        <TextInput2 placeholder="Search project by name" value={searchInput} onChange={updateSearchInput} onKeyPress={handleKeyPress} />
        <Btn style={{ height: "3.2rem" }} btnType="secondary" text="Search" onClick={submitSearch} />
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
      <Pagination />
      <ProjectsList />
      <Pagination />
    </div>
  )
}
