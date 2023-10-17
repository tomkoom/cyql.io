import React, { FC } from "react"
import { Outlet, Navigate } from "react-router-dom"
import { useAuth } from "@/context/Auth"

const ProtectedRoutes: FC = (): JSX.Element => {
  const { isAuthenticated, userId } = useAuth()
  return isAuthenticated && userId ? <Outlet /> : <Navigate to="/" />
}

export default ProtectedRoutes
