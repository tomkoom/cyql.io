import React, { createContext, useContext, useState } from "react";

// backend
import { Actor, HttpAgent } from "@dfinity/agent";
import {
  idlFactory as cyqlIdlFactory,
  canisterId as cyqlCanId,
} from "../../../declarations/cyql_backend/index";

// wallets
import { StoicIdentity } from "ic-stoic-identity";

// routes
import { history } from "../Routes/history";
import { toHome } from "../Routes/routes";

// utils
import { getAccountIdentifier } from "./Utils/Principal.utils";

// host
import { host } from "./host";

const AuthContext = createContext();
const useAuth = () => {
  return useContext(AuthContext);
};

export function AuthProvider({ children }) {
  const [defaultActor, setDefaultActor] = useState(undefined);
  const [actor, setActor] = useState(undefined);
  const [principalId, setPrincipalId] = useState(undefined);
  const [principalIdStr, setPrincipalIdStr] = useState("");
  const [accountId, setAccountId] = useState(""); // always string
  const [signInMethod, setSignInMethod] = useState("");
  const [signInLoading, setSignInLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setDefActor = () => {
    const defActor = Actor.createActor(cyqlIdlFactory, {
      agent: new HttpAgent({ host }),
      canisterId: cyqlCanId,
    });
    setDefaultActor(defActor);
  };

  // PLUG

  const signInWithPlug = async () => {
    try {
      setSignInLoading(true);
      await window.ic.plug.requestConnect({
        whitelist: [cyqlCanId],
        host: host,
      });
      await createActorWithPlug();
      await getPlugUserData();
      setSignInLoading(false);
      setIsAuthenticated(true);
    } catch (err) {
      console.log(err);
      setSignInLoading(false);
    }
  };

  const createActorWithPlug = async () => {
    await window.ic.plug
      .createActor({
        canisterId: cyqlCanId,
        interfaceFactory: cyqlIdlFactory,
      })
      .then((actor) => {
        setActor(actor);
      })
      .catch((err) => console.log(err));
  };

  const getPlugUserData = async () => {
    const principalId = await window.ic?.plug?.getPrincipal();
    const principalIdStr = principalId.toText();
    const accountId = window.ic.plug.sessionManager.sessionData.accountId;
    setPrincipalId(principalId);
    setPrincipalIdStr(principalIdStr);
    setAccountId(accountId);
    setSignInMethod("plug");
  };

  const disconnectPlug = () => window.ic?.plug?.disconnect();

  //  STOIC

  const signInWithStoic = async () => {
    await StoicIdentity.connect()
      .then((identity) => {
        getStoicUserData(identity);
        createActorWithStoic(identity);
        setIsAuthenticated(true);
      })
      .catch((err) => console.log(err));
  };

  const createActorWithStoic = (identity) => {
    const actor = Actor.createActor(cyqlIdlFactory, {
      agent: new HttpAgent({
        identity,
      }),
      canisterId: cyqlCanId,
    });
    setActor(actor);
  };

  const getStoicUserData = (stoicId) => {
    const principalId = stoicId.getPrincipal();
    const principalIdStr = stoicId.getPrincipal().toText();
    const accountId = getAccountIdentifier(principalId);
    setPrincipalId(principalId);
    setPrincipalIdStr(principalIdStr);
    setAccountId(accountId);
    setSignInMethod("stoic");
  };

  const disconnectStoic = async () => await StoicIdentity.disconnect();

  //  INFINITYWALLET

  const signInWithInfinityWallet = async () => {
    const whitelist = [cyqlCanId];
    try {
      setSignInLoading(true);
      await window.ic.infinityWallet.requestConnect({
        whitelist,
        host,
      });
      await createActorWithInfinityWallet();
      await getInfinityWalletUserData();
      setSignInLoading(false);
      setIsAuthenticated(true);
    } catch (err) {
      console.log(err);
      setSignInLoading(false);
    }
  };

  const createActorWithInfinityWallet = async () => {
    await window.ic.infinityWallet
      .createActor({
        canisterId: cyqlCanId,
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
    setSignInMethod("infinitywallet");
  };

  const disconnectInfinityWallet = () => window.ic?.infinityWallet?.disconnect();

  // –––

  const checkConnection = async () => {
    // plug
    if (window.ic.plug) {
      await window.ic.plug.isConnected().then(async (isConnected) => {
        if (isConnected) {
          setSignInLoading(true);
          await createActorWithPlug();
          await getPlugUserData();
          setSignInLoading(false);
          setIsAuthenticated(true);
          return "";
        }
      });
    } else {
      console.log("Plug wallet is not installed.");
    }

    // stoic
    StoicIdentity.load().then((identity) => {
      if (identity) {
        getStoicUserData(identity);
        createActorWithStoic(identity);
        setIsAuthenticated(true);
        return "";
      }
    });

    // infinitywallet
    if (window.ic.infinityWallet) {
      await window.ic.infinityWallet.isConnected().then(async (isConnected) => {
        if (isConnected) {
          setSignInLoading(true);
          await createActorWithInfinityWallet();
          await getInfinityWalletUserData();
          setSignInLoading(false);
          setIsAuthenticated(true);
          return "";
        }
      });
    } else {
      console.log("InfinityWallet is not installed.");
    }
  };

  const signOut = () => {
    setDefaultActor(undefined);
    setActor(undefined);
    setPrincipalId(undefined);
    setPrincipalIdStr("");
    setAccountId("");
    setIsAuthenticated(false);

    signInMethod === "plug" && disconnectPlug();
    signInMethod === "stoic" && disconnectStoic();
    signInMethod === "infinitywallet" && disconnectInfinityWallet();
    setSignInMethod(""); // unset sign in method

    history.location.pathname === "/profile" && toHome();
  };

  const value = {
    defaultActor,
    actor,
    principalId,
    principalIdStr,
    accountId,
    signInMethod,
    signInLoading,
    isAuthenticated,
    // sign in
    setDefActor,
    signInWithPlug,
    signInWithStoic,
    signInWithInfinityWallet,
    // other
    checkConnection,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export { useAuth };
export default AuthProvider;
