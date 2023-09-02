import React, { FC } from "react"
import styled from "styled-components"

// icons
import { iCube } from "@/components/icons/Icons"

// hooks
import useNav from "@/hooks/useNav"

// auth
import { useAuth } from "@/context/AuthContext"

// components
import { ProfileBtn, SignInBtn, Socials } from "./_index"
import { Nft } from "../_index"
import { Logo, Price, Theme } from "@/components/ui/_index"
import { LinkBtn } from "@/components/btns/_index"

// components
import { ApiModal } from "@/modals/_index"

// state
import { useAppSelector, useAppDispatch } from "@/hooks/useRedux"
import { selectApiModalIsOpen, setApiModalIsOpen } from "@/state/modals/apiModal"

const Desktop: FC = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const { toHome } = useNav()
  const { userKey } = useAuth()
  const apiModalIsOpen = useAppSelector(selectApiModalIsOpen)

  const openApiModal = () => {
    dispatch(setApiModalIsOpen(true))
  }

  return (
    <DesktopStyled>
      {/* modals */}
      <ApiModal isOpen={apiModalIsOpen} />

      <Main>
        <div onClick={toHome}>
          <Logo />
        </div>
      </Main>

      <Controls>
        <Price />
        <Socials />
        <Theme />
        <LinkBtn btnType="secondary" text="api" icon={iCube} url="https://docs.cyql.io/" />
        <Nft />
        {userKey === "" ? <SignInBtn /> : <ProfileBtn />}
      </Controls>
    </DesktopStyled>
  )
}

const DesktopStyled = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Main = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

const Controls = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`

export default Desktop
