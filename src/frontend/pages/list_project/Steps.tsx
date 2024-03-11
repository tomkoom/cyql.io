import React, { FC } from "react"
import styled from "styled-components"

const Steps: FC = (): JSX.Element => {
  return (
    <StepsStyled>
      <li>1. Fill project data</li>
      <li>2. Confirm and submit</li>
    </StepsStyled>
  )
}

const StepsStyled = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 0.5rem;

  > li {
    font-size: var(--fsText);
    color: var(--tertiaryColor);
  }
`

export default Steps
