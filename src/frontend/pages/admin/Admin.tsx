import React, { FC } from "react"
import styled from "styled-components"
import { device } from "@/styles/breakpoints"

// components
import { Projects, Search } from "./_index"
import { Btn } from "@/components/btns/_index"

// state
import { useAppDispatch } from "@/hooks/useRedux"
import { setProjectModalMode, setProjectModalIsOpen } from "@/state/modals/projectModal"

const Admin: FC = (): JSX.Element => {
  const dispatch = useAppDispatch()

  const openAddProjectModal = (): void => {
    dispatch(setProjectModalMode("add"))
    dispatch(setProjectModalIsOpen(true))
  }

  return (
    <AdminStyled>
      <Title>
        <h2 className="pageTitle">Admin</h2>
        <Btn btnType="primary" text="add project" onClick={openAddProjectModal} />
      </Title>
      <Search />
      <Projects />
    </AdminStyled>
  )
}

const AdminStyled = styled.div`
  @media ${device.laptop} {
    padding: 0 1rem;
  }
`

const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export default Admin
