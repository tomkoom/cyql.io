import React, { useState, useEffect, useRef } from "react"
import styled from "styled-components"

// icons
import { iAngleDown } from "@/components/icons/Icons"

// utils
import { formatId } from "@/utils/format"

// hooks
import { useAuth } from "@/context/Auth"

// components
import { Menu } from "./_index"
import { IdImg } from "@/components/ui/_index"

const ProfileBtn = () => {
  const { userId } = useAuth()
  const [menuIsOpen, setMenuIsOpen] = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    const closeMenu = (e) => {
      if (menuRef.current) {
        if (!menuRef.current.contains(e.target)) {
          setMenuIsOpen(false)
        }
      } else {
        return
      }
    }

    document.body.addEventListener("click", closeMenu)
    return () => {
      document.body.removeEventListener("click", closeMenu)
    } // remove eventlistener on component unmount
  }, [])

  return (
    <ProfileBtnStyled ref={menuRef}>
      <button onClick={() => setMenuIsOpen((prevState) => !prevState)}>
        <IdImg sizePx="36" />
        <span>{formatId(userId)}</span>
        <span>{iAngleDown}</span>
      </button>

      {menuIsOpen && <Menu setMenuIsOpen={setMenuIsOpen} />}
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
