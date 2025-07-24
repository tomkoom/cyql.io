import { API_KEY } from "@/constants/constants"
import { useAuth } from "@/context/Auth"
import { bigintToNumber, sortCategoriesByNum } from "@/utils"
import { useQuery } from "@tanstack/react-query"

export const useCategoriesQuery = () => {
  const { actor } = useAuth()

  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await actor.getAllCategories()
      return res
    },
    enabled: !!actor,
  })
}

export const useCategoriesWithSizeQuery = () => {
  const { actor } = useAuth()

  return useQuery({
    queryKey: ["categories", "withSize"],
    queryFn: async () => {
      const res = await actor.getCategoriesWithSize(API_KEY)
      const sorted = sortCategoriesByNum(bigintToNumber(res))
      return sorted
    },
    enabled: !!actor,
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 5 * 60 * 1000, // 5 minutes
  })
}
