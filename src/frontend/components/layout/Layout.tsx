import React, { FC, useEffect } from "react"
import styled from "styled-components"
import "./Layout.css"
import { Outlet, useLocation } from "react-router-dom"
import { Footer, Nav, Navlinks, Summary, Cookie } from "./_index"
import { LoadingModal } from "@/modals/_index"
import { device } from "@/styles/breakpoints"
import { Toaster } from "react-hot-toast"

// hooks
import { useAuth } from "@/context/Auth"
import { useNav } from "@/hooks/_index"

// state
import { useAppSelector } from "@/hooks/useRedux"
import { selectTheme } from "@/state/theme"
import { selectAllProjects } from "@/state/projects"
import { selectIsLoading } from "@/state/loading"

const Layout: FC = (): JSX.Element => {
  const location = useLocation()
  const { isAuthenticated } = useAuth()
  const { toHome } = useNav()
  const theme = useAppSelector(selectTheme)
  const projects = useAppSelector(selectAllProjects)
  const isLoading = useAppSelector(selectIsLoading)

  // redirect to home if user signed out
  useEffect(() => {
    if (!isAuthenticated && location.pathname === "/profile") {
      toHome()
    }
  }, [isAuthenticated])

  return (
    <LayoutStyled className={theme}>
      <Toaster position={"top-center"} toastOptions={{ duration: 5000 }} />
      <LoadingModal isOpen={isLoading} />

      {/* ... */}
      <Summary />
      <Nav />
      <Navlinks />

      <main className="main">
        <Outlet />
      </main>

      {projects.length > 0 && <Footer />}
      <Cookie />
    </LayoutStyled>
  )
}

const LayoutStyled = styled.div`
  color: var(--primaryColor);
  background-color: var(--background);

  /* footer at the bottom */
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  > main.main {
    padding: 0 2rem;
    max-width: calc(2048px + 4rem);
    margin: 0 auto;
    width: 100%;

    /* footer at the bottom */
    flex-grow: 1;

    @media ${device.laptop} {
      padding: 1rem;
    }
  }
`

export default Layout
