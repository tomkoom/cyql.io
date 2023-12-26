import React, { FC } from "react"
import styled from "styled-components"

// components
import { Category, Filter, ProjectList, Sort } from "./_index"
import { Search } from "@/components/ui/_index"

// state
import { useAppSelector, useAppDispatch } from "@/hooks/useRedux"
import { selectSearch, setSearch } from "@/state/projects/search"
import {
  setFilterByOnChain,
  selectFilterByOnChain,
  setFilterByOpenSource,
  selectFilterByOpenSource,
  setFilterByGrantee,
  selectFilterByGrantee,
} from "@/state/projects/filter"

const Projects: FC = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const searchQuery = useAppSelector(selectSearch)
  const filterByOpenSource = useAppSelector(selectFilterByOpenSource)
  const filterByOnChain = useAppSelector(selectFilterByOnChain)
  const filterByGrantee = useAppSelector(selectFilterByGrantee)

  const setProjectsSearch = (e) => {
    dispatch(setSearch(e.target.value))
  }

  return (
    <ProjectsStyled>
      <h2 className="pageTitle">discover new projects</h2>
      <Search
        placeholder={"search by project name"}
        value={searchQuery}
        onChange={setProjectsSearch}
      />

      {/* controls */}
      <Controls>
        <div className="item">
          <Category />
          <Filter
            label={"open-source:"}
            filter={filterByOpenSource}
            setFilter={setFilterByOpenSource}
          />
          <Filter label={"onchain:"} filter={filterByOnChain} setFilter={setFilterByOnChain} />
          <Filter label={"grantee:"} filter={filterByGrantee} setFilter={setFilterByGrantee} />
        </div>

        <div className="item">
          <Sort />
        </div>
      </Controls>
      <ProjectList />
    </ProjectsStyled>
  )
}

const ProjectsStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 4rem;
`

const Controls = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.25rem;

  > div.item {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
`

export default Projects
