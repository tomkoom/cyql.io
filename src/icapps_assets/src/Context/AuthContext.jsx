import React, { createContext, useContext, useState } from "react";

// firebase
import { auth } from "../../../../firebase/firebase-config";
import { TwitterAuthProvider, signOut, signInWithPopup } from "firebase/auth";

// ii
import { AuthClient } from "@dfinity/auth-client";
import { Actor, HttpAgent } from "@dfinity/agent";

// backend canister
import { idlFactory, canisterId } from "../../../declarations/icapps/index";

// routes
import { history } from "../Routes/history";
import { toHome } from "../Routes/routes";

const AuthContext = createContext();
const useAuth = () => {
  return useContext(AuthContext);
};

// state
import { useDispatch } from "react-redux";
import { setSignInModal } from "../State/modals";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(undefined);
  const [userId, setUserId] = useState(undefined);
  const dispatch = useDispatch();

  const signInWithInternetIdentity = async () => {
    const authClient = await AuthClient.create();
    await new Promise((resolve, reject) => {
      authClient.login({
        onSuccess: resolve,
        onError: reject,
      });
    });
    const identity = authClient.getIdentity();
    const agent = new HttpAgent({ identity });
    const actor = Actor.createActor(idlFactory, {
      agent: agent,
      canisterId: canisterId,
    });
    const principal = await actor.whoami();
    setUserId(principal);
    dispatch(setSignInModal(false));
  };

  const signInWithTwitter = async () => {
    const provider = new TwitterAuthProvider();
    try {
      const userCred = await signInWithPopup(auth, provider);
      const user = userCred.user;
      setUser(user);
      dispatch(setSignInModal(false));
    } catch (err) {
      console.log(err.message);
    }
  };

  const logOut = () => {
    signOut(auth)
      .then(() => history.location.pathname === "/profile" && toHome())
      .catch((err) => {
        console.log(err);
      });
  };

  const value = {
    user,
    userId,
    setUser,
    signInWithTwitter,
    signInWithInternetIdentity,
    logOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export { useAuth };
export default AuthProvider;
