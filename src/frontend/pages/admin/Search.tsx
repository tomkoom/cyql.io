import React, { FC, useEffect, ChangeEvent } from "react"
import styled from "styled-components"
import { TextInput2 } from "@/components/ui/_index"
import { useAuth } from "@/context/Auth"
import { KEY } from "@/constants/constants"
import { Btn } from "@/components/btns"
import { useProjects, useQueryParams } from "@/hooks"

// state
import { useAppSelector, useAppDispatch } from "@/hooks/useRedux"
import { selectAdmin, setAdminSearchQ, setAdminSearchQProjects } from "@/state/admin/admin"
import { selectPaginated } from "@/state/projects/paginated"

const Search: FC = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const { actor } = useAuth()
  const { refreshPaginated } = useProjects()
  const { queryParams } = useQueryParams()
  const searchQ = useAppSelector(selectAdmin).searchQ
  const projects = useAppSelector(selectPaginated).data

  const setSearch = (e: ChangeEvent<HTMLInputElement>): void => {
    dispatch(setAdminSearchQ(e.target.value))
  }

  const getBySearchQ = async (searchQ: string): Promise<void> => {
    try {
      if (searchQ) {
        const res = await actor.getProjectsBySearchQ(KEY, searchQ)
        const serialized = res.map((p) => ({ ...p, id: String(p.id) }))
        dispatch(setAdminSearchQProjects(serialized))
      } else {
        dispatch(setAdminSearchQProjects([]))
      }
    } catch (error) {
      throw new Error(error)
    }
  }

  useEffect(() => {
    if (actor) {
      if (projects.length < 1) {
        refreshPaginated(queryParams)
      }
    }
  }, [actor])

  return (
    <SearchStyled>
      <TextInput2 placeholder={"Search by project name"} value={searchQ} onChange={setSearch} />
      <Btn style={{ height: "3.2rem" }} btnType={"secondary"} text={"Search"} onClick={() => getBySearchQ(searchQ)} />
    </SearchStyled>
  )
}

const SearchStyled = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

export default Search
