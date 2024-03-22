import { useNavigate } from "react-router-dom"
import { useNav } from "./_index"
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
  const navigate = useNavigate()
  const { toHome, toProjects, toSubmit, toProposals } = useNav()

  const nav = (pathname: string): void => {
    navigate({
      pathname,
    })
  }

  const navlinks: Navlink[] = [
    { label: "Home", pathname: "/", route: toHome, icon: undefined },
    { label: "Curated Projects", pathname: "/projects", route: toProjects, icon: undefined },
    { label: "Propose Project", pathname: "/list", route: toSubmit, icon: iPlus },
    { label: "Project Proposals", pathname: "/proposals", route: toProposals, icon: undefined },
  ]

  return { navlinks }
}
