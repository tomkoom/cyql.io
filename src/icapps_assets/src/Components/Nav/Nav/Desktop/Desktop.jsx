import React from "react";
import css from "./Desktop.module.css";

// components
import SignInBtn from "./SignInBtn/SignInBtn";
import ProfileBtn from "./ProfileBtn/ProfileBtn";

// auth
import { useAuth } from "../../../../Context/AuthContext";

const Desktop = () => {
  const { principalId } = useAuth();
  return <div className={css.desktop}>{!principalId ? <SignInBtn /> : <ProfileBtn />}</div>;
};

export default Desktop;
