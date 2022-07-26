import React, { createContext, useContext, useState } from "react";

// stoic
import { StoicIdentity } from "ic-stoic-identity";
import { Principal } from "@dfinity/principal";

// idl
import { idlFactory, canisterId } from "../../../declarations/icapps/index";

// routes
import { history } from "../Routes/history";
import { toHome } from "../Routes/routes";

// state
import { useDispatch } from "react-redux";
import { setSignInModal } from "../State/modals";

// utils
import { getAccountIdentifier } from "./Utils/Principal.utils";

const AuthContext = createContext();
const useAuth = () => {
  return useContext(AuthContext);
};

// host
// if else env
const host = "https://mainnet.dfinity.network";
// const host = "http://localhost:8080/";

export function AuthProvider({ children }) {
  // const [actor, setActor] = useState(undefined);
  const [principalId, setPrincipalId] = useState(undefined);
  const [principalIdStr, setPrincipalIdStr] = useState("");
  const [accountIdStr, setAccountIdStr] = useState("");
  const [signInMethod, setSignInMethod] = useState("");
  const dispatch = useDispatch();

  // –––PLUG–––

  const signInWithPlug = async () => {
    try {
      await window.ic.plug.requestConnect({
        whitelist: [canisterId],
        host,
      });
      // createPlugActor();
      getPlugUserData();
    } catch (err) {
      console.log(err);
    }
  };

  // const createPlugActor = async () => {
  //   await window.ic.plug
  //     .createActor({
  //       canisterId: canisterId,
  //       interfaceFactory: idlFactory,
  //     })
  //     .then((plugActor) => {
  //       setActor(plugActor);
  //     })
  //     .catch((err) => console.log(err));
  // };

  const getPlugUserData = async () => {
    const principalId = await window.ic?.plug?.getPrincipal();
    const accountIdStr = window.ic.plug.sessionManager.sessionData.accountId;
    setPrincipalId(principalId);
    setPrincipalIdStr(principalId.toText());
    setAccountIdStr(accountIdStr);
    setSignInMethod("Plug");
  };

  const disconnectPlug = () => window.ic?.plug?.disconnect();

  //  –––STOIC–––

  const signInWithStoic = async () => {
    try {
      const stoicId = await StoicIdentity.connect();
      getStoicUserData(stoicId);
    } catch (err) {
      console.log(err);
    }
  };

  const getStoicUserData = (stoicId) => {
    const principalId = stoicId.getPrincipal();
    const principalIdStr = stoicId.getPrincipal().toText();
    const accountIdStr = getAccountIdentifier(principalId);
    setPrincipalId(principalId);
    setPrincipalIdStr(principalIdStr);
    setAccountIdStr(accountIdStr);
    setSignInMethod("Stoic");
  };

  const disconnectStoic = async () => await StoicIdentity.disconnect();

  // –––

  const checkConnection = async () => {
    // plug
    const isPlugConnected = await window.ic.plug.isConnected();
    if (isPlugConnected) {
      // createPlugActor(); // may run after getPlugUserData()
      getPlugUserData();
      return "";
    }
    // stoic
    StoicIdentity.load().then(async (stoicId) => {
      if (stoicId) {
        getStoicUserData(stoicId);
        return "";
      }
    });
  };

  const signOut = () => {
    // setActor(undefined);
    setPrincipalId(undefined);
    setPrincipalIdStr("");
    setAccountIdStr("");

    if (signInMethod === "Plug") {
      disconnectPlug();
    }

    if (signInMethod === "Stoic") {
      disconnectStoic();
    }

    setSignInMethod(""); // clear sign in method
    if (history.location.pathname === "/profile") {
      toHome();
    }
  };

  const value = {
    // plug
    // actor,
    principalId,
    principalIdStr,
    accountIdStr,
    signInMethod,
    signInWithPlug,
    checkConnection,
    // stoic
    signInWithStoic,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export { useAuth };
export default AuthProvider;
