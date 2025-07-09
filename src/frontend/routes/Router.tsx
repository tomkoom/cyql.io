import Layout from "@/components/layout/Layout"
import { Admin, Home, ListProject, NotFound, Profile, Project, Projects, Proposal, Proposals } from "@/pages"
import { AdminRoutes, ProtectedRoutes } from "@/routes"
import { createHashRouter, createRoutesFromElements, Route } from "react-router-dom"

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
