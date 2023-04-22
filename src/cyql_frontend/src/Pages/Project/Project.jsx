import React from "react";
import css from "./Project.module.css";

// router
import { useParams } from "react-router-dom";

// components
import { Loader } from "@ui-elements/index";
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

                {(projectDoc.data.nft_img_1 ||
                  projectDoc.data.nft_img_2 ||
                  projectDoc.data.nft_img_3 ||
                  projectDoc.data.nft_img_4) && (
                  <NftPreviews
                    nftImg1={projectDoc.data.nft_img_1}
                    nftImg2={projectDoc.data.nft_img_2}
                    nftImg3={projectDoc.data.nft_img_3}
                    nftImg4={projectDoc.data.nft_img_4}
                  />
                )}

                {projectDoc.data.categories.includes("NFTs") && (
                  <CollStats
                    nftSaleDate={projectDoc.data.nft_sale_date}
                    nftUnits={projectDoc.data.nft_units}
                    nftUnitPrice={projectDoc.data.nft_unit_price}
                  />
                )}

                {/* nft links */}
                {(projectDoc.data.nft_market || projectDoc.data.nft_rarity) && (
                  <NftBtns
                    nftMarketUrl={projectDoc.data.nft_market}
                    nftRarityChecker={projectDoc.data.nft_rarity}
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
                  funded={projectDoc.data.funded}
                  // social
                  twitter={projectDoc.data.twitter}
                  discord={projectDoc.data.discord}
                  github={projectDoc.data.github}
                  telegram={projectDoc.data.telegram}
                  medium={projectDoc.data.medium}
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
                  categories={projectDoc.data.categories}
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
