import React, { useEffect } from "react"
import { size } from "./styles/breakpoints"
import { RouterProvider } from "react-router-dom"
import { sortCategoriesByNum } from "@/utils/sortCategoriesByNum"
import { Router } from "@/routes/_index"

// hooks
import { useAuth } from "@/context/Auth"
import { useWindowSize } from "@/hooks/useWindowSize"
import useBackend from "./hooks/useBackend"

// state
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux"
// import { setUpvotedProjects } from "@/state/profile/profile";
import { selectActiveProjects } from "@/state/projects"
import { selectAllCategories } from "@/state/categories/allCategories"
import { setCategoriesSortedByNum } from "@/state/categories/categoriesSortedByNum"

// state: modals
import { setSignInModal, setMobileMenuModal, selectMobileMenuModal } from "@/state/modals/modals"

const App = () => {
  const dispatch = useAppDispatch()
  const { userId, actor } = useAuth()
  const { refreshProjects } = useBackend()
  const { width } = useWindowSize()
  const mobileMenuModal = useAppSelector(selectMobileMenuModal)
  const projects = useAppSelector(selectActiveProjects)
  const allCategories = useAppSelector(selectAllCategories)

  useEffect(() => {
    refreshProjects()
  }, [actor])

  // sort categories
  useEffect(() => {
    if (projects.length < 0) return
    const sorted = sortCategoriesByNum(allCategories, projects)
    dispatch(setCategoriesSortedByNum(sorted))
  }, [projects])

  // // reset mobile menu when deivice size > 1024
  // useEffect(() => {
  //   if (mobileMenuModal && width > size.laptop) {
  //     dispatch(setMobileMenuModal(false))
  //   }
  // }, [width])

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
