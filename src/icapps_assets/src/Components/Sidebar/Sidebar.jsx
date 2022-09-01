import React from "react";
import css from "./Sidebar.module.css";
import k from "../../../../../k/k";

// icons
import { iCube, iRocket, iBolt, iEye, iPlus, iList } from "../../Icons/Icons";

// routes
import { toApps, toUpcoming, toSubmit, toJobs, toAdmin } from "../../Routes/routes";

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
        <NavLink label="Jobs" to={toJobs} icon={iBolt} />
        {/* <NavLink label="Predictions" to={} icon={iEye} /> */}
        <NavLink label="Submit" to={toSubmit} icon={iPlus} />

        {(principalIdStr && principalIdStr === k.PLUG_ADMIN_1) ||
        (principalIdStr && principalIdStr === k.STOIC_ADMIN_1) ||
        (principalIdStr && principalIdStr === k.PLUG_ADMIN_2) ||
        (principalIdStr && principalIdStr === k.STOIC_ADMIN_2) ? (
          <NavLink label="Admin" to={toAdmin} icon={iList} />
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
