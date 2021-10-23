import React, { useState, useEffect } from "react";

// ROUTER
import { Switch, Route, withRouter } from "react-router-dom";

// GOOGLE API
import useGoogleSheets from "use-google-sheets";

// COMPONENTS
import Nav from "./Nav";
import AppList from "./AppList";
import AppPage from "./AppPage";
import UpcomingNfts from "./UpcomingNfts";
import Highlights from "./Highlights";
import Developers from "./Developers";
import NftList from "./NftList";

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
				<Route exact path="/">
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
					<UpcomingNfts />
				</Route>

				{/* <Route exact path="/developers">
					<Developers />
				</Route> */}

				<Route exact path="/nft">
					<NftList />
				</Route>

				{/* <Route component={page404} /> */}
			</Switch>
		</div>
	);
};

export default withRouter(App);
