import React from "react";
import css from "./Menu.module.css";

// components
import { IdImg } from "../../../../Profile/index";

// icons
import { iSignOut } from "../../../../ui-elements/icons/Icons";
import CrossIcon from "../../../../ui-elements/icons/cross-icon/CrossIcon";

// auth
import { useAuth } from "../../../../../context/AuthContext";

// routes
import { toProfile } from "../../../../../routes/routes";

const Menu = ({ setMenuIsOpen }) => {
  const { principalIdStr, signOut } = useAuth();

  const handleMenuItemClick = (action) => {
    action();
    setMenuIsOpen(false);
  };

  return (
    <div className={css.menu}>
      <div className={css.menuIProfile} onClick={() => handleMenuItemClick(toProfile)}>
        <IdImg size={32} />
        <div>
          <p>
            {principalIdStr.substring(0, 5) +
              "..." +
              principalIdStr.substring(principalIdStr.length - 3)}
          </p>
          <p className={css.subtitle}>View Profile</p>
        </div>
      </div>

      <hr className={css.div} />
      <div className={css.menuI} onClick={() => handleMenuItemClick(signOut)}>
        <span>{iSignOut}</span>
        <p>Sign Out</p>
      </div>

      <div className={css.crossIcon}>
        <CrossIcon onClick={() => setMenuIsOpen(false)} />
      </div>
    </div>
  );
};

export default Menu;
