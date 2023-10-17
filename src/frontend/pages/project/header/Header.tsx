import React, { FC } from "react"
import styled from "styled-components"
import { II_ADMIN_1 } from "@/constants/constants"

// utils
import { verifyAdmin } from "@/utils/verifyAdmin"

// icons
import { iEdit, iShareSquare } from "@/components/icons/Icons"

// auth
import { useAuth } from "@/context/Auth"

// components
import { Btn, Logo, Title } from "./_index"
// import { UpvtBtn } from "@components/index";

// state
import { useAppDispatch } from "@/hooks/useRedux"
import { setProjectModalIsOpen, setProject } from "@/state/modals/project_modal/projectModal"
import { setShareModal } from "@/state/modals/shareModal"

const Header: FC<any> = ({ project }): JSX.Element => {
  const dispatch = useAppDispatch()
  const { userId } = useAuth()
  const admins = [II_ADMIN_1]

  const editProject = () => {
    dispatch(setProject(project))
    dispatch(setProjectModalIsOpen(true))
  }

  const openShareModal = () => {
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
        {verifyAdmin(admins, userId) === true && <Btn icon={iEdit} onClick={editProject} />}
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
