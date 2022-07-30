import React from "react";
import css from "./Sidebar.module.css";
import k from "../../../../../k/k";

// icons
import { iCube, iRocket, iPlus, iDatabase } from "../../Icons/Icons";

// routes
import { toApps, toUpcoming, toSubmit, toAdmin } from "../../Routes/routes";

// auth
import { useAuth } from "../../Context/AuthContext";

// components
import NavLink from "./NavLink/NavLink";
import { Theme, Price, Socials } from "../index";

const Sidebar = () => {
  const { principalIdStr } = useAuth();

  return (
    <div className={css.sidebar}>
      <div className={css.nav}>
        <NavLink label="Projects" to={toApps} icon={iCube} />
        <NavLink label="Upcoming NFTs" to={toUpcoming} icon={iRocket} />
        <NavLink label="Submit" to={toSubmit} icon={iPlus} />

        {(principalIdStr && principalIdStr === k.PLUG_ADMIN_1) ||
        (principalIdStr && principalIdStr === k.PLUG_ADMIN_2) ? (
          <NavLink label="Admin" to={toAdmin} icon={iDatabase} />
        ) : null}
      </div>

      <div className={css.controls}>
        <Theme />
        <Price />
      </div>

      <hr className={css.div} />
      <Socials />
    </div>
  );
};

export default Sidebar;
