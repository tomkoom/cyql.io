import React, { useState, useEffect } from "react";
import "./App.css";
import "./Styles/root.css";
import "./Styles/theme.css";
import "./Styles/typography.css";
import { Switch, Route } from "react-router-dom";
import CookieConsent from "react-cookie-consent";

// firestore
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase-config";

// components
import { Nav, Footer } from "./Components";
import { Home, Projects, ProjectPage, UpcomingNfts, Submit, NotFound } from "./Pages";

// redux
import { useDispatch, useSelector } from "react-redux";
import { fetchIcpPrice } from "./State/icpPrice";
import { setProjects, selectProjects } from "./State/projects";

import { setFilterByCategory } from "./State/projectsFiltering";
import { selectTheme } from "./State/theme";

const App = () => {
  const [category, setCategory] = useState("All");

  // state
  const dispatch = useDispatch();
  const theme = useSelector(selectTheme);
  const projects = useSelector(selectProjects);

  useEffect(() => {
    const projectsColRef = collection(db, "projects");
    getDocs(projectsColRef).then((snapshot) =>
      snapshot.docs.forEach((doc) => {
        dispatch(setProjects({ ...doc.data(), idx: doc.id }));
      })
    );
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

      <button onClick={() => console.log(projects)}>Check</button>

      <div className="app__content">
        <Switch>
          <Route exact path="/">
            <Home category={category} setCategory={setCategory} />
          </Route>

          <Route exact path="/projects">
            <Projects category={category} setCategory={setCategory} />
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
