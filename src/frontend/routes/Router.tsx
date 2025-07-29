import Layout from "@/components/layout/Layout"
import { ROUTES } from "@/constants"
import { Admin, Collections, Home, ListProject, NotFound, Profile, Project, Projects, Promote, Stats } from "@/pages"
import { AdminRoutes, ProtectedRoutes } from "@/routes"
import { createHashRouter, createRoutesFromElements, Route } from "react-router-dom"

export default createHashRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<NotFound text="Something went wrong" />}>
      <Route index element={<Home />} />
      <Route path={ROUTES.PROJECTS} element={<Projects />} />
      <Route path={`${ROUTES.PROJECTS}/:id`} element={<Project />} />
      <Route path={ROUTES.COLLECTIONS} element={<Collections />} />
      <Route path={ROUTES.STATS} element={<Stats />} />
      <Route path={ROUTES.PROMOTE} element={<Promote />} />
      <Route path={ROUTES.LIST_PROJECT} element={<ListProject />} />

      {/* proposals */}
      {/* <Route path="proposals" element={<Proposals />} /> */}
      {/* <Route path="proposals/:id" element={<Proposal />} /> */}

      {/* icrc scan */}
      {/* <Route path="icrc_scan" element={<IcrcScan />} /> */}

      {/* protected */}
      <Route element={<ProtectedRoutes />}>
        <Route path="profile" element={<Profile />} />
      </Route>

      {/* admin */}
      <Route element={<AdminRoutes />}>
        <Route path="admin" element={<Admin />} />
      </Route>
    </Route>
  )
)
