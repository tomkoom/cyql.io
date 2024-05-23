import React, { FC } from "react"
import styled from "styled-components"
import { device } from "@/styles/breakpoints"
import { useParams } from "react-router-dom"
import { ProjectV2 } from "@/state/_types/curated_projects_types"

// components
import { Loading } from "@/components/ui/_index"
import { BackBtn } from "@/components/btns/_index"
import { ShareModal } from "@/modals/_index"
import { NotFound } from "@/pages/_index"
import {
  CollStats,
  Description,
  Disclaimer,
  Header,
  Links,
  Meta,
  NftBtns,
  NftPreviews,
} from "./_index"
import { ProjectModal } from "@/modals/_index"

// state
import { useAppSelector } from "@/hooks/useRedux"
import { selectActiveCuratedProjects } from "@/state/curatedProjects"
import { selectShareModal } from "@/state/modals/shareModal"
import { selectProjectModalIsOpen } from "@/state/modals/projectModal"

const Project: FC = (): JSX.Element => {
  const { id } = useParams<{ id: string }>()
  const projects = useAppSelector(selectActiveCuratedProjects)
  const project = projects.filter((p) => p.id.toString() === id) || []
  const isShareModalOpen = useAppSelector(selectShareModal)
  const projectModalIsOpen = useAppSelector(selectProjectModalIsOpen)

  if (projects.length < 1) {
    return <Loading />
  }

  if (project.length < 1) {
    return <NotFound text="Project not found" />
  }

  return (
    <ProjectStyled>
      <ProjectModal isOpen={projectModalIsOpen} />

      <BackBtn />
      {project.map((project: ProjectV2) => (
        <Content key={project.id}>
          <Header project={project} />
          <Description name={project.name} description={project.description} />
          <NftPreviews project={project} />
          {project.category.includes("NFTs") && <CollStats project={project} />}

          {/* nft links */}
          {/* {(project.nft_market || project.nft_rarity) && (
            <NftBtns nftMarket={project.nft_market} nftRarity={project.nft_rarity} />
          )} */}

          <Links project={project} />
          <Meta createdAt={project.createdAt} />
          <Disclaimer />

          <ShareModal
            isOpen={isShareModalOpen}
            id={project.id}
            name={project.name}
            category={project.category}
            description={project.description}
          />
        </Content>
      ))}
    </ProjectStyled>
  )
}

const ProjectStyled = styled.div`
  max-width: 1280px;
  width: 100%;
  margin: 0 auto 4rem auto;
`

const Content = styled.div`
  @media ${device.laptop} {
    flex-direction: column;
    gap: 1rem;
  }
`

export default Project
