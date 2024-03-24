import React, { FC, ReactNode, ButtonHTMLAttributes } from "react"
import styled from "styled-components"

interface BtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  btnType: "primary" | "secondary" | "accept" | "reject"
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
  primary: "#fff",
  secondary: "var(--primaryColor)",
  accept: "#fff",
  reject: "#fff",
}

const bgColors = {
  primary: "var(--highlight1)",
  secondary: "var(--underlay1)",
  accept: "var(--colorAccept1)",
  reject: "var(--colorReject1)",
}

const hoverBgColors = {
  primary: "var(--highlight2)",
  secondary: "var(--underlay2)",
  accept: "var(--colorAccept2)",
  reject: "var(--colorReject2)",
}

const BtnStyled = styled.button<{ btnType: "primary" | "secondary" | "accept" | "reject" }>`
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
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
    opacity: 0.6;
  }
`

export default Btn
