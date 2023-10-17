import React, { FC } from "react"
import styled from "styled-components"

// icons
import { iSignOut } from "@/components/icons/Icons"

// utils
import { formatId } from "@/utils/format"

// hooks
import { useAuth } from "@/context/Auth"
import useNav from "@/hooks/useNav"
import { useSignOut } from "@/hooks/useSignOut"

// components
import { IdImg } from "@/components/ui/_index"

interface MenuProps {
  setMenuIsOpen: (value: boolean) => void
}

const Menu: FC<MenuProps> = ({ setMenuIsOpen }): JSX.Element => {
  const { toProfile } = useNav()
  const { userId } = useAuth()
  const { signOut } = useSignOut()

  const navigate = (route: () => void): void => {
    route()
    setMenuIsOpen(false)
  }

  const logout = (): void => {
    signOut()
    setMenuIsOpen(false)
  }

  return (
    <MenuStyled>
      <div className="item" onClick={() => navigate(toProfile)}>
        <span className="icon">
          <IdImg sizePx="36" />
        </span>

        <div>
          <span className="text">{formatId(userId)}</span>
          <br />
          <span className="text">view profile</span>
        </div>
      </div>

      <Div />
      <div className="item" onClick={logout}>
        <span className="icon">{iSignOut}</span>
        <span className="text">sign out</span>
      </div>
    </MenuStyled>
  )
}

const MenuStyled = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  padding: 1rem;
  background-color: var(--underlay1);
  border-radius: 1rem;

  > div.item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.25rem 0;
    cursor: pointer;

    > span.icon {
      width: 2.5rem;
      height: 2.5rem;
      display: grid;
      place-items: center;
      border-radius: 50%;
    }

    > span.text,
    * span.text {
      white-space: nowrap;
    }
  }
`

const Div = styled.hr`
  margin: 1rem 0;
  border: 0;
  border-top: 1px solid var(--underlay2);
`

export default Menu
