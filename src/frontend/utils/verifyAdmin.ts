import { ADMINS } from "@/constants/constants"

export const verifyAdmin = (userId: string): boolean => {
  return ADMINS.includes(userId)
}
