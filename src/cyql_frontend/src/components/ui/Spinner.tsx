import React, { FC } from "react";
import styled, { keyframes } from "styled-components";

interface SpinnerProps {
  sizePx?: number;
}

const Spinner: FC<SpinnerProps> = ({ sizePx = 24 }): JSX.Element => {
  return <SpinnerStyled sizePx={sizePx} />;
};

const spin = keyframes`
  0% { transform: rotate(0deg); }
	100% { transform: rotate(360deg); }
`;

const SpinnerStyled = styled.div<SpinnerProps>`
  flex-shrink: 0;
  width: ${(p) => `${p.sizePx}px`};
  height: ${(p) => `${p.sizePx}px`};
  border: 0.25rem solid rgba(var(--primaryColorRgb), 0.2);
  border-top: 0.25rem solid rgba(var(--primaryColorRgb), 1);
  border-radius: 50%;
  animation: ${spin} 0.75s linear infinite;
`;

export default Spinner;
