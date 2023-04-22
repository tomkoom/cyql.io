import React, { useEffect } from "react";
import "./App.css";
import "@styles/root.css";
import "@styles/theme.css";
import "@styles/typography.css";
import { Switch, Route } from "react-router-dom";
import CookieConsent from "react-cookie-consent";

// constants
import {
  iiAdmin1,
  iiAdmin2,
  plugAdmin1,
  plugAdmin2,
  stoicAdmin1,
  stoicAdmin2,
  junoSatelliteId,
  junoDatastoreCollection,
} from "@constants/constants";

// utils
import { useWindowSize } from "@hooks/useWindowSize";
import { sortByDate } from "@utils/sort";

// juno db https://juno.build/docs/intro
import { initJuno, listDocs } from "@junobuild/core";

// auth
import { useAuth } from "@context/AuthContext";

// components
import { Admin, Home, NotFound, Profile, Project, Projects, Submit } from "@pages/index";
import { Footer, Nav, Sidebar, Summary } from "@layout/index";
import { ProjectModal, SignInModal } from "@modals/index";

// state
import { useDispatch, useSelector } from "react-redux";
import { selectTheme } from "@state/theme";
// import { setUpvotedProjects } from "@state/profile/profile";
import { setProjectsDocs, setProjectsNum } from "@state/projects";

// state: modals
import {
  setSignInModal,
  selectSignInModal,
  setMobileMenuModal,
  selectMobileMenuModal,
} from "@state/modals/modals";
import { selectProjectModal } from "@state/modals/projectModal/projectModal";
import { selectShareModal } from "./state/modals/shareModal";
import { selectNftModal } from "@state/modals/nftModal";

const App = () => {
  // hooks
  const dispatch = useDispatch();
  const { principalIdStr, isAuthenticated } = useAuth();
  const [deviceWidth] = useWindowSize();

  const admins = [iiAdmin1, iiAdmin2, plugAdmin1, plugAdmin2, stoicAdmin1, stoicAdmin2];
  const verifyAdmin = (principalIdStr) => {
    return admins.includes(principalIdStr);
  };

  // juno start
  const bigIntToNum = (p) => {
    return Object.assign({}, p, {
      created_at: Number(p.created_at),
      updated_at: Number(p.updated_at),
    });
  };

  useEffect(() => {
    (async () => {
      await initJuno({
        satelliteId: junoSatelliteId,
      });

      await listDocs({
        collection: junoDatastoreCollection,
        filter: {},
      })
        .then((docs) => {
          const projectsDocs = docs.items
            .sort((a, b) => sortByDate(a.data.added, b.data.added))
            .map((project) => bigIntToNum(project));

          const projectsDocsNum = projectsDocs.filter(
            (projectDoc) => projectDoc.data.archived === false
          ).length;

          dispatch(setProjectsDocs(projectsDocs));
          dispatch(setProjectsNum(projectsDocsNum));
        })
        .catch((err) => console.log(err));
    })();
  }, []);
  // juno end

  // theme
  const theme = useSelector(selectTheme);

  // modals
  const projectModal = useSelector(selectProjectModal);
  const shareModal = useSelector(selectShareModal);
  const signInModal = useSelector(selectSignInModal);
  const mobileMenuModal = useSelector(selectMobileMenuModal);
  const nftModal = useSelector(selectNftModal);

  // prevent from scrolling when modal is active
  // to refactor
  const modals = [signInModal, mobileMenuModal, projectModal, shareModal, nftModal];
  useEffect(() => {
    const modalIsActive = signInModal || mobileMenuModal || projectModal || shareModal || nftModal;
    if (modalIsActive) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, modals);

  // reset mobile menu when deivice size > 1023
  useEffect(() => {
    if (mobileMenuModal && deviceWidth > 1023) {
      dispatch(setMobileMenuModal(false));
    }
  }, [deviceWidth]);

  // close sign in modal after user has logged
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(setSignInModal(false));
    }
  }, [isAuthenticated]);

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

            {principalIdStr !== "" && (
              <Route exact path="/profile">
                <Profile />
              </Route>
            )}

            {verifyAdmin(principalIdStr) && (
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

      <div className="footer">
        <Footer />
      </div>

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
