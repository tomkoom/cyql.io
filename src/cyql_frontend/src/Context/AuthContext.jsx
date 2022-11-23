import React, { createContext, useContext, useState } from "react";

// backend
import { Actor, HttpAgent } from "@dfinity/agent";
import {
  idlFactory as cyql_idl_factory,
  canisterId as cyql_canister_id,
} from "../../../declarations/cyql_backend/index";

// wallets
import { StoicIdentity } from "ic-stoic-identity";

// routes
import { history } from "../Routes/history";
import { toHome } from "../Routes/routes";

// utils
import { getAccountIdentifier } from "./Utils/Principal.utils";
import { disconnectPlug } from "./Utils/Plug.utils";

// host
import { host, localhost } from "./host";

const AuthContext = createContext();
const useAuth = () => {
  return useContext(AuthContext);
};

const env = process.env.NODE_ENV;
const h = env !== "production" ? localhost : host;

export function AuthProvider({ children }) {
  const [defaultActor, setDefaultActor] = useState(undefined);
  const [actor, setActor] = useState(undefined);
  const [principalId, setPrincipalId] = useState(undefined);
  const [principalIdStr, setPrincipalIdStr] = useState("");
  const [accountIdStr, setAccountIdStr] = useState(""); // always string
  const [signInMethod, setSignInMethod] = useState("");
  const [signInLoading, setSignInLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const initDefaultActor = () => {
    const actor = Actor.createActor(cyql_idl_factory, {
      agent: new HttpAgent({ h }),
      canisterId: cyql_canister_id,
    });
    setDefaultActor(actor);
  };

  // PLUG

  const signInWithPlug = async () => {
    setSignInLoading(true);
    const publicKey = await window.ic.plug
      .requestConnect({
        whitelist: [cyql_canister_id],
        host: h,
      })
      .catch((err) => {
        console.log(err);
        setSignInLoading(false);
        return; // return undefined
      });
    if (publicKey) {
      await createPlugActor().catch((err) => {
        console.log(err);
        return;
      });
      await getPlugUserData().catch((err) => {
        console.log(err);
        return;
      });
    }
    setIsAuthenticated(true);
    setSignInLoading(false);
  };

  const createPlugActor = async () => {
    await window.ic.plug
      .createActor({
        canisterId: cyql_canister_id,
        interfaceFactory: cyql_idl_factory,
      })
      .then((actor) => {
        setActor(actor);
      })
      .catch((err) => console.log(err));
  };

  const getPlugUserData = async () => {
    const principalId = await window.ic?.plug?.getPrincipal();
    const principalIdStr = principalId.toText();
    const accountIdStr = window.ic.plug.sessionManager.sessionData.accountId;
    setPrincipalId(principalId);
    setPrincipalIdStr(principalIdStr);
    setAccountIdStr(accountIdStr);
    setSignInMethod("plug");
  };

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
    const actor = Actor.createActor(cyql_idl_factory, {
      agent: new HttpAgent({
        identity,
      }),
      canisterId: cyql_canister_id,
    });
    setActor(actor);
  };

  const getStoicUserData = (stoicId) => {
    const principalId = stoicId.getPrincipal();
    const principalIdStr = stoicId.getPrincipal().toText();
    const accountIdStr = getAccountIdentifier(principalId);
    setPrincipalId(principalId);
    setPrincipalIdStr(principalIdStr);
    setAccountIdStr(accountIdStr);
    setSignInMethod("stoic");
  };

  const disconnectStoic = async () => await StoicIdentity.disconnect();

  //  INFINITYWALLET

  const signInWithInfinityWallet = async () => {
    const whitelist = [cyql_canister_id];
    try {
      setSignInLoading(true);
      await window.ic.infinityWallet.requestConnect({
        whitelist,
        host: h,
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
        canisterId: cyql_canister_id,
        interfaceFactory: cyql_idl_factory,
      })
      .then((actor) => {
        setActor(actor);
      })
      .catch((err) => console.log(err));
  };

  const getInfinityWalletUserData = async () => {
    const principalId = await window.ic.infinityWallet.getPrincipal();
    const accountIdStr = await window.ic.infinityWallet.getAccountID();
    setPrincipalId(principalId);
    setPrincipalIdStr(principalId.toText());
    setAccountIdStr(accountIdStr);
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
          await createPlugActor();
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
    setAccountIdStr("");
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
    accountIdStr,
    signInMethod,
    signInLoading,
    isAuthenticated,
    // sign in
    initDefaultActor,
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
