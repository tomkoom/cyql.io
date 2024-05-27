import React, { useEffect, useRef } from "react"
import styled from "styled-components"
import { iCheck } from "@/components/icons/Icons"
import type { SortOptions } from "../../../../declarations/backend/backend.did"
import { useBackend } from "@/hooks/useBackend"
import { LoadingModal } from "@/modals/_index"
import { useSearchParams } from "react-router-dom"
import { RefreshProjectsArgs } from "@/state/_types/curated_projects_types"

// state
import { useAppSelector, useAppDispatch } from "@/hooks/useRedux"
import { selectSort, setSort } from "@/state/projects/sort"
import { selectPaginated, selectPaginatedIsLoading } from "@/state/projects/paginated"

const sortItems = [
  { label: "Newest first", value: { newest_first: null } },
  { label: "Oldest first", value: { oldest_first: null } },
  { label: "Most upvoted", value: { most_upvoted: null } },
  { label: "Least upvoted", value: { least_upvoted: null } },
  { label: "Recently updated", value: { recently_updated: null } },
]

const SortOpt = ({ openSort, setOpenSort, sortBtnWidth, sortBtnRef }): JSX.Element => {
  const dispatch = useAppDispatch()
  const sortOptionsRef = useRef(null)
  const { refreshPaginated } = useBackend()
  const sort = useAppSelector(selectSort)
  const style = { width: `${sortBtnWidth.toString()}px` }

  // pagination
  const paginated = useAppSelector(selectPaginated)
  const page = paginated.selectedPage
  const itemsPerPage = paginated.itemsPerPage
  const isLoading = useAppSelector(selectPaginatedIsLoading)

  // category
  const [searchParams, setSearchParams] = useSearchParams()
  // const [searchParams, setSearchParams] = useSearchParams(PROJECTS_SEARCH_PARAMS_INITIAL)
  const category = searchParams.get("category")

  const handleOutsideClick = (e) => {
    if (
      openSort &&
      sortOptionsRef.current &&
      !sortOptionsRef.current.contains(e.target) &&
      sortBtnRef.current &&
      !sortBtnRef.current.contains(e.target)
    ) {
      setOpenSort(false)
    }
  }

  useEffect(() => {
    // bind the event listener
    document.addEventListener("mousedown", handleOutsideClick)
    return () => {
      // unbind the event listener on clean up
      document.removeEventListener("mousedown", handleOutsideClick)
    }
  }, [openSort])

  const clickSort = async (sort: SortOptions): Promise<void> => {
    try {
      const args: RefreshProjectsArgs = {
        filterByCategory: category,
        filterByOnchain: [],
        filterByOpenSource: [],
        sort,
        page,
        pageSize: itemsPerPage,
      }
      await refreshPaginated(args)
      dispatch(setSort(sort))
      setOpenSort(false)
    } catch (error) {
      throw new Error(error)
    }
  }

  return (
    <div>
      <LoadingModal isOpen={isLoading} />

      <SortOptionsStyled style={style} ref={sortOptionsRef}>
        {sortItems.map((item) => {
          const isActive = Object.keys(item.value)[0] === Object.keys(sort)[0]

          return (
            <li key={Object.keys(sort)[0]} onClick={() => clickSort(item.value)}>
              {item.label} {isActive && <span>{iCheck}</span>}
            </li>
          )
        })}
      </SortOptionsStyled>
    </div>
  )
}

const SortOptionsStyled = styled.ul`
  display: flex;
  flex-direction: column;
  font-size: var(--fsText);
  font-weight: var(--fwMedium);
  background-color: var(--underlay2);
  padding: 0.5rem 0;

  > li {
    height: 2.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    white-space: nowrap;
    padding: 0 1rem;
    cursor: pointer;
    transition: var(--transition1);

    &:hover {
      background-color: var(--underlay3);
    }

    > span {
      color: var(--colorOk);
    }
  }
`

export default SortOpt
