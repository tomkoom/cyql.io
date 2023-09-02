import React, { FC } from "react";
import styled from "styled-components";
import { device } from "@/styles/breakpoints";

// router
import { useParams } from "react-router-dom";

// components
import { Loading } from "@/components/ui/_index";
import { BackBtn } from "@/components/btns/_index";
import { ShareModal } from "@/modals/_index";
import { NotFound } from "@/pages/_index";
import {
  CollStats,
  Description,
  Disclaimer,
  Header,
  Links,
  Meta,
  NftBtns,
  NftPreviews,
} from "./_index";
import { ProjectModal } from "@/modals/_index";

// state
import { useAppSelector } from "@/hooks/useRedux";
import { selectProjects } from "@/state/projects";
import { selectShareModal } from "@/state/modals/shareModal";
import { selectProjectModal } from "@/state/modals/projectModal/projectModal";

const Project: FC = (): JSX.Element => {
  const { slug } = useParams<{ slug: string }>();
  const projects = useAppSelector(selectProjects);
  const project = projects.filter((p) => p.data.slug === slug) || [];
  const shareModal = useAppSelector(selectShareModal);
  const projectModalIsOpen = useAppSelector(selectProjectModal);

  if (projects.length < 1) {
    return <Loading />;
  }

  if (project.length < 1) {
    return <NotFound text="Project not found" />;
  }

  return (
    <ProjectStyled>
      {/* modal */}
      <ProjectModal isOpen={projectModalIsOpen} />

      <BackBtn />
      {project.map((project: any) => (
        <Content key={project.key}>
          <Header project={project} />

          {project.data.description && (
            <Description name={project.data.name} description={project.data.description} />
          )}

          {(project.data.nft_img_1 ||
            project.data.nft_img_2 ||
            project.data.nft_img_3 ||
            project.data.nft_img_4) && (
            <NftPreviews
              nftImg1={project.data.nft_img_1}
              nftImg2={project.data.nft_img_2}
              nftImg3={project.data.nft_img_3}
              nftImg4={project.data.nft_img_4}
            />
          )}

          {project.data.categories.includes("NFTs") && (
            <CollStats
              nftSaleDate={project.data.nft_sale_date}
              nftUnits={project.data.nft_units}
              nftUnitPrice={project.data.nft_unit_price}
            />
          )}

          {/* nft links */}
          {(project.data.nft_market || project.data.nft_rarity) && (
            <NftBtns nftMarket={project.data.nft_market} nftRarity={project.data.nft_rarity} />
          )}

          <Links
            // main
            website={project.data.website}
            canister={project.data.canister}
            app={project.data.app}
            docs={project.data.docs}
            whitepaper={project.data.whitepaper}
            // ic
            dscvr={project.data.dscvr}
            distrikt={project.data.distrikt}
            openchat={project.data.openchat}
            taggr={project.data.taggr}
            seers={project.data.seers}
            nuance={project.data.nuance}
            catalyze={project.data.catalyze}
            funded={project.data.funded}
            // social
            twitter={project.data.twitter}
            discord={project.data.discord}
            github={project.data.github}
            telegram={project.data.telegram}
            medium={project.data.medium}
          />

          <Meta added={project.data.added} />
          <Disclaimer />

          {/* modals */}
          {shareModal && (
            <ShareModal
              slug={project.data.slug}
              name={project.data.name}
              categories={project.data.categories}
              description={project.data.description}
            />
          )}
        </Content>
      ))}
    </ProjectStyled>
  );
};

const ProjectStyled = styled.div`
  max-width: 1280px;
  margin: 0 auto 4rem auto;
`;

const Content = styled.div`
  @media ${device.laptop} {
    flex-direction: column;
    gap: 1rem;
  }
`;

export default Project;
