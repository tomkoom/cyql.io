import { LucideIconsKeys } from "@/components/Icon"
import { ROUTES } from "@/constants"
import { useAuth } from "@/context/Auth"
import { verifyAdmin } from "@/utils/verifyAdmin"
import { useLocation } from "react-router-dom"
import { useNavigation } from "."

interface Navlink {
  label: string
  pathname: string
  route: () => void
  icon?: LucideIconsKeys
  isActive: boolean
}

interface UseNavlinks {
  navlinks: Navlink[]
}

export const useNavlinks = (): UseNavlinks => {
  const { toAdmin, toHome, toProjects, toCollections, toStats, toPromote, toListProject } = useNavigation()
  const { userId } = useAuth()
  const location = useLocation()
  const currentPathname = location.pathname

  const navlinks: Navlink[] = [
    {
      label: "Home",
      pathname: ROUTES.HOME,
      route: toHome,
      icon: undefined,
      isActive: currentPathname === ROUTES.HOME,
    },
    {
      label: "Projects",
      pathname: ROUTES.PROJECTS,
      route: toProjects,
      icon: undefined,
      isActive: currentPathname.startsWith(ROUTES.PROJECTS),
    },
    {
      label: "Collections",
      pathname: ROUTES.COLLECTIONS,
      route: toCollections,
      icon: undefined,
      isActive: currentPathname.startsWith(ROUTES.COLLECTIONS),
    },
    {
      label: "IC Stats",
      pathname: ROUTES.STATS,
      route: toStats,
      icon: undefined,
      isActive: currentPathname.startsWith(ROUTES.STATS),
    },
    {
      label: "Promote",
      pathname: ROUTES.PROMOTE,
      route: toPromote,
      icon: undefined,
      isActive: currentPathname.startsWith(ROUTES.PROMOTE),
    },
    // {
    //   label: "List Project",
    //   pathname: ROUTES.LIST_PROJECT,
    //   route: toListProject,
    //   icon: "Plus",
    //   isActive: currentPathname.startsWith(ROUTES.LIST_PROJECT),
    // },
    // { label: "List Project", pathname: "/list", route: toList, icon: iPlus, isActive: currentPathname === "/list" },
    // { label: "Proposals", pathname: "/proposals", route: toProposals, icon: undefined, isActive: currentPathname.startsWith("/proposals") },
    // { label: "ICRC Explorer", pathname: "/icrc_scan", route: toIcrcScan, icon: undefined, isActive: currentPathname.startsWith("/icrc_scan") },
  ]

  // Add admin navlink if user is verified as admin
  if (verifyAdmin(userId)) {
    navlinks.push({
      label: "Admin",
      pathname: ROUTES.ADMIN,
      route: toAdmin,
      icon: undefined,
      isActive: currentPathname.startsWith(ROUTES.ADMIN),
    })
  }

  return { navlinks }
}
