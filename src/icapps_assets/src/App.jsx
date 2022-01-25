import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
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
import { fetchIcpPrice } from "./State/icpPrice";
import { setProjects, setUpcomingNfts, setNftList } from "./State/siteData";
import { setFilterByCategory } from "./State/projectsFiltering";
import { fetchNftData } from "./State/nftItems";

// Google API
import useGoogleSheets from "use-google-sheets";
import k from "../../../k/k";
import Footer from "./Components/Footer/Footer";

const googleSheetsApiKey = k.GOOGLE_SHEETS_API;
const googleSheetId = k.GOOGLE_SHEET_ID;

const App = () => {
  const [category, setCategory] = useState("All");
  const { data, loading, error } = useGoogleSheets({
    apiKey: googleSheetsApiKey,
    sheetId: googleSheetId,
    sheetsNames: ["Apps", "NftList"],
  });

  // state
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme.value);
  const projects = useSelector((state) => state.siteData.projects.value);
  const nftList = useSelector((state) => state.siteData.nftList.value);
  const icpPrice = useSelector((state) => state.icpPrice.icpPrice);

  useEffect(() => {
    if (!loading) {
      const [dataProjects, dataNftList] = data;
      dispatch(setProjects({ value: dataProjects.data }));
      dispatch(
        setUpcomingNfts({
          value: dataProjects.data.filter(
            (project) =>
              project.nftSaleStatus === "Open" ||
              project.nftSaleStatus === "Over" ||
              project.nftSaleStatus === "Upcoming"
          ),
        })
      );
      dispatch(setNftList({ value: dataNftList.data }));
    }
  }, [loading]);

  // set icp price
  useEffect(() => {
    dispatch(fetchIcpPrice());
  }, []);

  // set filtered categories
  useEffect(() => {
    if (projects.length) {
      category == "All"
        ? dispatch(setFilterByCategory(projects))
        : dispatch(
            setFilterByCategory(projects.filter((p) => p.category === category))
          );
    }
  }, [projects, category]);

  // set nft market data
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

export default App;
