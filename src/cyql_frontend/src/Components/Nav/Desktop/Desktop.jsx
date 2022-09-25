import React from "react";
import css from "./Desktop.module.css";

// components
import SignInBtn from "./SignInBtn/SignInBtn";
import ProfileBtn from "./ProfileBtn/ProfileBtn";
import { Price, Theme } from "../../index";

// auth
import { useAuth } from "../../../Context/AuthContext";

const Desktop = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className={css.desktop}>
      <Price />
      <Theme />
      {!isAuthenticated ? <SignInBtn /> : <ProfileBtn />}
    </div>
  );
};

export default Desktop;
