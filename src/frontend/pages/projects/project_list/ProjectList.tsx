import React, { FC, useEffect } from "react"
import styled from "styled-components"
import { device } from "@/styles/breakpoints"
import useNav from "@/hooks/useNav"
import { useSearchParams } from "react-router-dom"

// utils
import { sortNewest, sortOldest, sortMostUp, sortLeastUp } from "./utils/sortProjects"
import {
  filterBySearch,
  filterByCategory,
  filterByOpenSource,
  filterByOnChain,
  filterByGrantee,
} from "./utils/filterProjects"

// components
import { LoadMoreBtn, UpvoteBtn } from "@/components/btns/_index"
import { Loading } from "@/components/ui/_index"
import { Main, Socials, SocialsIc, Tags } from "./_index"

// state
import { useAppSelector, useAppDispatch } from "@/hooks/useRedux"
import { selectCategory } from "@/state/projects/category"
import { selectSearch } from "@/state/projects/search"
import { setItemsVisibleProjects, selectItemsVisibleProjects } from "@/state/loadMore"
import { selectSort } from "@/state/projects/sort"
import {
  selectFilterByOpenSource,
  selectFilterByOnChain,
  selectFilterByGrantee,
} from "@/state/projects/filter"
import { selectActiveProjects, selectActiveProjectsNum } from "@/state/projects"

const ProjectList: FC = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const { toProject } = useNav()
  const [searchParams, setSearchParams] = useSearchParams()
  const search = useAppSelector(selectSearch)
  const sort = useAppSelector(selectSort)

  // projects
  const projects = useAppSelector(selectActiveProjects)
  const projectsNum = useAppSelector(selectActiveProjectsNum)
  const itemsVisible = useAppSelector(selectItemsVisibleProjects)

  // filter
  const category = useAppSelector(selectCategory)
  const openSource = useAppSelector(selectFilterByOpenSource)
  const onChain = useAppSelector(selectFilterByOnChain)
  const grantee = useAppSelector(selectFilterByGrantee)

  const setItemsVisible = (): void => {
    const items = 64
    dispatch(setItemsVisibleProjects(items))
  }

  const updateCategory = (category: string): void => {
    const key = "category"
    const value = category
    setSearchParams((searchParams) => {
      searchParams.set(key, value)
      return searchParams
    })
  }

  useEffect(() => {
    updateCategory(category)
  }, [category])

  if (projects.length < 1) {
    return <Loading />
  }

  return (
    <ProjectListStyled>
      <ul>
        {projects
          // filter
          .filter((project) => filterBySearch(project, search))
          .filter((project) => filterByCategory(project, category))
          .filter((project) => filterByOpenSource(project, openSource))
          .filter((project) => filterByOnChain(project, onChain))
          .filter((project) => filterByGrantee(project, grantee))

          // sort
          .sort((a, b) =>
            sort === "newest-first" ? sortNewest(Number(a.createdAt), Number(b.createdAt)) : null
          )
          .sort((a, b) =>
            sort === "oldest-first" ? sortOldest(Number(a.createdAt), Number(b.createdAt)) : null
          )
          .sort((a, b) =>
            sort === "most-upvoted" ? sortMostUp(a.upvotedBy.length, b.upvotedBy.length) : null
          )
          .sort((a, b) =>
            sort === "least-upvoted" ? sortLeastUp(a.upvotedBy.length, b.upvotedBy.length) : null
          )
          .slice(0, itemsVisible)
          .map((p) => (
            <li key={p.id} onClick={() => toProject(p.id)}>
              <div className="main1">
                <Main project={p} />
              </div>

              <div className="tags">
                <Tags category={p.category} />
              </div>

              <div className="socials">
                <Socials project={p} />
              </div>

              <div className="socials">
                <SocialsIc project={p} />
              </div>

              <div className="upvote">
                <div className="btn" onClick={(e) => e.stopPropagation()}>
                  <UpvoteBtn projectId={p.id} location={""} upvotedBy={p.upvotedBy} />
                </div>
              </div>
            </li>
          ))}
      </ul>

      {itemsVisible < projectsNum && <LoadMoreBtn setVisible={setItemsVisible} />}
    </ProjectListStyled>
  )
}

const ProjectListStyled = styled.div`
  > ul {
    display: flex;
    flex-direction: column;
    margin-top: 0.5rem;

    > li {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
      padding: 0.5rem 0;
      box-shadow: 0px 1px 0px 0px var(--underlay1);
      cursor: pointer;

      &:hover {
        background-color: var(--underlay1);
      }

      @media ${device.tablet} {
        flex-direction: column;
        align-items: center;
      }

      > div.main1 {
        flex: 40%;

        @media ${device.tablet} {
          flex: calc(60% - 1rem);
        }

        @media ${device.mobileL} {
          flex: 100%;
        }
      }

      > div.tags {
        flex: 20%;

        @media ${device.tablet} {
          flex: calc(30% - 1rem);
        }

        @media ${device.mobileL} {
          flex: calc(80% - 0.5rem);
        }
      }

      > div.socials {
        flex: 15%;

        @media ${device.tablet} {
          display: none;
        }
      }

      > div.upvote {
        flex: 10%;
        display: inline-block;

        > div.btn {
          float: right;
          margin-right: 1px;
        }

        @media ${device.tablet} {
          flex: calc(10% - 1rem);
        }

        @media ${device.mobileL} {
          flex: calc(20% - 0.5rem);
        }
      }
    }
  }
`

export default ProjectList
