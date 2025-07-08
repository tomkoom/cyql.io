import { Logo } from "@/components/ui/_index"
import { useAuth } from "@/context/Auth"
import { useNav, useNavlinks } from "@/hooks"
import { useState } from "react"
import { Link } from "react-router-dom"
import { twMerge } from "tailwind-merge"
import { ProfileBtn, Promote, SignInBtn, Socials } from "./components"

export default function Nav() {
  const { navlinks } = useNavlinks()
  const { toHome } = useNav()
  const { isAuthenticated } = useAuth()
  const [dialogOpen, setDialogOpen] = useState(false)

  return (
    <div className="flex w-full flex-wrap items-center justify-between px-4 lg:px-8">
      <Logo onClick={toHome} />
      <div className="flex flex-wrap items-center justify-center gap-4">
        <div className="flex flex-wrap items-center justify-center gap-4">
          {navlinks.map((link) => (
            <Link
              key={link.pathname}
              to={link.pathname}
              className={twMerge(
                "relative px-3 py-2 text-xl transition-all duration-300 ease-in-out",
                "hover:text-accent-1",
                link.isActive ? "text-accent-1 shadow-[0_2px_0_0_theme(colors.accent.1)]" : "hover:shadow-[0_1px_0_0_theme(colors.accent.1/50)] text-white"
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
