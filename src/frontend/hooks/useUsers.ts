import { useAuth } from "@/context/Auth"
import { NETWORK } from "@/constants/constants"

// state
import { useAppDispatch } from "@/hooks/useRedux"

const useBackend = () => {
  const dispatch = useAppDispatch()
  const { actor, userId } = useAuth()

  return {}
}

export default useBackend
