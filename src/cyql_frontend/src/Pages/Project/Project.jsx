import React from "react";
import css from "./Project.module.css";

// router
import { useParams } from "react-router-dom";

// components
import { Loader } from "@components/index";
import { BackBtn } from "@btns/index";
import { ShareModal } from "@modals/index";
import {
  CollStats,
  Description,
  Disclaimer,
  Header,
  Links,
  Meta,
  NftBtns,
  NftPreviews,
  Twitter,
} from "./index";

// state
import { useSelector } from "react-redux";
import { selectProjectsDocs } from "@state/projects";
import { selectShareModal } from "@state/modals/shareModal";

const Project = () => {
  const { slug } = useParams();
  const projects = useSelector(selectProjectsDocs);
  const shareModal = useSelector(selectShareModal);

  return (
    <div className={css.project}>
      <BackBtn />

      {projects.length < 1 ? (
        <Loader />
      ) : (
        projects
          .filter((projectDoc) => projectDoc.data.slug === slug)
          .map((projectDoc) => (
            <div className={css.content} key={projectDoc.key}>
              <div className={css.main}>
                <Header projectDoc={projectDoc} />

                {projectDoc.data.description && (
                  <Description
                    name={projectDoc.data.name}
                    description={projectDoc.data.description}
                  />
                )}

                {(projectDoc.data.nftImg1 ||
                  projectDoc.data.nftImg2 ||
                  projectDoc.data.nftImg3 ||
                  projectDoc.data.nftImg4) && (
                  <NftPreviews
                    nftImg1={projectDoc.data.nftImg1}
                    nftImg2={projectDoc.data.nftImg2}
                    nftImg3={projectDoc.data.nftImg3}
                    nftImg4={projectDoc.data.nftImg4}
                  />
                )}

                {projectDoc.data.category.includes("NFTs") && (
                  <CollStats
                    nftSaleStatus={projectDoc.data.nftSaleStatus}
                    nftSaleDate={projectDoc.data.nftSaleDate}
                    nftUnits={projectDoc.data.nftUnits}
                    nftUnitPrice={projectDoc.data.nftUnitPrice}
                  />
                )}

                {(projectDoc.data.nftMarketUrl || projectDoc.data.nftRarityChecker) && (
                  <NftBtns
                    nftMarketUrl={projectDoc.data.nftMarketUrl}
                    nftRarityChecker={projectDoc.data.nftRarityChecker}
                  />
                )}

                <Links
                  // main
                  website={projectDoc.data.website}
                  canister={projectDoc.data.canister}
                  app={projectDoc.data.app}
                  docs={projectDoc.data.docs}
                  whitepaper={projectDoc.data.whitepaper}
                  // ic
                  dscvr={projectDoc.data.dscvr}
                  distrikt={projectDoc.data.distrikt}
                  openChat={projectDoc.data.openChat}
                  taggr={projectDoc.data.taggr}
                  seers={projectDoc.data.seers}
                  nuance={projectDoc.data.nuance}
                  catalyze={projectDoc.data.catalyze}
                  // social
                  twitter={projectDoc.data.twitter}
                  discord={projectDoc.data.discord}
                  github={projectDoc.data.github}
                  telegram={projectDoc.data.telegram}
                  medium={projectDoc.data.medium}
                  // nft
                  // ...
                  // crowdfunding, etc
                  // ...
                />

                <Meta added={projectDoc.data.added} />
                <Disclaimer />
              </div>

              {projectDoc.data.twitter && (
                <div className={css.twitter}>
                  <Twitter name={projectDoc.data.name} twitter={projectDoc.data.twitter} />
                </div>
              )}

              {/* modals */}
              {shareModal && (
                <ShareModal
                  slug={projectDoc.data.slug}
                  name={projectDoc.data.name}
                  category={projectDoc.data.category}
                  description={projectDoc.data.description}
                />
              )}
            </div>
          ))
      )}
    </div>
  );
};

export default Project;
