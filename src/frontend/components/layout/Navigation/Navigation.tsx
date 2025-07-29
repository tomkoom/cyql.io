import { Icon } from "@/components/Icon"
import { Logo } from "@/components/ui"
import { useAuth } from "@/context/Auth"
import { useNavigation, useNavlinks } from "@/hooks"
import { Link } from "react-router-dom"
import { twMerge } from "tailwind-merge"
import { ProfileBtn, SignInBtn, Socials } from "./components"

export default function Navigation() {
  const { navlinks } = useNavlinks()
  const { toHome } = useNavigation()
  const { isAuthenticated } = useAuth()

  return (
    <div className="flex w-full flex-wrap items-center justify-between px-4 py-2 lg:px-8">
      <Logo onClick={toHome} />
      <div className="flex flex-wrap items-center justify-center gap-4">
        <div className="flex flex-wrap items-center justify-center gap-3">
          {navlinks.map((link) => (
            <Link
              key={link.pathname}
              to={link.pathname}
              className={twMerge(
                "hover:text-accent-3 text-coolgray-200 relative flex items-center gap-1 px-1 py-1 font-semibold transition-all duration-200 ease-in-out",
                link.isActive && "text-accent-3 shadow-[0_2px_0_0_theme(colors.accent.3)]"
              )}
            >
              {link.icon && <Icon lucideName={link.icon} />}
              {link.label}
            </Link>
          ))}
        </div>
        <Socials />
        {isAuthenticated ? <ProfileBtn /> : <SignInBtn />}
      </div>
    </div>
  )
}
