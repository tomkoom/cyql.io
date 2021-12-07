import React, { useState, useEffect } from "react";
import css from "./App.module.css";
import { Switch, Route, withRouter } from "react-router-dom";

// GOOGLE API
import useGoogleSheets from "use-google-sheets";
import k from "../../../k/k";

// COMPONENTS
import Nav from "./Nav/Nav";
import Homepage from "./Homepage/Homepage";
import AppPage from "./AppPage/AppPage";
import UpcomingNfts from "./UpcomingNfts/UpcomingNfts";
import Developers from "./Developers/Developers";
import NftList from "./NftList/NftList";
import Highlights from "./Highlights/Highlights";
import SubmitApp from "./SubmitApp/SubmitApp";

const googleSheetsApiKey = k.GOOGLE_SHEETS_API;
const googleSheetId = k.GOOGLE_SHEET_ID;

const App = () => {
  const [category, setCategory] = useState("All");
  const [filteredApps, setFilteredApps] = useState([]);

  const { data, loading, error } = useGoogleSheets({
    apiKey: googleSheetsApiKey,
    sheetId: googleSheetId,
    sheetsNames: ["Apps", "Ads"],
  });

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
