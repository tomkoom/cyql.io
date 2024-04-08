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
import { useNav, useScrollLock } from "@/hooks/_index"

// state
import { useAppSelector } from "@/hooks/useRedux"
import { selectTheme } from "@/state/theme"
import { selectAllProjects } from "@/state/projects"
import { selectIsLoading } from "@/state/loading"
import { selectSignInModalIsOpen } from "@/state/modals/signInModal"

const Layout: FC = (): JSX.Element => {
  const location = useLocation()
  const { isAuthenticated } = useAuth()
  const { toHome } = useNav()
  const { lockScroll, unlockScroll } = useScrollLock()
  const theme = useAppSelector(selectTheme)
  const projects = useAppSelector(selectAllProjects)
  const isLoading = useAppSelector(selectIsLoading)
  const signInModalIsOpen = useAppSelector(selectSignInModalIsOpen)

  // redirect to home if user signed out
  useEffect(() => {
    if (!isAuthenticated && location.pathname === "/profile") {
      toHome()
    }
  }, [isAuthenticated])

  // lock scroll when modal is open
  useEffect(() => {
    if (signInModalIsOpen) {
      lockScroll()
    } else {
      unlockScroll()
    }
  }, [signInModalIsOpen])

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
    margin: 2rem auto;
    width: 100%;

    /* footer at the bottom */
    flex-grow: 1;

    @media ${device.laptop} {
      padding: 1rem;
    }
  }
`

export default Layout
