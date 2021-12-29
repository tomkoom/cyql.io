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
import { fetchNftData } from "./Redux/handleNftDataSlice";

// Google API
import useGoogleSheets from "use-google-sheets";
import k from "../../../k/k";

const googleSheetsApiKey = k.GOOGLE_SHEETS_API;
const googleSheetId = k.GOOGLE_SHEET_ID;

const App = () => {
  const [category, setCategory] = useState("All");
  const dispatch = useDispatch();

  const { data, loading, error } = useGoogleSheets({
    apiKey: googleSheetsApiKey,
    sheetId: googleSheetId,
    sheetsNames: ["Apps", "Ads", "NftList", "DevResources"],
  });

  // Get data from state
  const projects = useSelector((state) => state.siteData.projects);
  const nftList = useSelector((state) => state.siteData.nftList);
  const nftData = useSelector((state) => state.handleNftData.nftData);
  const icpPrice = useSelector((state) => state.icpPrice.icpPrice);

  // Set projects state when GS data is loaded
  useEffect(() => {
    if (!loading) {
      const [dataProjects, dataAds, dataNftList, dataDevResources] = data;
      dispatch(setProjects(dataProjects));
      dispatch(setAds(dataAds));
      dispatch(setNftList(dataNftList));
      dispatch(setDevResources(dataDevResources));
    }
  }, [loading]);

  // Set ICP price state
  useEffect(() => {
    dispatch(fetchIcpPrice());
  }, []);

  // Set filtered categories when category buttons are clicked
  useEffect(() => {
    if (projects.length) {
      category == "All"
        ? dispatch(setFilterByCategory(projects))
        : dispatch(
            setFilterByCategory(projects.filter((p) => p.category === category))
          );
    }
  }, [projects, category]);

  // Set NFT market data when GS data is loaded
  useEffect(() => {
    if (nftList.length) {
      const nftListLength = nftList.length;
      for (let i = 0; i < nftList.length; i++) {
        const nftListItemCanister = nftList[i].canister;
        const nftListItem = nftList[i];
        dispatch(
          fetchNftData({
            nftListItemCanister,
            nftListItem,
            nftListLength,
            icpPrice,
          })
        );
      }
    }
  }, [nftList]);

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
