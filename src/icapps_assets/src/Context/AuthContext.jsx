import React, { createContext, useContext, useState } from "react";

// stoic
import { StoicIdentity } from "ic-stoic-identity";

// backend
import {
  idlFactory as cyqlIdlFactory,
  canisterId as cyqlCanisterId,
} from "../../../declarations/icapps/index";

// routes
import { history } from "../Routes/history";
import { toHome } from "../Routes/routes";

// state
import { useDispatch } from "react-redux";
import { setVerified } from "../State/profile";

// utils
import { getAccountIdentifier } from "./Utils/Principal.utils";

// canisters
import { cyqlBeCanIdLocal } from "./canisterIds";

// host
import { host, hostLocal } from "./host";

const AuthContext = createContext();
const useAuth = () => {
  return useContext(AuthContext);
};

export function AuthProvider({ children }) {
  // actors
  const [actor, setActor] = useState(undefined);
  const [nftActor, setNftActor] = useState(undefined);
  // –––
  const [principalId, setPrincipalId] = useState(undefined);
  const [principalIdStr, setPrincipalIdStr] = useState("");
  const [accountId, setAccountId] = useState(""); // always string
  const [signInMethod, setSignInMethod] = useState("");
  const dispatch = useDispatch();

  // ––– PLUG –––

  const signInWithPlug = async () => {
    try {
      await window.ic.plug.requestConnect({
        whitelist: [cyqlCanisterId],
        host: host,
      });
      createActorWithPlug();
      getPlugUserData();
    } catch (err) {
      console.log(err);
    }
  };

  const createActorWithPlug = async () => {
    // cyql actor
    await window.ic.plug
      .createActor({
        canisterId: cyqlCanisterId,
        interfaceFactory: cyqlIdlFactory,
      })
      .then((actor) => {
        setActor(actor);
      })
      .catch((err) => console.log(err));
  };

  const getPlugUserData = async () => {
    const principalId = await window.ic?.plug?.getPrincipal();
    const accountId = window.ic.plug.sessionManager.sessionData.accountId;
    setPrincipalId(principalId);
    setPrincipalIdStr(principalId.toText());
    setAccountId(accountId);
    setSignInMethod("Plug");
  };

  const disconnectPlug = () => window.ic?.plug?.disconnect();

  //  ––– STOIC –––

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
    const accountId = getAccountIdentifier(principalId);
    setPrincipalId(principalId);
    setPrincipalIdStr(principalIdStr);
    setAccountId(accountId);
    setSignInMethod("Stoic");
  };

  const disconnectStoic = async () => await StoicIdentity.disconnect();

  //  ––– INFINITY WALLET –––

  const signInWithInfinityWallet = async () => {
    const whitelist = [cyqlCanisterId];
    try {
      await window.ic.infinityWallet.requestConnect({
        whitelist,
        host,
      });
      createActorWithInfinityWallet();
      getInfinityWalletUserData();
    } catch (err) {
      console.log(err);
    }
  };

  const createActorWithInfinityWallet = async () => {
    // cyql actor
    await window.ic.infinityWallet
      .createActor({
        canisterId: cyqlCanisterId,
        interfaceFactory: cyqlIdlFactory,
      })
      .then((actor) => {
        setActor(actor);
      })
      .catch((err) => console.log(err));
  };

  const getInfinityWalletUserData = async () => {
    const principalId = await window.ic.infinityWallet.getPrincipal();
    const accountId = await window.ic.infinityWallet.getAccountID();
    setPrincipalId(principalId);
    setPrincipalIdStr(principalId.toText());
    setAccountId(accountId);
    setSignInMethod("InfinityWallet");
  };

  const disconnectInfinityWallet = () => window.ic?.infinityWallet?.disconnect();

  // –––

  const checkConnection = async () => {
    // plug
    const isPlugConnected = await window.ic.plug.isConnected();
    if (isPlugConnected) {
      createActorWithPlug();
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
    // infinitywallet
    const isInfinityWalletConnected = await window.ic.infinityWallet.isConnected();
    if (isInfinityWalletConnected) {
      createActorWithInfinityWallet();
      getInfinityWalletUserData();
      return "";
    }
  };

  const signOut = () => {
    setActor(undefined);
    setNftActor(undefined);
    setPrincipalId(undefined);
    setPrincipalIdStr("");
    setAccountId("");
    dispatch(setVerified(false));

    if (signInMethod === "Plug") {
      disconnectPlug();
    }

    if (signInMethod === "Stoic") {
      disconnectStoic();
    }

    if (signInMethod === "InfinityWallet") {
      disconnectInfinityWallet();
    }

    setSignInMethod(""); // clear sign in method
    if (history.location.pathname === "/profile") {
      toHome();
    }
  };

  const value = {
    actor,
    nftActor,
    principalId,
    principalIdStr,
    accountId,
    signInMethod,
    // –––
    signInWithPlug,
    signInWithStoic,
    signInWithInfinityWallet,
    // –––
    checkConnection,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export { useAuth };
export default AuthProvider;
