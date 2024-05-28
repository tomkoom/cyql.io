import { SortOptions } from "@/state/_types/curated_projects_types"

export const getSort = (sort: string): SortOptions => {
  if (sort === "newest_first") return { newest_first: null }
  if (sort === "oldest_first") return { oldest_first: null }
  if (sort === "most_upvoted") return { most_upvoted: null }
  if (sort === "least_upvoted") return { least_upvoted: null }
  if (sort === "recently_updated") return { recently_updated: null }
}

export const getFilterByCategory = () => {}
