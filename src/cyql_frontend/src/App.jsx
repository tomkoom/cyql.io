import React, { useEffect } from "react";
import "./App.css";
import "@styles/root.css";
import "@styles/theme.css";
import "@styles/typography.css";
import { Switch, Route } from "react-router-dom";
import CookieConsent from "react-cookie-consent";

// constants
import { iiAdmin1, iiAdmin2 } from "@constants/constants";

// hooks
import { useWindowSize } from "@hooks/useWindowSize";

// utils
import { verifyAdmin } from "@utils/verifyAdmin";
import { sortCategoriesByNum } from "@utils/sortCategoriesByNum";

// juno
import { initJuno, getProjects } from "@juno/juno";

// auth
import { useAuth } from "@context/AuthContext";

// components
import { Admin, Home, NotFound, Profile, Project, Projects, Submit } from "@pages/index";
import { Footer, Nav, Sidebar, Summary } from "@layout/index";
import { ProjectModal, SignInModal } from "@modals/index";

// state
import { useDispatch, useSelector } from "react-redux";
import { selectTheme } from "@state/ui/theme";
// import { setUpvotedProjects } from "@state/profile/profile";
import { selectProjectsDocs } from "@state/projects";
import { selectAllCategories } from "@state/categories/allCategories";
import { setCategoriesSortedByNum } from "@state/categories/categoriesSortedByNum";

// state: modals
import {
  setSignInModal,
  selectSignInModal,
  setMobileMenuModal,
  selectMobileMenuModal,
} from "@state/modals/modals";
import { selectProjectModal } from "@state/modals/projectModal/projectModal";
import { selectShareModal } from "@state/modals/shareModal";
import { selectNftModal } from "@state/modals/nftModal";

const App = () => {
  // hooks
  const dispatch = useDispatch();
  const { userKey } = useAuth();
  const [deviceWidth] = useWindowSize();

  // modals
  const projectModal = useSelector(selectProjectModal);
  const shareModal = useSelector(selectShareModal);
  const signInModal = useSelector(selectSignInModal);
  const mobileMenuModal = useSelector(selectMobileMenuModal);
  const nftModal = useSelector(selectNftModal);

  // ...
  const theme = useSelector(selectTheme);
  const projects = useSelector(selectProjectsDocs);
  const allCategories = useSelector(selectAllCategories);
  const admins = [iiAdmin1, iiAdmin2];

  // juno start
  useEffect(() => {
    (async () => {
      await initJuno();
      await getProjects();
    })();
  }, []);
  // juno end

  // prevent from scrolling when modal is active
  const modals = [signInModal, mobileMenuModal, projectModal, shareModal, nftModal];
  useEffect(() => {
    const activeModals = modals.filter((modal) => modal === true);
    if (activeModals > 0) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, modals);

  // reset mobile menu when deivice size > 1023
  useEffect(() => {
    if (mobileMenuModal === true && deviceWidth > 1023) {
      dispatch(setMobileMenuModal(false));
    }
  }, [deviceWidth]);

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
  //   if (isAuthenticated) {
  //     dispatch(setUpvotedProjects([]));
  //   }
  //   // fetch updated data
  // }, [isAuthenticated]);

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

            {verifyAdmin(admins, userKey) && (
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
      {signInModal && <SignInModal />}
      {projectModal && <ProjectModal />}
    </div>
  );
};

export default App;
