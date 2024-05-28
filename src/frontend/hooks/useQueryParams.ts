import { useSearchParams } from "react-router-dom"
import { RefreshProjectsParams, Option, SortOptions } from "@/state/_types/curated_projects_types"
import { getSortParam, getFilterParam } from "@/utils/processSearchParams"

interface UseQueryParams {
  refreshProjectsParams: RefreshProjectsParams
  updateQueryParam: (param: string, value: string) => void
}

export const schema: RefreshProjectsParams = {
  q: "",
  selectedPage: 1,
  itemsPerPage: 50,
  category: "All",
  openSource: [],
  onChain: [],
  sort: { newest_first: null },
}

export const useQueryParams = (): UseQueryParams => {
  const [searchParams, setSearchParams] = useSearchParams()
  // ...
  const q = searchParams.get("q") || schema.q
  const selectedPage = parseInt(searchParams.get("page")) || schema.selectedPage
  const itemsPerPage = parseInt(searchParams.get("itemsPerPage")) || schema.itemsPerPage
  const category = searchParams.get("category") || schema.category
  const openSource: Option = getFilterParam(searchParams.get("openSource")) || schema.openSource
  const onChain: Option = getFilterParam(searchParams.get("onChain")) || schema.onChain
  const sort: SortOptions = getSortParam(searchParams.get("sort")) || schema.sort

  const updateQueryParam = (param: string, value: string): void => {
    searchParams.set(param, value)
    setSearchParams(searchParams, { replace: true })
  }

  const refreshProjectsParams: RefreshProjectsParams = {
    q,
    selectedPage,
    itemsPerPage,
    category,
    openSource,
    onChain,
    sort,
  }

  return {
    refreshProjectsParams,
    updateQueryParam,
  }
}
