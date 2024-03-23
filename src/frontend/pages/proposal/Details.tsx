import React, { FC } from "react"
import styled from "styled-components"
import { formatDateTime } from "@/utils/formatDateTime"
import { capitalizeFirstLetter } from "@/utils/capitalizeFirstLetter"

interface DetailsProps {
  proposal: any
}

const Details: FC<DetailsProps> = ({ proposal }): JSX.Element => {
  const now = Date.now()
  const duration = Math.abs(+proposal.createdAt / 1_000_000 - now) / 1000
  const daysAgo = Math.floor(duration / 86400)

  return (
    <DetailsStyled>
      <li>
        <span className="label">State</span>
        <span className="value">{capitalizeFirstLetter(Object.keys(proposal.state)[0])}</span>
      </li>

      <li>
        <span className="label">Proposer</span>
        <span className="value">{proposal.proposer}</span>
      </li>

      <li>
        <span className="label">Created at</span>
        <span className="value">
          {formatDateTime(+proposal.createdAt / 1_000_000)} <span>({daysAgo} days ago)</span>
        </span>
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
  gap: 0.4rem;

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

    > span.value {
      > span {
        color: var(--tertiaryColor);
      }
    }

    > span.label {
      color: var(--secondaryColor);
    }
  }
`

export default Details
