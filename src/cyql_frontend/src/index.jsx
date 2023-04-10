import * as React from "react";
import { render } from "react-dom";
import App from "./App";

// react-router
import { Router } from "react-router-dom";

// history
import { history } from "./Routes/history";

// state
import { Provider } from "react-redux";
import store, { persistor } from "./State/_store";

// redux-persist
import { PersistGate } from "redux-persist/integration/react";

// // auth context
import AuthProvider from "./Context/AuthContext";

const Index = () => {
  return (
    <Router /* basename="/" */ history={history}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {/* <Auth> */}
          <AuthProvider>
            <App />
          </AuthProvider>
          {/* </Auth> */}
        </PersistGate>
      </Provider>
    </Router>
  );
};

render(<Index />, document.getElementById("app"));
