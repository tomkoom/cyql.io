import React, { FC, useState, useEffect } from "react"
import styled from "styled-components"
import { useSearchParams } from "react-router-dom"
import { PROJECTS_SEARCH_PARAMS_INITIAL } from "@/constants/constants"
import { useDebounceCallback } from "usehooks-ts"

// components
import { Category, Filter, ProjectList, Sort } from "./_index"
import { TextInput } from "@/components/ui/_index"

// state
import { useAppSelector } from "@/hooks/useRedux"
import {
  setFilterByOnChain,
  selectFilterByOnChain,
  setFilterByOpenSource,
  selectFilterByOpenSource,
  selectFilterByGrantee,
} from "@/state/projects/filter"

const Projects: FC = (): JSX.Element => {
  const [search, setSearch] = useState("")
  const debounced = useDebounceCallback(setSearch, 500)
  const [searchParams, setSearchParams] = useSearchParams(PROJECTS_SEARCH_PARAMS_INITIAL)
  const searchQ = searchParams.get("q")

  // filter
  const filterByOpenSource = useAppSelector(selectFilterByOpenSource)
  const filterByOnChain = useAppSelector(selectFilterByOnChain)
  const filterByGrantee = useAppSelector(selectFilterByGrantee)

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
      <h2 className="pageTitle">discover new projects</h2>
      <TextInput
        placeholder={"Search project by name"}
        defaultValue={search}
        onChange={(event) => debounced(event.target.value)}
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
        </div>

        <div className="item">
          <Sort />
        </div>
      </Controls>
      <ProjectList searchQ={searchQ} />
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
