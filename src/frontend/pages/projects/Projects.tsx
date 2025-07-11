import { Btn } from "@/components/btns"
import { TextInput2 } from "@/components/ui"
import { useProjects, useQueryParams } from "@/hooks"
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux"
import { selectSearchQ, setSearchQ } from "@/state/projects/searchQ"
import { ChangeEvent } from "react"
import styled from "styled-components"
import { Category, Filter, Pagination, ProjectList, Sort } from "."

export default function Projects() {
  const dispatch = useAppDispatch()
  const { queryParams } = useQueryParams()
  const { refreshPaginated } = useProjects()
  const searchQ = useAppSelector(selectSearchQ)

  const updateSearchQ = (e: ChangeEvent<HTMLInputElement>): void => {
    dispatch(setSearchQ(e.target.value))
  }

  const submitSearchQ = async (): Promise<void> => {
    try {
      await refreshPaginated({ ...queryParams, q: searchQ })
    } catch (error) {
      throw new Error(error)
    }
  }

  return (
    <ProjectsStyled>
      <h2 className="pageTitle">Discover New Projects</h2>

      <div className="search">
        <TextInput2 placeholder={"Search project by name"} value={searchQ} onChange={updateSearchQ} />
        <Btn style={{ height: "3.2rem" }} btnType={"secondary"} text={"Search"} onClick={submitSearchQ} />
      </div>

      {/* filters */}
      <Filters>
        <div className="item">
          <Category />
          <Filter filterId={"openSource"} label={"Open-source:"} filter={queryParams.openSource} />
          <Filter filterId={"onChain"} label={"On-chain:"} filter={queryParams.onChain} />
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

  > div.search {
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }
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
