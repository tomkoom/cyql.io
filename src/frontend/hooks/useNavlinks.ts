import { useNav } from "."
import { ReactNode } from "react"
import { iPlus } from "@/components/icons/Icons"

interface Navlink {
  label: string
  pathname: string
  route: () => void
  icon?: ReactNode
}

interface UseNavlinks {
  navlinks: Navlink[]
}

export const useNavlinks = (): UseNavlinks => {
  const { toHome, toProjects, toList, toProposals, toIcrcScan } = useNav()

  const navlinks: Navlink[] = [
    { label: "Home", pathname: "/", route: toHome, icon: undefined },
    { label: "Curated Projects", pathname: "/projects", route: toProjects, icon: undefined },
    // { label: "List Project", pathname: "/list", route: toList, icon: iPlus },
    // { label: "Proposals", pathname: "/proposals", route: toProposals, icon: undefined },
    // { label: "ICRC Explorer", pathname: "/icrc_scan", route: toIcrcScan, icon: undefined },
  ]

  return { navlinks }
}
