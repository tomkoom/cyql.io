import { API_KEY } from "@/constants/constants"
import { useAuth } from "@/context/Auth"
import type { Project } from "@/state/types/Project"
import { useQuery } from "@tanstack/react-query"
import { logQueryAnalytics, logSummaryAnalytics } from "./analytics"

export interface CategoryProjects {
  categoryId: string
  categoryLabel: string
  projects: Project[]
}

export interface HomeData {
  new: Project[]
  mostUpvoted: Project[]
  highlighted: CategoryProjects[]
  isNewLoading?: boolean
  isMostUpvotedLoading?: boolean
  isHighlightedLoading?: boolean
}

// Using category labels (not IDs)
const HOMEPAGE_CATEGORIES = ["DeFi", "Games", "Betting", "dApps", "Social Networks", "Marketplace", "Tokens"]

const HOMEPAGE_CONFIG = {
  newProjectsCount: 15,
  mostUpvotedCount: 10,
  itemsPerCategory: 10,
}

const serializeProjects = (projects: any[]) => projects?.map((p) => ({ ...p, id: p.id.toString() })) || []

const useNewProjects = () => {
  const { actor } = useAuth()

  return useQuery({
    queryKey: ["home", "new"],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not available")

      const startTime = performance.now()
      const result = await actor.getNewProjects(API_KEY, BigInt(HOMEPAGE_CONFIG.newProjectsCount))
      const serializedResult = serializeProjects(result)

      // Log analytics after serialization to avoid interfering with data flow
      logQueryAnalytics("getNewProjects", result, startTime)

      return serializedResult
    },
    enabled: !!actor,
    staleTime: 2 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
  })
}

const useMostUpvotedProjects = () => {
  const { actor } = useAuth()

  return useQuery({
    queryKey: ["home", "mostUpvoted"],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not available")

      const startTime = performance.now()
      const result = await actor.getMostUpvotedProjects(API_KEY, BigInt(HOMEPAGE_CONFIG.mostUpvotedCount))
      const serializedResult = serializeProjects(result)

      // Log analytics after serialization to avoid interfering with data flow
      logQueryAnalytics("getMostUpvotedProjects", result, startTime)

      return serializedResult
    },
    enabled: !!actor,
    staleTime: 2 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
  })
}

const useHighlightedProjects = () => {
  const { actor } = useAuth()

  return useQuery({
    queryKey: ["home", "highlighted"],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not available")

      // Fetch each category individually for progressive loading
      const overallStartTime = performance.now()

      const categoryPromises = HOMEPAGE_CATEGORIES.map(async (categoryLabel) => {
        const startTime = performance.now()
        const projects = await actor.getHighlightedProjects(API_KEY, categoryLabel, BigInt(HOMEPAGE_CONFIG.itemsPerCategory))
        const serializedProjects = serializeProjects(projects)

        // Log analytics after serialization to avoid interfering with data flow
        logQueryAnalytics(`getHighlightedProjects (${categoryLabel})`, projects, startTime)

        // Find the category ID for response structure
        const categoryId = categoryLabel.toLowerCase().replace(/\s+/g, "_")

        return {
          categoryId,
          categoryLabel,
          projects: serializedProjects,
        }
      })

      const result = await Promise.all(categoryPromises)

      // Log overall highlighted query analytics
      logSummaryAnalytics("getHighlightedProjects (ALL)", result, overallStartTime, {
        "Total Categories": result.length,
        "Total Projects": result.reduce((acc, cat) => acc + cat.projects.length, 0),
      })

      return result
    },
    enabled: !!actor,
    staleTime: 2 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
  })
}

export const useHomeQuery = () => {
  const newProjectsQuery = useNewProjects()
  const mostUpvotedQuery = useMostUpvotedProjects()
  const highlightedQuery = useHighlightedProjects()

  // Combine all queries into a single data structure
  const data: HomeData = {
    new: newProjectsQuery.data || [],
    mostUpvoted: mostUpvotedQuery.data || [],
    highlighted: highlightedQuery.data || [],
    isNewLoading: newProjectsQuery.isLoading,
    isMostUpvotedLoading: mostUpvotedQuery.isLoading,
    isHighlightedLoading: highlightedQuery.isLoading,
  }

  // Overall loading state - true only if ALL queries are loading
  const isLoading = newProjectsQuery.isLoading && mostUpvotedQuery.isLoading && highlightedQuery.isLoading

  // Error state - true if ANY query has an error
  const isError = newProjectsQuery.isError || mostUpvotedQuery.isError || highlightedQuery.isError
  const error = newProjectsQuery.error || mostUpvotedQuery.error || highlightedQuery.error

  return {
    data,
    isLoading,
    isError,
    error,
  }
}
