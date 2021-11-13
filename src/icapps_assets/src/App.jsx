import React, { useState, useEffect } from "react";
import { Switch, Route, withRouter } from "react-router-dom";

// GOOGLE API
import useGoogleSheets from "use-google-sheets";
import k from "../../../k/k";

// COMPONENTS
import Nav from "./Nav";
import AppList from "./AppList";
import AppPage from "./AppPage";
import UpcomingNfts from "./UpcomingNfts";
import Highlights from "./Highlights";
import Developers from "./Developers";
import NftList from "./NftList";

const googleSheetsApiKey = k.GOOGLE_SHEETS_API;
const googleSheetId = k.GOOGLE_SHEET_ID;

const App = () => {
	const [category, setCategory] = useState("All");
	const [filteredApps, setFilteredApps] = useState([]);

	const { data, loading, error } = useGoogleSheets({
		apiKey: googleSheetsApiKey,
		sheetId: googleSheetId,
		sheetsNames: ["Apps"],
	});

	useEffect(() => {
		if (data[0]) {
			category === "All"
				? setFilteredApps(data[0].data)
				: setFilteredApps(
						data[0].data.filter(
							(apps) => apps.category === category
						)
				  );
		}
	}, [loading, category]);

	return (
		<div>
			<Nav />
			<Switch>
				<Route exact path="/">
					{/* <Highlights /> */}
					<AppList
						category={category}
						setCategory={setCategory}
						filteredApps={filteredApps}
						data={data}
						loading={loading}
						error={error}
					/>
				</Route>

				<Route exact path="/a/:id">
					<AppPage data={data} />
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

				{/* <Route component={page404} /> */}
			</Switch>
		</div>
	);
};

export default withRouter(App);
