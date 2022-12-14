import React from "react";
import css from "./Profile.module.css";

// state
import { useSelector } from "react-redux";
import { selectUpvotedProjects, selectOwnsNFT, selectNFTIdsOwned } from "@state/profile";

// components
import Id from "./Id/Id";

const Profile = () => {
  const ownsNFT = useSelector(selectOwnsNFT);
  // const ownedNFTIds = useSelector(selectNFTIdsOwned);
  const upvotedProjects = useSelector(selectUpvotedProjects);

  return (
    <div className={css.profile}>
      <Id />

      <div className={css.profileInfo}>
        <p>
          NFT: <span className={css.badge}>{ownsNFT.toString()}</span>
        </p>
        <h4>Upvotes</h4>
        {upvotedProjects.length > 0 && (
          <ul className={css.upvotedProjects}>
            {upvotedProjects.map((p) => (
              <li key={p.id}>{p.name}, </li>
            ))}
          </ul>
        )}
        {/* <h4>My NFTs</h4>
        <p>Soon</p> */}
        {/* <p>
          NFT Indexes:{" "}
          <span className={css.badge}>{ownedNFTIds.toString().replaceAll(",", ", ")}</span>
        </p> */}
      </div>
    </div>
  );
};

export default Profile;
