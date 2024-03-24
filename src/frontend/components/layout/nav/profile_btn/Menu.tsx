import React, { FC } from "react"
import styled from "styled-components"
import { iSignOut, iUser } from "@/components/icons/Icons"
import { useAuthenticate, useNav } from "@/hooks/_index"

interface MenuProps {
  isOpen: boolean
  setMenuIsOpen: (value: boolean) => void
}

const Menu: FC<MenuProps> = ({ isOpen, setMenuIsOpen }): JSX.Element => {
  const { toProfile } = useNav()
  const { signOut } = useAuthenticate()

  const navigate = (route: () => void): void => {
    route()
    setMenuIsOpen(false)
  }

  const logout = (): void => {
    signOut()
    setMenuIsOpen(false)
  }

  if (!isOpen) return null

  return (
    <MenuStyled>
      <div className="item" onClick={() => navigate(toProfile)}>
        <span className="icon">{iUser}</span>
        <span className="text">View Profile</span>
      </div>
      <Div />

      <div className="item" onClick={logout}>
        <span className="icon">{iSignOut}</span>
        <span className="text">Sign Out</span>
      </div>
    </MenuStyled>
  )
}

const MenuStyled = styled.div`
  position: absolute;
  top: 3rem;
  right: 0;
  background-color: var(--underlay1);

  > div.item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 1rem;
    cursor: pointer;
    transition: var(--transition1);

    &:hover {
      background-color: var(--underlay2);
    }

    > span.icon {
      width: 1rem;
      height: 1rem;
      display: grid;
      place-items: center;
      color: var(--tertiaryColor);
    }

    > span.text {
      white-space: nowrap;
    }
  }
`

const Div = styled.hr`
  border: 0;
  border-top: 1px solid var(--underlay2);
`

export default Menu
