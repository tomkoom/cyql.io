import React from "react";
import css from "./Profile.module.css";

// auth
import { useAuth } from "../../Context/AuthContext";

// state
import { useSelector } from "react-redux";
import { selectOwnsNFT } from "../../State/profile";

const Profile = () => {
  const { principalIdStr } = useAuth();
  const userOwnsNFT = useSelector(selectOwnsNFT);

  return (
    <div className={css.profile}>
      <div className={css.id}>
        <h2 className="pageTitle">
          {principalIdStr.substring(0, 5) +
            "..." +
            principalIdStr.substring(principalIdStr.length - 3)}
        </h2>
      </div>

      <div className={css.info}>
        <p>
          User owns NFT: <span className={css.badge}>{userOwnsNFT.toString()}</span>
        </p>
      </div>
    </div>
  );
};

export default Profile;
