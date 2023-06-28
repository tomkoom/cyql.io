import React, { useState, useEffect, useRef } from "react";
import css from "./ProfileBtn.module.css";

// components
import { Menu } from "./index";
import { IdImg } from "@/components/ui-elements/index";

// icons
import { iAngleDown } from "@/components/icons/Icons";

// auth
import { useAuth } from "@/context/AuthContext";

const ProfileBtn = () => {
  const { userKey } = useAuth();
  const pIdStr = userKey;
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
