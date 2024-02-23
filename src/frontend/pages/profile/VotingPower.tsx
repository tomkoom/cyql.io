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
      <p className="label">voting power</p>
      <p className="hint">each cyql nft adds 10 points to vp</p>

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
  > p.hint {
    margin-top: 0.25rem;
    font-size: var(--fsText);
    color: var(--secondaryColor);
  }

  > div.voting_power {
    display: flex;
    justify-content: center;
    padding: 0.5rem;
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
