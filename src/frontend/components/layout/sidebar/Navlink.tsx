import React, { FC, ReactNode } from "react"
import styled from "styled-components"

interface NavlinkProps {
  label: string
  route: () => void
  icon: ReactNode
}

const Navlink: FC<NavlinkProps> = ({ label, route, icon }): JSX.Element => {
  const navigate = (): void => {
    route()
  }

  return (
    <NavlinkStyled onClick={navigate}>
      {icon && <Icon>{icon}</Icon>}
      <Label>{label}</Label>
    </NavlinkStyled>
  )
}

const NavlinkStyled = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  height: 3rem;
  padding: 0 0.5rem;
  margin: 0 -1rem;
  font-size: var(--fs5);
  font-weight: var(--fwMedium);
  border-radius: 1.5rem;
  cursor: pointer;

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

export default Navlink
