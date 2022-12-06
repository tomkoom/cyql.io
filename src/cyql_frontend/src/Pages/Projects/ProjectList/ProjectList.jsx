import React from "react";
import css from "./ProjectList.module.css";

// routes
import { toApp } from "@routes/routes";

// components
import { LoadMoreBtn2, UpvtBtn } from "@components/index";
import Loader from "@components/Loader/Loader";
import { Main, Socials, SocialsIc, Tags } from "./index";

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
            .filter((p) => (category === "All" ? p : p.category.includes(category)))
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
            .filter((p) => {
              if (filterOpenSource === "all") {
                return p;
              } else if (filterOpenSource === "true") {
                return p.github !== "";
              } else if (filterOpenSource === "false") {
                return p.github === "";
              }
            })
            // on-chain
            .filter((p) => {
              if (filterOnChain === "all") {
                return p;
              } else if (filterOnChain === "true") {
                return p.canister !== "";
              } else if (filterOnChain === "false") {
                return p.canister === "";
              }
            })
            .sort((a, b) => (sort === "upvotes" ? sortByUpvotes(a, b) : null))
            .slice(0, itemsVisibleProjects)
            .map((p) => (
              <li className={css.liI} key={p.id} onClick={() => toApp(p.slug)}>
                <div className={css.main}>
                  <Main logo={p.logo} name={p.name} description={p.description} />
                </div>

                <div className={css.tags}>
                  <Tags
                    category={p.category}
                    nftSaleStatus={p.nftSaleStatus}
                    canister={p.canister}
                    github={p.github}
                  />
                </div>

                <div className={css.socials}>
                  <Socials
                    twitter={p.twitter}
                    discord={p.discord}
                    telegram={p.telegram}
                    github={p.github}
                    medium={p.medium}
                  />
                </div>

                <div className={css.socials}>
                  <SocialsIc dscvr={p.dscvr} distrikt={p.distrikt} openChat={p.openChat} />
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
