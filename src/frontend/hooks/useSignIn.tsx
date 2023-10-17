import { useAuth } from "@/context/Auth"

export const useSignIn = () => {
  const { login } = useAuth()

  const signIn = async (): Promise<void> => {
    await login()
  }

  return { signIn }
}
