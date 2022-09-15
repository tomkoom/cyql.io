import React from "react";
import css from "./Project.module.css";
import { useParams } from "react-router-dom";

// icons
import { iExternalLink } from "../../Icons/Icons";

// components
import { BackBtn, ExpandableText, Loader, UpvtBtn } from "../../Components/index";
import { CollStats, Description, NftPreviews, TwitterTimeline, Links } from "./index";

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
        This website is maintained by the IC enthusiasts and community. Anyone can submit their
        project. Not all information may be properly verified and therefore may not be accurate.
        DYOR and use your best judgement when dealing with the projects listed on this site and
        making investment decisions.
      </ExpandableText>

      {projects.length < 1 ? (
        <Loader />
      ) : (
        projects
          .filter((project) => project.id === id)
          .map((project) => (
            <div className={css.content} key={project.id}>
              <div className={css.main}>
                {project.cover && (
                  <div className={css.cover} style={{ backgroundImage: `url(${project.cover})` }} />
                )}

                <div className={css.info}>
                  {/* logo */}
                  {project.logo && (
                    <img className={css.logo} src={project.logo} alt={`${project.name} logo`} />
                  )}

                  {/* caption */}
                  <div className={css.caption}>
                    <h3 className={css.title}>{project.name}</h3>
                    <div className={css.tags}>
                      {project.category && <span className={css.tagsI}>{project.category}</span>}
                      {project.tags && <span className={css.tagsI}>{project.tags}</span>}
                    </div>
                  </div>

                  <div className={css.upvoteBtn}>
                    <UpvtBtn idx={project.idx} upvotedBy={project.upvotedBy} />
                  </div>
                </div>

                <Description name={project.name} description={project.description} />

                {/* nft previews */}
                {(project.nftImg1 || project.nftImg2 || project.nftImg3 || project.nftImg4) && (
                  <NftPreviews
                    nftImg1={project.nftImg1}
                    nftImg2={project.nftImg2}
                    nftImg3={project.nftImg3}
                    nftImg4={project.nftImg4}
                  />
                )}

                {/* collection stats */}
                {project.category === "NFTs" && (
                  <div>
                    <h6>Collection Stats</h6>
                    <CollStats
                      nftSaleStatus={project.nftSaleStatus}
                      nftSaleDate={project.nftSaleDate}
                      nftUnits={project.nftUnits}
                      nftUnitPrice={project.nftUnitPrice}
                    />
                  </div>
                )}

                <div className={css.project__btns}>
                  {project.nftMarketUrl && (
                    <a
                      className={css.btn}
                      href={project.nftMarketUrl}
                      target="_blank"
                      rel="norefferrer noopener"
                    >
                      Trade<span>{iExternalLink}</span>
                    </a>
                  )}

                  {project.nftRarityChecker && (
                    <a
                      className={css.btn}
                      href={project.nftRarityChecker}
                      target="_blank"
                      rel="norefferrer noopener"
                    >
                      Rarity Checker&nbsp;<span>{iExternalLink}</span>
                    </a>
                  )}
                </div>

                <div className={css.bottom}>
                  {project.added && (
                    <div className={css.date}>Published {formatDate2(project.added)}</div>
                  )}
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

              {/* social links */}
              <div>
                <div className={css.links}>
                  <h5 className={css.subtitle}>Links</h5>
                  <Links
                    // ic links
                    canister={project.canister}
                    dscvr={project.dscvr}
                    distrikt={project.distrikt}
                    openChat={project.openChat}
                    // soc links
                    website={project.website}
                    app={project.app}
                    docs={project.docs}
                    twitter={project.twitter}
                    discord={project.discord}
                    github={project.github}
                    telegram={project.telegram}
                    medium={project.medium}
                  />
                </div>

                {project.twitter && (
                  <div>
                    <h5 className={css.subtitle}>{project.name} Twitter</h5>
                    <TwitterTimeline twitter={project.twitter} />
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
