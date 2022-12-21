import React from "react";
import css from "./Nav.module.css";

// components
import { Logo } from "../index";
import { Desktop, Mobile, Socials } from "./index";

// utils
import { useWindowSize } from "@hooks/useWindowSize";

// navlinks
import { toHome } from "@routes/routes";

// state
import { useSelector, useDispatch } from "react-redux";
import { selectMobileMenuModal, setMobileMenuModal } from "@state/modals/modals";

const Nav = () => {
  const dispatch = useDispatch();
  const [deviceWidth] = useWindowSize();
  const mobileMenuModal = useSelector(selectMobileMenuModal);

  const goHome = (route) => {
    route();
    mobileMenuModal && dispatch(setMobileMenuModal(false));
  };

  return (
    <header className={css.header}>
      <nav className={css.nav}>
        <div className={css.navI}>
          {/* mobile menu */}
          {deviceWidth < 1024 && <Mobile />}

          {/* logo */}
          <div
            onClick={() => {
              goHome(toHome);
            }}
          >
            <Logo />
          </div>

          <Socials />
        </div>

        {/* profile */}
        {deviceWidth > 1023 && <Desktop />}
      </nav>
    </header>
  );
};

export default Nav;
