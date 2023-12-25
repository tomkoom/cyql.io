import React, { FC } from "react"
import styled from "styled-components"
import { verifyAdmin } from "@/utils/verifyAdmin"
import { iEdit, iShareSquare } from "@/components/icons/Icons"
import { useAuth } from "@/context/Auth"

// components
import { Btn, Logo, Title } from "./_index"
// import { UpvtBtn } from "@/components/index";

// state
import { useAppDispatch } from "@/hooks/useRedux"
import { setProject, setProjectModalMode, setProjectModalIsOpen } from "@/state/modals/projectModal"
import { setShareModal } from "@/state/modals/shareModal"

const Header: FC<any> = ({ project }): JSX.Element => {
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
        {project.logo !== "" && <Logo logo={project.logo} name={project.name} />}
        <Title
          name={project.name}
          category={project.category}
          github={project.github}
          canister={project.canister}
          grantee={project.grantee}
        />
      </Main>

      <Controls>
        {verifyAdmin(userId) === true && <Btn icon={iEdit} onClick={openEditModal} />}
        <Btn icon={iShareSquare} onClick={openShareModal} />
        {/* <div className={css.btnContainer}>
          <UpvtBtn id={project.key} upvotedBy={project.upvotedBy} location="project" />
        </div> */}
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
