import { API_KEY } from "@/constants/constants"
import { useAuth } from "@/context/Auth"
import { useAppDispatch } from "@/hooks/useRedux"
import { setUsers } from "@/state/users"

export const useUsers = () => {
  const dispatch = useAppDispatch()
  const { users } = useAuth()

  const registerUser = async (): Promise<void> => {
    if (!users) return

    try {
      await users.register(API_KEY)
      await users.listUsers(API_KEY)
    } catch (error) {
      throw new Error(error)
    }
  }

  const listUsers = async (): Promise<void> => {
    if (!users) return

    try {
      const res = await users.listUsers(API_KEY)
      const serialized = res.map((u) => ({ ...u, registeredAt: u.registeredAt.toString() }))
      dispatch(setUsers(serialized))
    } catch (error) {
      throw new Error(error)
    }
  }

  return { registerUser, listUsers }
}
