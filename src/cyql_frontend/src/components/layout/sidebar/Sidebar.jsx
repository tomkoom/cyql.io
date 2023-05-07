import React from "react";
import css from "./Sidebar.module.css";

// utils
import { verifyAdmin } from "@utils/verifyAdmin";

// constants
import { iiAdmin1, iiAdmin2 } from "@constants/constants";

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
  const admins = [iiAdmin1, iiAdmin2];

  return (
    <div className={css.sidebar}>
      <div className={css.nav}>
        <NavLink label="projects" to={toApps} icon={iCube} />
        <NavLink label="submit" to={toSubmit} icon={iPlus} />
        {verifyAdmin(admins, userKey) === true && (
          <NavLink label="admin" to={toAdmin} icon={iCircle} />
        )}

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
