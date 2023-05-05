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
import { Link, NavLink } from "./index";

const Sidebar = () => {
  const { userKey } = useAuth();
  const admins = [iiAdmin1, iiAdmin2, plugAdmin1, plugAdmin2, stoicAdmin1, stoicAdmin2];

  const verifyAdmin = (userKey) => {
    if (userKey !== "") {
      return admins.includes(userKey);
    }
  };

  return (
    <div className={css.sidebar}>
      <div className={css.nav}>
        <NavLink label="projects" to={toApps} icon={iCube} />
        <NavLink label="submit" to={toSubmit} icon={iPlus} />
        {verifyAdmin(userKey) && <NavLink label="admin" to={toAdmin} icon={iCircle} />}

        {/* links */}
        <Link
          label={"streak"}
          url={"https://th2z2-caaaa-aaaai-qnn2a-cai.ic0.app/"}
          logo={"https://n7ib3-4qaaa-aaaai-qagnq-cai.raw.ic0.app/brand/streak/logo.svg"}
        />
      </div>
    </div>
  );
};

export default Sidebar;
