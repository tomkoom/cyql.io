import { useAuth } from "@/context/Auth"
import { KEY } from "@/constants/constants"

// state
import { useAppDispatch } from "@/hooks/useRedux"
import { setUsers } from "@/state/users"

export const useUsers = () => {
  const dispatch = useAppDispatch()
  const { users } = useAuth()

  const registerUser = async (): Promise<void> => {
    if (!users) return

    try {
      await users.register(KEY)
      await users.listUsers(KEY)
    } catch (error) {
      throw new Error(error)
    }
  }

  const listUsers = async (): Promise<void> => {
    if (!users) return

    try {
      const res = await users.listUsers(KEY)
      const serialized = res.map((u) => ({ ...u, registeredAt: u.registeredAt.toString() }))
      dispatch(setUsers(serialized))
    } catch (error) {
      throw new Error(error)
    }
  }

  return { registerUser, listUsers }
}
