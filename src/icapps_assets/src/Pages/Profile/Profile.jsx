import React from "react";
import css from "./Profile.module.css";

// auth
import { useAuth } from "../../Context/AuthContext";

// state
import { useSelector } from "react-redux";
import { selectOwnsNFT, selectNFTIdsOwned } from "../../State/profile";

const Profile = () => {
  const { principalIdStr } = useAuth();
  const ownsNFT = useSelector(selectOwnsNFT);
  const ownedNFTIds = useSelector(selectNFTIdsOwned);

  return (
    <div className={css.profile}>
      <div className={css.id}>
        <h2 className="pageTitle">
          {principalIdStr.substring(0, 5) +
            "..." +
            principalIdStr.substring(principalIdStr.length - 3)}
        </h2>
      </div>

      <div className={css.profileInfo}>
        <p>
          User owns icApps NFTs: <span className={css.badge}>{ownsNFT.toString()}</span>
        </p>
        {/* <p>
          Owned NFTs: <span className={css.badge}>{ownedNFTIds.toString()}</span>
        </p> */}
      </div>
    </div>
  );
};

export default Profile;
