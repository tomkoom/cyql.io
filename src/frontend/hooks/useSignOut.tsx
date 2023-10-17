import { useAuth } from "@/context/Auth"

export const useSignOut = () => {
  const { logout } = useAuth()

  const signOut = async (): Promise<void> => {
    await logout()
    // clear state
  }

  return { signOut }
}
