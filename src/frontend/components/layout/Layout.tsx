import { useAuth } from "@/context/Auth"
import { useNavigation, useScrollLock, useUsers } from "@/hooks"
import { useHomeQuery } from "@/hooks/queries/useHomeQuery"
import { useAppSelector } from "@/hooks/useRedux"
import { LoadingModal, SignInModal } from "@/modals"
import { selectIsLoading } from "@/state/loading"
import { selectSignInModalIsOpen } from "@/state/modals/signInModal"
import { selectTheme } from "@/state/theme"
import { device } from "@/styles/breakpoints"
import { useEffect } from "react"
import { Toaster } from "react-hot-toast"
import { Outlet, useLocation } from "react-router-dom"
import styled from "styled-components"
import { Cookie, Footer, Navigation, StatsHeader } from "."

const toasterStyle = {
  border: "none",
  padding: "0.7rem 1rem",
  fontSize: "var(--fsText)",
  color: "var(--primaryColor)",
  backgroundColor: "var(--underlay1)",
  borderRadius: "unset",
}

export default function Layout() {
  const pathname = useLocation().pathname
  const { isAuthenticated, actor, users } = useAuth()
  const { toHome } = useNavigation()
  const { lockScroll, unlockScroll } = useScrollLock()
  const { registerUser, listUsers } = useUsers()
  const theme = useAppSelector(selectTheme)
  const isLoading = useAppSelector(selectIsLoading)
  const isSignInModalOpen = useAppSelector(selectSignInModalIsOpen)

  // Use TanStack Query for homepage data instead of Redux
  const { data: homeData } = useHomeQuery()
  const newProjects = homeData?.new || []

  // Initialize users when actor is available
  const initUsers = async (): Promise<void> => {
    try {
      await Promise.allSettled([registerUser(), listUsers()])
    } catch (error) {
      console.error("Error initializing users:", error)
    }
  }

  useEffect(() => {
    if (!actor || !users) return
    initUsers()
  }, [actor, users])

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
      <StatsHeader />
      <Navigation />

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
