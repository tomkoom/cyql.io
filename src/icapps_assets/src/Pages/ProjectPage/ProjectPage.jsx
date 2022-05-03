import React from "react";
import css from "./ProjectPage.module.css";
import { useParams } from "react-router-dom";

// icons
import { iExternalLink, iCaretUp } from "../../Icons/Icons";

// redux
import { useSelector } from "react-redux";
import { selectProjects } from "../../State/projects";

// components
import { BackBtn, ExpandableText, Loader } from "../../Components/index";
import { CollectionStats, NftPreviews, SocialLinks } from "./index";

// firestore
import { projectsColRef } from "../../../../../firebase/firestore-collections";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";

// auth
import { useAuth } from "../../Context/AuthContext";

const ProjectPage = () => {
  const { id } = useParams();
  const projects = useSelector(selectProjects);
  const { user } = useAuth();

  const formatDate = (timestamp) => {
    const ts = timestamp;
    const date = new Date(ts);
    return date.toDateString();
  };

  const upvote = async (projectIdx) => {
    const docRef = doc(projectsColRef, projectIdx);
    await updateDoc(docRef, {
      upvotedBy: arrayUnion(user.uid),
    });
  };

  const cancelUpvote = async (projectIdx) => {
    const docRef = doc(projectsColRef, projectIdx);
    await updateDoc(docRef, {
      upvotedBy: arrayRemove(user.uid),
    });
  };

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
            <div className={css.content} key={project.id}>
              {project.cover && (
                <div className={css.cover} style={{ backgroundImage: `url(${project.cover})` }} />
              )}
              <div className={css.contentMain}>
                {/* logo */}
                {project.logo && (
                  <img className={css.logo} src={project.logo} alt={`${project.name} logo`} />
                )}

                {/* title and tags */}
                <div className={css.caption}>
                  <h3 className={css.captionTitle}>{project.name}</h3>
                  <div className={css.tags}>
                    {project.category && <span className={css.tags__i}>{project.category}</span>}
                    {project.tags && <span className={css.tags__i}>{project.tags}</span>}
                  </div>
                </div>

                {/* date and upvote */}
                <div className={css.right}>
                  {project.upvotedBy && project.upvotedBy.includes(user.uid) ? (
                    <button className={css.upvotedBtn} onClick={() => cancelUpvote(project.idx)}>
                      {iCaretUp}&nbsp;&nbsp;Upvoted&nbsp;&nbsp;{project.upvotedBy.length}
                    </button>
                  ) : (
                    <button className={css.upvoteBtn} onClick={() => upvote(project.idx)}>
                      {iCaretUp}&nbsp;&nbsp;Upvote&nbsp;&nbsp;
                      {project.upvotedBy ? project.upvotedBy.length : 0}
                    </button>
                  )}
                </div>
              </div>

              <p className={css.description}>{project.description}</p>

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

              <div className={css.bottom}>
                {project.added && (
                  <div className={css.date}>Published {formatDate(project.added)}</div>
                )}
                <a
                  href="https://twitter.com/messages/compose?recipient_id=1386304698358116354"
                  className={css.twitterDmButton}
                  data-screen-name="@DfinitApps"
                  rel="noreferrer noopener"
                >
                  Edit the project info
                </a>
              </div>
            </div>
          ))
      )}
    </div>
  );
};

export default ProjectPage;
