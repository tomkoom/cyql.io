import React from "react";
import css from "./ProjectList.module.css";

// hooks
import useNav from "@/hooks/useNav";

// components
import { LoadMoreBtn, UpvoteBtn } from "@/components/btns/_index";
import { Loading, Spinner } from "@/components/ui/_index";
import { Main, Socials, SocialsIc, Tags } from "./_index";

// state
import { useAppSelector } from "@/hooks/useRedux";
import { selectCategory } from "@/state/projects/category";
import { selectSearch } from "@/state/projects/search";
import { setItemsVisibleProjects, selectItemsVisibleProjects } from "@/state/ui/loadMore";
import { selectSort } from "@/state/projects/sort";
import {
  selectFilterByOpenSource,
  selectFilterByOnChain,
  selectFilterByGrantee,
} from "@/state/projects/filter";
import { selectProjectsDocsActive } from "@/state/projects";

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
  const { toProject } = useNav();

  // projects
  const projects = useAppSelector(selectProjectsDocsActive);
  const projectsNum = projects.length;
  const itemsVisible = useAppSelector(selectItemsVisibleProjects);

  // search
  const searchQuery = useAppSelector(selectSearch);

  // filter
  const category = useAppSelector(selectCategory);
  const openSource = useAppSelector(selectFilterByOpenSource);
  const onChain = useAppSelector(selectFilterByOnChain);
  const grantee = useAppSelector(selectFilterByGrantee);

  // sort
  const sort = useAppSelector(selectSort);

  if (projects.length < 1) {
    return <Loading />;
  }

  return (
    <div>
      {projects.length < 1 ? (
        <Spinner />
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
              <li className={css.liI} key={p.key} onClick={() => toProject(p.data.slug)}>
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
