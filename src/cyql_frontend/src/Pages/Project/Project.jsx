import React from "react";
import css from "./Project.module.css";
import { useParams } from "react-router-dom";

// icons
import { iExternalLink } from "../../Icons/Icons";

// components
import { BackBtn, ExpandableText, Loader } from "../../Components/index";
import { CollStats, Description, Header, Links, NftPreviews, TwitterTimeline } from "./index";

// state
import { useSelector } from "react-redux";
import { selectProjects } from "../../State/projects";

// utils
import { formatDate2 } from "../../Utils/format";

const Project = () => {
  const { id } = useParams();
  const projects = useSelector(selectProjects);

  return (
    <div className={css.project}>
      <BackBtn />

      <ExpandableText>
        This website is maintained by the IC enthusiasts and community. Anyone can submit their p.
        Not all information may be properly verified and therefore may not be accurate. DYOR and use
        your best judgement when dealing with the projects listed on this site and making investment
        decisions.
      </ExpandableText>

      {projects.length < 1 ? (
        <Loader />
      ) : (
        projects
          .filter((p) => p.id === id)
          .map((p) => (
            <div className={css.content} key={p.id}>
              <div className={css.main}>
                <Header
                  logo={p.logo}
                  name={p.name}
                  category={p.category}
                  tags={p.tags}
                  idx={p.idx}
                  upvotedBy={p.upvotedBy}
                />

                <Description name={p.name} description={p.description} />
                {(p.nftImg1 || p.nftImg2 || p.nftImg3 || p.nftImg4) && (
                  <NftPreviews
                    nftImg1={p.nftImg1}
                    nftImg2={p.nftImg2}
                    nftImg3={p.nftImg3}
                    nftImg4={p.nftImg4}
                  />
                )}

                {p.category === "NFTs" && (
                  <div>
                    <h6>Collection Stats</h6>
                    <CollStats
                      nftSaleStatus={p.nftSaleStatus}
                      nftSaleDate={p.nftSaleDate}
                      nftUnits={p.nftUnits}
                      nftUnitPrice={p.nftUnitPrice}
                    />
                  </div>
                )}

                <div className={css.project__btns}>
                  {p.nftMarketUrl && (
                    <a
                      className={css.btn}
                      href={p.nftMarketUrl}
                      target="_blank"
                      rel="norefferrer noopener"
                    >
                      Trade<span>{iExternalLink}</span>
                    </a>
                  )}

                  {p.nftRarityChecker && (
                    <a
                      className={css.btn}
                      href={p.nftRarityChecker}
                      target="_blank"
                      rel="norefferrer noopener"
                    >
                      Rarity Checker&nbsp;<span>{iExternalLink}</span>
                    </a>
                  )}
                </div>

                <div className={css.bottom}>
                  {p.added && <div className={css.date}>Published {formatDate2(p.added)}</div>}
                  <a
                    href="https://twitter.com/messages/compose?recipient_id=1386304698358116354"
                    className={css.twitterDmButton}
                    data-screen-name="@DfinityApps"
                    rel="noreferrer noopener"
                  >
                    Edit the project info
                  </a>
                </div>
              </div>

              {/* links */}
              <div>
                <div className={css.links}>
                  <Links
                    // ic links
                    canister={p.canister}
                    dscvr={p.dscvr}
                    distrikt={p.distrikt}
                    openChat={p.openChat}
                    // soc links
                    website={p.website}
                    app={p.app}
                    docs={p.docs}
                    twitter={p.twitter}
                    discord={p.discord}
                    github={p.github}
                    telegram={p.telegram}
                    medium={p.medium}
                  />
                </div>

                {p.twitter && (
                  <div>
                    <h5 className={css.subtitle}>{p.name} Twitter</h5>
                    <TwitterTimeline twitter={p.twitter} />
                  </div>
                )}
              </div>
            </div>
          ))
      )}
    </div>
  );
};

export default Project;
