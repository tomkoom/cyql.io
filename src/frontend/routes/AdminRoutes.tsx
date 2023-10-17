import React, { FC } from "react";

// constants
import { II_ADMIN_1 } from "@/constants/constants";

// router
import { Outlet, Navigate } from "react-router-dom";

// auth
import { useAuth } from "@/context/Auth";

const AdminRoutes: FC = (): JSX.Element => {
  const { userId } = useAuth();
  const admins = [II_ADMIN_1];

  const isAdmin = (): boolean => {
    return admins.includes(userId);
  };

  return isAdmin() ? <Outlet /> : <Navigate to="/" />;
};

export default AdminRoutes;
