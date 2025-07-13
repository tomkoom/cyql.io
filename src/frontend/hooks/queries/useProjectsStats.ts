import { API_KEY } from "@/constants/constants"
import { useAuth } from "@/context/Auth"
import { useQuery } from "@tanstack/react-query"

const formatProjectCount = (count: number): string => {
  if (count === 0) return "..."
  if (count < 1000) return count.toString()
  if (count < 1000000) return `${(count / 1000).toFixed(1)}K`
  return `${(count / 1000000).toFixed(1)}M`
}

export const useProjectsCount = () => {
  const { actor } = useAuth()

  return useQuery({
    queryKey: ["projects", "count"],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not available")
      const result = await actor.getActiveProjectsNum(API_KEY)
      const count = Number(result)

      return count
    },
    enabled: !!actor,
    staleTime: 10 * 60 * 1000, // 10 minutes - count doesn't change frequently
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 3,
  })
}

// Hook with formatted count for display
export const useFormattedProjectsCount = () => {
  const { data, isLoading, isError } = useProjectsCount()

  return {
    count: data || 0,
    formattedCount: formatProjectCount(data || 0),
    isLoading,
    isError,
  }
}
