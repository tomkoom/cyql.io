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
  const { toHome, toProjects, toSubmit, toAdmin } = useNav()

  const toTokens = () => {
    navigate(`/projects`)
    dispatch(setCategory("Tokens"))
  }
  return (
    <NavlinksStyled>
      <NavItem label="Home" route={toHome} />
      <NavItem label="All Projects" route={toProjects} />
      <NavItem label="Tokens" route={toTokens} icon={iHashtag} />
      {/* <Navlink label="BTC" route={toBtc} icon={iHashtag} /> */}
      {/* <Navlink label="submit" route={toSubmit} icon={iPlus} /> */}
      {verifyAdmin(userId) && <NavItem label="Admin" route={toAdmin} />}
    </NavlinksStyled>
  )
}

const NavlinksStyled = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 1rem;
  padding: 0 1rem;
`

export default Navlinks
