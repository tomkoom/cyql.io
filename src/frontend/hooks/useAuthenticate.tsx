import { useAuth } from "@/context/Auth"

const useAuthenticate = () => {
  const { login, logout } = useAuth()

  const signIn = async (): Promise<void> => {
    await login()
  }

  const signOut = async (): Promise<void> => {
    await logout()
    // clear state
  }

  return { signIn, signOut }
}

export default useAuthenticate
