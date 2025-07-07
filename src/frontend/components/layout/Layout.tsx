import { useAuth } from "@/context/Auth"
import { useNav, useProjects, useScrollLock, useUsers } from "@/hooks"
import { useAppSelector } from "@/hooks/useRedux"
import { LoadingModal, SignInModal } from "@/modals/_index"
import { selectHome } from "@/state/home/home"
import { selectIsLoading } from "@/state/loading"
import { selectSignInModalIsOpen } from "@/state/modals/signInModal"
import { selectTheme } from "@/state/theme"
import { device } from "@/styles/breakpoints"
import { FC, useEffect } from "react"
import { Toaster } from "react-hot-toast"
import { Outlet, useLocation } from "react-router-dom"
import styled from "styled-components"
import { Cookie, Footer, Nav, Summary } from "."
import "./Layout.css"

const toasterStyle = {
  border: "none",
  padding: "0.7rem 1rem",
  fontSize: "var(--fsText)",
  color: "var(--primaryColor)",
  backgroundColor: "var(--underlay1)",
  borderRadius: "unset",
}

const Layout: FC = (): JSX.Element => {
  const pathname = useLocation().pathname
  const { isAuthenticated, actor, users } = useAuth()
  const { refreshCategories, refreshNew, refreshHighligted, refreshMostUpvoted, refreshActiveNum } = useProjects()
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
    if (!isAuthenticated && pathname === "/profile") {
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
          duration: 4_000,
          style: toasterStyle,
        }}
      />
      <LoadingModal isOpen={isLoading} />
      <SignInModal isOpen={isSignInModalOpen} />

      {/* ... */}
      <Summary />
      <Nav />
      {/* <Navlinks /> */}

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
