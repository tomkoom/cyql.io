import React, { FC } from "react"
import styled from "styled-components"
import { device } from "@/styles/breakpoints"
import { useNav } from "@/hooks/_index"
import { useNavlinks } from "@/hooks/_index"

// components
import { Logo } from "@/components/ui/_index"
import { Meta, NavLink, Socials } from "./_index"

const FooterLower: FC = (): JSX.Element => {
  const { toHome } = useNav()
  const { navlinks } = useNavlinks()

  return (
    <FooterLowerStyled>
      <div>
        <Logo onClick={toHome} />
      </div>

      <ul className="nav">
        {navlinks.map((navlink) => (
          <NavLink key={navlink.label} label={navlink.label} route={navlink.route} />
        ))}
      </ul>
      <Socials />
      <Meta />
    </FooterLowerStyled>
  )
}

const FooterLowerStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(24rem, 1fr));
  gap: 1.5rem;

  > ul.nav {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
  }

  @media ${device.mobileL} {
    grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
  }
`

export default FooterLower
