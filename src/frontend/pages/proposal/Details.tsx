import React, { FC } from "react"
import styled from "styled-components"
import { formatDateTime } from "@/utils/formatDateTime"

interface DetailsProps {
  proposal: any
}

const Details: FC<DetailsProps> = ({ proposal }): JSX.Element => {
  return (
    <DetailsStyled>
      <li>
        <span className="label">State</span>
        <span className="value">{Object.keys(proposal.state)[0]}</span>
      </li>
      <li>
        <span className="label">Proposer</span>
        <span className="value">{proposal.proposer}</span>
      </li>
      <li>
        <span className="label">Created at</span>
        <span className="value">{formatDateTime(+proposal.createdAt / 1000_000)}</span>
      </li>
      <li>
        <span className="label">Updated at</span>
        <span className="value">
          {proposal.updatedAt.length > 0 ? String(proposal.updatedAt[0]) : "..."}
        </span>
      </li>
    </DetailsStyled>
  )
}

const DetailsStyled = styled.ul`
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

export default Details
