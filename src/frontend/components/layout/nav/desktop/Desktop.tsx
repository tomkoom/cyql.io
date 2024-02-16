import React, { FC } from "react"
import styled from "styled-components"
import { device } from "@/styles/breakpoints"

// hooks
import { useNav } from "@/hooks/_index"
import { useAuth } from "@/context/Auth"

// components
import { ProfileBtn, SignInBtn, Socials } from "./_index"
import { Nft } from "../_index"
import { Logo, Price, Theme } from "@/components/ui/_index"

const Desktop: FC = (): JSX.Element => {
  const { toHome } = useNav()
  const { isAuthenticated, userId } = useAuth()

  return (
    <DesktopStyled>
      <Main>
        <div onClick={toHome}>
          <Logo />
        </div>
      </Main>

      <Controls>
        <Price />
        <Socials />
        <Theme />
        <Nft />
        {isAuthenticated ? <ProfileBtn /> : <SignInBtn />}
      </Controls>
    </DesktopStyled>
  )
}

const DesktopStyled = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;

  @media ${device.tablet} {
    flex-direction: column;
    justify-content: unset;
  }
`

const Main = styled.div`
  display: flex;
  align-items: center;
`

const Controls = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  flex-wrap: wrap;
`

export default Desktop
