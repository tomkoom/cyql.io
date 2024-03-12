import React from "react"
import { createHashRouter, createRoutesFromElements, Route } from "react-router-dom"
import { AdminRoutes, ProtectedRoutes } from "@/routes/_index"

// components
import RootLayout from "@/components/layout/RootLayout"
import {
  Admin,
  Home,
  NotFound,
  Profile,
  Project,
  Projects,
  ListProject,
  Proposals,
} from "@/pages/_index"

const router = createHashRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<RootLayout />}
      errorElement={<NotFound text="Something went wrong" />}
    >
      <Route index element={<Home />} />
      <Route path="projects" element={<Projects />} />
      <Route path="projects/:id" element={<Project />} />
      <Route path="list" element={<ListProject />} />
      <Route path="add" element={<ListProject />} />
      <Route path="proposals" element={<Proposals />} />

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
)

export default router
