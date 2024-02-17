import React, { FC, useEffect } from "react"
import { RouterProvider } from "react-router-dom"
import { sortCategoriesByNum } from "@/utils/sortCategoriesByNum"
import { Router } from "@/routes/_index"
import { NETWORK } from "@/constants/constants"

// hooks
import { useAuth } from "@/context/Auth"
import { useBackend, useUsers } from "./hooks/_index"

// state
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux"
// import { setUpvotedProjects } from "@/state/profile/profile";
import { selectActiveProjects } from "@/state/projects"
import { selectAllCategories } from "@/state/categories/allCategories"
import { setCategoriesSortedByNum } from "@/state/categories/categoriesSortedByNum"

const App: FC = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const { actor, isAuthenticated } = useAuth()
  const { refreshProjects } = useBackend()
  const { registerUser } = useUsers()
  const projects = useAppSelector(selectActiveProjects)
  const allCategories = useAppSelector(selectAllCategories)

  useEffect(() => {
    if (!actor) return
    refreshProjects()
  }, [actor])

  useEffect(() => {
    if (!isAuthenticated) return
    if (NETWORK !== "local") registerUser()
  }, [isAuthenticated])

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

  // get upvoted projects
  // useEffect(() => {
  //   if (userId !== "") {
  //     dispatch(setUpvotedProjects([]));
  //   }
  //   // fetch updated data
  // }, [userId]);

  return <RouterProvider router={Router} />
}

export default App
