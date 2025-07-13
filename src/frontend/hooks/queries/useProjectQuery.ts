import { API_KEY } from "@/constants/constants"
import { useAuth } from "@/context/Auth"
import type { Project } from "@/state/types/curated_projects_types"
import { useQuery } from "@tanstack/react-query"

export const useProjectQuery = (projectId: string | undefined) => {
  const { actor } = useAuth()

  return useQuery({
    queryKey: ["project", projectId],
    queryFn: async (): Promise<Project> => {
      if (!projectId) throw new Error("Project ID is required")

      const res = await actor.getProjectById(API_KEY, BigInt(projectId))

      if (res.length > 0) {
        return { ...res[0], id: res[0].id.toString() }
      }

      throw new Error("Project not found")
    },
    enabled: !!actor && !!projectId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })
}

export const useRelatedProjectsQuery = (projectId: string | undefined) => {
  const { actor } = useAuth()

  return useQuery({
    queryKey: ["relatedProjects", projectId],
    queryFn: async (): Promise<Project[]> => {
      if (!projectId) throw new Error("Project ID is required")

      const res = await actor.getRelatedProjects(API_KEY, BigInt(projectId), BigInt(16))

      return res.map((p) => ({ ...p, id: p.id.toString() }))
    },
    enabled: !!actor && !!projectId,
    staleTime: 10 * 60 * 1000, // 10 minutes - related projects change less frequently
    gcTime: 15 * 60 * 1000, // 15 minutes
  })
}

// Combined hook for convenience
export const useProjectWithRelated = (projectId: string | undefined) => {
  const projectQuery = useProjectQuery(projectId)
  const relatedQuery = useRelatedProjectsQuery(projectId)

  return {
    project: projectQuery.data,
    relatedProjects: relatedQuery.data,
    isLoading: projectQuery.isLoading || relatedQuery.isLoading,
    isError: projectQuery.isError || relatedQuery.isError,
    error: projectQuery.error || relatedQuery.error,
    refetch: () => {
      projectQuery.refetch()
      relatedQuery.refetch()
    },
  }
}
