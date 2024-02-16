import React, { FC, ReactNode } from "react"
import styled from "styled-components"

interface NavItemProps {
  label: string
  route: () => void
  icon?: ReactNode
}

const NavItem: FC<NavItemProps> = ({ label, route, icon }): JSX.Element => {
  return (
    <NavItemStyled onClick={route}>
      {icon && <span className="icon">{icon}</span>}
      <span className="label">{label}</span>
    </NavItemStyled>
  )
}

const NavItemStyled = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  height: 2.75rem;
  padding: 0 1rem;
  font-size: var(--fs6);
  font-weight: var(--fwMedium);
  background-color: var(--underlay1);
  border-radius: 1.375rem;
  cursor: pointer;
  transition: var(--transition1);

  &:hover {
    background-color: var(--underlay2);
  }
  > span.icon {
    color: var(--highlight3);
  }

  > span.label {
    white-space: nowrap;
  }
`

export default NavItem
