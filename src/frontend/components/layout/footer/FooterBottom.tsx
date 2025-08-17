import { Logo } from "@/components/ui"
import { APP_NAME_TLD, AUTHOR_X_URL, FRONTEND_CANISTER_URL, IC_LOGO, IC_URL } from "@/constants/constants"
import { useNavigation, useNavlinks } from "@/hooks"
import { Link } from "react-router-dom"
import { Socials } from "./components"

export default function FooterBottom() {
  const { toHome } = useNavigation()
  const { navlinks, legalNavlinks } = useNavlinks()
  const year = new Date().getFullYear()

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <div>
        <Logo onClick={toHome} />
      </div>

      <div>
        <p className="text-coolgray-600 font-serif">Navigation</p>
        <ul className="flex flex-col items-start justify-start">
          {navlinks.map((navlink) => (
            <li key={navlink.label} className="text-coolgray-400 hover:text-accent-3 font-medium transition-colors">
              <Link to={navlink.pathname}>{navlink.label}</Link>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <p className="text-coolgray-600 font-serif">Legal</p>
        <ul className="flex flex-col items-start justify-start">
          {legalNavlinks.map((navlink) => (
            <li key={navlink.label} className="text-coolgray-400 hover:text-accent-3 font-medium transition-colors">
              <Link to={navlink.pathname}>{navlink.label}</Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col space-y-1">
        <p className="text-coolgray-400 flex items-center gap-2">
          Powered by{" "}
          <a className="hover:text-primary flex items-center gap-2 transition-colors" href={IC_URL} target="_blank" rel="noreferrer noopener">
            <img className="max-w-5" src={IC_LOGO} alt="Internet Computer logo" />
            Internet Computer
          </a>
        </p>
        <p className="text-coolgray-400">
          🛠️ Built by{" "}
          <a className="text-accent-3 hover:text-accent-3/80 font-bold transition-colors" href={AUTHOR_X_URL} target="_blank" rel="noreferrer noopener">
            @tmkm44
          </a>
        </p>
        <p className="text-coolgray-400">
          On-chain:{" "}
          <a className="hover:text-primary transition-colors" href={FRONTEND_CANISTER_URL} target="_blank" rel="noreferrer noopener">
            {FRONTEND_CANISTER_URL.replace("https://", "")}
          </a>
        </p>
        <p className="text-coolgray-600">
          &copy; 2023-{year.toString()} {APP_NAME_TLD}. All rights reserved.
        </p>
      </div>

      <Socials />
    </div>
  )
}
