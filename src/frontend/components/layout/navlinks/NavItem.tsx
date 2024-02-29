import React, { FC, ReactNode } from "react"
import styled from "styled-components"
import { getCategoryNum } from "@/utils/getCategoryNum"

// state
import { useAppSelector } from "@/hooks/useRedux"
import { selectActiveProjects } from "@/state/projects"

interface NavItemProps {
  label: string
  route: () => void
  icon?: ReactNode
}

const NavItem: FC<NavItemProps> = ({ label, route, icon }): JSX.Element => {
  const projects = useAppSelector(selectActiveProjects)

  return (
    <NavItemStyled onClick={route}>
      {icon && <span className="icon">{icon}</span>}
      <span className="label">
        {label} <span className="num">{getCategoryNum(projects, label) || ""}</span>
      </span>
    </NavItemStyled>
  )
}

const NavItemStyled = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  height: 2.75rem;
  padding: 0 0.75rem;
  font-size: var(--fsText);
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

    > span.num {
      color: var(--tertiaryColor);
    }
  }
`

export default NavItem
