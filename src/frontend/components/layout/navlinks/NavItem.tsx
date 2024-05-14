import React, { FC, ReactNode } from "react"
import styled from "styled-components"
import { getCategoryNum } from "@/utils/getCategoryNum"
import { useLocation } from "react-router-dom"

// state
import { useAppSelector } from "@/hooks/useRedux"
import { selectActiveCuratedProjects } from "@/state/curatedProjects"

interface NavItemProps {
  label: string
  route: () => void
  pathname: string
  icon?: ReactNode
}

const NavItem: FC<NavItemProps> = ({ label, pathname, icon, route }): JSX.Element => {
  const projects = useAppSelector(selectActiveCuratedProjects)
  const locationPathname = useLocation().pathname

  return (
    <NavItemStyled
      onClick={route}
      className={locationPathname.toLowerCase() === pathname ? "active" : null}
    >
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
  justify-content: center;
  gap: 0.25rem;
  height: 3rem;
  padding: 0 0.75rem;
  font-size: var(--fsText);
  font-weight: var(--fwMedium);
  background-color: var(--underlay1);
  cursor: pointer;
  transition: var(--transition1);
  flex: 1;

  &.active {
    background-color: var(--highlight1);
  }

  &:hover:not(.active) {
    background-color: var(--underlay3);
  }

  > span.label {
    white-space: nowrap;

    > span.num {
      color: var(--tertiaryColor);
    }
  }
`

export default NavItem
