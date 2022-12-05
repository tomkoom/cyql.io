import React from "react";
import css from "./ProjectList.module.css";
import Loader from "../../../Components/Loader/Loader";

//icons
import { iDatabase, iRocket } from "../../../Icons/Icons";
import { iTwitter, iDiscord, iTelegram, iGithub, iMediumM } from "../../../Icons/Icons";

// routes
import { toApp } from "../../../Routes/routes";

// components
import { LoadMoreBtn2, UpvtBtn } from "../../../Components/index";

// state
import { useSelector } from "react-redux";
import { selectProjects, selectProjectsLength } from "../../../State/projects";
import { selectCategory } from "../../../State/projects/category";
import { selectSearch } from "../../../State/projects/search";
import { selectItemsVisibleProjects, setItemsVisibleProjects } from "../../../State/loadMore";
import { selectSort } from "../../../State/projects/sort";
import { selectFilterByOpenSource, selectFilterByOnChain } from "../../../State/projects/filter";

const AppList = () => {
  const projects = useSelector(selectProjects);
  const projectsNum = useSelector(selectProjectsLength);
  const category = useSelector(selectCategory);
  const search = useSelector(selectSearch);
  const itemsVisibleProjects = useSelector(selectItemsVisibleProjects);
  const sort = useSelector(selectSort);
  const filterOpenSource = useSelector(selectFilterByOpenSource);
  const filterOnChain = useSelector(selectFilterByOnChain);

  const sortByUpvotes = (a, b) => {
    if (a.upvotedBy && b.upvotedBy) {
      return b.upvotedBy.length - a.upvotedBy.length;
    } else if (!a.upvotedBy && b.upvotedBy) {
      return 1;
    } else if (a.upvotedBy && !b.upvotedBy) {
      return -1;
    }
    return 0;
  };

  return (
    <div>
      {projects.length < 1 ? (
        <Loader />
      ) : (
        <ul className={css.li}>
          {projects
            // category
            .filter((project) => (category === "All" ? project : project.category === category))
            // search query
            .filter((project) => {
              if (search === "") {
                return project;
              } else if (
                project.name &&
                project.name.toLowerCase().includes(search.toLowerCase())
              ) {
                return project;
              }
            })
            // open source
            .filter((project) => {
              if (filterOpenSource === "all") {
                return project;
              } else if (filterOpenSource === "true") {
                return project.github !== "";
              } else if (filterOpenSource === "false") {
                return project.github === "";
              }
            })
            // on-chain
            .filter((project) => {
              if (filterOnChain === "all") {
                return project;
              } else if (filterOnChain === "true") {
                return project.canister !== "";
              } else if (filterOnChain === "false") {
                return project.canister === "";
              }
            })
            .sort((a, b) => (sort === "upvotes" ? sortByUpvotes(a, b) : null))
            .slice(0, itemsVisibleProjects)
            .map((project) => (
              <li className={css.liI} key={project.idx} onClick={() => toApp(project.id)}>
                <div className={css.main}>
                  {project.logo && (
                    <div className={css.logo}>
                      <img src={project.logo} alt={`${project.name} logo`} />
                    </div>
                  )}

                  <div className={css.caption}>
                    <h3 className={css.title}>{project.name}</h3>
                    <p className={css.description}>
                      {project.description && project.description.length > 70
                        ? `${project.description.substring(0, 70)}…`
                        : project.description}
                    </p>
                  </div>
                </div>

                <div className={css.tags}>
                  <ul>
                    {project.category && <li>{project.category}</li>}
                    {project.category === "NFTs" && project.nftSaleStatus === "Upcoming" && (
                      <li>{iRocket} Upcoming</li>
                    )}
                    {project.canister && <li>{iDatabase} On-Chain</li>}
                    {/* {project.github && <li>{iGithub} Open Source</li>} */}
                  </ul>
                </div>

                <div className={css.socials}>
                  <ul>
                    {project.twitter && <li>{iTwitter}</li>}
                    {project.discord && <li>{iDiscord}</li>}
                    {project.telegram && <li>{iTelegram}</li>}
                    {project.github && <li>{iGithub}</li>}
                    {project.medium && <li>{iMediumM}</li>}
                  </ul>
                </div>

                <div className={css.socialsIC}>
                  <ul>
                    {project.dscvr && <li>Dscvr</li>}
                    {project.distrikt && <li>Distrikt</li>}
                    {project.openChat && <li>OpenChat</li>}
                  </ul>
                </div>

                <div className={css.upvote}>
                  <div className={css.btn} onClick={(e) => e.stopPropagation()}>
                    <UpvtBtn idx={project.idx} upvotedBy={project.upvotedBy} />
                  </div>
                </div>
              </li>
            ))}
        </ul>
      )}
      {itemsVisibleProjects < projectsNum && (
        <LoadMoreBtn2 label="projects" size={64} setItemsVisible={setItemsVisibleProjects} />
      )}
    </div>
  );
};

export default AppList;
