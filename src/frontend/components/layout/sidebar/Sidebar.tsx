import React, { FC } from "react"
import styled from "styled-components"
import { device } from "@/styles/breakpoints"
import { iCircle, iCube, iInfinity } from "@/components/icons/Icons"
import { verifyAdmin } from "@/utils/verifyAdmin"

// hooks
import { useAuth } from "@/context/Auth"
import useNav from "@/hooks/useNav"

// components
import { Navlink } from "./_index"

const Sidebar: FC = (): JSX.Element => {
  const { userId } = useAuth()
  const { toHome, toProjects, toSubmit, toAdmin } = useNav()

  return (
    <SidebarStyled>
      <div>
        <Navlink label="explore" route={toHome} icon={iInfinity} />
        <Navlink label="projects" route={toProjects} icon={iCube} />
        {/* <Navlink label="submit" route={toSubmit} icon={iPlus} /> */}
        {verifyAdmin(userId) && <Navlink label="admin" route={toAdmin} icon={iCircle} />}
      </div>
    </SidebarStyled>
  )
}

const SidebarStyled = styled.div`
  position: sticky;
  top: 64px;
  bottom: 0;
  height: 0;
  max-width: 140px;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media ${device.laptop} {
    display: none;
  }
`

export default Sidebar
