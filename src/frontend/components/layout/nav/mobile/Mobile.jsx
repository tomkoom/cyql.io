import React from "react"
import css from "./Mobile.module.css"

// hooks
import useNav from "@/hooks/useNav"

// components
import { Logo, Theme } from "@/components/ui/_index"
import { Menu, MenuBtn } from "./index"
import { Nft } from "../_index"
import { Socials } from "../desktop/_index"

// state
import { useAppSelector } from "@/hooks/useRedux"
import { selectMobileMenuModal } from "@/state/modals/modals"

const Mobile = () => {
  const { toHome } = useNav()
  const mobileMenu = useAppSelector(selectMobileMenuModal)

  return (
    <div className={css.mobile}>
      <MenuBtn />

      <div onClick={toHome}>
        <Logo />
      </div>

      <div className={css.controls}>
        <Socials />
        <div className={css.hide}>
          <Theme />
          <Nft />
        </div>
      </div>

      {/* modal */}
      {mobileMenu && <Menu />}
    </div>
  )
}

export default Mobile
