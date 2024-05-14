import React, { FC } from "react"
import styled from "styled-components"
import { device } from "@/styles/breakpoints"
import { useParams } from "react-router-dom"

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
import { selectAllCuratedProjects } from "@/state/curatedProjects"
import { selectShareModal } from "@/state/modals/shareModal"
import { selectProjectModalIsOpen } from "@/state/modals/projectModal"

const Project: FC = (): JSX.Element => {
  const { id } = useParams<{ id: string }>()
  const projects = useAppSelector(selectAllCuratedProjects)
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
      {project.map((project: any) => (
        <Content key={project.id}>
          <Header project={project} />

          {project.description && (
            <Description name={project.name} description={project.description} />
          )}

          {(project.nftImg1 || project.nftImg2 || project.nftImg3 || project.nftImg4) && (
            <NftPreviews
              nftImg1={project.nftImg1}
              nftImg2={project.nftImg2}
              nftImg3={project.nftImg3}
              nftImg4={project.nftImg4}
            />
          )}

          {project.category.includes("NFTs") && (
            <CollStats
              nftSaleDate={project.nft_sale_date}
              nftUnits={project.nft_units}
              nftUnitPrice={project.nft_unit_price}
            />
          )}

          {/* nft links */}
          {/* {(project.nft_market || project.nft_rarity) && (
            <NftBtns nftMarket={project.nft_market} nftRarity={project.nft_rarity} />
          )} */}

          <Links
            // main
            website={project.website}
            canister={project.canister}
            app={project.app}
            docs={project.docs}
            whitepaper={project.whitepaper}
            // ic
            dscvr={project.dscvr}
            distrikt={project.distrikt}
            openchat={project.openchat}
            taggr={project.taggr}
            seers={project.seers}
            nuance={project.nuance}
            catalyze={project.catalyze}
            funded={project.funded}
            // social
            twitter={project.twitter}
            discord={project.discord}
            github={project.github}
            telegram={project.telegram}
            medium={project.medium}
          />
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
