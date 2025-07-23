import { API_KEY } from "@/constants/constants"
import { useAuth } from "@/context/Auth"
import { bigintToString, sortCollectionsByCategory } from "@/utils"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export const useCollectionsQuery = () => {
  const { actor } = useAuth()

  return useQuery({
    queryKey: ["collections"],
    queryFn: async () => {
      const res = await actor.getAllCollections(API_KEY)
      return bigintToString(res)
    },
    enabled: !!actor,
  })
}

export const useActiveCollectionsQuery = () => {
  const { actor } = useAuth()

  return useQuery({
    queryKey: ["collections", "active"],
    queryFn: async () => {
      const [collectionsRes, categoriesRes] = await Promise.all([actor.getActiveCollections(API_KEY), actor.getAllCategories()])
      const collections = bigintToString(collectionsRes) as any[]
      const categories = categoriesRes as any[]
      const sortedCollections = sortCollectionsByCategory(collections, categories)

      return sortedCollections
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
      return res.length > 0 ? bigintToString(res[0]) : null
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
      return res.length > 0 ? bigintToString(res[0]) : null
    },
    enabled: !!actor && !!categoryId,
  })
}

// Mutations for managing collections
export const useAddCollectionMutation = () => {
  const { actor } = useAuth()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ categoryId, projectIds }: { categoryId: string; projectIds: bigint[] }) => {
      return await actor.addCollection(categoryId, projectIds)
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
    mutationFn: async ({ categoryId, projectIds }: { categoryId: string; projectIds: bigint[] }) => {
      return await actor.updateCollection(categoryId, projectIds)
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

export const useRemoveProjectFromCollectionMutation = () => {
  const { actor } = useAuth()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ categoryId, projectId }: { categoryId: string; projectId: bigint }) => {
      return await actor.removeProjectFromCollection(categoryId, projectId)
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["collections"] })
      queryClient.invalidateQueries({ queryKey: ["collection", variables.categoryId] })
    },
  })
}
