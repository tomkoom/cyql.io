import { Btn } from "@/components/btns"
import { useAppDispatch } from "@/hooks/useRedux"
import { setAdminIsModalOpen, setAdminMode } from "@/state/admin/admin"
import { device } from "@/styles/breakpoints"
import { FC } from "react"
import styled from "styled-components"
import { Projects, Search } from "."

const Admin: FC = () => {
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
