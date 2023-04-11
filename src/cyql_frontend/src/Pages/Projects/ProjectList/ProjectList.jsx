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
import { selectCategory } from "@state/projects/category";
import { selectSearch } from "@state/projects/search";
import { setItemsVisibleProjects, selectItemsVisibleProjects } from "@state/loadMore";
import { selectSort } from "@state/projects/sort";
import {
  selectFilterByOpenSource,
  selectFilterByOnChain,
  selectFilterByGrantee,
} from "@state/projects/filter";
import { selectJunoProjects } from "@state/junoProjects";

const ProjectList = () => {
  // projects
  const projects = useSelector(selectJunoProjects);
  const projectsNum = projects.length;
  const itemsVisible = useSelector(selectItemsVisibleProjects);

  // sorting, filtering, etc
  const searchQuery = useSelector(selectSearch);
  const category = useSelector(selectCategory);
  const openSource = useSelector(selectFilterByOpenSource);
  const onChain = useSelector(selectFilterByOnChain);
  const grantee = useSelector(selectFilterByGrantee);
  const sort = useSelector(selectSort);

  // sort
  const sortNewest = (a, b) => (a && b ? b - a : !a && b ? 1 : a && !b ? -1 : 0);
  const sortOldest = (a, b) => (a && b ? a - b : !a && b ? -1 : a && !b ? 1 : 0);
  const sortMostUp = (a, b) => (a && b ? b.length - a.length : !a && b ? 1 : a && !b ? -1 : 0);
  const sortLeastUp = (a, b) => (a && b ? a.length - b.length : !a && b ? -1 : a && !b ? 1 : 0);

  // filter
  const filterBySearch = (p) =>
    searchQuery === "" ? p : p.name.toLowerCase().includes(searchQuery.toLowerCase());
  const filterByCategory = (p) => (category === "All" ? p : p.category.includes(category));
  const filterByOpenSource = (p) => (openSource === null ? p : openSource ? p.github : !p.github);
  const filterByOnChain = (p) => (onChain === null ? p : onChain ? p.canister : !p.canister);
  const filterByGrantee = (p) => (grantee === null ? p : grantee ? p.grantee : !p.canister);

  return (
    <div>
      {projects.length < 1 ? (
        <Loader />
      ) : (
        <ul className={css.li}>
          {projects
            .filter((p) => filterBySearch(p))
            .filter((p) => filterByCategory(p))
            .filter((p) => filterByOpenSource(p))
            .filter((p) => filterByOnChain(p))
            .filter((p) => filterByGrantee(p))
            .sort((a, b) => sort === "newest-first" && sortNewest(a.added, b.added))
            .sort((a, b) => sort === "oldest-first" && sortOldest(a.added, b.added))
            .sort((a, b) => sort === "most-upvoted" && sortMostUp(a.upvotedBy, b.upvotedBy))
            .sort((a, b) => sort === "least-upvoted" && sortLeastUp(a.upvotedBy, b.upvotedBy))
            .slice(0, itemsVisible)
            .map((p) => (
              <li className={css.liI} key={p.__id__} onClick={() => toApp(p.slug)}>
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
                  <SocialsIc
                    dscvr={p.dscvr}
                    distrikt={p.distrikt}
                    openChat={p.openChat}
                    taggr={p.taggr}
                    seers={p.seers}
                    nuance={p.nuance}
                    catalyze={p.catalyze}
                  />
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
      {itemsVisible < projectsNum && (
        <LoadMoreBtn2 label="projects" size={64} setItemsVisible={setItemsVisibleProjects} />
      )}
    </div>
  );
};

export default ProjectList;
