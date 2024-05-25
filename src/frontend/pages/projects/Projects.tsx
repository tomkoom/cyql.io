import React, { FC, useState, useEffect } from "react"
import styled from "styled-components"
import { useSearchParams } from "react-router-dom"
import { PROJECTS_SEARCH_PARAMS_INITIAL } from "@/constants/constants"
import { useDebounceCallback } from "usehooks-ts"

// components
import { Category, Filter, ProjectList, Sort, Pagination } from "./_index"
import { TextInput2 } from "@/components/ui/_index"

// state
import { useAppSelector } from "@/hooks/useRedux"
import {
  setFilterByOnChain,
  selectFilterByOnChain,
  setFilterByOpenSource,
  selectFilterByOpenSource,
} from "@/state/projects/filter"
import { selectActiveCuratedProjectsNum } from "@/state/curatedProjects"

const Projects: FC = (): JSX.Element => {
  const [search, setSearch] = useState("")
  const debounced = useDebounceCallback(setSearch, 400)
  const [searchParams, setSearchParams] = useSearchParams(PROJECTS_SEARCH_PARAMS_INITIAL)
  const searchQ = searchParams.get("q")
  const projectsNum = useAppSelector(selectActiveCuratedProjectsNum)

  // filter
  const filterByOpenSource = useAppSelector(selectFilterByOpenSource)
  const filterByOnChain = useAppSelector(selectFilterByOnChain)

  useEffect(() => {
    return setSearchParams(
      (prev) => {
        prev.set("q", search)
        return prev
      },
      { replace: true }
    )
  }, [search])

  return (
    <ProjectsStyled>
      <h2 className="pageTitle">Discover New Projects</h2>
      <TextInput2
        placeholder={"Search project by name"}
        defaultValue={search}
        onChange={(event) => debounced(event.target.value)}
      />

      {/* filters */}
      <Filters>
        <div className="item">
          <Category />
          <Filter
            label={"Open-source:"}
            filter={filterByOpenSource}
            setFilter={setFilterByOpenSource}
          />
          <Filter label={"Onchain:"} filter={filterByOnChain} setFilter={setFilterByOnChain} />
        </div>

        <div className="item">
          <Sort />
        </div>
      </Filters>

      {/* table */}
      {projectsNum > 0 && !searchQ && <Pagination />}
      <ProjectList searchQ={searchQ} />
      {projectsNum > 0 && !searchQ && <Pagination />}
    </ProjectsStyled>
  )
}

const ProjectsStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 4rem;
`

const Filters = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.25rem;
  margin-top: 0.25rem;

  > div.item {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: wrap;
    gap: 0.25rem;
  }
`

export default Projects
