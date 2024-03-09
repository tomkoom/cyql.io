import React, { FC } from "react"
import styled from "styled-components"
import { NavItem, Tags } from "./_index"
import { verifyAdmin } from "@/utils/verifyAdmin"
import { iPlus } from "@/components/icons/Icons"

// hooks
import { useAuth } from "@/context/Auth"
import { useNav } from "@/hooks/_index"

const Navlinks: FC = (): JSX.Element => {
  const { userId } = useAuth()
  const { toHome, toProjects, toSubmit, toAdmin } = useNav()

  return (
    <NavlinksStyled>
      <div>
        <NavItem label="Home" route={toHome} />
        <NavItem label="All Projects" route={toProjects} />
        <NavItem label="List Project" route={toSubmit} icon={iPlus} />
        {verifyAdmin(userId) && <NavItem label="Admin" route={toAdmin} />}
      </div>

      <div>
        <Tags />
      </div>
    </NavlinksStyled>
  )
}

const NavlinksStyled = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  margin: 1rem 0;
  padding: 0 1rem;

  > div {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 0.25rem;
  }
`

export default Navlinks
