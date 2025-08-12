import { Icon } from "@/components/Icon"
import CrossIcon from "@/components/icons/CrossIcon"
import { MOBILE_DRAWER_CLASSES, MOBILE_MENU_ITEM_CLASS, NAV_RESPONSIVE } from "@/components/layout/Navigation/components/ui"
import { useAuth } from "@/context/Auth"
import { useNavlinks } from "@/hooks"
import { useAppSelector } from "@/hooks/useRedux"
import { useScrollLock } from "@/hooks/useScrollLock"
import { selectSignInModalIsOpen } from "@/state/modals/signInModal"
import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { twMerge } from "tailwind-merge"
import ProfileBtn from "./ProfileBtn"
import SignInBtn from "./SignInBtn"
import Socials from "./Socials"

export default function MobileNavigation() {
  const { navlinks } = useNavlinks()
  const { isAuthenticated } = useAuth()
  const { lockScroll, unlockScroll } = useScrollLock()
  const signInModalIsOpen = useAppSelector(selectSignInModalIsOpen)
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)

  // Lock scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) lockScroll()
    else unlockScroll()
    return () => unlockScroll()
  }, [mobileOpen, lockScroll, unlockScroll])

  // Close on route change
  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  // Close when sign-in modal opens
  useEffect(() => {
    if (signInModalIsOpen) setMobileOpen(false)
  }, [signInModalIsOpen])

  return (
    <>
      {/* Mobile hamburger */}
      <button
        aria-label="Open menu"
        aria-expanded={mobileOpen}
        aria-controls="mobile-menu"
        className={twMerge(
          "border-coolgray-900 bg-coolgray-950/60 inline-flex h-10 w-10 items-center justify-center rounded-md border text-white",
          NAV_RESPONSIVE.mobileOnly
        )}
        onClick={() => setMobileOpen((v) => !v)}
      >
        <Icon lucideName={mobileOpen ? "X" : "Menu"} />
      </button>

      {/* Mobile overlay menu */}
      {mobileOpen && (
        <div id="mobile-menu" className={twMerge("fixed inset-0 z-50", NAV_RESPONSIVE.mobileOnly)}>
          <div className={MOBILE_DRAWER_CLASSES.backdrop} onClick={() => setMobileOpen(false)} />
          <div className={MOBILE_DRAWER_CLASSES.panel}>
            <div className="mb-3 flex items-center justify-between">
              <span className="text-coolgray-400 text-xs">Menu</span>
              <CrossIcon onClick={() => setMobileOpen(false)} />
            </div>

            <nav className="mb-3 grid">
              {navlinks.map((link) => (
                <Link
                  key={link.pathname}
                  to={link.pathname}
                  className={twMerge(MOBILE_MENU_ITEM_CLASS, link.isActive && "bg-coolgray-950/60 text-accent-3")}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.icon && <Icon lucideName={link.icon} />}
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="mb-3 flex items-center gap-2">
              <Socials />
            </div>

            <div className="flex items-center">{isAuthenticated ? <ProfileBtn /> : <SignInBtn />}</div>
          </div>
        </div>
      )}
    </>
  )
}
