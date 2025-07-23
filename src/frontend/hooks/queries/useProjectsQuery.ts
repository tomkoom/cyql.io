import { API_KEY } from "@/constants/constants"
import { useAuth } from "@/context/Auth"
import { useQueryParams } from "@/hooks"
import type { Project } from "@/state/types/Project"
import { bigintToString } from "@/utils"
import { useQuery } from "@tanstack/react-query"

export const useProjectsQuery = () => {
  const { actor } = useAuth()
  const { queryParams } = useQueryParams()

  return useQuery({
    queryKey: ["projects", queryParams],
    queryFn: async () => {
      const res = await actor.getProjects({
        secret: API_KEY,
        ...queryParams,
        selectedPage: BigInt(queryParams.selectedPage),
        itemsPerPage: BigInt(queryParams.itemsPerPage),
      })

      if (res.length > 0) {
        const serializedData = bigintToString(res[0].data)
        return {
          data: serializedData,
          selectedPage: Number(res[0].selectedPage),
          itemsPerPage: Number(res[0].itemsPerPage),
          startIndex: Number(res[0].startIndex),
          endIndex: Number(res[0].endIndex),
          totalItems: Number(res[0].totalItems),
          totalPages: Number(res[0].totalPages),
        }
      }

      return {
        data: [],
        selectedPage: 1,
        itemsPerPage: 50,
        startIndex: 0,
        endIndex: 0,
        totalItems: 0,
        totalPages: 0,
      }
    },
    enabled: !!actor,
  })
}

export const useProjectsByIdsQuery = (projectIds: string[]) => {
  const { actor } = useAuth()

  return useQuery({
    queryKey: ["projects", "byIds", projectIds],
    queryFn: async (): Promise<Project[]> => {
      if (!projectIds || projectIds.length === 0) return []

      const bigintIds = projectIds.map((id) => BigInt(id))
      const res = await actor.getProjectsByIds(API_KEY, bigintIds)

      return res.map((p: any) => ({ ...p, id: p.id.toString() }))
    },
    enabled: !!actor && projectIds.length > 0,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })
}
