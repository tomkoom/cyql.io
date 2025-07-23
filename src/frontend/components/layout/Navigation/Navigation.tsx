import { Logo } from "@/components/ui"
import { useAuth } from "@/context/Auth"
import { useNav, useNavlinks } from "@/hooks"
import { useState } from "react"
import { Link } from "react-router-dom"
import { twMerge } from "tailwind-merge"
import { ProfileBtn, Promote, SignInBtn, Socials } from "./components"

export default function Navigation() {
  const { navlinks } = useNavlinks()
  const { toHome } = useNav()
  const { isAuthenticated } = useAuth()
  const [dialogOpen, setDialogOpen] = useState(false)

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
                "hover:text-accent-3 text-coolgray-200 relative px-1 py-1 font-semibold transition-all duration-200 ease-in-out",
                link.isActive && "text-accent-3 shadow-[0_2px_0_0_theme(colors.accent.3)]"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>
        <Promote dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} />
        <Socials />
        {isAuthenticated ? <ProfileBtn /> : <SignInBtn />}
      </div>
    </div>
  )
}
