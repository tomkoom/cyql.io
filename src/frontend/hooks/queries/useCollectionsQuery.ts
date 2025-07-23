import { API_KEY } from "@/constants/constants"
import { useAuth } from "@/context/Auth"
import { bigintToNumber } from "@/utils"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export const useCollectionsQuery = () => {
  const { actor } = useAuth()

  return useQuery({
    queryKey: ["collections"],
    queryFn: async () => {
      const res = await actor.getAllCollections(API_KEY)
      return bigintToNumber(res)
    },
    enabled: !!actor,
  })
}

export const useActiveCollectionsQuery = () => {
  const { actor } = useAuth()

  return useQuery({
    queryKey: ["collections", "active"],
    queryFn: async () => {
      const res = await actor.getActiveCollections(API_KEY)
      return bigintToNumber(res)
    },
    enabled: !!actor,
  })
}

export const useCollectionQuery = (categoryId: string) => {
  const { actor } = useAuth()

  return useQuery({
    queryKey: ["collection", categoryId],
    queryFn: async () => {
      const res = await actor.getCollection(API_KEY, categoryId)
      return res.length > 0 ? bigintToNumber(res[0]) : null
    },
    enabled: !!actor && !!categoryId,
  })
}

export const useCollectionWithProjectsQuery = (categoryId: string) => {
  const { actor } = useAuth()

  return useQuery({
    queryKey: ["collection", categoryId, "projects"],
    queryFn: async () => {
      const res = await actor.getCollectionWithProjects(API_KEY, categoryId)
      return res.length > 0 ? bigintToNumber(res[0]) : null
    },
    enabled: !!actor && !!categoryId,
  })
}

// Mutations for managing collections
export const useAddCollectionMutation = () => {
  const { actor } = useAuth()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ categoryId, projectIds }: { categoryId: string; projectIds: number[] }) => {
      const bigIntProjectIds = projectIds.map((id) => BigInt(id))
      return await actor.addCollection(categoryId, bigIntProjectIds)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["collections"] })
    },
  })
}

export const useUpdateCollectionMutation = () => {
  const { actor } = useAuth()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ categoryId, projectIds }: { categoryId: string; projectIds: number[] }) => {
      const bigIntProjectIds = projectIds.map((id) => BigInt(id))
      return await actor.updateCollection(categoryId, bigIntProjectIds)
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["collections"] })
      queryClient.invalidateQueries({ queryKey: ["collection", variables.categoryId] })
    },
  })
}

export const useRemoveCollectionMutation = () => {
  const { actor } = useAuth()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (categoryId: string) => {
      return await actor.removeCollection(categoryId)
    },
    onSuccess: (_, categoryId) => {
      queryClient.invalidateQueries({ queryKey: ["collections"] })
      queryClient.invalidateQueries({ queryKey: ["collection", categoryId] })
    },
  })
}

export const useToggleCollectionStatusMutation = () => {
  const { actor } = useAuth()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (categoryId: string) => {
      return await actor.toggleCollectionStatus(categoryId)
    },
    onSuccess: (_, categoryId) => {
      queryClient.invalidateQueries({ queryKey: ["collections"] })
      queryClient.invalidateQueries({ queryKey: ["collection", categoryId] })
    },
  })
}
