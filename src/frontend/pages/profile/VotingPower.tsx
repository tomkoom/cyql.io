import React, { FC } from "react"
import styled from "styled-components"
import { iBolt } from "@/components/icons/Icons"
import { Spinner } from "@/components/ui/_index"

// state
import { useAppSelector } from "@/hooks/useRedux"
import { selectVotingPower } from "@/state/user"

const VotingPower: FC = (): JSX.Element => {
  const votingPower = useAppSelector(selectVotingPower)

  return (
    <VotingPowerStyled>
      <div>
        <h4>Voting Power</h4>
        <p className="text">
          Deposit CYQL NFTs to your principal or account to boost voting power. Each NFT adds 10
          points to {iBolt} vp
        </p>
      </div>

      {votingPower ? (
        <div className="voting_power">
          <span>
            <span>{iBolt}</span> {votingPower}
          </span>
        </div>
      ) : (
        <div className="voting_power">
          <Spinner />
        </div>
      )}
    </VotingPowerStyled>
  )
}

const VotingPowerStyled = styled.div`
  width: 100%;
  text-align: left;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 1rem;
  background-color: var(--underlay1);

  > div {
    > h4 {
      font-size: var(--fs6);
      margin-bottom: 0.5rem;
    }

    > p.text {
      max-width: 20rem;
      font-size: var(--fsText);
      color: var(--secondaryColor);
    }
  }

  > div.voting_power {
    display: flex;
    justify-content: center;
    padding: 0.5rem 1rem;
    background-color: var(--underlay2);
    margin-top: 0.5rem;

    > span {
      font-size: var(--fs5);
      font-weight: var(--fwBold);

      > span {
        color: var(--highlight1);
      }
    }
  }
`

export default VotingPower
