import React, { FC, useState, useEffect } from "react"
import styled from "styled-components"
import { useDebounceCallback } from "usehooks-ts"
import { useQueryParams } from "@/hooks/_index"

// components
import { Category, Filter, ProjectList, Sort, Pagination } from "./_index"
import { TextInput2 } from "@/components/ui/_index"

const Projects: FC = (): JSX.Element => {
  const [search, setSearch] = useState("")
  const { updateQueryParam, refreshProjectsParams } = useQueryParams()
  const debounced = useDebounceCallback(setSearch, 400)

  useEffect(() => {
    updateQueryParam("q", search)
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
            filterId={"openSource"}
            label={"Open-source:"}
            filter={refreshProjectsParams.openSource}
          />
          <Filter filterId={"onChain"} label={"On-chain:"} filter={refreshProjectsParams.onChain} />
        </div>

        <div className="item">
          <Sort />
        </div>
      </Filters>

      {/* table */}
      <Pagination />
      <ProjectList />
      <Pagination />
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
