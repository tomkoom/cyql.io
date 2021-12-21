import { icapps } from "../../declarations/icapps";
import * as React from "react";
import { render } from "react-dom";
import { HashRouter } from "react-router-dom";
import App from "./App";

// REDUX
import { Provider } from "react-redux";
import { store } from "./Redux/store";

const Index = () => {
  return (
    <HashRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </HashRouter>
  );
};

render(<Index />, document.getElementById("app"));
