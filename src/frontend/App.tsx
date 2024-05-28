import React, { FC, useEffect } from "react"
import { RouterProvider } from "react-router-dom"
import { sortCategoriesByNum } from "@/utils/sortCategoriesByNum"
import { Router } from "@/routes/_index"

// hooks
import { useAuth } from "@/context/Auth"
import { useNft, useIcpLedger } from "@/hooks/_index"

// state
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux"
import { selectActiveCuratedProjects } from "@/state/curatedProjects"
import { selectAllCategories } from "@/state/categories/allCategories"
import { setCategoriesSortedByNum } from "@/state/categories/categoriesSortedByNum"
import { setSignInModalIsOpen } from "@/state/modals/signInModal"

const App: FC = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const { nft, isAuthenticated, accounntIdHex } = useAuth()
  const { refreshNfts } = useNft()
  const { refreshIcpBalance } = useIcpLedger()
  const projects = useAppSelector(selectActiveCuratedProjects)
  const allCategories = useAppSelector(selectAllCategories)

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
