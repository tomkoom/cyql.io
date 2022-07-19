import React, { createContext, useContext, useState } from "react";

// idl
import { idlFactory, canisterId } from "../../../declarations/icapps/index";

// routes
import { history } from "../Routes/history";
import { toHome } from "../Routes/routes";

// state
import { useDispatch } from "react-redux";
import { setSignInModal } from "../State/modals";

const AuthContext = createContext();
const useAuth = () => {
  return useContext(AuthContext);
};

// host
// if else
// const host = "https://mainnet.dfinity.network";
const host = "http://localhost:8080/";

export function AuthProvider({ children }) {
  const [plugActor, setPlugActor] = useState(undefined);
  const [principalId, setPrincipalId] = useState(undefined);
  const dispatch = useDispatch();

  const signInWithPlug = async () => {
    try {
      await window.ic.plug.requestConnect({
        whitelist: [canisterId],
        host,
      });
      createActor();
      dispatch(setSignInModal(false));
    } catch (err) {
      console.log(err);
    }
  };

  const createActor = async () => {
    const actor = await window.ic.plug.createActor({
      canisterId: canisterId,
      interfaceFactory: idlFactory,
    });
    setPlugActor(actor);
    const principalId = await window.ic.plug.agent.getPrincipal();
    setPrincipalId(principalId);
  };

  const logOut = () => {
    setPlugActor(undefined);
    setPrincipalId(undefined);
    if (history.location.pathname === "/profile") {
      toHome();
    }
  };

  const value = {
    // plug
    plugActor,
    principalId,
    signInWithPlug,
    logOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export { useAuth };
export default AuthProvider;
