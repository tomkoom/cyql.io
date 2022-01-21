import React, { useState, useEffect } from "react";
import { Switch, Route /* withRouter */ } from "react-router-dom";
import "./Theme/theme.css";
import "./App.css";

// Components
import {
  Nav,
  Homepage,
  Apps,
  AppPage,
  UpcomingNfts,
  NftList,
  SubmitApp,
} from "./Components";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { fetchIcpPrice } from "./State/icpPriceSlice";
import {
  setProjects,
  setUpcomingNfts2,
  setAds,
  setNftList,
  setUpcomingNfts,
  setDevResources,
} from "./State/siteDataSlice";
import { setFilterByCategory } from "./State/projectsFilteringSlice";
import { fetchNftData } from "./State/nftItemsSlice";

// Google API
import useGoogleSheets from "use-google-sheets";
import k from "../../../k/k";
import Footer from "./Components/Footer/Footer";

const googleSheetsApiKey = k.GOOGLE_SHEETS_API;
const googleSheetId = k.GOOGLE_SHEET_ID;

const App = () => {
  const [category, setCategory] = useState("All");

  // state
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme.value);

  const { data, loading, error } = useGoogleSheets({
    apiKey: googleSheetsApiKey,
    sheetId: googleSheetId,
    sheetsNames: ["Apps", "Ads", "NftList", "Upcoming-NFTs", "DevResources"],
  });

  // Get data from state
  const projects = useSelector((state) => state.siteData.projects);
  const nftList = useSelector((state) => state.siteData.nftList);
  const icpPrice = useSelector((state) => state.icpPrice.icpPrice);

  // Set projects state when GS data is loaded
  useEffect(() => {
    if (!loading) {
      const [
        dataProjects,
        dataAds,
        dataNftList,
        dataUpcomingNfts,
        dataDevResources,
      ] = data;
      dispatch(setProjects(dataProjects));
      dispatch(setUpcomingNfts2(dataProjects));
      dispatch(setAds(dataAds));
      dispatch(setNftList(dataNftList));
      dispatch(setUpcomingNfts(dataUpcomingNfts));
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
    if (nftList.length && icpPrice) {
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
    <div className={`App ${theme}`}>
      <Route exact path={`/(|apps|upcoming|nft|submit)`}>
        <Nav />
      </Route>

      <div className="app__content">
        <Switch>
          <Route exact path="/">
            <Homepage
              category={category}
              setCategory={setCategory}
              data={data}
              loading={loading}
              error={error}
            />
          </Route>

          <Route exact path="/apps">
            <Apps
              category={category}
              setCategory={setCategory}
              data={data}
              loading={loading}
              error={error}
            />
          </Route>

          <Route exact path="/apps/:id">
            <AppPage data={data} loading={loading} />
          </Route>

          <Route exact path="/upcoming">
            <UpcomingNfts />
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

      <Route exact path={`/(|apps|upcoming|nft|submit)`}>
        <Footer />
      </Route>
    </div>
  );
};

// export default withRouter(App);
export default App;
