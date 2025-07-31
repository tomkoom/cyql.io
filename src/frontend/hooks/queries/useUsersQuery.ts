import { API_KEY } from "@/constants/constants"
import { useAuth } from "@/context/Auth"
import { useQuery } from "@tanstack/react-query"

export interface User {
  id: string
  registeredAt: bigint
}

export const useUsersQuery = () => {
  const { users } = useAuth()

  return useQuery({
    queryKey: ["users"],
    queryFn: async (): Promise<User[]> => {
      const res = await users.listUsers(API_KEY)
      return res.map((user: any) => ({
        id: user.id,
        registeredAt: user.registeredAt,
      }))
    },
    enabled: !!users,
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 5 * 60 * 1000, // 5 minutes
  })
}
