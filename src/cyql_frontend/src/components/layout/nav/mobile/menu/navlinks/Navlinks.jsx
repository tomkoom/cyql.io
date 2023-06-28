import React from "react";
import css from "./Navlinks.module.css";

// icons
import { iCube, iPlus, iInfinity } from "@/components/icons/Icons";

// components
import { Navlink } from "./index";

// routes
import { toHome, toApps, toSubmit } from "@/routes/routes";

const Navlinks = () => {
  return (
    <div className={css.navlinks}>
      <Navlink label="home" route={toHome} icon={iInfinity} />
      <Navlink label="projects" route={toApps} icon={iCube} />
      <Navlink label="submit" route={toSubmit} icon={iPlus} />
    </div>
  );
};

export default Navlinks;
