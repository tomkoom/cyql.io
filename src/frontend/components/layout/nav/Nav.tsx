import React, { FC } from "react"
import styled from "styled-components"
import { device } from "@/styles/breakpoints"

// hooks
import { useNav } from "@/hooks/_index"
import { useAuth } from "@/context/Auth"

// components
import { ProfileBtn, SignInBtn, Socials } from "./_index"
import { Nft } from "./_index"
import { Logo, Price, Theme } from "@/components/ui/_index"

const Nav: FC = (): JSX.Element => {
  const { toHome } = useNav()
  const { isAuthenticated } = useAuth()

  return (
    <NavStyled>
      <Logo onClick={toHome} />

      <Controls>
        <Price />
        <Socials />
        <Theme />
        <Nft />
        {isAuthenticated ? <ProfileBtn /> : <SignInBtn />}
      </Controls>
    </NavStyled>
  )
}

const NavStyled = styled.div`
  padding: 0.5rem 2rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;

  @media ${device.tablet} {
    flex-direction: column;
    justify-content: unset;
  }

  @media ${device.laptop} {
    padding: 0.5rem 1rem;
  }
`

const Controls = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.25rem;
`

export default Nav
