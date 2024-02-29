import React, { FC } from "react"
import styled from "styled-components"
import { NavItem } from "./_index"
import { useNavigate, createSearchParams } from "react-router-dom"
import { iHashtag } from "@/components/icons/Icons"
import { verifyAdmin } from "@/utils/verifyAdmin"

// hooks
import { useAuth } from "@/context/Auth"
import { useNav } from "@/hooks/_index"

const Navlinks: FC = (): JSX.Element => {
  const navigate = useNavigate()
  const { userId } = useAuth()
  const { toHome, toProjects, toAdmin } = useNav()

  const toDapps = (): void => {
    navigate({
      pathname: "projects",
      search: `?${createSearchParams({
        category: "dApps",
        q: "",
      })}`,
    })
  }

  const toTokens = (): void => {
    navigate({
      pathname: "projects",
      search: `?${createSearchParams({
        category: "Tokens",
        q: "",
      })}`,
    })
  }

  const toNfts = (): void => {
    navigate({
      pathname: "projects",
      search: `?${createSearchParams({
        category: "NFTs",
        q: "",
      })}`,
    })
  }

  const toGames = (): void => {
    navigate({
      pathname: "projects",
      search: `?${createSearchParams({
        category: "Games",
        q: "",
      })}`,
    })
  }

  const toBtc = (): void => {
    navigate({
      pathname: "projects",
      search: `?${createSearchParams({
        category: "BTC",
        q: "",
      })}`,
    })
  }

  const toSocialNetworks = (): void => {
    navigate({
      pathname: "projects",
      search: `?${createSearchParams({
        category: "Social Networks",
        q: "",
      })}`,
    })
  }

  return (
    <NavlinksStyled>
      <NavItem label="Home" route={toHome} />
      <NavItem label="All Projects" route={toProjects} />
      <NavItem label="NFTs" route={toNfts} icon={iHashtag} />
      <NavItem label="dApps" route={toDapps} icon={iHashtag} />
      <NavItem label="Tokens" route={toTokens} icon={iHashtag} />
      <NavItem label="Games" route={toGames} icon={iHashtag} />
      <NavItem label="Social Networks" route={toSocialNetworks} icon={iHashtag} />
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
