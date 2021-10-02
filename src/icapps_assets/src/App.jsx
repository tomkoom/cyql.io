import React, { useState, useEffect } from "react";



// ROUTER
import { Switch, Route, withRouter, Redirect } from "react-router-dom";

// DATA
import { apps } from "./apps";

// COMPONENTS
import Nav from "./Nav";
import AppList from "./AppList";
import AppPage from "./AppPage";
import UpcomingNfts from "./UpcomingNfts";



const App = () => {
	const [category, setCategory] = useState("All");
	const [filteredApps, setFilteredApps] = useState([]);

	useEffect(() => {
		category === "All"
			? setFilteredApps(apps)
			: setFilteredApps(
					apps.filter((apps) => apps.category === category)
			  );
	}, [category]);



	return (
		<div>
			<Nav />
			<Switch>
				{/* <Redirect from="/" to="All" /> */}
				<Route exact path="/">
					<AppList
						apps={apps}
						category={category}
						setCategory={setCategory}
						filteredApps={filteredApps}
					/>
				</Route>

				<Route exact path="/a/:id">
					<AppPage apps={apps} />
				</Route>

				<Route exact path="/upcoming">
					<UpcomingNfts
						
					/>
				</Route>
				{/* <Route component={page404} /> */}
			</Switch>
		</div>
	);
};

export default withRouter(App);
