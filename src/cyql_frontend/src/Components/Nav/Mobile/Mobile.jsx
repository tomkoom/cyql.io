import React from "react";
import css from "./Mobile.module.css";

// routes
import { toHome } from "@routes/routes";

// components
import { Logo } from "@components/index";
import { Menu, MenuBtn, Socials } from "./index";

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

      <div>
        <Socials />
      </div>

      {mobileMenu && <Menu />}
    </div>
  );
};

export default Mobile;
