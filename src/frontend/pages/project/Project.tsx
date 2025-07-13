import { BackBtn } from "@/components/btns"
import { useProjectQuery } from "@/hooks"
import { useAppSelector } from "@/hooks/useRedux"
import { AdminModal, ShareModal } from "@/modals"
import { selectAdmin } from "@/state/admin/admin"
import { selectShareModal } from "@/state/modals/shareModal"
import type { Project } from "@/state/types/curated_projects_types"
import { useParams } from "react-router-dom"
import styled from "styled-components"
import { CollStats, Description, Disclaimer, Header, Links, Meta, NftPreviews, RelatedProjects } from "."

export default function Project() {
  const { id } = useParams<{ id: string }>()
  const { data: project, isLoading, isError /* error */ } = useProjectQuery(id)
  const isShareModalOpen = useAppSelector(selectShareModal)
  const isAdminModalOpen = useAppSelector(selectAdmin).isModalOpen

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <div className="loading">Loading project...</div>
      </div>
    )
  }

  if (isError || !project) {
    // const errorMessage = error?.message || "Project not found"
    return (
      <div className="flex items-center justify-center">
        <div className="loading">Loading project...</div>
      </div>
    )
  }

  return (
    <ProjectStyled>
      <div className="main">
        <AdminModal isOpen={isAdminModalOpen} />
        <BackBtn />
        <div className="content">
          <Header project={project} />
          <Description name={project.name} description={project.description} />
          <NftPreviews project={project} />
          <CollStats project={project} />
          <Links project={project} />
          <Meta />
          <Disclaimer />

          {/* modal */}
          <ShareModal isOpen={isShareModalOpen} id={project.id} name={project.name} category={project.category} description={project.description} />
        </div>
      </div>

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

  .loading {
    text-align: center;
    padding: 4rem 2rem;
    font-size: var(--fs5);
    color: var(--tertiaryColor);
  }

  .error {
    text-align: center;
    padding: 4rem 2rem;

    > h2 {
      font-size: var(--fs4);
      color: var(--primaryColor);
      margin-bottom: 1rem;
    }

    > p {
      font-size: var(--fs6);
      color: var(--tertiaryColor);
      margin-bottom: 2rem;
    }

    > button {
      padding: 0.75rem 1.5rem;
      background-color: var(--primaryColor);
      color: white;
      border: none;
      border-radius: 0.5rem;
      cursor: pointer;
      font-size: var(--fs6);
      transition: var(--transition1);

      &:hover {
        background-color: var(--primaryColorDark);
      }
    }
  }
`
