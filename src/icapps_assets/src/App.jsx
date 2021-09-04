import React, { useState, useEffect } from "react";

// ROUTER
import { Switch, Route, withRouter, Redirect } from "react-router-dom";

// DATA
import { data } from "./data";

// COMPONENTS
import Nav from "./Nav";
import AppList from "./AppList";
import AppPage from "./AppPage";

const App = () => {
	const [category, setCategory] = useState("All");
	const [filteredApps, setFilteredApps] = useState([]);

	useEffect(() => {
		category === "All"
			? setFilteredApps(data)
			: setFilteredApps(
					data.filter((data) => data.category === category)
			  );
	}, [category]);
	return (
		<div>
			<Nav />
			<Switch>
				{/* <Redirect from="/" to="All" /> */}
				<Route exact path="/">
					<AppList
						data={data}
						category={category}
						setCategory={setCategory}
						filteredApps={filteredApps}
					/>
				</Route>

				<Route exact path="/a/:id">
					<AppPage data={data} />
				</Route>
			</Switch>
		</div>
	);
};

export default withRouter(App);
