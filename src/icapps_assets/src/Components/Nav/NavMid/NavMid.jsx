import React from "react";
import css from "./NavMid.module.css";

// components
import { Logo } from "../../index";
import { Desktop, Mobile } from "./index";

// utils
import { useWindowSize } from "../../../Utils/UseWindowSize";

// icons
import { iTwitter, iDiscord, iMediumM } from "../../../Icons/Icons";

// navlinks
import { toHome } from "../../../Routes/routes";

// state
import { useSelector, useDispatch } from "react-redux";
import { selectMobileMenuModal, setMobileMenuModal } from "../../../State/modals";

const NavMid = () => {
  const dispatch = useDispatch();
  const [deviceWidth] = useWindowSize();
  const mobileMenuModal = useSelector(selectMobileMenuModal);

  const handleLogoClick = (action) => {
    action();
    mobileMenuModal && dispatch(setMobileMenuModal(false));
  };

  return (
    <div className={css.nav}>
      <div className={css.content}>
        {/* menu */}
        {deviceWidth > 1023 ? <Desktop /> : <Mobile />}

        {/* logo */}
        <button
          className="navlink"
          onClick={() => {
            handleLogoClick(toHome);
          }}
        >
          <Logo />
        </button>
      </div>
    </div>
  );
};

export default NavMid;
