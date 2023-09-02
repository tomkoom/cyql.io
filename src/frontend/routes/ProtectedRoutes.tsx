import React, { FC } from "react";

// router
import { Outlet, Navigate } from "react-router-dom";

// auth
import { useAuth } from "@/context/AuthContext";

const ProtectedRoutes: FC = (): JSX.Element => {
  const { userKey } = useAuth();
  return userKey !== "" ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoutes;
