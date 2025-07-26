import { ROUTES } from "@/constants"
import { useAuth } from "@/context/Auth"
import { verifyAdmin } from "@/utils/verifyAdmin"
import { ReactNode } from "react"
import { useLocation } from "react-router-dom"
import { useNavigation } from "."

interface Navlink {
  label: string
  pathname: string
  route: () => void
  icon?: ReactNode
  isActive: boolean
}

interface UseNavlinks {
  navlinks: Navlink[]
}

export const useNavlinks = (): UseNavlinks => {
  const { toHome, toProjects, toCollections, toAdmin } = useNavigation()
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
