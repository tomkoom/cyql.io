import React, { useEffect } from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import CookieConsent from "react-cookie-consent";

// constants
import { iiAdmin1, iiAdmin2 } from "@/constants/constants";

// hooks
import { useWindowSize } from "@/hooks/useWindowSize";

// utils
import { verifyAdmin } from "@/utils/verifyAdmin";
import { sortCategoriesByNum } from "@/utils/sortCategoriesByNum";

// juno
import { initJuno0, updateProjects } from "@/shared/juno";

// auth
import { useAuth } from "@/context/AuthContext";

// components
import {
  Admin,
  Home,
  NotFound,
  Profile,
  Project,
  Projects,
  Submit,
} from "@/components/pages/index";
import { Footer, Nav, Sidebar, Summary } from "@/components/layout/_index";
import { ProjectModal } from "@/components/modals/_index";

// state
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { selectTheme } from "@/state/ui/theme";
// import { setUpvotedProjects } from "@/state/profile/profile";
import { selectProjects } from "@/state/projects";
import { selectAllCategories } from "@/state/categories/allCategories";
import { setCategoriesSortedByNum } from "@/state/categories/categoriesSortedByNum";

// state: modals
import { setSignInModal, setMobileMenuModal, selectMobileMenuModal } from "@/state/modals/modals";
import { selectProjectModal } from "@/state/modals/projectModal/projectModal";

const App = () => {
  // hooks
  const dispatch = useAppDispatch();
  const { userKey } = useAuth();
  const { width } = useWindowSize();

  // modals
  const projectModal = useAppSelector(selectProjectModal);
  const mobileMenuModal = useAppSelector(selectMobileMenuModal);

  // ...
  const theme = useAppSelector(selectTheme);
  const projects = useAppSelector(selectProjects);
  const allCategories = useAppSelector(selectAllCategories);
  const admins = [iiAdmin1, iiAdmin2];

  // juno start
  useEffect(() => {
    (async () => {
      await initJuno0();
      await updateProjects();
    })();
  }, []);
  // juno end

  // reset mobile menu when deivice size > 1023
  useEffect(() => {
    if (mobileMenuModal === true && width > 1023) {
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

  return (
    <div className={`app ${theme}`}>
      <Summary />
      <Nav />

      <div className="content">
        <Sidebar />

        <div className="main">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>

            <Route exact path="/projects">
              <Projects />
            </Route>

            <Route exact path="/projects/:slug">
              <Project />
            </Route>

            <Route exact path="/submit">
              <Submit />
            </Route>

            {userKey !== "" && (
              <Route exact path="/profile">
                <Profile />
              </Route>
            )}

            {admins.length > 0 && userKey !== "" && verifyAdmin(admins, userKey) && (
              <Route exact path="/admin">
                <Admin />
              </Route>
            )}

            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </div>
      </div>

      {projects.length > 0 && <Footer />}

      {/* cookies */}
      <CookieConsent
        cookieName="cookie"
        disableStyles={true}
        buttonText="Ok"
        containerClasses="cookie"
        contentClasses="cookie__content"
        buttonClasses="cookie__btn"
        expires={90}
      >
        this site uses 🍪 to enhance ux,{" "}
        <a
          className="cookie__link"
          href="https://tomkoom.notion.site/cyql-io-cookie-policy-f48e5d0a4b194e68bdcce944a2d9193b"
          rel="noreferrer noopener"
          target="_blank"
        >
          learn more
        </a>
      </CookieConsent>

      {/* modals */}
      {projectModal === true && <ProjectModal />}
    </div>
  );
};

export default App;
