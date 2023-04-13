import React from "react";
import css from "./Project.module.css";

// router
import { useParams } from "react-router-dom";

// components
import { BackBtn, Loader } from "@components/index";
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
          .filter((p) => p.data.slug === slug)
          .map((p) => (
            <div className={css.content} key={p.key}>
              <div className={css.main}>
                <Header project={p} />

                <Description name={p.data.name} description={p.data.description} />
                {(p.data.nftImg1 || p.data.nftImg2 || p.data.nftImg3 || p.data.nftImg4) && (
                  <NftPreviews
                    nftImg1={p.data.nftImg1}
                    nftImg2={p.data.nftImg2}
                    nftImg3={p.data.nftImg3}
                    nftImg4={p.data.nftImg4}
                  />
                )}

                {p.category.includes("NFTs") && (
                  <CollStats
                    nftSaleStatus={p.data.nftSaleStatus}
                    nftSaleDate={p.data.nftSaleDate}
                    nftUnits={p.data.nftUnits}
                    nftUnitPrice={p.data.nftUnitPrice}
                  />
                )}

                {(p.data.nftMarketUrl || p.data.nftRarityChecker) && (
                  <NftBtns
                    nftMarketUrl={p.data.nftMarketUrl}
                    nftRarityChecker={p.data.nftRarityChecker}
                  />
                )}

                <Links
                  // main
                  website={p.data.website}
                  canister={p.data.canister}
                  app={p.data.app}
                  docs={p.data.docs}
                  crowdfundingUrl={p.data.crowdfundingUrl}
                  // ic
                  dscvr={p.data.dscvr}
                  distrikt={p.data.distrikt}
                  openChat={p.data.openChat}
                  taggr={p.data.taggr}
                  seers={p.data.seers}
                  nuance={p.data.nuance}
                  catalyze={p.data.catalyze}
                  // social
                  twitter={p.data.twitter}
                  discord={p.data.discord}
                  github={p.data.github}
                  telegram={p.data.telegram}
                  medium={p.data.medium}
                  // nft
                  // ...
                  // crowdfunding, etc
                  // ...
                />

                <Meta added={p.data.added} />
                <Disclaimer />
              </div>

              {p.twitter && (
                <div className={css.twitter}>
                  <Twitter name={p.data.name} twitter={p.data.twitter} />
                </div>
              )}

              {/* modals */}
              {shareModal && (
                <ShareModal
                  slug={p.data.slug}
                  name={p.data.name}
                  category={p.data.category}
                  description={p.data.description}
                />
              )}
            </div>
          ))
      )}
    </div>
  );
};

export default Project;
