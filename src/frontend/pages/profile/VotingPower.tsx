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
      <h4>voting power</h4>
      <p className="hint">
        Deposit CYQL NFTs to your Principal or Account Id to boost voting power. Each NFT adds 10
        points to {iBolt} vp
      </p>

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
  display: flex;
  flex-direction: column;
  align-items: center;

  > h4 {
    margin-bottom: 0.5rem;
  }

  > p.hint {
    max-width: 20rem;
    font-size: var(--fs6);
    color: var(--secondaryColor);
  }

  > div.voting_power {
    display: flex;
    justify-content: center;
    padding: 0.5rem 1rem;
    background-color: var(--underlay1);
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
