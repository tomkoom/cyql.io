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

const ProjectList = () => {
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
            .map((p) => (
              <li className={css.liI} key={p.id} onClick={() => toApp(p.slug)}>
                <div className={css.main}>
                  {p.logo && (
                    <div className={css.logo}>
                      <img src={p.logo} alt={`${p.name} logo`} />
                    </div>
                  )}

                  <div className={css.caption}>
                    <h3 className={css.title}>{p.name}</h3>
                    <p className={css.description}>
                      {p.description && p.description.length > 70
                        ? `${p.description.substring(0, 70)}…`
                        : p.description}
                    </p>
                  </div>
                </div>

                <ul className={css.tags}>
                  {p.category.length > 0 && <li className={css.tagsI}>{p.category.join(", ")}</li>}
                  {p.category === "NFTs" && p.nftSaleStatus === "Upcoming" && (
                    <li className={css.tagsI}>{iRocket} Upcoming</li>
                  )}
                  {p.canister && <li className={css.tagsI}>{iDatabase} On-Chain</li>}
                  {p.github && <li className={css.tagsI}>{iGithub} Open Source</li>}
                </ul>

                <div className={css.socials}>
                  <ul>
                    {p.twitter && <li>{iTwitter}</li>}
                    {p.discord && <li>{iDiscord}</li>}
                    {p.telegram && <li>{iTelegram}</li>}
                    {p.github && <li>{iGithub}</li>}
                    {p.medium && <li>{iMediumM}</li>}
                  </ul>
                </div>

                <div className={css.socialsIC}>
                  <ul>
                    {p.dscvr && <li>Dscvr</li>}
                    {p.distrikt && <li>Distrikt</li>}
                    {p.openChat && <li>OpenChat</li>}
                  </ul>
                </div>

                <div className={css.upvote}>
                  <div className={css.btn} onClick={(e) => e.stopPropagation()}>
                    <UpvtBtn id={p.id} upvotedBy={p.upvotedBy} />
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

export default ProjectList;
