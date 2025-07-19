import { useAppSelector } from "@/hooks/useRedux"
import { selectQueryParams } from "@/state/projects/queryParams"
import { Option, QueryParams, QueryParamsString, SortOptions } from "@/state/types/Project"
import { filterToSearchParam, getFilterParam, getSortParam, sortToSearchParam } from "@/utils/index"
import { useSearchParams } from "react-router-dom"

interface UseQueryParams {
  queryParams: QueryParams
  queryParamsString: QueryParamsString
  updateQueryParam: (param: string, value: string) => void
  updateQueryParams: (params: QueryParamsString) => void
}

export const useQueryParams = (): UseQueryParams => {
  const queryParamsState = useAppSelector(selectQueryParams)
  const [searchParams, setSearchParams] = useSearchParams()
  // ...
  const q = searchParams.get("q") || queryParamsState.q
  const selectedPage = parseInt(searchParams.get("selectedPage")) || queryParamsState.selectedPage
  const itemsPerPage = parseInt(searchParams.get("itemsPerPage")) || queryParamsState.itemsPerPage
  const category = searchParams.get("category") || queryParamsState.category
  const openSource: Option = getFilterParam(searchParams.get("openSource")) || queryParamsState.openSource
  const onChain: Option = getFilterParam(searchParams.get("onChain")) || queryParamsState.onChain
  const sort: SortOptions = getSortParam(searchParams.get("sort")) || queryParamsState.sort

  const updateQueryParam = (param: string, value: string): void => {
    searchParams.set(param, value)
    setSearchParams(searchParams, { replace: true })
  }

  const updateQueryParams = (params: QueryParamsString): void => {
    Object.keys(params).forEach((param) => {
      const value = params[param]
      searchParams.set(param, value)
    })

    setSearchParams(searchParams, { replace: true })
  }

  const queryParams: QueryParams = {
    q,
    selectedPage,
    itemsPerPage,
    category,
    openSource,
    onChain,
    sort,
  }

  const queryParamsString: QueryParamsString = {
    q,
    selectedPage: selectedPage.toString(),
    itemsPerPage: itemsPerPage.toString(),
    category,
    openSource: filterToSearchParam(openSource),
    onChain: filterToSearchParam(onChain),
    sort: sortToSearchParam(sort),
  }

  return {
    queryParams,
    queryParamsString,
    updateQueryParam,
    updateQueryParams,
  }
}
