import React, { FC } from "react"
import styled from "styled-components"
import { device } from "@/styles/breakpoints"
import { Projects, Search } from "./_index"
import { Btn } from "@/components/btns"

// state
import { useAppDispatch } from "@/hooks/useRedux"
import { setAdminMode, setAdminIsModalOpen } from "@/state/admin/admin"

const Admin: FC = (): JSX.Element => {
  const dispatch = useAppDispatch()

  const openAdminModal = (): void => {
    dispatch(setAdminMode("add"))
    dispatch(setAdminIsModalOpen(true))
  }

  return (
    <AdminStyled>
      <Title>
        <h2 className="pageTitle">Admin</h2>
        <Btn btnType="primary" text="Add Project" onClick={openAdminModal} />
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
