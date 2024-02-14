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
      {icon && <Icon>{icon}</Icon>}
      <Label>{label}</Label>
    </NavItemStyled>
  )
}

const NavItemStyled = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  height: 2.75rem;
  padding: 0 1rem;
  font-size: 1.1rem;
  font-weight: var(--fwMedium);
  border-radius: 1.375rem;
  cursor: pointer;
  transition: var(--transition1);

  &:hover {
    background-color: var(--underlay1);
  }
`

const Label = styled.span`
  white-space: nowrap;
`

const Icon = styled.span`
  width: 2rem;
  height: 2rem;
  display: grid;
  place-items: center;
  color: var(--highlight3);
`

export default NavItem
