import { useAuth } from "@/context/Auth"
import { useAppDispatch } from "@/hooks/useRedux"
import { setClearUser } from "@/state/user"
import { setIsLoading } from "@/state/loading"

interface UseAuthenticate {
  signIn: () => Promise<void>
  signOut: () => Promise<void>
}

export const useAuthenticate = (): UseAuthenticate => {
  const dispatch = useAppDispatch()
  const { login, logout } = useAuth()

  const signIn = async (): Promise<void> => {
    await login()
  }

  const signOut = async (): Promise<void> => {
    await logout()
    dispatch(setClearUser())
  }

  return { signIn, signOut }
}
