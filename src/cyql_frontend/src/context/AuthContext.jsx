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
import { history } from "@/routes/history";
import { toHome } from "@/routes/routes";

const AuthContext = createContext();
const useAuth = () => {
  return useContext(AuthContext);
};

function AuthProvider({ children }) {
  const [userKey, setUserKey] = useState("");
  const [signInLoading, setSignInLoading] = useState(false);

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
        setUserKey(user.key);
        setSignInLoading(false);
      }
    });
    return () => sub();
  }, []);
  // juno end

  const signOut = async () => {
    setUserKey("");

    // juno
    await junoSignOut();
    history.location.pathname === "/profile" && toHome();
  };

  const value = {
    userKey,
    signInLoading,

    // juno
    signInWithII,
    signInWithNfid,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export { useAuth };
export default AuthProvider;
