import * as React from "react";
import { render } from "react-dom";
import App from "./App";
// import { icapps } from "../../declarations/icapps";

// react-router
import { HashRouter } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";

// State
import { Provider } from "react-redux";
import { store } from "./Redux/store";

const Index = () => {
  return (
    <HashRouter>
      <ScrollToTop />
      <Provider store={store}>
        <App />
      </Provider>
    </HashRouter>
  );
};

render(<Index />, document.getElementById("app"));
