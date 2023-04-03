import React, { useEffect } from "react";
import "./App.css";
import "@styles/root.css";
import "@styles/theme.css";
import "@styles/typography.css";

// etc
import { Switch, Route } from "react-router-dom";
import CookieConsent from "react-cookie-consent";
import { c } from "../../../constants/constants";

// utils
import { useWindowSize } from "@hooks/useWindowSize";
import { sortByDateAdded, sortByDate } from "@utils/sort";

// firestore
import { onSnapshot, query, where } from "firebase/firestore";
import { pColRef } from "@firestore/firestore-collections";

// auth
import { useAuth } from "@context/AuthContext";

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
} from "@pages/index";
import { Summary, Nav, Sidebar, Footer } from "@components/index";
import { JobModal, ProjectModal, SignInModal } from "@modals/index";

// state
import { useDispatch, useSelector } from "react-redux";
import { setProjects, setNFTs } from "@state/projects";
import { selectTheme } from "@state/theme";
import { setUpvotedProjects } from "@state/profile/profile";

// state – modals
import {
  selectJobModal,
  setSignInModal,
  selectSignInModal,
  setMobileMenuModal,
  selectMobileMenuModal,
} from "@state/modals/modals";
import { selectProjectModal } from "@state/modals/projectModal";
import { selectShareModal } from "./State/modals/shareModal";
import { selectNftModal } from "@state/modals/nftModal";

// methods
import { addUserToDb, setProfiles, setJobs, setJobsTest } from "./appMethods";

const PLUG_ADMIN_1 = c.PLUG_ADMIN_1;
const PLUG_ADMIN_2 = c.PLUG_ADMIN_2;
const STOIC_ADMIN_1 = c.STOIC_ADMIN_1;
const STOIC_ADMIN_2 = c.STOIC_ADMIN_2;

const App = () => {
  // hooks
  const dispatch = useDispatch();
  const {
    defaultActor,
    initDefaultActor,
    actor,
    principalId,
    principalIdStr: pStr,
    accountIdStr: aStr,
    signInMethod,
    checkConnection,
    isAuthenticated: isAuth,
  } = useAuth();
  const [deviceWidth] = useWindowSize();

  // theme
  const theme = useSelector(selectTheme);

  // modals
  const jobModal = useSelector(selectJobModal);
  const projectModal = useSelector(selectProjectModal);
  const shareModal = useSelector(selectShareModal);
  const signInModal = useSelector(selectSignInModal);
  const mobileMenuModal = useSelector(selectMobileMenuModal);
  const nftModal = useSelector(selectNftModal);

  // get projects and nfts
  useEffect(() => {
    const unsubscribe = onSnapshot(pColRef, (snapshot) => {
      const projects = snapshot.docs
        .map((doc) => ({ ...doc.data(), id: doc.id }))
        .sort((a, b) => sortByDateAdded(a.dateAdded, b.dateAdded))
        .sort((a, b) => sortByDate(a.added, b.added));
      const nfts = snapshot.docs
        .map((doc) => ({ ...doc.data(), id: doc.id }))
        .filter((project) => project.category === "NFTs");

      dispatch(setProjects(projects));
      dispatch(setNFTs(nfts));
    });
    return () => {
      unsubscribe();
    };
  }, []);

  // prevent from scrolling when modal is active
  const modals = [jobModal, signInModal, mobileMenuModal, projectModal, shareModal, nftModal];
  useEffect(() => {
    const modalIsActive =
      jobModal || signInModal || mobileMenuModal || projectModal || shareModal || nftModal;
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
    if (isAuth) {
      dispatch(setSignInModal(false));
    }
  }, [isAuth]);

  useEffect(() => {
    if (isAuth) {
      addUserToDb(actor, aStr, signInMethod);
    }
  }, [isAuth]);

  useEffect(() => {
    if (isAuth) {
      setProfiles(actor);
    }
  }, [isAuth]);

  useEffect(() => {
    if (defaultActor !== undefined) {
      setJobs(defaultActor);
      // setJobsTest(defaultActor);
    }
  }, [defaultActor]);

  // set default actor
  useEffect(() => {
    initDefaultActor();
  }, []);

  // check auth
  useEffect(() => {
    checkConnection();
  }, []);

  // SET PROFILE INFO
  // get upvoted projects
  useEffect(() => {
    if (isAuth) {
      const upvProjectsQ = query(pColRef, where("upvotedBy", "array-contains", pStr));
      const unsubscribe = onSnapshot(upvProjectsQ, (snapshot) => {
        const upvProjects = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        dispatch(setUpvotedProjects(upvProjects));
      });
      return () => {
        unsubscribe();
      };
    }
  }, [isAuth]);

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

            {principalId && (
              <Route exact path="/profile">
                <Profile />
              </Route>
            )}

            {(isAuth && pStr === PLUG_ADMIN_1) ||
            (isAuth && pStr === STOIC_ADMIN_1) ||
            (isAuth && pStr === PLUG_ADMIN_2) ||
            (isAuth && pStr === STOIC_ADMIN_2) ? (
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
      {jobModal && <JobModal />}
    </div>
  );
};

export default App;
