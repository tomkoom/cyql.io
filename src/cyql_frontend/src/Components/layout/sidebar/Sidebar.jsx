import React from "react";
import css from "./Sidebar.module.css";

// constants
import {
  iiAdmin1,
  iiAdmin2,
  plugAdmin1,
  plugAdmin2,
  stoicAdmin1,
  stoicAdmin2,
} from "@constants/constants";

// icons
import { iCube, iPlus, iCircle } from "@icons/Icons";

// routes
import { toApps, toSubmit, toAdmin } from "@routes/routes";

// auth
import { useAuth } from "@context/AuthContext";

// components
import NavLink from "./nav-link/NavLink";

const Sidebar = () => {
  const { principalIdStr } = useAuth();
  const admins = [iiAdmin1, iiAdmin2, plugAdmin1, plugAdmin2, stoicAdmin1, stoicAdmin2];

  const verifyAdmin = (principalIdStr) => {
    if (principalIdStr !== "") {
      return admins.includes(principalIdStr);
    }
  };

  return (
    <div className={css.sidebar}>
      <div className={css.nav}>
        <NavLink label="projects" to={toApps} icon={iCube} />
        <NavLink label="submit" to={toSubmit} icon={iPlus} />
        {verifyAdmin(principalIdStr) && <NavLink label="admin" to={toAdmin} icon={iCircle} />}

        <a
          className={css.link}
          href="https://th2z2-caaaa-aaaai-qnn2a-cai.ic0.app/"
          target="_blank"
          rel="noreferrer noopener"
        >
          <img
            className={css.icon}
            src="https://n7ib3-4qaaa-aaaai-qagnq-cai.raw.ic0.app/brand/cyql/favicon2.svg"
          />
          <p>streak</p>
        </a>
      </div>
    </div>
  );
};

export default Sidebar;
