import { createContext, useContext, useEffect, useState } from "react";
import { authSubscribe, signIn, InternetIdentityProvider } from "@junobuild/core";

const AuthContext = createContext();
const useAuth = () => {
  return useContext(AuthContext);
};

const Auth = ({ children }) => {
  const [user, setUser] = useState(undefined);

  const signinWithII = async () => {
    await signIn({
      provider: new InternetIdentityProvider({
        domain: "ic0.app",
      }),
    });
  };

  useEffect(() => {
    const sub = authSubscribe((user) => setUser(user));
    return () => sub();
  }, []);

  const value = {
    user,
    signinWithII,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { useAuth };
export default Auth;
