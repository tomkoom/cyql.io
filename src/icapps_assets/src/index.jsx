import { icapps } from "../../declarations/icapps";
import * as React from "react";
import { render } from "react-dom";
import { HashRouter } from "react-router-dom";

import App from "./App";

const Index = () => {
	return (
		<HashRouter>
			<App />
		</HashRouter>
	);
};

render(<Index />, document.getElementById("app"));
