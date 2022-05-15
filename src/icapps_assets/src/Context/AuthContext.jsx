import React, { createContext, useContext, useState } from "react";

// firebase
import { auth } from "../../../../firebase/firebase-config";
import { TwitterAuthProvider, signOut, signInWithRedirect } from "firebase/auth";

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
  const dispatch = useDispatch();

  const signInWithTwitter = async () => {
    const provider = new TwitterAuthProvider();
    try {
      const userCred = await signInWithRedirect(auth, provider);
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
    setUser,
    signInWithTwitter,
    logOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export { useAuth };
export default AuthProvider;
