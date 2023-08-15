import React, { FC } from "react";

// constants
import { iiAdmin1, iiAdmin2 } from "@/constants/constants";

// router
import { Outlet, Navigate } from "react-router-dom";

// auth
import { useAuth } from "@/context/AuthContext";

const AdminRoutes: FC = (): JSX.Element => {
  const { userKey } = useAuth();
  const admins = [iiAdmin1, iiAdmin2];

  const isAdmin = (): boolean => {
    return admins.includes(userKey);
  };

  return isAdmin() ? <Outlet /> : <Navigate to="/" />;
};

export default AdminRoutes;
