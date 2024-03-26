import { useNavigate, createSearchParams } from "react-router-dom"

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

  // ...
  const toSubmit = (): void => navigate("/list")
  const toIcrcScan = (): void => navigate("/icrc_scan")
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
