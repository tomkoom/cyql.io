import React, { FC } from "react";
import { render } from "react-dom";
import App from "./App";

// react-router, history
import { Router } from "react-router-dom";
import { history } from "@/routes/history";

// state, redux-persist
import { Provider } from "react-redux";
import store, { persistor } from "@/state/_store";
import { PersistGate } from "redux-persist/integration/react";

// auth
import AuthProvider from "@/context/AuthContext";

const Index: FC = (): JSX.Element => {
  return (
    <React.StrictMode>
      <Router history={history}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <AuthProvider>
              <App />
            </AuthProvider>
          </PersistGate>
        </Provider>
      </Router>
    </React.StrictMode>
  );
};

render(<Index />, document.getElementById("app"));
