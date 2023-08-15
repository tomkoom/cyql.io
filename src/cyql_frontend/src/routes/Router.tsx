import React from "react";

// router
import {
  // createBrowserRouter,
  createHashRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

// routes
import { AdminRoutes, ProtectedRoutes } from "@/routes/_index";

// components
import RootLayout from "@/components/layout/RootLayout";
import {
  Admin,
  Home,
  NotFound,
  Profile,
  Project,
  Projects,
  Submit,
} from "@/components/pages/index";

const router = createHashRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="projects" element={<Projects />}>
        <Route path=":slug" element={<Project />} />
      </Route>
      <Route path="submit" element={<Submit />} />

      {/* protected routes */}
      <Route element={<ProtectedRoutes />}>
        <Route path="profile" element={<Profile />} />
      </Route>

      {/* admin routes */}
      <Route element={<AdminRoutes />}>
        <Route path="admin" element={<Admin />} />
      </Route>

      {/* not found */}
    </Route>
  )
);

export default router;
