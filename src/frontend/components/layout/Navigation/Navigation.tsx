import { Icon } from "@/components/Icon"
import { DESKTOP_NAV_ITEM_CLASS, NAV_RESPONSIVE } from "@/components/layout/Navigation/components/ui"
import { Logo } from "@/components/ui"
import { useAuth } from "@/context/Auth"
import { useNavigation, useNavlinks } from "@/hooks"
import { Link } from "react-router-dom"
import { twMerge } from "tailwind-merge"
import { MobileNavigation, ProfileBtn, SignInBtn, Socials } from "./components"

export default function Navigation() {
  const { navlinks } = useNavlinks()
  const { toHome } = useNavigation()
  const { isAuthenticated } = useAuth()

  return (
    <div className="flex w-full items-center justify-between px-4 py-2 lg:px-8">
      <Logo onClick={toHome} />

      {/* Desktop nav */}
      <div className={twMerge("items-center justify-center gap-4", NAV_RESPONSIVE.desktopOnly)}>
        <div className="flex flex-wrap items-center justify-center gap-2">
          {navlinks.map((link) => (
            <Link
              key={link.pathname}
              to={link.pathname}
              className={twMerge(DESKTOP_NAV_ITEM_CLASS, link.isActive && "text-accent-3 shadow-[0_2px_0_0_theme(colors.accent.3)]")}
            >
              {link.icon && <Icon lucideName={link.icon} />}
              {link.label}
            </Link>
          ))}
        </div>
        <Socials />
        {isAuthenticated ? <ProfileBtn /> : <SignInBtn />}
      </div>

      <MobileNavigation />
    </div>
  )
}
