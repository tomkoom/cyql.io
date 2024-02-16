import React, { FC } from "react"
import styled from "styled-components"
import { NavItem } from "./_index"
import { useNavigate } from "react-router-dom"
import { iHashtag } from "@/components/icons/Icons"
import { verifyAdmin } from "@/utils/verifyAdmin"

// hooks
import { useAuth } from "@/context/Auth"
import { useNav } from "@/hooks/_index"

// state
import { useAppDispatch } from "@/hooks/useRedux"
import { setCategory } from "@/state/projects/category"

const Navlinks: FC = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { userId } = useAuth()
  const { toHome, toProjects, toAdmin } = useNav()

  const toTokens = (): void => {
    navigate(`/projects`)
    dispatch(setCategory("Tokens"))
  }

  const toGames = (): void => {
    navigate(`/projects`)
    dispatch(setCategory("Games"))
  }

  const toBtc = (): void => {
    navigate(`/projects`)
    dispatch(setCategory("BTC"))
  }

  return (
    <NavlinksStyled>
      <NavItem label="Home" route={toHome} />
      <NavItem label="All Projects" route={toProjects} />
      <NavItem label="Tokens" route={toTokens} icon={iHashtag} />
      <NavItem label="Games" route={toGames} icon={iHashtag} />
      <NavItem label="BTC" route={toBtc} icon={iHashtag} />
      {verifyAdmin(userId) && <NavItem label="Admin" route={toAdmin} />}
    </NavlinksStyled>
  )
}

const NavlinksStyled = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.25rem;
  margin: 1rem 0;
  padding: 0 1rem;
`

export default Navlinks
