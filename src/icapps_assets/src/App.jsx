import React, { useEffect } from "react";
import "./App.css";
import "./Styles/root.css";
import "./Styles/theme.css";
import "./Styles/typography.css";

// etc
import { Switch, Route } from "react-router-dom";
import CookieConsent from "react-cookie-consent";
import k from "../../../k/k";

// toast
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// utils
import { useWindowSize } from "./Hooks/useWindowSize";
import { sortByDateAdded, sortByDate } from "./Utils/sort";

// firestore
import { onSnapshot, query, where } from "firebase/firestore";
import { projectsCollRef } from "./Firestore/firestore-collections";

// auth
import { useAuth } from "./Context/AuthContext";

// components
import {
  Admin,
  Home,
  Nft,
  Jobs,
  PostJob,
  NotFound,
  Profile,
  Project,
  Projects,
  Submit,
  UpcomingNfts,
} from "./Pages/index";
import { Summary, Nav, Sidebar, Footer } from "./Components/index";
import { ProjectModal, SignInModal } from "./Modals/index";

// state
import { useDispatch, useSelector } from "react-redux";
import { fetchIcpPrice } from "./State/icpPrice";
import { setProjects, setNFTs } from "./State/projects";
import { selectTheme } from "./State/theme";
import { setUpvotedProjects, setOwnsNFT, setNFTIdsOwned } from "./State/profile";

// state – modals
import {
  selectMobileMenuModal,
  selectSignInModal,
  setMobileMenuModal,
  setSignInModal,
} from "./State/modals";
import { selectProjectModal, setCloseProjectModal } from "./State/projectModal";

// set data
import { setNftData } from "./Pages/Nft/setNftData";
import { setProfileNftData } from "./Pages/Profile/setProfileNftData";

// methods
import { addUserToDb, setProfiles } from "./appMethods";

const App = () => {
  // hooks
  const dispatch = useDispatch();
  const {
    actor,
    principalId,
    principalIdStr,
    accountId,
    signInMethod,
    checkConnection,
    isAuthenticated,
  } = useAuth();
  const [deviceWidth] = useWindowSize();

  // theme
  const theme = useSelector(selectTheme);

  // modals
  const signInModal = useSelector(selectSignInModal);
  const mobileMenuModal = useSelector(selectMobileMenuModal);
  const projectModal = useSelector(selectProjectModal);

  // get projects and nfts
  useEffect(() => {
    const unsubscribe = onSnapshot(projectsCollRef, (snapshot) => {
      const projects = snapshot.docs
        .map((doc) => ({ ...doc.data(), idx: doc.id }))
        .sort((a, b) => sortByDateAdded(a.dateAdded, b.dateAdded))
        .sort((a, b) => sortByDate(a.added, b.added));
      const nfts = snapshot.docs
        .map((doc) => ({ ...doc.data(), idx: doc.id }))
        .filter((project) => project.category === "NFTs");

      dispatch(setProjects(projects));
      dispatch(setNFTs(nfts));
    });
    return () => {
      unsubscribe();
    };
  }, []);

  // prevent from scrolling when modal is active
  useEffect(() => {
    if (signInModal || mobileMenuModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [signInModal, mobileMenuModal]);

  // reset mobile menu when deivice size > 1023
  useEffect(() => {
    if (mobileMenuModal && deviceWidth > 1023) {
      dispatch(setMobileMenuModal(false));
    }
  }, [deviceWidth]);

  // close modal when esc is pressed
  useEffect(() => {
    const closeModal = (e) => {
      if (e.key === "Escape") {
        dispatch(setCloseProjectModal());
      }
    };

    document.body.addEventListener("keydown", closeModal);
    return () => {
      document.body.removeEventListener("keydown", closeModal);
    };
  }, []);

  // close sign in modal after user has logged
  useEffect(() => {
    if (principalIdStr) {
      const closeSignInModal = () => {
        dispatch(setSignInModal(false));
      };
      closeSignInModal();
    }
  }, [principalIdStr]);

  // EFFECTS
  useEffect(() => {
    if (actor) {
      setProfiles(actor);
    }
  }, [actor]);

  useEffect(() => {
    if (isAuthenticated) {
      addUserToDb(actor, accountId, signInMethod);
    }
  }, [isAuthenticated]);

  // set nft page data
  useEffect(() => {
    setNftData();
  }, []);

  // set icp price
  useEffect(() => {
    dispatch(fetchIcpPrice());
  }, []);

  // check auth
  useEffect(() => {
    checkConnection();
  }, []);

  // ––– SET PROFILE INFO –––

  // get upvoted projects
  useEffect(() => {
    if (principalIdStr) {
      const upvotedProjectsQuery = query(
        projectsCollRef,
        where("upvotedBy", "array-contains", principalIdStr)
      );
      const unsubscribe = onSnapshot(upvotedProjectsQuery, (snapshot) => {
        const upvotedProjects = snapshot.docs.map((doc) => ({ ...doc.data(), idx: doc.id }));
        dispatch(setUpvotedProjects(upvotedProjects));
      });
      return () => {
        unsubscribe();
      };
    }
  }, [principalIdStr]);

  // get profile nft data
  useEffect(() => {
    if (principalId) {
      setProfileNftData(principalId);
    }
  }, [principalId]);

  return (
    <div className={`app ${theme}`}>
      <Summary />
      <div className="div" />
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

            <Route exact path="/projects/:id">
              <Project />
            </Route>

            <Route exact path="/upcoming">
              <UpcomingNfts />
            </Route>

            <Route exact path="/submit">
              <Submit />
            </Route>

            {/* <Route exact path="/jobs">
              <Jobs />
            </Route>

            <Route exact path="/jobs/post">
              <PostJob />
            </Route> */}

            <Route exact path="/nft">
              <Nft />
            </Route>

            {principalId && (
              <Route exact path="/profile">
                <Profile />
              </Route>
            )}

            {(principalIdStr && principalIdStr === k.PLUG_ADMIN_1) ||
            (principalIdStr && principalIdStr === k.STOIC_ADMIN_1) ||
            (principalIdStr && principalIdStr === k.PLUG_ADMIN_2) ||
            (principalIdStr && principalIdStr === k.STOIC_ADMIN_2) ? (
              <Route exact path="/admin">
                <Admin />
              </Route>
            ) : null}

            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </div>
      </div>
      <Footer />

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
        This website uses 🍪{" "}
        <a
          className="cookie__link"
          href="https://bit.ly/icapps-cookies"
          rel="noreferrer noopener"
          target="_blank"
        >
          Learn more
        </a>
      </CookieConsent>

      {/* modals */}
      {signInModal && <SignInModal />}
      {projectModal && <ProjectModal />}

      {/* toast */}
      <ToastContainer />
    </div>
  );
};

export default App;
