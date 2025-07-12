import { Option, SortOptions } from "@/state/types/curated_projects_types"

export const getSortParam = (sort: string): SortOptions => {
  if (sort === "newest_first") return { newest_first: null }
  if (sort === "oldest_first") return { oldest_first: null }
  if (sort === "most_upvoted") return { most_upvoted: null }
  if (sort === "least_upvoted") return { least_upvoted: null }
  if (sort === "recently_updated") return { recently_updated: null }
}

export const sortToSearchParam = (sort: SortOptions): string => {
  if (Object.keys(sort)[0] === "newest_first") return "newest_first"
  if (Object.keys(sort)[0] === "oldest_first") return "oldest_first"
  if (Object.keys(sort)[0] === "most_upvoted") return "most_upvoted"
  if (Object.keys(sort)[0] === "least_upvoted") return "least_upvoted"
  if (Object.keys(sort)[0] === "recently_updated") return "recently_updated"
}

export const getFilterParam = (param: string): Option => {
  if (param === "true") return [true]
  if (param === "false") return [false]
  return []
}

export const filterToSearchParam = (value: Option): string => {
  if (value.length < 1) return ""
  if (value[0] === true) return "true"
  if (value[0] === false) return "false"
}
