import React, { createContext, useContext, useState } from "react";

// stoic
import { StoicIdentity } from "ic-stoic-identity";
import { Principal } from "@dfinity/principal";

// idl
import { idlFactory, canisterId } from "../../../declarations/icapps/index";
import ledger_idl from "../Utils/ledger_idl";

// routes
import { history } from "../Routes/history";
import { toHome } from "../Routes/routes";

// state
import { useDispatch } from "react-redux";
import { setSignInModal } from "../State/modals";
import { setVerified } from "../State/profile";

// utils
import { getAccountIdentifier } from "./Utils/Principal.utils";
import { getPlugWalletBalance } from "./Utils/Plug.utils";

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
  const [balance, setBalance] = useState(0);
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
    // const balance = await getPlugWalletBalance();
    // const balanceIcp = balance[0].amount;
    setPrincipalId(principalId);
    setPrincipalIdStr(principalId.toText());
    setAccountIdStr(accountIdStr);
    setSignInMethod("Plug");
    // setBalance(balanceIcp);
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
    // create ledger actor
    // const balance = ledger.account_balance(accountIdStr);
    setPrincipalId(principalId);
    setPrincipalIdStr(principalIdStr);
    setAccountIdStr(accountIdStr);
    setSignInMethod("Stoic");
    // setBalance(balance);
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
    setBalance(0);
    dispatch(setVerified(false));

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
    balance,
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
