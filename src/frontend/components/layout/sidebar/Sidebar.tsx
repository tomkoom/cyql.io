import React, { FC } from "react"
import styled from "styled-components"
import { device } from "@/styles/breakpoints"
import { iCircle, iCube, iInfinity, iCoins } from "@/components/icons/Icons"
import { verifyAdmin } from "@/utils/verifyAdmin"
import { useNavigate } from "react-router-dom"

// hooks
import { useAuth } from "@/context/Auth"
import useNav from "@/hooks/useNav"

// components
import { Navlink } from "./_index"

// state
import { useAppDispatch } from "@/hooks/useRedux"
import { setCategory } from "@/state/projects/category"

const Sidebar: FC = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const { userId } = useAuth()
  const navigate = useNavigate()
  const { toHome, toProjects, toSubmit, toAdmin } = useNav()

  const toTokens = () => {
    navigate(`/projects`)
    dispatch(setCategory("Tokens"))
  }

  return (
    <SidebarStyled>
      <div>
        <Navlink label="home" route={toHome} icon={iInfinity} />
        <Navlink label="projects" route={toProjects} icon={iCube} />
        <Navlink label="tokens" route={toTokens} icon={iCoins} />
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
