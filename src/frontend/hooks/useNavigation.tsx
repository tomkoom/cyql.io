import { ROUTES } from "@/constants"
import { useQueryParams } from "@/hooks"
// import { useAppSelector } from "@/hooks/useRedux"
// import { selectIcrcLedgerId } from "@/state/icrc_scan/icrcLedger"
import { createSearchParams, useNavigate } from "react-router-dom"

export const useNavigation = () => {
  const navigate = useNavigate()
  const { queryParamsString } = useQueryParams()
  // const icrcLedgerId = useAppSelector(selectIcrcLedgerId)

  const toBack = () => navigate(-1)

  const toHome = () => {
    navigate({
      pathname: ROUTES.HOME,
      search: "",
    })
  }

  const toProjects = () => {
    navigate({
      pathname: ROUTES.PROJECTS,
      search: `?${createSearchParams({
        ...queryParamsString,
      })}`,
    })
  }

  const toProject = (id: string) =>
    navigate({
      pathname: `${ROUTES.PROJECTS}/${id}`,
      search: "",
    })

  const toCollections = () => {
    navigate({
      pathname: ROUTES.COLLECTIONS,
      search: "",
    })
  }

  const toStats = () => {
    navigate({
      pathname: ROUTES.STATS,
      search: "",
    })
  }

  const toPromote = () => {
    navigate({
      pathname: ROUTES.PROMOTE,
      search: "",
    })
  }

  const toListProject = () => {
    navigate({
      pathname: ROUTES.LIST_PROJECT,
      search: "",
    })
  }

  const toProfile = () =>
    navigate({
      pathname: ROUTES.PROFILE,
      search: "",
    })

  const toAdmin = () =>
    navigate({
      pathname: ROUTES.ADMIN,
      search: "",
    })

  // const toMostUpvoted = () => {
  //   navigate({
  //     pathname: ROUTES.PROJECTS,
  //     search: `?${createSearchParams({
  //       ...queryParamsString,
  //       sort: "most_upvoted",
  //     })}`,
  //   })
  // }

  // proposals

  // const toProposals = () =>
  //   navigate({
  //     pathname: "/proposals",
  //     search: "",
  //   })

  // const toProposal = (id: string) =>
  //   navigate({
  //     pathname: `/proposals/${id}`,
  //     search: "",
  //   })

  // icrc scan

  // const toIcrcScan = () => {
  //   const params = {
  //     ledger_id: icrcLedgerId,
  //   }

  //   navigate({
  //     pathname: "icrc_scan",
  //     search: `?${createSearchParams(params)}`,
  //   })
  // }

  return {
    toHome,
    toProjects,
    // toMostUpvoted,
    toProject,
    toCollections,
    toStats,
    toPromote,
    toListProject,
    toProfile,
    toAdmin,
    // ...
    toBack,

    // ...
    // toProposals,
    // toProposal,
    // toIcrcScan,
  }
}
