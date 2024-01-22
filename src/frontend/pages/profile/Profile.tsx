import React, { FC } from "react"
import styled from "styled-components"

// auth
import { useAuth } from "@/context/Auth"

// state
import { useAppSelector, useAppDispatch } from "@/hooks/useRedux"
import { selectUpvotedProjects, selectOwnsNft, setOwnsNft } from "@/state/profile/profile"

// components
import Id from "./id/Id"

const Profile: FC = (): JSX.Element => {
  // const dispatch = useAppDispatch();
  // const { principalId } = useAuth();
  // const ownsNft = useAppSelector(selectOwnsNft);
  // const upvotedProjects = useAppSelector(selectUpvotedProjects);

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
    <ProfileStyled>
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
    </ProfileStyled>
  )
}

const ProfileStyled = styled.div``

export default Profile
