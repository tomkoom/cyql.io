import styled, { keyframes } from "styled-components"

export default function Spinner() {
  return <SpinnerStyled />
}

const spin = keyframes`
  0% { transform: rotate(0deg); }
	100% { transform: rotate(360deg); }
`

const SpinnerStyled = styled.div`
  flex-shrink: 0;
  width: 30px;
  height: 30px;
  border: 0.2rem solid rgba(var(--primaryColorRgb), 0.2);
  border-top: 0.2rem solid rgba(var(--primaryColorRgb), 1);
  border-radius: 50%;
  animation: ${spin} 0.75s linear infinite;
`
