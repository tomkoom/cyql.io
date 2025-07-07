import { useNavlinks } from "@/hooks"
import { device } from "@/styles/breakpoints"
import { FC } from "react"
import styled from "styled-components"
import { NavItem, Tags } from "."

const Navlinks: FC = (): JSX.Element => {
  const { navlinks } = useNavlinks()

  return (
    <NavlinksStyled>
      <div className="navlinks">
        {navlinks.map((navlink) => (
          <NavItem key={navlink.label} label={navlink.label} pathname={navlink.pathname} icon={navlink.icon} route={navlink.route} />
        ))}
      </div>

      <div className="tags">
        <Tags />
      </div>
    </NavlinksStyled>
  )
}

const NavlinksStyled = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.7rem;
  margin: 1rem 0;
  padding: 0 2rem;

  @media ${device.laptop} {
    padding: 0 1rem;
  }

  > div.navlinks {
    width: 100%;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 2px;
  }

  > div.tags {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 0.25rem;
  }
`

export default Navlinks
