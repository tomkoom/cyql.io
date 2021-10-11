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

// Google Sheets API key
const googleSheetsApiKey = "AIzaSyAYlQkmy6vZa13H5dRahcSaq08P35woTZk";
const googleSheetId = "1gMBz0XnAu4FgiGGotrsi09EjOeIUyX7uO8fHi_k8E3c";

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
			<Nav />
			<Switch>
				{/* <Redirect from="/" to="All" /> */}
				<Route exact path="/">
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
					<AppPage apps={loading ? null : data[0].data} />
				</Route>

				<Route exact path="/upcoming">
					<UpcomingNfts />
				</Route>
				{/* <Route component={page404} /> */}
			</Switch>
		</div>
	);
};

export default withRouter(App);
