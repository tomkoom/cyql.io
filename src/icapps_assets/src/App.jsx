import React, { useState, useEffect } from "react";

// ROUTER
import { Switch, Route, withRouter, Redirect } from "react-router-dom";

// COMPONENTS
import Nav from "./Nav";
import AppList from "./AppList";
import AppPage from "./AppPage";
import UpcomingNfts from "./UpcomingNfts";

// GOOGLE API
import useGoogleSheets from "use-google-sheets";
import Highlights from "./Highlights";
import Developers from "./Developers";

// Google Sheets API key
const googleSheetsApiKey = "AIzaSyAYlQkmy6vZa13H5dRahcSaq08P35woTZk";
const googleSheetId = "1gMBz0XnAu4FgiGGotrsi09EjOeIUyX7uO8fHi_k8E3c";

// const googleSheetsApiKey = process.env.REACT_APP_GOOGLE_SHEETS_API;
// const googleSheetId = process.env.REACT_APP_GOOGLE_SHEET_ID;

const App = () => {
	const [category, setCategory] = useState("All");
	const [filteredApps, setFilteredApps] = useState([]);

	const { data, loading, error, refetch } = useGoogleSheets({
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
			<Switch>
				<Route exact path="/">
					<Nav />
					<Highlights />
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
					<Nav />
					<UpcomingNfts />
				</Route>

				<Route exact path="/developers">
					<Nav />
					<Developers />
				</Route>
				{/* <Route component={page404} /> */}
			</Switch>
		</div>
	);
};

export default withRouter(App);
