import React, { FC, useEffect } from "react"
import styled from "styled-components"
import { device } from "@/styles/breakpoints"
import { useProjects, useQueryParams } from "@/hooks/_index"
import { Projects, Search } from "./_index"
import { Btn } from "@/components/btns/_index"
import { useAuth } from "@/context/Auth"

// state
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux"
import { setAdminMode, setAdminIsModalOpen } from "@/state/admin/admin"
import { selectPaginated } from "@/state/projects/paginated"

const Admin: FC = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const { actor } = useAuth()
  const { refreshPaginated } = useProjects()
  const { queryParams } = useQueryParams()
  const projects = useAppSelector(selectPaginated).data

  const openAdminModal = (): void => {
    dispatch(setAdminMode("add"))
    dispatch(setAdminIsModalOpen(true))
  }

  useEffect(() => {
    if (actor) {
      if (projects.length < 1) {
        refreshPaginated(queryParams)
      }
    }
  }, [actor])

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
