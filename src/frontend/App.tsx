import React, { useEffect } from "react"
import { size } from "./styles/breakpoints"
// import { backend } from "../declarations/backend"

// router
import { RouterProvider } from "react-router-dom"

// hooks
import { useWindowSize } from "@/hooks/useWindowSize"

// utils
import { sortCategoriesByNum } from "@/utils/sortCategoriesByNum"

// juno
import { init_juno, refreshProjects } from "@/shared/juno"

// auth
import { useAuth } from "@/context/AuthContext"

// components
import { Router } from "@/routes/_index"

// state
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux"
// import { setUpvotedProjects } from "@/state/profile/profile";
import { selectProjects } from "@/state/projects"
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
  const { userId, signOut } = useAuth()
  const { width } = useWindowSize()

  // modals
  const mobileMenuModal = useAppSelector(selectMobileMenuModal)
  const signInModalIsOpen = useAppSelector(selectSignInModal)

  // ...
  const projects = useAppSelector(selectProjects)
  const allCategories = useAppSelector(selectAllCategories)

  // useEffect(() => {
  //   console.log(userId)
  // }, [userId])

  // juno start
  useEffect(() => {
    ;(async () => {
      await init_juno()
      await refreshProjects()
    })()
  }, [])
  // juno end

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
      const categoriesSortedByNum = sortCategoriesByNum(allCategories, projects)
      dispatch(setCategoriesSortedByNum(categoriesSortedByNum))
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

  return (
    <div>
      {/* <div onClick={signOut}>logout</div>
      <div
        onClick={async () => {
          const res = await backend.getDoc("cyql_projects", "123")
          console.log(res)
        }}
      >
        test get_goc
      </div> */}
      <RouterProvider router={Router} />
    </div>
  )
}

export default App
