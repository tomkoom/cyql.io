import { ADMINS } from "@/constants/constants"
import { useAuth } from "@/context/Auth"
import { Navigate, Outlet } from "react-router-dom"

export default function AdminRoutes() {
  const { userId } = useAuth()

  const isAdmin = (): boolean => {
    return ADMINS.includes(userId)
  }

  return isAdmin() ? <Outlet /> : <Navigate to="/" />
}
