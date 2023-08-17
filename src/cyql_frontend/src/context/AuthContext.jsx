import React, { createContext, useContext, useState, useEffect } from "react";

// juno
import {
  authSubscribe,
  InternetIdentityProvider,
  NFIDProvider,
  signIn,
  signOut as junoSignOut,
} from "@junobuild/core";

const AuthContext = createContext();
const useAuth = () => {
  return useContext(AuthContext);
};

function AuthProvider({ children }) {
  const [userKey, setUserKey] = useState("");
  const [signInLoading, setSignInLoading] = useState(false);

  // ii
  const signInWithII = async () => {
    setSignInLoading(true);
    await signIn({
      provider: new InternetIdentityProvider({
        domain: "ic0.app",
      }),
    }).catch((err) => {
      console.log(err);
      setSignInLoading(false);
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
      }).catch((err) => {
        console.log(err);
        setSignInLoading(false);
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

  const signOut = async () => {
    await junoSignOut();

    // clear state
    setUserKey("");
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
