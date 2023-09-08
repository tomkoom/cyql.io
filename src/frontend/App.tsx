import React, { useEffect } from "react"
import { size } from "./styles/breakpoints"

// router
import { RouterProvider } from "react-router-dom"

// hooks
import { useWindowSize } from "@/hooks/useWindowSize"
import useBackend from "./hooks/useBackend"

// utils
import { sortCategoriesByNum } from "@/utils/sortCategoriesByNum"

// auth
import { useAuth } from "@/context/Auth"

// components
import { Router } from "@/routes/_index"

// state
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux"
// import { setUpvotedProjects } from "@/state/profile/profile";
import { selectActiveProjects } from "@/state/projects"
import { selectAllCategories } from "@/state/categories/allCategories"
import { setCategoriesSortedByNum } from "@/state/categories/categoriesSortedByNum"

// state: modals
import {
  setSignInModal,
  setMobileMenuModal,
  selectMobileMenuModal,
  selectSignInModal,
} from "@/state/modals/modals"

const App = () => {
  // hooks
  const dispatch = useAppDispatch()
  const { userId, actor } = useAuth()
  const { refreshProjects } = useBackend()
  const { width } = useWindowSize()

  // modals
  const mobileMenuModal = useAppSelector(selectMobileMenuModal)
  const signInModalIsOpen = useAppSelector(selectSignInModal)

  // ...
  const projects = useAppSelector(selectActiveProjects)
  const allCategories = useAppSelector(selectAllCategories)

  useEffect(() => {
    refreshProjects()
  }, [actor])

  // test
  useEffect(() => {
    console.log(userId)
  }, [userId])

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

  // hide scrollbar when sign in modal is closed
  useEffect(() => {
    if (signInModalIsOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
  }, [signInModalIsOpen])

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
