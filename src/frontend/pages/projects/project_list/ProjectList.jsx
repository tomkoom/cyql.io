import React from "react"
import css from "./ProjectList.module.css"

// utils
import { sortNewest, sortOldest, sortMostUp, sortLeastUp } from "./utils/sortProjects"
import {
  filterBySearch,
  filterByCategory,
  filterByOpenSource,
  filterByOnChain,
  filterByGrantee,
} from "./utils/filterProjects"

// hooks
import useNav from "@/hooks/useNav"

// components
import { LoadMoreBtn /* UpvoteBtn */ } from "@/components/btns/_index"
import { Loading, Spinner } from "@/components/ui/_index"
import { Main, Socials, SocialsIc, Tags } from "./_index"

// state
import { useAppSelector, useAppDispatch } from "@/hooks/useRedux"
import { selectCategory } from "@/state/projects/category"
import { selectSearch } from "@/state/projects/search"
import { setItemsVisibleProjects, selectItemsVisibleProjects } from "@/state/ui/loadMore"
import { selectSort } from "@/state/projects/sort"
import {
  selectFilterByOpenSource,
  selectFilterByOnChain,
  selectFilterByGrantee,
} from "@/state/projects/filter"
import { selectActiveProjects } from "@/state/projects"

const ProjectList = () => {
  const dispatch = useAppDispatch()
  const { toProject } = useNav()

  // projects
  const projects = useAppSelector(selectActiveProjects)
  const projectsNum = projects.length
  const itemsVisible = useAppSelector(selectItemsVisibleProjects)

  // search
  const searchQuery = useAppSelector(selectSearch)

  // filter
  const category = useAppSelector(selectCategory)
  const openSource = useAppSelector(selectFilterByOpenSource)
  const onChain = useAppSelector(selectFilterByOnChain)
  const grantee = useAppSelector(selectFilterByGrantee)

  // sort
  const sort = useAppSelector(selectSort)

  const setItemsVisible = (size) => {
    dispatch(setItemsVisibleProjects(size))
  }

  if (projects.length < 1) {
    return <Loading />
  }

  return (
    <div>
      <ul className={css.li}>
        {projects
          // filter
          .filter((project) => filterBySearch(project, searchQuery))
          .filter((project) => filterByCategory(project, category))
          .filter((project) => filterByOpenSource(project, openSource))
          .filter((project) => filterByOnChain(project, onChain))
          .filter((project) => filterByGrantee(project, grantee))

          // sort
          .sort((a, b) => (sort === "newest-first" ? sortNewest(a.createdAt, b.createdAt) : null))
          .sort((a, b) => (sort === "oldest-first" ? sortOldest(a.createdAt, b.createdAt) : null))
          .sort((a, b) => (sort === "most-upvoted" ? sortMostUp(a.upvotedBy, b.upvotedBy) : null))
          .sort((a, b) => (sort === "least-upvoted" ? sortLeastUp(a.upvotedBy, b.upvotedBy) : null))
          .slice(0, itemsVisible)
          .map((p) => (
            <li key={p.id} className={css.liI} onClick={() => toProject(p.id)}>
              <div className={css.main}>
                <Main
                  logo={p.logo}
                  name={p.name}
                  description={p.description}
                  github={p.github}
                  canister={p.canister}
                  grantee={p.grantee}
                />
              </div>

              <div className={css.tags}>
                <Tags category={p.category} nftSaleStatus={p.nftSaleStatus} />
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
                  openchat={p.openchat}
                  taggr={p.taggr}
                  seers={p.seers}
                  nuance={p.nuance}
                  catalyze={p.catalyze}
                  funded={p.funded}
                />
              </div>

              {/* upvote btn */}
              {/* <div className={css.upvote}>
                  <div className={css.btn} onClick={(e) => e.stopPropagation()}>
                    <UpvoteBtn id={p.id} upvotedBy={p.upvotedBy} />
                  </div>
                </div> */}
            </li>
          ))}
      </ul>

      {itemsVisible < projectsNum && <LoadMoreBtn setVisible={() => setItemsVisible(64)} />}
    </div>
  )
}

export default ProjectList
