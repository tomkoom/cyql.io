import React, { useState, useEffect, useRef } from "react";
import css from "./ProfileBtn.module.css";

// components
import Menu from "./Menu/Menu";
import { IdImg } from "../../../Profile/index";

// icons
import { iAngleDown } from "../../../../Icons/Icons";

// auth
import { useAuth } from "../../../../Context/AuthContext";

const ProfileBtn = () => {
  const { principalIdStr } = useAuth();
  const pIdStr = principalIdStr;
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const closeMenu = (e) => {
      if (menuRef.current) {
        if (!menuRef.current.contains(e.target)) {
          setMenuIsOpen(false);
        }
      } else {
        return;
      }
    };

    document.body.addEventListener("click", closeMenu);
    return () => {
      document.body.removeEventListener("click", closeMenu);
    }; // remove eventlistener on component unmount
  }, []);

  return (
    <div className={css.profileBtn} ref={menuRef}>
      <button onClick={() => setMenuIsOpen((prevState) => !prevState)}>
        <IdImg size={36} />
        <p>{pIdStr.substring(0, 5) + "..." + pIdStr.substring(pIdStr.length - 3)}</p>
        <span>{iAngleDown}</span>
      </button>

      {menuIsOpen && <Menu setMenuIsOpen={setMenuIsOpen} />}
    </div>
  );
};

export default ProfileBtn;
