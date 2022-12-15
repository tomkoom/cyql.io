import React from "react";
import css from "./Nav.module.css";

// components
import { Logo } from "../index";
import { Desktop, Mobile } from "./index";

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

  const handleClick = (action) => {
    action();
    mobileMenuModal && dispatch(setMobileMenuModal(false));
  };

  return (
    <header className={css.header}>
      <nav className={css.nav}>
        <div className={css.left}>
          {/* mobile menu */}
          {deviceWidth < 1024 && <Mobile />}

          {/* logo */}
          <div
            onClick={() => {
              handleClick(toHome);
            }}
          >
            <Logo />
          </div>
        </div>

        {/* profile */}
        <div className={css.right}>{deviceWidth > 1023 && <Desktop />}</div>
      </nav>
    </header>
  );
};

export default Nav;