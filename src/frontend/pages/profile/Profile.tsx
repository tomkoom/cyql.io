import React, { FC } from "react"
import styled from "styled-components"
import { iBolt } from "@/components/icons/Icons"

// auth
import { useAuth } from "@/context/Auth"

// state
import { useAppSelector, useAppDispatch } from "@/hooks/useRedux"
import { selectUpvotedProjects, selectOwnsNft, setOwnsNft } from "@/state/profile/profile"
import { selectVotingPower } from "@/state/user"

// components
import Id from "./id/Id"

const Profile: FC = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const votingPower = useAppSelector(selectVotingPower)
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
      <div className="id_item">
        <p className="label">voting power</p>
        <p className="voting_power">
          <span>{iBolt}</span> {votingPower || "..."}
        </p>
      </div>

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

const ProfileStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  text-align: center;
  margin-bottom: 2rem;

  > div.id_item {
    > p.label {
      margin-bottom: 0.5rem;
    }

    > p.voting_power {
      padding: 0.5rem;
      background-color: var(--underlay1);
      font-size: var(--fs5);
      font-weight: var(--fwBold);

      > span {
        color: var(--highlight1);
      }
    }
  }
`

export default Profile
