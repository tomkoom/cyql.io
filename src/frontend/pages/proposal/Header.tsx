import { capitalizeFirstLetter } from "@/utils/capitalizeFirstLetter"
import React, { FC } from "react"
import styled from "styled-components"

interface HeaderProps {
  proposal: any
}

const Header: FC<HeaderProps> = ({ proposal }): JSX.Element => {
  const payload = proposal?.payload && JSON.parse(proposal.payload)

  return (
    <HeaderStyled>
      <h2 className="page-title">
        Proposal to List <span className="name">{payload.name || "[...]"}</span>
      </h2>
      <span className="id">Proposal id: {proposal.id}</span>
      <span className="state">{capitalizeFirstLetter(Object.keys(proposal.state)[0])}</span>
    </HeaderStyled>
  )
}

const HeaderStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.125rem;
  margin-bottom: 2rem;

  > h2 {
    margin: unset;
    color: var(--secondaryColor);

    > span.name {
      color: var(--primaryColor);
    }
  }

  > span.id {
    font-size: var(--fsText);
    color: var(--secondaryColor);
    margin-bottom: 0.125rem;
  }

  > span.state {
    color: var(--primaryColor);
    background-color: var(--underlay1);
    font-size: var(--fsText);
    font-weight: var(--fwMedium);
    padding: 0.25rem 0.4rem;
  }
`

export default Header
