import * as React from "react";
import { render } from "react-dom";
import App from "./App";
// import { icapps } from "../../declarations/icapps";

// react-router
import { Router } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";
// history
import { history } from "./Routes/history";

// State
import { Provider } from "react-redux";
import store, { persistor } from "./Redux/store";

// redux-persist
import { PersistGate } from "redux-persist/integration/react";

const Index = () => {
  return (
    <Router basename="/" history={history}>
      <ScrollToTop />
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </Router>
  );
};

render(<Index />, document.getElementById("app"));
