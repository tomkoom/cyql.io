import React, { FC, useEffect } from "react"
import styled from "styled-components"
import { device } from "@/styles/breakpoints"
import { useParams } from "react-router-dom"
import { useProjects } from "@/hooks/_index"
import { useAuth } from "@/context/Auth"

// components
import { Loading } from "@/components/ui/_index"
import { BackBtn } from "@/components/btns/_index"
import { ShareModal } from "@/modals/_index"
import { CollStats, Description, Disclaimer, Header, Links, Meta, NftBtns, NftPreviews } from "./_index"
import { AdminModal } from "@/modals/_index"

// state
import { useAppSelector } from "@/hooks/useRedux"
import { selectShareModal } from "@/state/modals/shareModal"
import { selectAdmin } from "@/state/admin/admin"
import { selectProject } from "@/state/project"

const Project: FC = (): JSX.Element => {
  const { id } = useParams<{ id: string }>()
  const { actor } = useAuth()
  const { refreshById } = useProjects()
  const project = useAppSelector(selectProject)
  const isShareModalOpen = useAppSelector(selectShareModal)
  const isOpen = useAppSelector(selectAdmin).isModalOpen

  const refresh = async (id: string): Promise<void> => {
    try {
      await refreshById(id)
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

  if (!id) {
    return <p style={{ textAlign: "center" }}>Project not found.</p>
  }

  if (!project) {
    return <Loading />
  }

  return (
    <ProjectStyled>
      <AdminModal isOpen={isOpen} />
      <BackBtn />

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
        <Meta project={project} />
        <Disclaimer />

        <ShareModal isOpen={isShareModalOpen} id={project.id} name={project.name} category={project.category} description={project.description} />
      </Content>
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
