import { useQueryParams } from "@/hooks"
import { useAppSelector } from "@/hooks/useRedux"
import { selectIcrcLedgerId } from "@/state/icrc_scan/icrcLedger"
import { createSearchParams, useNavigate } from "react-router-dom"

export const useNavigation = () => {
  const navigate = useNavigate()
  const { queryParamsString } = useQueryParams()
  const icrcLedgerId = useAppSelector(selectIcrcLedgerId)

  const goBack = () => navigate(-1)

  const toHome = () => {
    navigate({
      pathname: "/",
      search: "",
    })
  }

  const toProjects = () => {
    navigate({
      pathname: "projects",
      search: `?${createSearchParams({
        ...queryParamsString,
      })}`,
    })
  }

  const toCollections = () => {
    navigate({
      pathname: "collections",
      search: "",
    })
  }

  const toMostUpvoted = () => {
    navigate({
      pathname: "projects",
      search: `?${createSearchParams({
        ...queryParamsString,
        sort: "most_upvoted",
      })}`,
    })
  }

  const toProject = (id: string) =>
    navigate({
      pathname: `/projects/${id}`,
      search: "",
    })

  // proposals

  const toList = () =>
    navigate({
      pathname: "/list",
      search: "",
    })

  const toProposals = () =>
    navigate({
      pathname: "/proposals",
      search: "",
    })

  const toProposal = (id: string) =>
    navigate({
      pathname: `/proposals/${id}`,
      search: "",
    })

  // icrc scan

  const toIcrcScan = () => {
    const params = {
      ledger_id: icrcLedgerId,
    }

    navigate({
      pathname: "icrc_scan",
      search: `?${createSearchParams(params)}`,
    })
  }

  // ...

  const toProfile = () =>
    navigate({
      pathname: "/profile",
      search: "",
    })

  const toAdmin = () =>
    navigate({
      pathname: "/admin",
      search: "",
    })

  return {
    goBack,
    toHome,
    toCollections,

    // projects
    toProjects,
    toMostUpvoted,
    toProject,

    // proposals
    toList,
    toProposals,
    toProposal,

    // ...
    toIcrcScan,
    toProfile,
    toAdmin,
  }
}
