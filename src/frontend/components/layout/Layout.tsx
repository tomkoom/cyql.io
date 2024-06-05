import React, { FC, useEffect } from "react"
import styled from "styled-components"
import "./Layout.css"
import { Outlet, useLocation } from "react-router-dom"
import { Footer, Nav, Navlinks, Summary, Cookie } from "./_index"
import { LoadingModal } from "@/modals/_index"
import { device } from "@/styles/breakpoints"
import { Toaster } from "react-hot-toast"
import { useProjects, useNav, useScrollLock, useUsers } from "@/hooks/_index"
import { useAuth } from "@/context/Auth"

// state
import { useAppSelector } from "@/hooks/useRedux"
import { selectIsLoading } from "@/state/loading"
import { selectSignInModalIsOpen } from "@/state/modals/signInModal"
import { selectHome } from "@/state/home/home"
import { selectTheme } from "@/state/theme"

const toasterStyle = {
  border: "none",
  padding: "0.7rem 1rem",
  fontSize: "var(--fsText)",
  color: "var(--primaryColor)",
  backgroundColor: "var(--underlay1)",
  borderRadius: "unset",
}

const Layout: FC = (): JSX.Element => {
  const location = useLocation()
  const { isAuthenticated, actor, users } = useAuth()
  const { refreshCategories, refreshNew, refreshHighligted, refreshMostUpvoted, refreshActiveNum } = useProjects()
  // const { refreshProposals } = useProposals()
  const { toHome } = useNav()
  const { lockScroll, unlockScroll } = useScrollLock()
  const { registerUser, listUsers } = useUsers()
  const theme = useAppSelector(selectTheme)
  const isLoading = useAppSelector(selectIsLoading)
  const isSignInModalOpen = useAppSelector(selectSignInModalIsOpen)
  const newProjects = useAppSelector(selectHome).new

  // refresh data
  const init = async (): Promise<void> => {
    try {
      const promises = [
        refreshActiveNum(),
        refreshCategories(),
        refreshNew(),
        refreshMostUpvoted(),
        refreshHighligted("Tokens"),
        refreshHighligted("dApps"),
        refreshHighligted("Social Networks"),
        refreshHighligted("Marketplace", 8),
        refreshHighligted("Games"),
        refreshHighligted("DeFi"),
        refreshHighligted("NFTs"),

        // users
        registerUser(),
        listUsers(),
      ]

      Promise.allSettled(promises)
    } catch (error) {
      throw new Error(error)
    }
  }

  useEffect(() => {
    if (!actor || !users) return
    init()
  }, [actor, users])

  // ...

  // redirect to home if user signed out
  useEffect(() => {
    if (!isAuthenticated && location.pathname === "/profile") {
      toHome()
    }
  }, [isAuthenticated])

  // lock scroll when modal is open
  useEffect(() => {
    if (isSignInModalOpen) {
      lockScroll()
    } else {
      unlockScroll()
    }
  }, [isSignInModalOpen])

  return (
    <LayoutStyled className={theme}>
      <Toaster
        position={"top-center"}
        toastOptions={{
          duration: 5000,
          style: toasterStyle,
        }}
      />
      <LoadingModal isOpen={isLoading} />

      {/* ... */}
      <Summary />
      <Nav />
      <Navlinks />

      <main className="main">
        <Outlet />
      </main>

      {newProjects.length > 0 && <Footer />}
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
