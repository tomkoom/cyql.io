import React, { useEffect } from "react";
import "./App.css";
import "./Styles/root.css";
import "./Styles/theme.css";
import "./Styles/typography.css";
import { Switch, Route } from "react-router-dom";
import CookieConsent from "react-cookie-consent";
import k from "../../../k/k";

// utils
import { deviceSizes } from "./Utils/DeviceSizes";
import { useWindowSize } from "./Utils/UseWindowSize";
import { sortByDateAdded, sortByDate } from "./Utils/sort";

// firestore
import { projectsColRef } from "../../../firebase/firestore-collections";
import { onSnapshot } from "firebase/firestore";

// components
import {
  Home,
  Projects,
  ProjectPage,
  UpcomingNfts,
  Submit,
  Profile,
  Admin,
  NotFound,
} from "./Pages/index";
import { Nav, Footer, SignInModal, ProjectModal } from "./Components/index";

// auth
import { useAuth } from "./Context/AuthContext";
import { auth } from "../../../firebase/firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import Profile from "./Pages/Profile/Profile";

// state
import { useDispatch, useSelector } from "react-redux";
import { fetchIcpPrice } from "./State/icpPrice";
import { setProjects, setNFTs, selectProjects } from "./State/projects";
import { selectTheme } from "./State/theme";
import { selectMobileMenuModal, selectSignInModal, setMobileMenuModal } from "./State/modals";
import { selectProjectModal, setCloseProjectModal } from "./State/projectModal";
import { setUpvotedProjects } from "./State/upvotedProjects";

const App = () => {
  const [deviceWidth] = useWindowSize();

  const dispatch = useDispatch();
  const theme = useSelector(selectTheme);
  const signInModal = useSelector(selectSignInModal);
  const mobileMenuModal = useSelector(selectMobileMenuModal);
  const projectModal = useSelector(selectProjectModal);
  const projects = useSelector(selectProjects);

  const { setUser, user } = useAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // https://firebase.google.com/docs/reference/js/firebase.User
        setUser(user);
      } else {
        // User is signed out
      }
    });
  }, []);

  // get projects and nfts
  useEffect(() => {
    const unsubscribe = onSnapshot(projectsColRef, (snapshot) => {
      dispatch(
        setProjects(
          snapshot.docs
            .map((doc) => ({ ...doc.data(), idx: doc.id }))
            .sort((a, b) => sortByDateAdded(a.dateAdded, b.dateAdded))
            .sort((a, b) => sortByDate(a.added, b.added))
        )
      );
      dispatch(
        setNFTs(
          snapshot.docs
            .map((doc) => ({ ...doc.data(), idx: doc.id }))
            .filter((project) => project.category === "NFTs")
        )
      );
    });
    return () => {
      unsubscribe();
    };
  }, []);

  // get upvoted projects
  useEffect(() => {
    if (user) {
      if (projects.length > 0) {
        const upvotedProjects = projects.filter(
          (project) => project.upvotedBy && project.upvotedBy.find((uid) => uid === user.uid)
        );
        dispatch(setUpvotedProjects(upvotedProjects));
      }
    }
  }, [projects, user]);

  // set icp price
  useEffect(() => {
    dispatch(fetchIcpPrice());
  }, []);

  // prevent from scrolling when modal is active
  useEffect(() => {
    if (signInModal || mobileMenuModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [signInModal, mobileMenuModal]);

  // reset mobile menu when deivice size > 1024
  useEffect(() => {
    if (mobileMenuModal && deviceWidth > deviceSizes.laptop) {
      dispatch(setMobileMenuModal(false));
    }
  }, [deviceWidth]);

  const closeModal = (e) => {
    if (e.key === "Escape") {
      dispatch(setCloseProjectModal());
    }
  };

  // close modal when esc is pressed
  useEffect(() => {
    window.addEventListener("keydown", closeModal);
    return () => {
      window.removeEventListener("keydown", closeModal);
    };
  }, []);

  return (
    <div className={`app ${theme}`}>
      <Route exact path={`/(|projects|upcoming|profile|submit|admin|admin/addproject)`}>
        <Nav />
      </Route>

      <div className="app__content">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>

          <Route exact path="/projects">
            <Projects />
          </Route>

          <Route exact path="/projects/:id">
            <ProjectPage />
          </Route>

          <Route exact path="/upcoming">
            <UpcomingNfts />
          </Route>

          <Route exact path="/submit">
            <Submit />
          </Route>

          {user && (
            <Route exact path="/profile">
              <Profile />
            </Route>
          )}

          {(user && user.uid === k.TWITTER_ADMIN_1) || (user && user.uid === k.TWITTER_ADMIN_2) ? (
            <Route exact path="/admin">
              <Admin />
            </Route>
          ) : null}

          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </div>

      <Route exact path={`/(|projects|upcoming|profile|submit|admin|admin/addproject)`}>
        <Footer />
      </Route>

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
    </div>
  );
};

export default App;
