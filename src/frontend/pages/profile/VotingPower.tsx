import React, { FC } from "react"
import styled from "styled-components"
import { iBolt } from "@/components/icons/Icons"

// state
import { useAppSelector } from "@/hooks/useRedux"
import { selectVotingPower } from "@/state/user"

const VotingPower: FC = (): JSX.Element => {
  const votingPower = useAppSelector(selectVotingPower)

  return (
    <VotingPowerStyled>
      <p className="label">voting power</p>
      <p className="hint">each cyql nft adds 10 to vp</p>

      {votingPower ? (
        <p className="voting_power">
          <span>{iBolt}</span> {votingPower}
        </p>
      ) : (
        <p className="voting_power">...</p>
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

  > p.voting_power {
    padding: 0.5rem;
    background-color: var(--underlay1);
    font-size: var(--fs5);
    font-weight: var(--fwBold);
    margin-top: 0.5rem;

    > span {
      color: var(--highlight1);
    }
  }
`

export default VotingPower
