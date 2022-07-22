import React from "react";
import css from "./Menu.module.css";

// icons
import { iSignOut } from "../../../../../../Icons/Icons";
import CrossIcon from "../../../../../../Icons/CrossIcon/CrossIcon";

// auth
import { useAuth } from "../../../../../../Context/AuthContext";

// routes
import { toProfile } from "../../../../../../Routes/routes";

const Menu = ({ setMenuIsOpen }) => {
  const { principalId, signOut } = useAuth();

  return (
    <div className={css.menu}>
      <div className={css.menuIProfile} onClick={toProfile}>
        <img
          className={css.idImg}
          src={`https://avatars.dicebear.com/api/jdenticon/${principalId}.svg`}
          alt="id-img"
        />
        <div>
          <p>
            {principalId.substring(0, 5) + "..." + principalId.substring(principalId.length - 3)}
          </p>
          <p className={css.subtitle}>View Profile</p>
        </div>
      </div>

      <hr className={css.div} />

      <div
        className={css.menuI}
        onClick={() => {
          signOut();
          setMenuIsOpen(false);
        }}
      >
        <span className={css.icon}>{iSignOut}</span>
        <p>Sign Out</p>
      </div>

      <div className={css.crossIcon}>
        <CrossIcon onClick={() => setMenuIsOpen(false)} />
      </div>
    </div>
  );
};

export default Menu;
