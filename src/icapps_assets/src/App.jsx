import React from "react";

// ROUTER
import { Switch, Route, withRouter } from "react-router-dom";

// DATA
import { data } from "./data";

// COMPONENTS
import Nav from "./Nav";
import AppList from "./AppList";
import AppPage from "./AppPage";

const App = () => {
	return (
		<div>
			<Nav />
			<Switch>
				<Route exact path="/">
					<AppList data={data} />
				</Route>

				<Route exact path="/a/:id">
					<AppPage data={data} />
				</Route>
			</Switch>
		</div>
	);
};

export default withRouter(App);
