import { useSearchParams } from "react-router-dom"

interface UseQueryParams {
  searchQuery: string
  selectedPage: number
  itemsPerPage: number
  category: string
  updateQueryParam: (param: string, value: string) => void
}

export const schema = {
  q: "",

  // pagination
  page: 1,
  itemsPerPage: 50,

  // filter
  category: "All",
  // openSource: "",
  // onchain: "",

  // sort
  // sort: "newest_first",
}

export const useQueryParams = (): UseQueryParams => {
  const [searchParams, setSearchParams] = useSearchParams()
  // ...
  const searchQuery = searchParams.get("q") || schema.q
  const selectedPage = parseInt(searchParams.get("page")) || schema.page
  const itemsPerPage = parseInt(searchParams.get("itemsPerPage")) || schema.itemsPerPage
  const category = searchParams.get("category") || schema.category

  const updateQueryParam = (param: string, value: string): void => {
    searchParams.set(param, value)
    setSearchParams(searchParams, { replace: true })
  }

  return {
    searchQuery,
    selectedPage,
    itemsPerPage,
    category,
    updateQueryParam,
  }
}
