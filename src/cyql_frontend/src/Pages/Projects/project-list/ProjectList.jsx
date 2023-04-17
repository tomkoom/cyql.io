import React from "react";
import css from "./ProjectList.module.css";

// routes
import { toApp } from "@routes/routes";

// components
import { LoadMoreBtn, UpvoteBtn } from "@btns/index";
import Loader from "@components/Loader/Loader";
import { Main, Socials, SocialsIc, Tags } from "./index";

// state
import { useSelector } from "react-redux";
import { selectCategory } from "@state/projects/category";
import { selectSearch } from "@state/projects/search";
import { setItemsVisibleProjects, selectItemsVisibleProjects } from "@state/loadMore";
import { selectSort } from "@state/projects/sort";
import {
  selectFilterByOpenSource,
  selectFilterByOnChain,
  selectFilterByGrantee,
} from "@state/projects/filter";
import { selectProjectsDocs, selectProjectsNum } from "@state/projects";

// utils: sort, filter
import { sortNewest, sortOldest, sortMostUp, sortLeastUp } from "./utils/sortProjects";
import {
  filterBySearch,
  filterByCategory,
  filterByOpenSource,
  filterByOnChain,
  filterByGrantee,
} from "./utils/filterProjects";

const ProjectList = () => {
  // projects
  const projectsDocs = useSelector(selectProjectsDocs);
  const projectsNum = useSelector(selectProjectsNum);
  const itemsVisible = useSelector(selectItemsVisibleProjects);

  // sorting, filtering, etc
  const searchQuery = useSelector(selectSearch);
  const category = useSelector(selectCategory);
  const openSource = useSelector(selectFilterByOpenSource);
  const onChain = useSelector(selectFilterByOnChain);
  const grantee = useSelector(selectFilterByGrantee);
  const sort = useSelector(selectSort);

  return (
    <div>
      {projectsDocs.length < 1 ? (
        <Loader />
      ) : (
        <ul className={css.li}>
          {projectsDocs
            .filter((projectDoc) => filterBySearch(projectDoc, searchQuery))
            .filter((projectDoc) => filterByCategory(projectDoc, category))
            .filter((projectDoc) => filterByOpenSource(projectDoc, openSource))
            .filter((projectDoc) => filterByOnChain(projectDoc, onChain))
            .filter((projectDoc) => filterByGrantee(projectDoc, grantee))
            .sort((a, b) => sort === "newest-first" && sortNewest(a.data.added, b.data.added))
            .sort((a, b) => sort === "oldest-first" && sortOldest(a.data.added, b.data.added))
            .sort(
              (a, b) => sort === "most-upvoted" && sortMostUp(a.data.upvotedBy, b.data.upvotedBy)
            )
            .sort(
              (a, b) => sort === "least-upvoted" && sortLeastUp(a.data.upvotedBy, b.data.upvotedBy)
            )
            .slice(0, itemsVisible)
            .map((p) => (
              <li className={css.liI} key={p.key} onClick={() => toApp(p.data.slug)}>
                <div className={css.main}>
                  <Main
                    logo={p.data.logo}
                    name={p.data.name}
                    description={p.data.description}
                    github={p.data.github}
                    canister={p.data.canister}
                    grantee={p.data.grantee}
                  />
                </div>

                <div className={css.tags}>
                  <Tags category={p.data.category} nftSaleStatus={p.data.nftSaleStatus} />
                </div>

                <div className={css.socials}>
                  <Socials
                    twitter={p.data.twitter}
                    discord={p.data.discord}
                    telegram={p.data.telegram}
                    github={p.data.github}
                    medium={p.data.medium}
                  />
                </div>

                <div className={css.socials}>
                  <SocialsIc
                    dscvr={p.data.dscvr}
                    distrikt={p.data.distrikt}
                    openChat={p.data.openChat}
                    taggr={p.data.taggr}
                    seers={p.data.seers}
                    nuance={p.data.nuance}
                    catalyze={p.data.catalyze}
                  />
                </div>

                {/* upvote btn */}
                {/* <div className={css.upvote}>
                  <div className={css.btn} onClick={(e) => e.stopPropagation()}>
                    <UpvoteBtn id={p.key} upvotedBy={p.data.upvotedBy} />
                  </div>
                </div> */}
              </li>
            ))}
        </ul>
      )}
      {itemsVisible < projectsNum && (
        <LoadMoreBtn label="projects" size={64} setItemsVisible={setItemsVisibleProjects} />
      )}
    </div>
  );
};

export default ProjectList;
