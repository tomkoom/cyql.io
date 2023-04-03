import React from "react";
import css from "./Sidebar.module.css";
import { c } from "../../../../../constants/constants";

// icons
import { iCube, iPlus, iList } from "@icons/Icons";

// routes
import { toApps, toSubmit, toAdmin } from "@routes/routes";

// auth
import { useAuth } from "@context/AuthContext";

// components
import NavLink from "./NavLink/NavLink";

const Sidebar = () => {
  const { principalIdStr } = useAuth();
  const plugAdmin1 = c.PLUG_ADMIN_1;
  const plugAdmin2 = c.PLUG_ADMIN_2;
  const stoicAdmin1 = c.STOIC_ADMIN_1;
  const stoicAdmin2 = c.STOIC_ADMIN_2;

  return (
    <div className={css.sidebar}>
      <div className={css.nav}>
        <NavLink label="projects" to={toApps} icon={iCube} />
        <NavLink label="submit" to={toSubmit} icon={iPlus} />

        {(principalIdStr && principalIdStr === plugAdmin1) ||
        (principalIdStr && principalIdStr === stoicAdmin1) ||
        (principalIdStr && principalIdStr === plugAdmin2) ||
        (principalIdStr && principalIdStr === stoicAdmin2) ? (
          <NavLink label="admin" to={toAdmin} icon={iList} />
        ) : null}

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
