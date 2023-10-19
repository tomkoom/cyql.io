import React, { useEffect } from "react"
import { size } from "./styles/breakpoints"
import { RouterProvider } from "react-router-dom"
import { sortCategoriesByNum } from "@/utils/sortCategoriesByNum"

// hooks
import { useAuth } from "@/context/Auth"
import { useWindowSize } from "@/hooks/useWindowSize"
import useBackend from "./hooks/useBackend"

// components
import { Router } from "@/routes/_index"

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

  // reset mobile menu when deivice size > 1024
  useEffect(() => {
    if (mobileMenuModal && width > size.laptop) {
      dispatch(setMobileMenuModal(false))
    }
  }, [width])

  // close sign in modal after user has logged
  useEffect(() => {
    if (userId !== "") {
      dispatch(setSignInModal(false))
    }
  }, [userId])

  // sort categories by num
  useEffect(() => {
    if (projects.length > 0) {
      const sorted = sortCategoriesByNum(allCategories, projects)
      dispatch(setCategoriesSortedByNum(sorted))
    }
  }, [projects])

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
