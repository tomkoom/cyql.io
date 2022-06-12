import React from "react";
import css from "./NavLinks.module.css";
import k from "../../../../../k/k";

// icons
import { iFire } from "../../Icons/Icons";

// routes
import { toAdmin, toProfile, toSubmit, toUpcoming, toApps } from "../../Routes/routes";

// components
import NavLink from "./NavLink/NavLink";
import SignInBtn from "./SignInBtn/SignInBtn";

// auth
import { useAuth } from "../../Context/AuthContext";

const NavLinks = ({ location }) => {
  const { user } = useAuth();

  return (
    <div
      className={
        location === "nav"
          ? css.nav
          : location === "navMobile"
          ? css.navMobile
          : location === "footer"
          ? css.footer
          : css.nav
      }
    >
      {/* projects */}
      <NavLink label="Projects" navTo={toApps} icon="" />

      {/* upcoming */}
      <NavLink label="Upcoming NFT Sales" navTo={toUpcoming} icon={iFire} />

      {/* submit */}
      <NavLink label="Submit" navTo={toSubmit} icon="" />

      {/* profile (protected) */}
      {user && <NavLink label="Profile" navTo={toProfile} icon="" />}

      {/* admin (protected) */}
      {((user && user.uid === k.TWITTER_ADMIN_1) || (user && user.uid === k.TWITTER_ADMIN_2)) && (
        <NavLink label="Admin" navTo={toAdmin} icon="" />
      )}

      {/* sign in btn */}
      {!user && <SignInBtn />}
    </div>
  );
};

export default NavLinks;
