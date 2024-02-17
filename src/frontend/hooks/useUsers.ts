import { useAuth } from "@/context/Auth"
import { NETWORK } from "@/constants/constants"

// state
import { useAppDispatch } from "@/hooks/useRedux"

const useUsers = () => {
  const dispatch = useAppDispatch()
  const { actor, userId } = useAuth()

  const registerUser = async (): Promise<void> => {
    // add notify
    await actor.registerUser()
  }

  return { registerUser }
}

export default useUsers
