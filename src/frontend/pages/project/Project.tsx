import React, { FC, useEffect } from "react"
import styled from "styled-components"
import { useParams } from "react-router-dom"
import { useProjects } from "@/hooks/_index"
import { useAuth } from "@/context/Auth"
import type { Project } from "@/state/_types/curated_projects_types"
import { shuffle2 } from "@/utils/_index"

// components
import { BackBtn } from "@/components/btns/_index"
import { ShareModal, AdminModal } from "@/modals/_index"
import { CollStats, Description, Disclaimer, Header, Links, Meta, NftPreviews, RelatedProjects } from "./_index"

// state
import { useAppSelector, useAppDispatch } from "@/hooks/useRedux"
import { selectShareModal } from "@/state/modals/shareModal"
import { selectAdmin } from "@/state/admin/admin"
import { selectProject, setProject, setProjectRelated } from "@/state/project"

const Project: FC = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const { id } = useParams<{ id: string }>()
  const { actor } = useAuth()
  const { refreshById, getRelated } = useProjects()
  const project = useAppSelector(selectProject).project
  const isShareModalOpen = useAppSelector(selectShareModal)
  const isAdminModalOpen = useAppSelector(selectAdmin).isModalOpen

  const refresh = async (id: string) => {
    try {
      const project = await refreshById(id)
      const related = await getRelated(project.id)

      // filter
      const filtered = related.filter((p) => p.id !== project.id).slice()
      const shuffled = shuffle2(filtered)

      // set
      dispatch(setProject(project))
      dispatch(setProjectRelated(shuffled))
    } catch (error) {
      throw new Error(error)
    }
  }

  useEffect(() => {
    if (actor) {
      if (id) {
        refresh(id)
      }
    }
  }, [actor, id])

  return (
    <ProjectStyled>
      {!project ? null : (
        <div className="main">
          <AdminModal isOpen={isAdminModalOpen} />
          <BackBtn />
          <div className="content">
            <Header project={project} />
            <Description name={project.name} description={project.description} />
            <NftPreviews project={project} />
            <CollStats project={project} />
            <Links project={project} />
            <Meta project={project} />
            <Disclaimer />

            {/* modal */}
            <ShareModal isOpen={isShareModalOpen} id={project.id} name={project.name} category={project.category} description={project.description} />
          </div>
        </div>
      )}

      <div className="related_projects">
        <RelatedProjects />
      </div>
    </ProjectStyled>
  )
}

const ProjectStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4rem;
  max-width: 1280px;
  width: 100%;
  margin: 0 auto 4rem auto;
`

export default Project
