import React, { FC } from "react"
import styled from "styled-components"
import { NavItem, Tags } from "./_index"
import { verifyAdmin } from "@/utils/verifyAdmin"
import { useNavlinks } from "@/hooks/_index"

// hooks
import { useAuth } from "@/context/Auth"
import { useNav } from "@/hooks/_index"

const Navlinks: FC = (): JSX.Element => {
  const { userId } = useAuth()
  const { toAdmin } = useNav()
  const { navlinks } = useNavlinks()

  return (
    <NavlinksStyled>
      <div className="navlinks">
        {navlinks.map((navlink) => (
          <NavItem
            key={navlink.label}
            label={navlink.label}
            pathname={navlink.pathname}
            icon={navlink.icon}
            route={navlink.route}
          />
        ))}

        {verifyAdmin(userId) && (
          <NavItem label="Admin" pathname={"/admin"} icon={undefined} route={toAdmin} />
        )}
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
