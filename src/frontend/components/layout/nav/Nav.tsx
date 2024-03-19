import React, { FC } from "react"
import styled from "styled-components"
import { device } from "@/styles/breakpoints"
import { Desktop } from "./_index"

const Nav: FC = (): JSX.Element => {
  return (
    <NavStyled>
      <Main>
        <Desktop />
      </Main>
    </NavStyled>
  )
}

const NavStyled = styled.div`
  /* position: sticky;
  top: 0;
  background-color: var(--background); */
`

const Main = styled.div`
  padding: 0.5rem 2rem;

  @media ${device.laptop} {
    padding: 0.5rem 1rem;
  }
`

export default Nav
