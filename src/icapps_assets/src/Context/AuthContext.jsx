import React, { createContext, useContext, useState } from "react";

// idl
import { idlFactory, canisterId } from "../../../declarations/icapps/index";

// routes
import { history } from "../Routes/history";
import { toHome } from "../Routes/routes";

// state
import { useDispatch } from "react-redux";
import { setSignInModal } from "../State/modals";

const AuthContext = createContext();
const useAuth = () => {
  return useContext(AuthContext);
};

// host
// if else env
// const host = "https://mainnet.dfinity.network";
const host = "http://localhost:8080/";

export function AuthProvider({ children }) {
  const [actor, setActor] = useState(undefined);
  const [principalId, setPrincipalId] = useState("");
  const [signInMethod, setSignInMethod] = useState("");
  const dispatch = useDispatch();

  const signInWithPlug = async () => {
    try {
      await window.ic.plug.requestConnect({
        whitelist: [canisterId],
        host,
      });
      createActorPlug();
      dispatch(setSignInModal(false));
    } catch (err) {
      console.log(err);
    }
  };

  const createActorPlug = async () => {
    const plugActor = await window.ic.plug.createActor({
      canisterId: canisterId,
      interfaceFactory: idlFactory,
    });
    const principalId = await window.ic.plug.agent.getPrincipal();

    setActor(plugActor);
    setPrincipalId(principalId.toText());
    setSignInMethod("Plug");
  };

  const signOut = () => {
    setActor(undefined);
    setPrincipalId("");
    setSignInMethod("");
    if (history.location.pathname === "/profile") {
      toHome();
    }
  };

  const value = {
    // plug
    actor,
    principalId,
    signInMethod,
    signInWithPlug,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export { useAuth };
export default AuthProvider;
