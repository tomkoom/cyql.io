import React, { FC, ReactNode, ButtonHTMLAttributes } from "react"
import styled from "styled-components"

interface BtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  btnType: "primary" | "secondary"
  text: string
  icon?: ReactNode
}

const Btn: FC<BtnProps> = ({ btnType, text, icon, ...props }): JSX.Element => {
  return (
    <BtnStyled btnType={btnType} {...props}>
      {icon !== undefined && <span className="icon">{icon}</span>}
      {text}
    </BtnStyled>
  )
}

const colors = {
  primary: "var(--background)",
  secondary: "var(--primaryColor)",
}

const bgColors = {
  primary: "var(--primaryColor)",
  secondary: "var(--underlay1)",
}

const hoverBgColors = {
  primary: "var(--secondaryColor)",
  secondary: "var(--underlay2)",
}

const BtnStyled = styled.button<{ btnType: "primary" | "secondary" }>`
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0 0.75rem;
  font-size: var(--fsText);
  font-weight: var(--fwBold);
  border-radius: 1.25rem;
  transition: var(--transition1);

  /* disabled */

  opacity: ${(p) => (p.disabled ? "0.5" : null)};

  /* type based */

  color: ${(p) => colors[p.btnType]};
  background-color: ${(p) => bgColors[p.btnType]};

  &:hover {
    background-color: ${(p) => hoverBgColors[p.btnType]};
  }

  > span.icon {
    width: 1rem;
    height: 1rem;
    display: grid;
    place-items: center;
    color: var(--tertiaryColor);
  }
`

export default Btn
