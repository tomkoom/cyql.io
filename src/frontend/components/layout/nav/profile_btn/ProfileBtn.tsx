import React, { FC, useState, useEffect, useRef } from "react"
import styled from "styled-components"
import { iAngleDown } from "@/components/icons/Icons"
import { formatId } from "@/utils/format"
import { useAuth } from "@/context/Auth"

// components
import { Menu } from "./_index"
import { Btn } from "@/components/btns/_index"

const ProfileBtn: FC = (): JSX.Element => {
  const { userId } = useAuth()
  const [menuIsOpen, setMenuIsOpen] = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    const closeMenu = (e): void => {
      if (menuRef.current) {
        if (!menuRef.current.contains(e.target)) {
          setMenuIsOpen(false)
        }
      } else {
        return
      }
    }

    document.body.addEventListener("click", closeMenu)
    return () => document.body.removeEventListener("click", closeMenu)
  }, [])

  return (
    <ProfileBtnStyled ref={menuRef}>
      <Btn
        btnType={"secondary"}
        text={formatId(userId)}
        icon={iAngleDown}
        onClick={() => setMenuIsOpen((prev) => !prev)}
      />

      <Menu isOpen={menuIsOpen} setMenuIsOpen={setMenuIsOpen} />
    </ProfileBtnStyled>
  )
}

const ProfileBtnStyled = styled.div`
  position: relative;

  > button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: var(--fwBold);
    cursor: pointer;
  }
`

export default ProfileBtn
