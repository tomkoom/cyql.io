import React, { FC, useEffect } from "react"
import { RouterProvider } from "react-router-dom"
import { sortCategoriesByNum } from "@/utils/sortCategoriesByNum"
import { Router } from "@/routes/_index"
import { NETWORK } from "@/constants/constants"

// hooks
import { useAuth } from "@/context/Auth"
import { useBackend, useUsers, useNft, useScrollLock, useIcpLedger, useDao } from "./hooks/_index"

// state
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux"
import { selectActiveProjects } from "@/state/projects"
import { selectAllCategories } from "@/state/categories/allCategories"
import { setCategoriesSortedByNum } from "@/state/categories/categoriesSortedByNum"
import { setSignInModalIsOpen, selectSignInModalIsOpen } from "./state/modals/signInModal"

const App: FC = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const { actor, nft, isAuthenticated, accounntIdHex } = useAuth()
  const { lockScroll, unlockScroll } = useScrollLock()
  const { refreshProjects } = useBackend()
  const { registerUser } = useUsers()
  const { refreshNfts } = useNft()
  const { refreshIcpBalance } = useIcpLedger()
  const { refreshProposals } = useDao()
  const projects = useAppSelector(selectActiveProjects)
  const allCategories = useAppSelector(selectAllCategories)
  const signInModalIsOpen = useAppSelector(selectSignInModalIsOpen)

  const refresh = async (): Promise<void> => {
    await refreshProposals()
    await refreshProjects()
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

    // register
    if (NETWORK !== "local") {
      ;(async () => await registerUser())()
    }

    // set user data
    // ;(async () => await refreshVotingPower())()
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

  // lock scroll when modal is open
  useEffect(() => {
    if (signInModalIsOpen) {
      lockScroll()
    } else {
      unlockScroll()
    }
  }, [signInModalIsOpen])

  return <RouterProvider router={Router} />
}

export default App
