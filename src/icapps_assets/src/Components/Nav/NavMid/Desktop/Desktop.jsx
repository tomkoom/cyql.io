import React from "react";
import css from "./Desktop.module.css";

// iconst
import { iFire } from "../../../../Icons/Icons";

// components
import NavLink from "./NavLink/NavLink";
import SignInBtn from "./SignInBtn/SignInBtn";

// routes
import { toApps, toUpcoming, toSubmit } from "../../../../Routes/routes";

const Desktop = () => {
  return (
    <div className={css.desktop}>
      <NavLink label="Projects" to={toApps} icon="" />
      <NavLink label="Upcoming NFT Sales" to={toUpcoming} icon={iFire} />
      <NavLink label="Submit" to={toSubmit} icon="" />

      <SignInBtn />

      {/* profile (protected) */}
      {/* {user && <NavLink label="Profile" navTo={toProfile} icon="" />} */}

      {/* admin (protected) */}
      {/* {((user && user.uid === k.TWITTER_ADMIN_1) || (user && user.uid === k.TWITTER_ADMIN_2)) && (
        <NavLink label="Admin" navTo={toAdmin} icon="" />
      )} */}
    </div>
  );
};

export default Desktop;
