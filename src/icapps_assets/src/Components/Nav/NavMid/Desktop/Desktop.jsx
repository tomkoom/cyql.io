import React from "react";
import css from "./Desktop.module.css";
import k from "../../../../../../../k/k";

// components
import NavLink from "./NavLink/NavLink";
import SignInBtn from "./SignInBtn/SignInBtn";
import ProfileBtn from "./ProfileBtn/ProfileBtn";

// icons
import { iFire } from "../../../../Icons/Icons";

// auth
import { useAuth } from "../../../../Context/AuthContext";

// routes
import { toApps, toUpcoming, toSubmit, toAdmin } from "../../../../Routes/routes";

const Desktop = () => {
  const { principalId, principalIdStr } = useAuth();

  return (
    <div className={css.desktop}>
      <NavLink label="Projects" to={toApps} icon="" />
      <NavLink label="Upcoming NFT Sales" to={toUpcoming} icon={iFire} />
      <NavLink label="Submit" to={toSubmit} icon="" />

      {/* admin (protected) */}
      {(principalIdStr && principalIdStr === k.PLUG_ADMIN_1) ||
      (principalIdStr && principalIdStr === k.PLUG_ADMIN_2) ? (
        <NavLink label="Admin" to={toAdmin} icon="" />
      ) : null}

      {!principalId ? <SignInBtn /> : <ProfileBtn />}
    </div>
  );
};

export default Desktop;
