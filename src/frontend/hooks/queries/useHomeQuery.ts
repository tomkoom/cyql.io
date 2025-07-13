import { API_KEY } from "@/constants/constants"
import { useAuth } from "@/context/Auth"
import type { Project } from "@/state/types/curated_projects_types"
import { useQuery } from "@tanstack/react-query"

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

// Using category LABELS (not IDs) to match what projects page uses
const HOMEPAGE_CATEGORIES = ["DeFi", "Games", "dApps", "Social Networks", "Marketplace", "Tokens"]

const HOMEPAGE_CONFIG = {
  newProjectsCount: 15,
  mostUpvotedCount: 10,
  itemsPerCategory: 5,
}

const serializeProjects = (projects: any[]) => projects?.map((p) => ({ ...p, id: p.id.toString() })) || []

const useHomepageData = () => {
  const { actor } = useAuth()

  return useQuery({
    queryKey: ["home", "all"],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not available")

      const result = await actor.getHomepageData(
        API_KEY,
        HOMEPAGE_CATEGORIES,
        BigInt(HOMEPAGE_CONFIG.itemsPerCategory),
        BigInt(HOMEPAGE_CONFIG.newProjectsCount),
        BigInt(HOMEPAGE_CONFIG.mostUpvotedCount)
      )

      const serializedData = {
        new: serializeProjects(result.new),
        mostUpvoted: serializeProjects(result.mostUpvoted),
        highlighted: result.highlighted.map((cat) => ({
          categoryId: cat.categoryId,
          categoryLabel: cat.categoryLabel,
          projects: serializeProjects(cat.projects),
        })),
      }

      return serializedData
    },
    enabled: !!actor,
    staleTime: 2 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
  })
}

export const useHomeQuery = () => {
  const homepageQuery = useHomepageData()

  // Combine all queries into a single data structure
  const data: HomeData = {
    new: homepageQuery.data?.new || [],
    mostUpvoted: homepageQuery.data?.mostUpvoted || [],
    highlighted: homepageQuery.data?.highlighted || [],
    isNewLoading: homepageQuery.isLoading,
    isMostUpvotedLoading: homepageQuery.isLoading,
    isHighlightedLoading: homepageQuery.isLoading,
  }

  return {
    data,
    isLoading: homepageQuery.isLoading,
    isError: homepageQuery.isError,
    error: homepageQuery.error,
  }
}
