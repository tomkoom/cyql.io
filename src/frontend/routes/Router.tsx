import React from "react"
import { createHashRouter, createRoutesFromElements, Route } from "react-router-dom"
import { AdminRoutes, ProtectedRoutes } from "@/routes/_index"

// components
import Layout from "@/components/layout/Layout"
import {
  Admin,
  Home,
  NotFound,
  Profile,
  Project,
  Projects,
  ListProject,
  Proposal,
  Proposals,
  // IcrcScan,
} from "@/pages/_index"

const router = createHashRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<NotFound text="Something went wrong" />}>
      <Route index element={<Home />} />
      {/* projects */}
      <Route path="projects" element={<Projects />} />
      <Route path="projects/:id" element={<Project />} />

      {/* proposals */}
      <Route path="proposals" element={<Proposals />} />
      <Route path="proposals/:id" element={<Proposal />} />

      {/* add */}
      <Route path="list" element={<ListProject />} />
      <Route path="add" element={<ListProject />} />

      {/* icrc scan */}
      {/* <Route path="icrc_scan" element={<IcrcScan />} /> */}

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
