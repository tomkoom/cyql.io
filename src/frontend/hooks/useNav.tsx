import { useNavigate, createSearchParams } from "react-router-dom"

// state
import { useAppSelector } from "./useRedux"
import { selectIcrcLedgerId } from "@/state/icrc_scan/icrcLedger"

export const useNav = () => {
  const navigate = useNavigate()
  const icrcLedgerId = useAppSelector(selectIcrcLedgerId)

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

  const toList = (): void => navigate("list")
  const toProposals = (): void => navigate("/proposals")
  const toProposal = (id: string): void => navigate(`/proposals/${id}`)

  // icrc scan

  const toIcrcScan = (): void => {
    const params = {
      ledger_id: icrcLedgerId,
    }

    navigate({
      pathname: "icrc_scan",
      search: `?${createSearchParams(params)}`,
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
    toList,
    toProposals,
    toProposal,

    // ...
    toSubmit,
    toIcrcScan,
    toProfile,
    toAdmin,
  }
}
