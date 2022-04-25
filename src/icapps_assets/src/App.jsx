import React, { useState, useEffect } from "react";
import "./App.css";
import "./Styles/root.css";
import "./Styles/theme.css";
import "./Styles/typography.css";
import { Switch, Route } from "react-router-dom";
import CookieConsent from "react-cookie-consent";

// firestore
import { getDocs } from "firebase/firestore";
import { projectsColRef } from "../../../firebase/firestore-collections";

// components
import { Nav, Footer } from "./Components";
import { Home, Projects, ProjectPage, UpcomingNfts, Submit, NotFound } from "./Pages";

// redux
import { useDispatch, useSelector } from "react-redux";
import { fetchIcpPrice } from "./State/icpPrice";
import { setProjects, setNFTs } from "./State/projects";

import { selectTheme } from "./State/theme";

const App = () => {
  const dispatch = useDispatch();
  const theme = useSelector(selectTheme);

  const sortByDateAdded = (a, b) => {
    const dateStrA = a.dateAdded.replace(",", "");
    const dateStrB = b.dateAdded.replace(",", "");
    const partsA = dateStrA.split(" ").reverse().join("-");
    const partsB = dateStrB.split(" ").reverse().join("-");
    let dateA = new Date(partsA);
    let dateB = new Date(partsB);
    return dateB - dateA;
  };

  // get projects
  useEffect(async () => {
    const projectsDocs = await getDocs(projectsColRef).then((snapshot) => {
      return snapshot.docs;
    });

    if (projectsDocs) {
      let projectsArr = [];
      projectsDocs.forEach((doc) => {
        projectsArr.push({ ...doc.data(), idx: doc.id });
      });
      projectsArr = projectsArr.filter((p) => p.dateAdded).sort((a, b) => sortByDateAdded(a, b));
      dispatch(setProjects(projectsArr));

      const nftsArr = projectsArr.filter((project) => project.category === "NFTs");
      dispatch(setNFTs(nftsArr));
    } else {
      console.log("Can't get projects.");
    }
  }, []);

  // set icp price
  useEffect(() => {
    dispatch(fetchIcpPrice());
  }, []);

  return (
    <div className={`app ${theme}`}>
      <Route exact path={`/(|projects|upcoming|nft)`}>
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

          {/* not found */}
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </div>

      <Route exact path={`/(|projects|upcoming|nft)`}>
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
    </div>
  );
};

export default App;
