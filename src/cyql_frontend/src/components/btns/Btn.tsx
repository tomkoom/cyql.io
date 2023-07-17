import React, { FC } from "react";
import styled from "styled-components";

interface BtnProps {
  btnType: "primary" | "secondary";
  text: string;
  icon?: any;
  onClick: () => void;
}

const Btn: FC<BtnProps> = ({ btnType, text, icon, onClick }) => {
  return (
    <BtnStyled btnType={btnType} onClick={onClick}>
      {icon !== undefined && <span>{icon}</span>}
      <span>{text}</span>
    </BtnStyled>
  );
};

const colors = {
  primary: "`var(--backgroundColor)`",
  secondary: "var(--primaryColor)",
};

const bgColors = {
  primary: "var(--highlight1)",
  secondary: "var(--underlay1)",
};

const hoverBgColors = {
  primary: "var(--highlight2)",
  secondary: "var(--underlay2)",
};

const BtnStyled = styled.button<{ btnType: "primary" | "secondary" }>`
  /* common */
  height: 2.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0 0.75rem;
  font-size: var(--fsText);
  font-weight: var(--fwBold);
  border-radius: 1.25rem;

  /* primary / secondary */
  color: ${(p) => colors[p.btnType]};
  background-color: ${(p) => bgColors[p.btnType]};

  &:hover {
    background-color: ${(p) => hoverBgColors[p.btnType]};
  }
`;

export default Btn;
