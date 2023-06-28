import React from "react";
import css from "./Profile.module.css";

// auth
import { useAuth } from "@/context/AuthContext";

// state
import { useSelector, useDispatch } from "react-redux";
import { selectUpvotedProjects, selectOwnsNft, setOwnsNft } from "@/state/profile/profile";

// components
import Id from "./id/Id";

const Profile = () => {
  // const dispatch = useDispatch();
  // const { principalId } = useAuth();
  // const ownsNft = useSelector(selectOwnsNft);
  // const upvotedProjects = useSelector(selectUpvotedProjects);

  // const getOwnsNft = async () => {
  //   const nftCanId = "dtlqp-nqaaa-aaaak-abwna-cai";
  //   const nft = Actor.createActor(nft_idl, {
  //     agent: new HttpAgent({ mainnethost }),
  //     canisterId: nftCanId,
  //   });

  //   await nft
  //     .principalOwnsOne(principalId)
  //     .then((res) => {
  //       dispatch(setOwnsNft(res));
  //     })
  //     .catch((e) => console.log(e));
  // };

  // useEffect(() => {
  //   getOwnsNft();
  // }, []);

  return (
    <div className={css.profile}>
      <Id />

      {/* <div className={css.profileInfo}>
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
      </div> */}
    </div>
  );
};

export default Profile;
