import React from "react";
import css from "./Mobile.module.css";

// routes
import { toHome } from "@/routes/routes";

// components
import { Logo, Theme } from "@/components/ui/_index";
import { Menu, MenuBtn, Socials } from "./index";
import { Nft } from "../_index";

// state
import { useAppSelector } from "@/hooks/useRedux";
import { selectMobileMenuModal } from "@/state/modals/modals";

const Mobile = () => {
  const mobileMenu = useAppSelector(selectMobileMenuModal);

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
