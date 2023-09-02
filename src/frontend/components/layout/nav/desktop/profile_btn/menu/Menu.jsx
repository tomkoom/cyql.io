import React from "react";
import css from "./Menu.module.css";

// components
import { IdImg } from "@/components/ui/_index";

// icons
import { iSignOut } from "@/components/icons/Icons";
import CrossIcon from "@/components/icons/CrossIcon";

// utils
import { formatId } from "@/utils/format";

// auth
import { useAuth } from "@/context/AuthContext";

// hooks
import useNav from "@/hooks/useNav";

const Menu = ({ setMenuIsOpen }) => {
  const { toProfile } = useNav();
  const { userKey, signOut } = useAuth();

  const clickMenuItem = (action) => {
    action();
    setMenuIsOpen(false);
  };

  return (
    <div className={css.menu}>
      <div className={css.menuI} onClick={() => clickMenuItem(toProfile)}>
        <span className={css.icon}>
          <IdImg sizePx="36" />
        </span>

        <div className={css.idAddr}>
          <span className={css.text}>{formatId(userKey)}</span>
          <span className={css.subtitle}>view profile</span>
        </div>
      </div>

      <hr className={css.div} />
      <div className={css.menuI} onClick={() => clickMenuItem(signOut)}>
        <span className={css.icon}>{iSignOut}</span>
        <span className={css.text}>sign out</span>
      </div>

      <div className={css.crossIcon}>
        <CrossIcon onClick={() => setMenuIsOpen(false)} />
      </div>
    </div>
  );
};

export default Menu;
