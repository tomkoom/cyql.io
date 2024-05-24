import React, { FC } from "react"
import styled from "styled-components"
import { verifyAdmin } from "@/utils/verifyAdmin"
import { iEdit, iShareSquare } from "@/components/icons/Icons"
import { useAuth } from "@/context/Auth"
import { ProjectV2 } from "@/state/_types/curated_projects_types"

// components
import { Btn, Logo, Title } from "./_index"
import { UpvoteBtn } from "@/components/btns/_index"

// state
import { useAppDispatch } from "@/hooks/useRedux"
import { setProject, setProjectModalMode, setProjectModalIsOpen } from "@/state/modals/projectModal"
import { setShareModal } from "@/state/modals/shareModal"

interface HeaderProps {
  project: ProjectV2
}

const Header: FC<HeaderProps> = ({ project }): JSX.Element => {
  const dispatch = useAppDispatch()
  const { userId } = useAuth()

  const openEditModal = (): void => {
    dispatch(setProject(project))
    dispatch(setProjectModalMode("edit"))
    dispatch(setProjectModalIsOpen(true))
  }

  const openShareModal = (): void => {
    dispatch(setShareModal(true))
  }

  return (
    <HeaderStyled>
      <Main>
        <Logo logo={project.logoDataUrl || project.logoUrl} name={project.name} />
        <Title project={project} />
      </Main>

      <Controls>
        {verifyAdmin(userId) && <Btn icon={iEdit} onClick={openEditModal} />}
        <Btn icon={iShareSquare} onClick={openShareModal} />
        <UpvoteBtn projectId={project.id} location={"project_page"} upvotedBy={project.upvotedBy} />
      </Controls>
    </HeaderStyled>
  )
}

const HeaderStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
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
