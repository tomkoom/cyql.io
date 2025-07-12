import { iEdit, iShareSquare } from "@/components/icons/Icons"
import { useAuth } from "@/context/Auth"
import { Project } from "@/state/types/curated_projects_types"
import { verifyAdmin } from "@/utils/verifyAdmin"
import React, { FC } from "react"
import styled from "styled-components"

// components
import { UpvoteBtn } from "@/components/btns"
import { Btn, Logo, Title } from "./_index"

// state
import { useAppDispatch } from "@/hooks/useRedux"
import { setAdminIsModalOpen, setAdminMode, setAdminProject } from "@/state/admin/admin"
import { setShareModal } from "@/state/modals/shareModal"

interface HeaderProps {
  project: Project
}

const Header: FC<HeaderProps> = ({ project }): JSX.Element => {
  const dispatch = useAppDispatch()
  const { userId } = useAuth()

  const openEditModal = (): void => {
    dispatch(setAdminProject(project))
    dispatch(setAdminMode("edit"))
    dispatch(setAdminIsModalOpen(true))
  }

  const openShareModal = (): void => {
    dispatch(setShareModal(true))
  }

  return (
    <HeaderStyled>
      <Main>
        <Logo logo={project.logoDataUrl} name={project.name} />
        <Title project={project} />
      </Main>

      <Controls>
        {verifyAdmin(userId) && <Btn icon={iEdit} onClick={openEditModal} />}
        <Btn icon={iShareSquare} onClick={openShareModal} />
        <UpvoteBtn projectId={project.id} btnLocation={"project_page"} upvotedBy={project.upvotedBy} />
      </Controls>
    </HeaderStyled>
  )
}

const HeaderStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1rem;
`

const Main = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`

const Controls = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-wrap: wrap;
  gap: 0.5rem;
`

export default Header
