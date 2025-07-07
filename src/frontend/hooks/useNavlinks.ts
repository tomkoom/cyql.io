import { useAuth } from "@/context/Auth"
import { verifyAdmin } from "@/utils/verifyAdmin"
import { ReactNode } from "react"
import { useLocation } from "react-router-dom"
import { useNav } from "."

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
  const { toHome, toProjects, toList, toProposals, toIcrcScan, toAdmin } = useNav()
  const { userId } = useAuth()
  const location = useLocation()
  const currentPathname = location.pathname

  const navlinks: Navlink[] = [
    {
      label: "Home",
      pathname: "/",
      route: toHome,
      icon: undefined,
      isActive: currentPathname === "/",
    },
    {
      label: "Projects",
      pathname: "/projects",
      route: toProjects,
      icon: undefined,
      isActive: currentPathname.startsWith("/projects"),
    },
    // { label: "List Project", pathname: "/list", route: toList, icon: iPlus, isActive: currentPathname === "/list" },
    // { label: "Proposals", pathname: "/proposals", route: toProposals, icon: undefined, isActive: currentPathname.startsWith("/proposals") },
    // { label: "ICRC Explorer", pathname: "/icrc_scan", route: toIcrcScan, icon: undefined, isActive: currentPathname.startsWith("/icrc_scan") },
  ]

  // Add admin navlink if user is verified as admin
  if (verifyAdmin(userId)) {
    navlinks.push({
      label: "Admin",
      pathname: "/admin",
      route: toAdmin,
      icon: undefined,
      isActive: currentPathname.startsWith("/admin"),
    })
  }

  return { navlinks }
}
