import React from "react";
import css from "./Sidebar.module.css";
import { c } from "../../../../../constants/constants";

// icons
import { iCube, iRocket, iBolt, iEye, iPlus, iList, iChartArea } from "../../Icons/Icons";

// routes
import { toApps, toUpcoming, toSubmit, toJobs, toAdmin, toNft } from "../../Routes/routes";

// auth
import { useAuth } from "../../Context/AuthContext";

// components
import NavLink from "./NavLink/NavLink";
import { Theme, Price, Socials } from "../index";

const PLUG_ADMIN_1 = c.PLUG_ADMIN_1;
const PLUG_ADMIN_2 = c.PLUG_ADMIN_2;
const STOIC_ADMIN_1 = c.STOIC_ADMIN_1;
const STOIC_ADMIN_2 = c.STOIC_ADMIN_2;

const Sidebar = () => {
  const { principalIdStr } = useAuth();

  return (
    <div className={css.sidebar}>
      <div className={css.nav}>
        <NavLink label="Projects" to={toApps} icon={iCube} />
        <NavLink label="Upcoming NFTs" to={toUpcoming} icon={iRocket} />
        <NavLink label="cyql NFT" to={toNft} icon={iChartArea} />
        <NavLink label="Jobs" to={toJobs} icon={iBolt} />
        <NavLink label="Submit" to={toSubmit} icon={iPlus} />
        {/* <NavLink label="Predictions" to={} icon={iEye} /> */}

        {(principalIdStr && principalIdStr === PLUG_ADMIN_1) ||
        (principalIdStr && principalIdStr === STOIC_ADMIN_1) ||
        (principalIdStr && principalIdStr === PLUG_ADMIN_2) ||
        (principalIdStr && principalIdStr === STOIC_ADMIN_2) ? (
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
