import { useNavigate, createSearchParams } from "react-router-dom"
import { useQueryParams } from "@/hooks"

// state
import { useAppSelector } from "@/hooks/useRedux"
import { selectIcrcLedgerId } from "@/state/icrc_scan/icrcLedger"

export const useNav = () => {
  const navigate = useNavigate()
  const { queryParamsString } = useQueryParams()
  const icrcLedgerId = useAppSelector(selectIcrcLedgerId)

  const goBack = (): void => navigate(-1)

  const toHome = (): void => {
    navigate({
      pathname: "/",
      search: "",
    })
  }

  const toProjects = (): void => {
    navigate({
      pathname: "projects",
      search: `?${createSearchParams({
        ...queryParamsString,
      })}`,
    })
  }

  const toMostUpvoted = (): void => {
    navigate({
      pathname: "projects",
      search: `?${createSearchParams({
        ...queryParamsString,
        sort: "most_upvoted",
      })}`,
    })
  }

  const toProject = (id: string): void =>
    navigate({
      pathname: `/projects/${id}`,
      search: "",
    })

  // proposals

  const toList = (): void =>
    navigate({
      pathname: "/list",
      search: "",
    })

  const toProposals = (): void =>
    navigate({
      pathname: "/proposals",
      search: "",
    })

  const toProposal = (id: string): void =>
    navigate({
      pathname: `/proposals/${id}`,
      search: "",
    })

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

  const toProfile = (): void =>
    navigate({
      pathname: "/profile",
      search: "",
    })

  const toAdmin = (): void =>
    navigate({
      pathname: "/admin",
      search: "",
    })

  return {
    goBack,
    toHome,

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
