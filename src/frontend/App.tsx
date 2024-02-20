import React, { FC, useEffect } from "react"
import { RouterProvider } from "react-router-dom"
import { sortCategoriesByNum } from "@/utils/sortCategoriesByNum"
import { Router } from "@/routes/_index"
import { NETWORK } from "@/constants/constants"
import { getAccountIdHex } from "@/utils/getAccountIdHex"

// hooks
import { useAuth } from "@/context/Auth"
import { useBackend, useUsers } from "./hooks/_index"

// state
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux"
import { selectActiveProjects } from "@/state/projects"
import { selectAllCategories } from "@/state/categories/allCategories"
import { setCategoriesSortedByNum } from "@/state/categories/categoriesSortedByNum"
import { setAccountId } from "@/state/user"

const App: FC = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const { actor, isAuthenticated, userPrincipal } = useAuth()
  const { refreshProjects, refreshVotingPower } = useBackend()
  const { registerUser } = useUsers()
  const projects = useAppSelector(selectActiveProjects)
  const allCategories = useAppSelector(selectAllCategories)

  useEffect(() => {
    if (!actor) return
    refreshProjects()
  }, [actor])

  useEffect(() => {
    if (!isAuthenticated) return

    // register
    if (NETWORK !== "local") {
      ;(async () => await registerUser())()
    }

    // set user data
    ;(async () => await refreshVotingPower())()
  }, [isAuthenticated])

  useEffect(() => {
    if (!userPrincipal) return
    const accountId = getAccountIdHex(userPrincipal)
    dispatch(setAccountId(accountId))
  }, [userPrincipal])

  // sort categories
  useEffect(() => {
    if (projects.length < 0) return
    const sorted = sortCategoriesByNum(allCategories, projects)
    dispatch(setCategoriesSortedByNum(sorted))
  }, [projects])

  // // close sign in modal after user has logged
  // useEffect(() => {
  //   if (userId !== "") {
  //     dispatch(setSignInModal(false))
  //   }
  // }, [userId])

  return <RouterProvider router={Router} />
}

export default App
