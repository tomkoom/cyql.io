import React from "react";
import css from "./Sidebar.module.css";
import { c } from "../../../../../constants/constants";

// icons
import { iCube, iRocket, iBolt, iPlus, iList, iChartArea } from "../../Icons/Icons";

// routes
import { toApps, toUpcoming, toSubmit, toJobs, toAdmin, toNft } from "../../Routes/routes";

// auth
import { useAuth } from "@context/AuthContext";

// components
import NavLink from "./NavLink/NavLink";
import { Socials } from "../index";

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
        <NavLink label="Jobs" to={toJobs} icon={iBolt} />
        <NavLink label="Submit" to={toSubmit} icon={iPlus} />
        <NavLink label="cyql NFT" to={toNft} icon={iChartArea} />

        {(principalIdStr && principalIdStr === PLUG_ADMIN_1) ||
        (principalIdStr && principalIdStr === STOIC_ADMIN_1) ||
        (principalIdStr && principalIdStr === PLUG_ADMIN_2) ||
        (principalIdStr && principalIdStr === STOIC_ADMIN_2) ? (
          <NavLink label="Admin" to={toAdmin} icon={iList} />
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

      <hr className={css.div} />
      <Socials />
    </div>
  );
};

export default Sidebar;
