import React, { FC, useEffect } from "react"
import styled from "styled-components"
import "./RootLayout.css"
import { Outlet, useLocation, useSearchParams } from "react-router-dom"
import { Footer, Nav, Sidebar, Summary, Cookie } from "./_index"
import { LoadingModal } from "@/modals/_index"
import { device } from "@/styles/breakpoints"

// hooks
import { useAuth } from "@/context/Auth"
import { useNav } from "@/hooks/_index"

// state
import { useAppSelector, useAppDispatch } from "@/hooks/useRedux"
import { selectTheme } from "@/state/theme"
import { selectAllProjects } from "@/state/projects"
import { setCategory } from "@/state/projects/category"
import { selectIsLoading } from "@/state/loading"

const RootLayout: FC = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const location = useLocation()
  const [searchParams] = useSearchParams()
  const { isAuthenticated } = useAuth()
  const { toHome } = useNav()
  const theme = useAppSelector(selectTheme)
  const projects = useAppSelector(selectAllProjects)
  const isLoading = useAppSelector(selectIsLoading)

  // set category from query
  useEffect(() => {
    const category = searchParams.get("category")
    const c = !category ? "All" : category
    dispatch(setCategory(c))
  }, [])

  // redirect to home if user signed out
  useEffect(() => {
    if (!isAuthenticated && location.pathname === "/profile") {
      toHome()
    }
  }, [isAuthenticated])

  return (
    <RootLayoutStyled className={theme}>
      <LoadingModal isOpen={isLoading} />
      <Summary />
      <Nav />

      <div className="content">
        <Sidebar />

        <main className="main">
          <Outlet />
        </main>
      </div>

      {projects.length > 0 && <Footer />}
      <Cookie />
    </RootLayoutStyled>
  )
}

const RootLayoutStyled = styled.div`
  color: var(--primaryColor);
  background-color: var(--background);
  display: flex;
  flex-direction: column;

  /* footer at the bottom */
  min-height: 100vh;

  > div.content {
    padding: 0 2rem;
    max-width: calc(2048px + 4rem);
    margin: 0 auto;
    width: 100%;

    /* footer at the bottom */
    flex-grow: 1;

    @media ${device.laptop} {
      padding: 1rem;
    }

    > main.main {
      margin-left: 180px;

      @media ${device.laptop} {
        margin-left: unset;
      }
    }
  }
`

export default RootLayout
