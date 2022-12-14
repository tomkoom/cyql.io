import React, { useEffect } from "react";
import css from "./Profile.module.css";

// backend
import { Actor, HttpAgent } from "@dfinity/agent";
import nft_idl from "@idl/nft_idl";

// host, nft can id
import { host } from "@context/host";

// auth
import { useAuth } from "@context/AuthContext";

// state
import { useSelector, useDispatch } from "react-redux";
import { selectUpvotedProjects, selectOwnsNft, setOwnsNft } from "@state/profile/profile";

// components
import Id from "./Id/Id";

const Profile = () => {
  const dispatch = useDispatch();
  const { principalId } = useAuth();
  const ownsNft = useSelector(selectOwnsNft);
  const upvotedProjects = useSelector(selectUpvotedProjects);

  const getOwnsNft = async () => {
    const nftCanId = "dtlqp-nqaaa-aaaak-abwna-cai";
    const nft = Actor.createActor(nft_idl, {
      agent: new HttpAgent({ host }),
      canisterId: nftCanId,
    });

    await nft
      .principalOwnsOne(principalId)
      .then((res) => {
        dispatch(setOwnsNft(res));
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    getOwnsNft();
  }, []);

  return (
    <div className={css.profile}>
      <Id />

      <div className={css.profileInfo}>
        <p>
          NFT:{" "}
          <span className={css.badge}>{ownsNft === undefined ? "..." : ownsNft.toString()}</span>
        </p>
        <h4>Upvotes</h4>
        {upvotedProjects.length > 0 && (
          <ul className={css.upvotedProjects}>
            {upvotedProjects.map((p) => (
              <li key={p.id}>{p.name}, </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Profile;
