import React, { FC, useEffect } from "react"
import { RouterProvider } from "react-router-dom"
import { sortCategoriesByNum } from "@/utils/sortCategoriesByNum"
import { Router } from "@/routes/_index"
import { RefreshProjectsArgs } from "@/state/_types/curated_projects_types"

// hooks
import { useAuth } from "@/context/Auth"
import { useBackend, useNft, useIcpLedger, useProposals } from "./hooks/_index"

// state
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux"
import { selectActiveCuratedProjects } from "@/state/curatedProjects"
import { selectAllCategories } from "@/state/categories/allCategories"
import { setCategoriesSortedByNum } from "@/state/categories/categoriesSortedByNum"
import { setSignInModalIsOpen } from "@/state/modals/signInModal"
import { selectPaginated } from "./state/projects/paginated"

const App: FC = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const { actor, nft, isAuthenticated, accounntIdHex } = useAuth()
  const { refreshPaginated } = useBackend()
  const { refreshNfts } = useNft()
  const { refreshIcpBalance } = useIcpLedger()
  const { refreshProposals } = useProposals()
  const projects = useAppSelector(selectActiveCuratedProjects)
  const allCategories = useAppSelector(selectAllCategories)

  // pagination
  const paginated = useAppSelector(selectPaginated)
  const page = paginated.selectedPage
  const itemsPerPage = paginated.itemsPerPage

  const refresh = async (): Promise<void> => {
    try {
      await refreshProposals()
      // await refreshCuratedProjects()

      const args: RefreshProjectsArgs = {
        filterByCategory: "All",
        filterByOnchain: [],
        filterByOpenSource: [],
        sort: { newest_first: null },
        page,
        pageSize: itemsPerPage,
      }

      await refreshPaginated(args)
    } catch (error) {
      throw new Error(error)
    }
  }

  useEffect(() => {
    if (!actor) return
    refresh()
  }, [actor])

  useEffect(() => {
    if (nft && isAuthenticated && accounntIdHex) {
      refreshNfts()
    }
  }, [nft, isAuthenticated, accounntIdHex])

  useEffect(() => {
    if (!isAuthenticated) return

    // close sign-in modal
    dispatch(setSignInModalIsOpen(false))
  }, [isAuthenticated])

  useEffect(() => {
    if (accounntIdHex) {
      refreshIcpBalance(accounntIdHex)
    }
  }, [accounntIdHex])

  // sort categories
  useEffect(() => {
    if (projects.length < 0) return
    const sorted = sortCategoriesByNum(allCategories, projects)
    dispatch(setCategoriesSortedByNum(sorted))
  }, [projects])

  return <RouterProvider router={Router} />
}

export default App
