import React, { FC } from "react"
import styled from "styled-components"

interface StepsProps {
  step: number
}

const Steps: FC<StepsProps> = ({ step }): JSX.Element => {
  return (
    <StepsStyled>
      <li>
        <span style={step === 1 ? { color: "var(--primaryColor)" } : null}>1.</span>
        <span style={step === 1 ? { color: "var(--primaryColor)" } : null}>
          Enter withdrawal details
        </span>
      </li>
      <li>
        <span style={step === 2 ? { color: "var(--primaryColor)" } : null}>2.</span>
        <span style={step === 2 ? { color: "var(--primaryColor)" } : null}>Confirm withdrawal</span>
      </li>
    </StepsStyled>
  )
}

const StepsStyled = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;

  > li {
    display: flex;
    gap: 0.25rem;

    > span {
      color: var(--tertiaryColor);
    }
  }
`

export default Steps
