import React from "react";
import css from "./Navlinks.module.css";

// icons
import { iCube, iRocket, iPlus, iBolt, iInfinity } from "@icons/Icons";

// components
import Navlink from "./Navlink/Navlink";

// routes
import { toHome, toApps, toUpcoming, toJobs, toSubmit } from "@routes/routes";

const Navlinks = () => {
  return (
    <div className={css.navlinks}>
      <Navlink label="Home" to={toHome} icon={iInfinity} />
      <Navlink label="Projects" to={toApps} icon={iCube} />
      <Navlink label="Upcoming" to={toUpcoming} icon={iRocket} />
      <Navlink label="Jobs" to={toJobs} icon={iBolt} />
      <Navlink label="Submit" to={toSubmit} icon={iPlus} />
    </div>
  );
};

export default Navlinks;
