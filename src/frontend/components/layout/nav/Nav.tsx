import { Logo } from "@/components/ui/_index"
import { useAuth } from "@/context/Auth"
import { useNav } from "@/hooks"
import { ProfileBtn, SignInBtn, Socials } from "./components"
import { useNavlinks } from "@/hooks"
import { Link } from "react-router-dom"
import { twMerge } from "tailwind-merge"

export default function Nav() {
  const { navlinks } = useNavlinks()
  const { toHome } = useNav()
  const { isAuthenticated } = useAuth()

  return (
    <div className="px-4 w-full flex items-center justify-between flex-wrap lg:px-8">
      <Logo onClick={toHome} />
      <div className="flex items-center justify-center flex-wrap gap-4">
        <div className="flex items-center justify-center flex-wrap gap-4">
          {navlinks.map((link) => (
            <Link
              key={link.pathname}
              to={link.pathname}
              className={twMerge(
                "text-xl relative py-2 px-3 transition-all duration-300 ease-in-out",
                "hover:text-accent-1",
                link.isActive ? "text-accent-1 shadow-[0_2px_0_0_theme(colors.accent.1)]" : "text-white hover:shadow-[0_1px_0_0_theme(colors.accent.1/50)]"
              )}
            >
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
