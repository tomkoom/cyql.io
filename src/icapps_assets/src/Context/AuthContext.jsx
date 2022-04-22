import React, { createContext, useContext, useState } from "react";
import { auth } from "../../../../firebase/firebase-config";
import { TwitterAuthProvider, signInWithPopup, signOut } from "firebase/auth";

const AuthContext = createContext();
const useAuth = () => {
  return useContext(AuthContext);
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(undefined);
  // const [userCredential, setUserCredential] = useState(undefined);

  const signInWithTwitter = async () => {
    const provider = new TwitterAuthProvider();
    signInWithPopup(auth, provider)
      .then((res) => {
        const user = res.user;
        setUser(user);
        // console.log(user);
        // console.log(user.uid);
        // const credential = TwitterAuthProvider.credentialFromResult(res);
        // setUserCredential(credential);
        // const token = credential.accessToken;
        // const secret = credential.secret;
      })
      .catch((err) => {
        // handle errors
        console.log(err.message);
        // https://firebase.google.com/docs/auth/web/twitter-login
      });
  };

  const logOut = () => {
    signOut(auth)
      .then(() => {
        // console.log("sign-out successful");
      })
      .catch((err) => {
        console.log(err.message);
      });
    setUser(undefined);
  };

  const value = {
    user,
    signInWithTwitter,
    logOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export { useAuth };
export default AuthProvider;
