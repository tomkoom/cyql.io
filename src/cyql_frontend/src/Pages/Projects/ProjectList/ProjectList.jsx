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
import {
  selectFilterByOpenSource,
  selectFilterByOnChain,
  selectFilterByGrantee,
} from "@state/projects/filter";

const ProjectList = () => {
  const p = useSelector(selectProjects);
  const pNum = p.length;
  const itemsVisible = useSelector(selectItemsVisibleProjects);
  const sort = useSelector(selectSort);
  const category = useSelector(selectCategory);
  const sq = useSelector(selectSearch);
  const openSource = useSelector(selectFilterByOpenSource);
  const onChain = useSelector(selectFilterByOnChain);
  const grantee = useSelector(selectFilterByGrantee);

  // sort
  const sortNewest = (a, b) => (a && b ? b - a : !a && b ? 1 : a && !b ? -1 : 0);
  const sortOldest = (a, b) => (a && b ? a - b : !a && b ? -1 : a && !b ? 1 : 0);
  const sortMostUp = (a, b) => (a && b ? b.length - a.length : !a && b ? 1 : a && !b ? -1 : 0);
  const sortLeastUp = (a, b) => (a && b ? a.length - b.length : !a && b ? -1 : a && !b ? 1 : 0);

  // filter
  const bySearch = (p) => (sq === "" ? p : p.name.toLowerCase().includes(sq.toLowerCase()));
  const byCategory = (p) => (category === "All" ? p : p.category.includes(category));
  const byOpenSource = (p) => (openSource === null ? p : openSource ? p.github : !p.github);
  const byOnChain = (p) => (onChain === null ? p : onChain ? p.canister : !p.canister);
  const byGrantee = (p) => (grantee === null ? p : grantee ? p.grantee : !p.canister);

  return (
    <div>
      {p.length < 1 ? (
        <Loader />
      ) : (
        <ul className={css.li}>
          {p
            .filter((p) => bySearch(p))
            .filter((p) => byCategory(p))
            .filter((p) => byOpenSource(p))
            .filter((p) => byOnChain(p))
            .filter((p) => byGrantee(p))
            .sort((a, b) => sort === "newest-first" && sortNewest(a.added, b.added))
            .sort((a, b) => sort === "oldest-first" && sortOldest(a.added, b.added))
            .sort((a, b) => sort === "most-upvoted" && sortMostUp(a.upvotedBy, b.upvotedBy))
            .sort((a, b) => sort === "least-upvoted" && sortLeastUp(a.upvotedBy, b.upvotedBy))
            .slice(0, itemsVisible)
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
      {itemsVisible < pNum && (
        <LoadMoreBtn2 label="projects" size={64} setItemsVisible={setItemsVisibleProjects} />
      )}
    </div>
  );
};

export default ProjectList;
