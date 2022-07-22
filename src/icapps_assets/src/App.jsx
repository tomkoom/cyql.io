import React, { useEffect } from "react";
import "./App.css";
import "./Styles/root.css";
import "./Styles/theme.css";
import "./Styles/typography.css";
import { Switch, Route } from "react-router-dom";
import CookieConsent from "react-cookie-consent";
import k from "../../../k/k";

// backend
import { Actor, HttpAgent } from "@dfinity/agent";
import nft_IDL from "../../icapps/nft.did.js";
import { getAccountIdentifier } from "../../icapps/utils";

// utils
import { useWindowSize } from "./Utils/UseWindowSize";
import { sortByDateAdded, sortByDate } from "./Utils/sort";

// firestore
import { onSnapshot, doc, setDoc, getDoc } from "firebase/firestore";
import { projectsColRef, usersColRef } from "../../../firebase/firestore-collections";

// auth
import { useAuth } from "./Context/AuthContext";

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

// state
import { useDispatch, useSelector } from "react-redux";
import { fetchIcpPrice } from "./State/icpPrice";
import { setProjects, setNFTs } from "./State/projects";
import { selectTheme } from "./State/theme";
import { selectMobileMenuModal, selectSignInModal, setMobileMenuModal } from "./State/modals";
import { selectProjectModal, setCloseProjectModal } from "./State/projectModal";
import { setOwnsNFT, setNFTIdsOwned } from "./State/profile";

// nft canister data
const host = "https://mainnet.dfinity.network";
const nftCanisterId = "dtlqp-nqaaa-aaaak-abwna-cai";

const App = () => {
  // hooks
  const { principalId, principalIdStr, signInMethod, checkPlugConnection } = useAuth();
  const [deviceWidth] = useWindowSize();
  const dispatch = useDispatch();

  // selectors
  const theme = useSelector(selectTheme);
  const signInModal = useSelector(selectSignInModal);
  const mobileMenuModal = useSelector(selectMobileMenuModal);
  const projectModal = useSelector(selectProjectModal);

  // add user to db
  const addUserToDB = async (principalIdStr, signInMethod) => {
    const timestamp = Date.now();

    const userDocRef = doc(usersColRef, principalIdStr);
    const user = await getDoc(userDocRef);
    const userExists = user.data() ? true : false;

    if (!userExists) {
      await setDoc(userDocRef, {
        principalIdStr,
        signInMethod,
        firstSignIn: timestamp,
        lastSignIn: timestamp,
      }).catch((err) => console.log(err));
    } else {
      await setDoc(userDocRef, {
        lastSignIn: timestamp,
      }).catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    if (principalIdStr && signInMethod) {
      addUserToDB(principalIdStr, signInMethod);
    }
  }, [principalIdStr, signInMethod]);

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

  // –––

  // set profile info
  const getNFTData = async () => {
    const nft = Actor.createActor(nft_IDL, {
      agent: new HttpAgent({ host }),
      canisterId: nftCanisterId,
    });
    await nft
      .principalOwnsOne(principalId)
      .then((res) => {
        dispatch(setOwnsNFT(res));
      })
      .catch((err) => console.log(err));

    const accountId = getAccountIdentifier(principalId);
    await nft
      .getRegistry()
      .then((res) => {
        let nftIdsOwned = [];
        res.forEach((item) => {
          if (item[1] === accountId) {
            nftIdsOwned.push(item[0]);
          }
        });
        dispatch(setNFTIdsOwned(nftIdsOwned));
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (principalId) {
      getNFTData();
    }
  }, [principalId]);

  // check auth
  useEffect(async () => {
    checkPlugConnection();
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

          {principalId && (
            <Route exact path="/profile">
              <Profile />
            </Route>
          )}

          {(principalIdStr && principalIdStr === k.PLUG_ADMIN_1) ||
          (principalIdStr && principalIdStr === k.PLUG_ADMIN_2) ? (
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
