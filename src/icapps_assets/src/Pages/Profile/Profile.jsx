import React from "react";
import css from "./Profile.module.css";

// state
import { useSelector } from "react-redux";
import { selectOwnsNFT, selectNFTIdsOwned } from "../../State/profile";

// components
import Id from "./Id/Id";

const Profile = () => {
  const ownsNFT = useSelector(selectOwnsNFT);
  const ownedNFTIds = useSelector(selectNFTIdsOwned);

  return (
    <div className={css.profile}>
      <Id />

      <div className={css.profileInfo}>
        <p>
          NFT: <span className={css.badge}>{ownsNFT.toString()}</span>
        </p>
        {/* <p>
          NFT Indexes:{" "}
          <span className={css.badge}>{ownedNFTIds.toString().replaceAll(",", ", ")}</span>
        </p> */}
      </div>
    </div>
  );
};

export default Profile;
