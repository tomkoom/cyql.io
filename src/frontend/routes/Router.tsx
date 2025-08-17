import Layout from "@/components/layout/Layout"
import { ROUTES } from "@/constants"
import {
  Admin,
  AdminCollections,
  AdminProjects,
  AdminUsers,
  Collections,
  CookiePolicy,
  Home,
  ListProject,
  NotFound,
  PrivacyPolicy,
  Profile,
  Project,
  Projects,
  Promote,
  Stats,
  TermsOfService,
} from "@/pages"
import { AdminRoutes, ProtectedRoutes } from "@/routes"
import { createHashRouter, createRoutesFromElements, Route } from "react-router-dom"

export default createHashRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<NotFound />}>
      <Route index element={<Home />} />
      <Route path={ROUTES.PROJECTS} element={<Projects />} />
      <Route path={`${ROUTES.PROJECTS}/:id`} element={<Project />} />
      <Route path={ROUTES.COLLECTIONS} element={<Collections />} />
      <Route path={ROUTES.STATS} element={<Stats />} />
      <Route path={ROUTES.PROMOTE} element={<Promote />} />
      <Route path={ROUTES.GET_LISTED} element={<ListProject />} />

      {/* legal */}
      <Route path={ROUTES.PRIVACY_POLICY} element={<PrivacyPolicy />} />
      <Route path={ROUTES.TERMS_OF_SERVICE} element={<TermsOfService />} />
      <Route path={ROUTES.COOKIE_POLICY} element={<CookiePolicy />} />

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
        <Route path="admin" element={<Admin />}>
          <Route path="projects" element={<AdminProjects />} />
          <Route path="collections" element={<AdminCollections />} />
          <Route path="users" element={<AdminUsers />} />
        </Route>
      </Route>
    </Route>
  )
)
