import React from "react";
import css from "./ProjectList.module.css";

// routes
import { toApp } from "@routes/routes";

// components
import { LoadMoreBtn, UpvoteBtn } from "@btns/index";
import { Loader } from "@ui-elements/index";
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
import { selectProjectsDocsActive } from "@state/projects";

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
  const projects = useSelector(selectProjectsDocsActive);
  const projectsNum = projects.length;
  const itemsVisible = useSelector(selectItemsVisibleProjects);

  // search
  const searchQuery = useSelector(selectSearch);

  // filter
  const category = useSelector(selectCategory);
  const openSource = useSelector(selectFilterByOpenSource);
  const onChain = useSelector(selectFilterByOnChain);
  const grantee = useSelector(selectFilterByGrantee);

  // sort
  const sort = useSelector(selectSort);

  return (
    <div>
      {projects.length < 1 ? (
        <Loader />
      ) : (
        <ul className={css.li}>
          {projects
            .filter((project) => filterBySearch(project, searchQuery))
            .filter((project) => filterByCategory(project, category))
            .filter((project) => filterByOpenSource(project, openSource))
            .filter((project) => filterByOnChain(project, onChain))
            .filter((project) => filterByGrantee(project, grantee))
            .sort((a, b) =>
              sort === "newest-first" ? sortNewest(a.data.added, b.data.added) : null
            )
            .sort((a, b) =>
              sort === "oldest-first" ? sortOldest(a.data.added, b.data.added) : null
            )
            .sort((a, b) =>
              sort === "most-upvoted" ? sortMostUp(a.data.upvotes, b.data.upvotes) : null
            )
            .sort((a, b) =>
              sort === "least-upvoted" ? sortLeastUp(a.data.upvotes, b.data.upvotes) : null
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
                  <Tags categories={p.data.categories} nftSaleStatus={p.data.nftSaleStatus} />
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
                    openchat={p.data.openchat}
                    taggr={p.data.taggr}
                    seers={p.data.seers}
                    nuance={p.data.nuance}
                    catalyze={p.data.catalyze}
                    funded={p.data.funded}
                  />
                </div>

                {/* upvote btn */}
                {/* <div className={css.upvote}>
                  <div className={css.btn} onClick={(e) => e.stopPropagation()}>
                    <UpvoteBtn id={p.key} upvotes={p.data.upvotes} />
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
