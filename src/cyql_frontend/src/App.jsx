import React, { useEffect } from "react";
import { size } from "./styles/breakpoints";

// router
import { RouterProvider } from "react-router-dom";

// hooks
import { useWindowSize } from "@/hooks/useWindowSize";

// utils
import { sortCategoriesByNum } from "@/utils/sortCategoriesByNum";

// juno
import { init_juno, refreshProjects } from "@/shared/juno";

// auth
import { useAuth } from "@/context/AuthContext";

// components
import { Router } from "@/routes/_index";

// state
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
// import { setUpvotedProjects } from "@/state/profile/profile";
import { selectProjects } from "@/state/projects";
import { selectAllCategories } from "@/state/categories/allCategories";
import { setCategoriesSortedByNum } from "@/state/categories/categoriesSortedByNum";

// state: modals
import { setSignInModal, setMobileMenuModal, selectMobileMenuModal } from "@/state/modals/modals";

const App = () => {
  // hooks
  const dispatch = useAppDispatch();
  const { userKey } = useAuth();
  const { width } = useWindowSize();

  // modals
  const mobileMenuModal = useAppSelector(selectMobileMenuModal);

  // ...
  const projects = useAppSelector(selectProjects);
  const allCategories = useAppSelector(selectAllCategories);

  // juno start
  useEffect(() => {
    (async () => {
      await init_juno();
      await refreshProjects();
    })();
  }, []);
  // juno end

  // reset mobile menu when deivice size > 1024
  useEffect(() => {
    if (mobileMenuModal && width > size.laptop) {
      dispatch(setMobileMenuModal(false));
    }
  }, [width]);

  // close sign in modal after user has logged
  useEffect(() => {
    if (userKey !== "") {
      dispatch(setSignInModal(false));
    }
  }, [userKey]);

  // sort categories by num
  useEffect(() => {
    if (projects.length > 0) {
      const categoriesSortedByNum = sortCategoriesByNum(allCategories, projects);
      dispatch(setCategoriesSortedByNum(categoriesSortedByNum));
    }
  }, [projects]);

  // get upvoted projects
  // useEffect(() => {
  //   if (userKey !== "") {
  //     dispatch(setUpvotedProjects([]));
  //   }
  //   // fetch updated data
  // }, [userKey]);

  return <RouterProvider router={Router} />;
};

export default App;
