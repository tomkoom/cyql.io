import React, { FC, ReactNode, AnchorHTMLAttributes } from "react"
import styled from "styled-components"

interface LinkBtnProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  btnType: "primary" | "secondary"
  text: string
  icon?: ReactNode
  url: string
}

const LinkBtn: FC<LinkBtnProps> = ({ btnType, text, icon, url, ...props }): JSX.Element => {
  return (
    <LinkBtnStyled
      btnType={btnType}
      href={url}
      target="_blank"
      rel="noreferrer noopener"
      {...props}
    >
      {icon !== undefined && <span>{icon}</span>}
      <span>{text}</span>
    </LinkBtnStyled>
  )
}

const colors = {
  primary: "#fff",
  secondary: "var(--primaryColor)",
}

const bgColors = {
  primary: "var(--highlight1)",
  secondary: "var(--underlay1)",
}

const hoverBgColors = {
  primary: "var(--highlight2)",
  secondary: "var(--underlay2)",
}

const LinkBtnStyled = styled.a<{ btnType: "primary" | "secondary" }>`
  /* common */
  height: 2.75rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0 0.75rem;
  font-size: var(--fsText);
  font-weight: var(--fwBold);
  transition: var(--transition1);

  /* custom */
  color: ${(p) => colors[p.btnType]};
  background-color: ${(p) => bgColors[p.btnType]};

  &:hover {
    background-color: ${(p) => hoverBgColors[p.btnType]};
  }
`

export default LinkBtn
