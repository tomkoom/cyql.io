import React, { createContext, useContext, useState, useEffect } from "react";

// juno
import {
  authSubscribe,
  InternetIdentityProvider,
  NFIDProvider,
  signIn,
  signOut as junoSignOut,
} from "@junobuild/core";

// routes
import { history } from "@routes/history";
import { toHome } from "@routes/routes";

// host
// import { mainnethost, localhost } from "./host.js";

const AuthContext = createContext();
const useAuth = () => {
  return useContext(AuthContext);
};

// const mode = process.env.NODE_ENV;
// const host = mode !== "production" ? localhost : mainnethost;

export function AuthProvider({ children }) {
  const [user, setUser] = useState(undefined);
  const [principalIdStr, setPrincipalIdStr] = useState("");
  // const [accountIdStr, setAccountIdStr] = useState("");
  const [signInLoading, setSignInLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // juno start
  // ii
  const signInWithII = async () => {
    setSignInLoading(true);
    await signIn({
      provider: new InternetIdentityProvider({
        domain: "ic0.app",
      }),
    });
    setSignInLoading(false);
  };

  // nfid
  const signInWithNfid = async () => {
    const appName = "cyql.io";
    const logoUrl = "https://n7ib3-4qaaa-aaaai-qagnq-cai.raw.ic0.app/cyql-favicon.svg";

    setSignInLoading(true);
    await signIn({
      provider: new NFIDProvider({
        appName,
        logoUrl,
      }),
    });
    setSignInLoading(false);
  };

  useEffect(() => {
    const sub = authSubscribe((user) => {
      if (user !== null) {
        setSignInLoading(true);
        setPrincipalIdStr(user.key);
        setUser(user);

        // loading end
        setSignInLoading(false);
        setIsAuthenticated(true);
      }
    });
    return () => sub();
  }, []);
  // juno end

  const signOut = async () => {
    setUser(undefined);
    setPrincipalIdStr("");
    setPrincipalIdStr("");
    // setAccountIdStr("");
    setIsAuthenticated(false);

    // juno
    await junoSignOut();
    history.location.pathname === "/profile" && toHome();
  };

  const value = {
    user,
    principalIdStr,
    // accountIdStr,
    signInLoading,
    isAuthenticated,

    signInWithII,
    signInWithNfid,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export { useAuth };
export default AuthProvider;
