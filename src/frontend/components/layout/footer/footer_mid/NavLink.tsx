import React, { FC } from "react"
import styled from "styled-components"

interface NavLinkProps {
  label: string
  route: () => void
}

const NavLink: FC<NavLinkProps> = ({ label, route }): JSX.Element => {
  return <NavLinkStyled onClick={route}>{label}</NavLinkStyled>
}

const NavLinkStyled = styled.li`
  font-size: var(--fs5);
  font-weight: var(--fwBold);
  color: var(--secondaryColor);
  padding: 0.25rem 0;
  cursor: pointer;
  transition: var(--transition1);

  &:hover {
    color: var(--primaryColor);
  }
`

export default NavLink
