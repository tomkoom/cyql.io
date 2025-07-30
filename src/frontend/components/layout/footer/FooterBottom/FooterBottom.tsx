import { Logo } from "@/components/ui"
import { APP_NAME_TLD, AUTHOR_X_URL, FRONTEND_CANISTER_URL, IC_LOGO, IC_URL } from "@/constants/constants"
import { useNavigation, useNavlinks } from "@/hooks"
import { device } from "@/styles/breakpoints"
import styled from "styled-components"
import { NavLink, Socials } from "."

export default function FooterBottom() {
  const { toHome } = useNavigation()
  const { navlinks } = useNavlinks()
  const year = new Date().getFullYear()

  return (
    <FooterLowerStyled>
      <div>
        <Logo onClick={toHome} />
      </div>

      <ul className="nav">
        {navlinks.map((navlink) => (
          <NavLink key={navlink.label} label={navlink.label} route={navlink.route} />
        ))}
      </ul>
      <Socials />

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
    </FooterLowerStyled>
  )
}

const FooterLowerStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(24rem, 1fr));
  gap: 1.5rem;

  > ul.nav {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
  }

  @media ${device.mobileL} {
    grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
  }
`
