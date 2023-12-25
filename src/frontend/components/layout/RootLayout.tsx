import React, { FC, useEffect } from "react"
import "./RootLayout.css"
import CookieConsent from "react-cookie-consent"
import { COOKIE_POLICY } from "@/constants/constants"
import { Outlet, useLocation } from "react-router-dom"

// hooks
import { useAuth } from "@/context/Auth"
import useNav from "@/hooks/useNav"

// components
import { Footer, Nav, Sidebar, Summary } from "./_index"

// state
import { useAppSelector } from "@/hooks/useRedux"
import { selectTheme } from "@/state/ui/theme"
import { selectAllProjects } from "@/state/projects"

const RootLayout: FC = (): JSX.Element => {
  const location = useLocation()
  const { toHome } = useNav()
  const { isAuthenticated } = useAuth()
  const theme = useAppSelector(selectTheme)
  const projects = useAppSelector(selectAllProjects)

  // redirect to home if user signed out
  useEffect(() => {
    if (!isAuthenticated && location.pathname === "/profile") {
      toHome()
    }
  }, [isAuthenticated])

  return (
    <div className={`app ${theme}`}>
      <Summary />
      <Nav />

      <div className="content">
        <Sidebar />

        <div className="main">
          <Outlet />
        </div>
      </div>

      {projects.length > 0 && <Footer />}

      {/* cookies */}
      <CookieConsent
        cookieName="cookie"
        disableStyles={true}
        buttonText="Ok"
        containerClasses="cookie"
        contentClasses="cookie__content"
        buttonClasses="cookie__btn"
        expires={90}
      >
        this site uses 🍪 to enhance ux,{" "}
        <a className="cookie__link" href={COOKIE_POLICY} rel="noreferrer noopener" target="_blank">
          learn more
        </a>
      </CookieConsent>
    </div>
  )
}

export default RootLayout
