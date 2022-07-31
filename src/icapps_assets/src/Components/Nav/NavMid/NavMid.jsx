import React from "react";
import css from "./NavMid.module.css";

// components
import { Logo } from "../../index";
import { Desktop, Mobile } from "./index";

// utils
import { useWindowSize } from "../../../Utils/UseWindowSize";

// navlinks
import { toHome } from "../../../Routes/routes";

// state
import { useSelector, useDispatch } from "react-redux";
import { selectMobileMenuModal, setMobileMenuModal } from "../../../State/modals";

const NavMid = () => {
  const dispatch = useDispatch();
  const [deviceWidth] = useWindowSize();
  const mobileMenuModal = useSelector(selectMobileMenuModal);

  const handleClick = (action) => {
    action();
    mobileMenuModal && dispatch(setMobileMenuModal(false));
  };

  return (
    <div className={css.nav}>
      <div className={css.left}>
        {/* menu */}
        {deviceWidth < 1024 && <Mobile />}

        {/* logo */}
        <div
          className={css.logo}
          onClick={() => {
            handleClick(toHome);
          }}
        >
          <Logo />
        </div>
      </div>

      {/* profile */}
      <div className={css.right}>{deviceWidth > 1023 && <Desktop />}</div>
    </div>
  );
};

export default NavMid;
