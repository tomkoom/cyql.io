import React from "react";
import css from "./Desktop.module.css";

// routes
import { toHome } from "@routes/routes";

// auth
import { useAuth } from "@context/AuthContext";

// components
import { ProfileBtn, SignInBtn, Socials } from "./index";
import { Nft } from "../index";
import { Logo, Price, Theme } from "@ui-elements/index";

const Desktop = () => {
  const { userKey } = useAuth();

  return (
    <div className={css.desktop}>
      <div className={css.main}>
        <div onClick={toHome}>
          <Logo />
        </div>
        <Socials />
      </div>

      <div className={css.controls}>
        <Price />
        <Theme />
        <Nft />
        {userKey === "" ? <SignInBtn /> : <ProfileBtn />}
      </div>
    </div>
  );
};

export default Desktop;
