import React, { FC } from "react";

// constants
import { II_ADMIN_1 } from "@/constants/constants";

// router
import { Outlet, Navigate } from "react-router-dom";

// auth
import { useAuth } from "@/context/AuthContext";

const AdminRoutes: FC = (): JSX.Element => {
  const { userKey } = useAuth();
  const admins = [II_ADMIN_1];

  const isAdmin = (): boolean => {
    return admins.includes(userKey);
  };

  return isAdmin() ? <Outlet /> : <Navigate to="/" />;
};

export default AdminRoutes;