import React, { FC } from "react"
import { ADMINS } from "@/constants/constants"
import { Outlet, Navigate } from "react-router-dom"
import { useAuth } from "@/context/Auth"

const AdminRoutes: FC = (): JSX.Element => {
  const { userId } = useAuth()

  const isAdmin = (): boolean => {
    return ADMINS.includes(userId)
  }

  return isAdmin() ? <Outlet /> : <Navigate to="/" />
}

export default AdminRoutes
