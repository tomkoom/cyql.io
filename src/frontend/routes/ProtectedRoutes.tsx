import { useAuth } from "@/context/Auth"
import { Navigate, Outlet } from "react-router-dom"

export default function ProtectedRoutes() {
  const { isAuthenticated, userId } = useAuth()
  return isAuthenticated && userId ? <Outlet /> : <Navigate to="/" />
}
