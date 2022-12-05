import React from "react";
import css from "./ProjectList.module.css";

// icons
import { iDatabase, iRocket } from "@icons/Icons";
import { iTwitter, iDiscord, iTelegram, iGithub, iMediumM } from "@icons/Icons";

// routes
import { toApp } from "@routes/routes";

// components
import { LoadMoreBtn2, UpvtBtn } from "@components/index";
import Loader from "@components/Loader/Loader";

// state
import { useSelector } from "react-redux";
import { selectProjects } from "@state/projects";
import { selectCategory } from "@state/projects/category";
import { selectSearch } from "@state/projects/search";
import { selectItemsVisibleProjects, setItemsVisibleProjects } from "@state/loadMore";
import { selectSort } from "@state/projects/sort";
import { selectFilterByOpenSource, selectFilterByOnChain } from "@state/projects/filter";

const AppList = () => {
  const p = useSelector(selectProjects);
  const pNum = p.length;
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
      {p.length < 1 ? (
        <Loader />
      ) : (
        <ul className={css.li}>
          {p
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
              <li className={css.liI} key={project.id} onClick={() => toApp(project.slug)}>
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
                    <UpvtBtn id={project.id} upvotedBy={project.upvotedBy} />
                  </div>
                </div>
              </li>
            ))}
        </ul>
      )}
      {itemsVisibleProjects < pNum && (
        <LoadMoreBtn2 label="projects" size={64} setItemsVisible={setItemsVisibleProjects} />
      )}
    </div>
  );
};

export default AppList;
