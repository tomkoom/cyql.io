import React from "react";
import css from "./ProjectPage.module.css";
import { useParams } from "react-router-dom";

// icons
import { iExternalLink } from "../../Icons/Icons";

// redux
import { useSelector } from "react-redux";
import { selectProjects } from "../../State/projects";

// components
import { BackBtn, ExpandableText, Loader } from "../../Components/index";
import { CollectionStats, NftPreviews, SocialLinks } from "./index";

const ProjectPage = () => {
  const { id } = useParams();
  const projects = useSelector(selectProjects);

  return (
    <div className={`${css.projectPage} container768`}>
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
            <div className={css.app} key={project.id}>
              {project.cover && (
                <div
                  className={css.app__cover}
                  style={{ backgroundImage: `url(${project.cover})` }}
                />
              )}

              <div className={css.app__info}>
                {/* logo */}
                {project.logo && (
                  <img
                    className={css.app__info__logo}
                    src={project.logo}
                    alt={`${project.name} logo`}
                  />
                )}

                {/* title and tags */}
                <div className={css.app__info__caption}>
                  <h3 className={css.app__info__caption__title}>{project.name}</h3>

                  <div className={css.app__info__caption__tags}>
                    <span className={css.app__info__caption__tags__item}>{project.category}</span>

                    {project.tags && (
                      <span className={css.app__info__caption__tags__item}>{project.tags}</span>
                    )}
                  </div>
                </div>

                {/* date */}
                <div className={css.app__info__date}>{project.added}</div>
              </div>

              <p className={css.projectDescription}>{project.description}</p>

              {/* nft previews */}
              <NftPreviews
                nftImg1={project.nftImg1}
                nftImg2={project.nftImg2}
                nftImg3={project.nftImg3}
                nftImg4={project.nftImg4}
              />

              {/* collection stats */}
              {project.category === "NFTs" ? (
                <div>
                  <h6>Collection Stats</h6>
                  <CollectionStats
                    nftSaleStatus={project.nftSaleStatus}
                    nftSaleDate={project.nftSaleDate}
                    nftUnits={project.nftUnits}
                    nftUnitPrice={project.nftUnitPrice}
                  />
                </div>
              ) : null}

              <div className={css.project__btns}>
                {project.nftMarketUrl && (
                  <a
                    className={css.trade__btn}
                    href={project.nftMarketUrl}
                    target="_blank"
                    rel="norefferrer noopener"
                  >
                    Trade on Entrepot&nbsp;<span>{iExternalLink}</span>
                  </a>
                )}

                {project.nftRarityChecker && (
                  <a
                    className={css.trade__btn}
                    href={project.nftRarityChecker}
                    target="_blank"
                    rel="norefferrer noopener"
                  >
                    NFT rarity checker&nbsp;<span>{iExternalLink}</span>
                  </a>
                )}
              </div>

              {/* social links */}
              <div>
                <h6>Social Links</h6>
                <SocialLinks
                  // ic
                  canister={project.canister}
                  dscvr={project.dscvr}
                  distrikt={project.distrikt}
                  openChat={project.openChat}
                  // links
                  website={project.website}
                  app={project.app}
                  twitter={project.twitter}
                  discord={project.discord}
                  github={project.github}
                  telegram={project.telegram}
                  medium={project.medium}
                />
              </div>

              <a
                href="https://twitter.com/messages/compose?recipient_id=1386304698358116354"
                className={css.twitterDmButton}
                data-screen-name="@DfinitApps"
                rel="noreferrer noopener"
              >
                Edit the project info
              </a>
            </div>
          ))
      )}
    </div>
  );
};

export default ProjectPage;
