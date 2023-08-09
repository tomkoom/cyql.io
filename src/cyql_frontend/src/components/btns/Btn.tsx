import React, { FC, ReactNode, ButtonHTMLAttributes } from "react";
import styled from "styled-components";

interface BtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  btnType: "primary" | "secondary";
  text: string;
  icon?: ReactNode;
  onClick: () => void;
}

const Btn: FC<BtnProps> = ({ btnType, text, icon, onClick, ...props }): JSX.Element => {
  return (
    <BtnStyled btnType={btnType} onClick={onClick} {...props}>
      {icon !== undefined && <span>{icon}</span>}
      <span>{text}</span>
    </BtnStyled>
  );
};

const colors = {
  primary: "#fff",
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

  /* custom */
  color: ${(p) => colors[p.btnType]};
  background-color: ${(p) => bgColors[p.btnType]};

  &:hover {
    background-color: ${(p) => hoverBgColors[p.btnType]};
  }
`;

export default Btn;
