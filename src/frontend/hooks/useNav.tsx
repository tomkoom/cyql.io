import { useNavigate, createSearchParams } from "react-router-dom"
import { ICRC_SCAN_SEARCH_PARAMS_INITIAL } from "@/constants/constants"

const useNav = () => {
  const navigate = useNavigate()

  const goBack = (): void => navigate(-1)
  const toHome = (): void => navigate("/")

  // projects
  const toProjects = (): void => {
    navigate({
      pathname: "projects",
      search: `?${createSearchParams({
        category: "All",
        q: "",
      })}`,
    })
  }

  const toProject = (id: string): void => navigate(`/projects/${id}`)

  // proposals
  const toProposals = (): void => navigate("/proposals")
  const toProposal = (id: string): void => navigate(`/proposals/${id}`)

  // icrc scan

  const toIcrcScan = (): void => {
    navigate({
      pathname: "icrc_scan",
      search: `?${createSearchParams(ICRC_SCAN_SEARCH_PARAMS_INITIAL)}`,
    })
  }

  // ...
  const toSubmit = (): void => navigate("/list")
  const toProfile = (): void => navigate("/profile")
  const toAdmin = (): void => navigate("/admin")

  return {
    goBack,
    toHome,

    // projects
    toProjects,
    toProject,

    // proposals
    toProposals,
    toProposal,

    // ...
    toSubmit,
    toIcrcScan,
    toProfile,
    toAdmin,
  }
}

export default useNav
