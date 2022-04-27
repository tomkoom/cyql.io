import React, { createContext, useContext, useState } from "react";
import { auth } from "../../../../firebase/firebase-config";
import { TwitterAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { history } from "../Routes/history";
import { toHome } from "../Routes/routes";
import { usersColRef } from "../../../../firebase/firestore-collections";
import { doc, setDoc, getDoc } from "firebase/firestore";

const AuthContext = createContext();
const useAuth = () => {
  return useContext(AuthContext);
};

// state
import { useDispatch } from "react-redux";
import { setSignInModal } from "../State/signInModal";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(undefined);

  const dispatch = useDispatch();

  const addUserToDB = async (user) => {
    const userDocRef = doc(usersColRef, user.uid);
    const u = await getDoc(userDocRef);
    const userExists = u.data() ? true : false;

    // const u = await getDoc(doc(usersColRef, user.uid));
    // const userExists = u.data() ? true : false;

    if (!userExists) {
      await setDoc(userDocRef, {
        displayName: user.displayName,
        screenName: user.reloadUserInfo.screenName,
        twitterCreatedAt: user.reloadUserInfo.createdAt,
        firstSignIn: new Date(),
      });
    }
  };

  const signInWithTwitter = async () => {
    const provider = new TwitterAuthProvider();
    try {
      const userCred = await signInWithPopup(auth, provider);
      const user = userCred.user;
      setUser(user);
      addUserToDB(user);
      dispatch(setSignInModal(false));
    } catch (err) {
      console.log(err.message);
    }
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

    if (history.location.pathname === "/profile") {
      toHome();
    }
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
