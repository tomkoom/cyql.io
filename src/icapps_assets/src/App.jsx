import React, { useState, useEffect } from "react";
import css from "./App.module.css";
import { Switch, Route, withRouter } from "react-router-dom";

// Components
import {
  Nav,
  Homepage,
  AppPage,
  UpcomingNfts,
  NftList,
  DevResources,
  SubmitApp,
} from "./Components";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { fetchIcpPrice } from "./Redux/icpPriceSlice";
import {
  setProjects,
  setAds,
  setNftList,
  setDevResources,
} from "./Redux/siteDataSlice";
import { setFilterByCategory } from "./Redux/projectsFilteringSlice";

// Google API
import useGoogleSheets from "use-google-sheets";
import k from "../../../k/k";

const googleSheetsApiKey = k.GOOGLE_SHEETS_API;
const googleSheetId = k.GOOGLE_SHEET_ID;

const App = () => {
  const [category, setCategory] = useState("All");

  // redux
  const projects = useSelector((state) => state.siteData.projects);
  // get icp price
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchIcpPrice());
  }, []);

  const { data, loading, error } = useGoogleSheets({
    apiKey: googleSheetsApiKey,
    sheetId: googleSheetId,
    sheetsNames: ["Apps", "Ads", "NftList", "DevResources"],
  });

  // set site data when loaded
  useEffect(() => {
    if (!loading) {
      const [dataProjects, dataAds, dataNftList, dataDevResources] = data;
      dispatch(setProjects(dataProjects));
      dispatch(setAds(dataAds));
      dispatch(setNftList(dataNftList));
      dispatch(setDevResources(dataDevResources));
    }
  }, [loading]);

  // change categories when category buttons are clicked
  useEffect(() => {
    if (projects.length) {
      category == "All"
        ? dispatch(setFilterByCategory(projects))
        : dispatch(
            setFilterByCategory(projects.filter((p) => p.category === category))
          );
    }
  }, [projects, category]);

  return (
    <div>
      <Nav />
      <div className={css.app}>
        <Switch>
          <Route exact path="/">
            {/* <Highlights /> */}
            <Homepage
              category={category}
              setCategory={setCategory}
              data={data}
              loading={loading}
              error={error}
            />
          </Route>

          <Route exact path="/a/:id">
            <AppPage data={data} loading={loading} />
          </Route>

          <Route exact path="/upcoming">
            <UpcomingNfts />
          </Route>

          <Route exact path="/devres">
            <DevResources />
          </Route>

          <Route exact path="/nft">
            <NftList />
          </Route>

          <Route exact path="/submit">
            <SubmitApp />
          </Route>

          {/* <Route component={page404} /> */}
        </Switch>
      </div>
    </div>
  );
};

export default withRouter(App);
