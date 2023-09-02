import React, { FC } from "react";
import styled from "styled-components";

interface LogoLetterProps {
  sizeRem: string;
  borderRadiusRem: string;
  name: string;
}

const LogoLetter: FC<LogoLetterProps> = ({ sizeRem, borderRadiusRem, name }): JSX.Element => {
  const firstLetter = name.charAt(0);
  const style = {
    width: sizeRem,
    height: sizeRem,
    borderRadius: borderRadiusRem,
  };

  return <LogoLetterStyled style={style}>{firstLetter}</LogoLetterStyled>;
};

const LogoLetterStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-size: var(--fs4);
  font-weight: var(--fwBlack);
  color: var(--tertiaryColor);
  background-color: var(--underlay1);
  border-radius: 1rem;
`;

export default LogoLetter;
