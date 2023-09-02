import React from "react";
import css from "./Navlinks.module.css";

// hooks
import useNav from "@/hooks/useNav";

// icons
import { iCube, iPlus, iInfinity } from "@/components/icons/Icons";

// components
import { Navlink } from "./index";

const Navlinks = () => {
  const { toHome, toProjects, toSubmit } = useNav();

  return (
    <div className={css.navlinks}>
      <Navlink label="home" route={toHome} icon={iInfinity} />
      <Navlink label="projects" route={toProjects} icon={iCube} />
      <Navlink label="submit" route={toSubmit} icon={iPlus} />
    </div>
  );
};

export default Navlinks;
