import React, { FC } from "react"
import styled from "styled-components"
import { device } from "@/styles/breakpoints"
import { useNav } from "@/hooks/_index"

// components
import { Logo } from "@/components/ui/_index"
import { Meta, NavLink, Socials } from "./_index"

const FooterMid: FC = (): JSX.Element => {
  const { toHome, toProjects, toSubmit } = useNav()

  return (
    <FooterMidStyled>
      <div className="logo" onClick={toHome}>
        <Logo />
      </div>

      <div className="nav">
        <NavLink label="projects" to={toProjects} />
        <NavLink label="submit" to={toSubmit} />
      </div>
      <Socials />
      <Meta />
    </FooterMidStyled>
  )
}

const FooterMidStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(24rem, 1fr));
  gap: 1.5rem;

  > div.logo {
    cursor: pointer;
  }

  > div.nav {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
  }

  @media ${device.mobileL} {
    grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
  }
`

export default FooterMid
