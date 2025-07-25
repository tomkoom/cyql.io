import { Logo } from "@/components/ui"
import { useNavigation, useNavlinks } from "@/hooks"
import { device } from "@/styles/breakpoints"
import styled from "styled-components"
import { Meta, NavLink, Socials } from "."

export default function FooterBottom() {
  const { toHome } = useNavigation()
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
