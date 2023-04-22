import React from "react";
import css from "./Mobile.module.css";

// routes
import { toHome } from "@routes/routes";

// components
import { Logo } from "@ui-elements/index";
import { Theme } from "@ui-elements/index";
import { Menu, MenuBtn, Socials } from "./index";
import { Nft } from "../index";

// state
import { useSelector } from "react-redux";
import { selectMobileMenuModal } from "@state/modals/modals";

const Mobile = () => {
  const mobileMenu = useSelector(selectMobileMenuModal);

  return (
    <div className={css.mobile}>
      <MenuBtn />

      <div onClick={toHome}>
        <Logo />
      </div>

      <div className={css.controls}>
        <Socials />
        <div className={css.hide}>
          <Theme />
          <Nft />
        </div>
      </div>

      {mobileMenu && <Menu />}
    </div>
  );
};

export default Mobile;
