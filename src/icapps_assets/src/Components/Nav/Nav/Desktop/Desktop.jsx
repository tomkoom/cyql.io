import React from "react";

// components
import SignInBtn from "./SignInBtn/SignInBtn";
import ProfileBtn from "./ProfileBtn/ProfileBtn";

// auth
import { useAuth } from "../../../../Context/AuthContext";

const Desktop = () => {
  const { isAuthenticated } = useAuth();
  return !isAuthenticated ? <SignInBtn /> : <ProfileBtn />;
};

export default Desktop;
