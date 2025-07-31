import React, { FC } from "react"
import styled from "styled-components"

interface StepsProps {
  step: number
}

const Steps: FC<StepsProps> = ({ step }): JSX.Element => {
  return (
    <StepsStyled>
      <li className={step === 1 ? "active" : null}>1. Set project category and data</li>
      <li className={step === 2 ? "active" : null}>2. Review and Submit</li>
    </StepsStyled>
  )
}

const StepsStyled = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
  font-weight: var(--fwMedium);

  > li {
    font-size: var(--fs6);
    color: var(--tertiaryColor);

    &.active {
      color: var(--primaryColor);
    }
  }
`

export default Steps
