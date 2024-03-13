import React, { FC } from "react"
import styled from "styled-components"

interface VotesProps {
  proposal: any
}

const Votes: FC<VotesProps> = ({ proposal }): JSX.Element => {
  return (
    <VotesStyled>
      <li>
        <span className="label">Voting power to accept</span>
        <span className="value">{Object.keys(proposal.votesYes)[0]}</span>
      </li>

      <li>
        <span className="label">Voting power to reject</span>
        <span className="value">{proposal.votesNo}</span>
      </li>

      <li>
        <span className="label">Voters to accept</span>
        <span className="value">{proposal.votersYes}</span>
      </li>

      <li>
        <span className="label">Voters to reject</span>
        <span className="value">{proposal.votersNo}</span>
      </li>

      <li>
        <span className="label">Total voters</span>
        <span className="value">{+proposal.votersYes + +proposal.votersNo}</span>
      </li>
    </VotesStyled>
  )
}

const VotesStyled = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.25rem;

  > li {
    width: 100%;
    display: flex;
    gap: 0.5rem;
    font-size: var(--fsText);
    font-weight: var(--fwRegular);
    color: var(--primaryColor);

    > span {
      flex: 1;
    }

    > span.label {
      color: var(--secondaryColor);
    }
  }
`

export default Votes
