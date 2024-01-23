import React, { FC } from "react"
import styled from "styled-components"
import { device, size } from "@/styles/breakpoints"
import { useWindowSize } from "@/hooks/useWindowSize"
import { Desktop, Mobile } from "./_index"

const Nav: FC = (): JSX.Element => {
  const { width } = useWindowSize()

  return (
    <NavStyled>
      <Main>{width > size.laptop ? <Desktop /> : <Mobile />}</Main>
    </NavStyled>
  )
}

const NavStyled = styled.header`
  position: sticky;
  top: 0;
  z-index: 1;
`

const Main = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
  background-color: var(--background);
  height: 64px;
  padding: 0.5rem 2rem;

  @media ${device.laptop} {
    padding: 0.5rem 1rem;
  }
`

export default Nav
