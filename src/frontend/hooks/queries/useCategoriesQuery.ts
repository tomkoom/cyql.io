import { useAuth } from "@/context/Auth"
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
