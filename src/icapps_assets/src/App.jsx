import React, { useState, useEffect } from "react";
import css from "./App.module.css";
import { Switch, Route, withRouter } from "react-router-dom";

// COMPONENTS
import {
  Nav,
  Homepage,
  AppPage,
  UpcomingNfts,
  NftList,
  Developers,
  SubmitApp,
} from "./Components";

// redux
import { useDispatch } from "react-redux";
// get icp price
import { fetchIcpPrice } from "./Redux/icpPriceSlice";

// GOOGLE API
import useGoogleSheets from "use-google-sheets";
import k from "../../../k/k";

const googleSheetsApiKey = k.GOOGLE_SHEETS_API;
const googleSheetId = k.GOOGLE_SHEET_ID;

const App = () => {
  const [category, setCategory] = useState("All");
  const [filteredApps, setFilteredApps] = useState([]);

  // get icp price
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchIcpPrice());
  }, []);

  const { data, loading, error } = useGoogleSheets({
    apiKey: googleSheetsApiKey,
    sheetId: googleSheetId,
    sheetsNames: ["Apps", "Ads", "NftList"],
  });

  // const [apps, ads, nftList] = data;
  // console.log(apps ? apps : null);
  // console.log(ads ? ads : null);
  // console.log(nftList ? nftList : null);

  useEffect(() => {
    if (data[0]) {
      category === "All"
        ? setFilteredApps(data[0].data)
        : setFilteredApps(
            data[0].data.filter((apps) => apps.category === category)
          );
    }
  }, [loading, category]);

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
              filteredApps={filteredApps}
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

          <Route exact path="/developers">
            <Developers />
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
