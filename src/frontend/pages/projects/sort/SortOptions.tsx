import { iCheck } from "@/components/icons/Icons"
import { useProjects, useQueryParams } from "@/hooks"
import { LoadingModal } from "@/modals"
import React, { Dispatch, FC, MutableRefObject, SetStateAction, useEffect, useRef } from "react"
import styled from "styled-components"
import type { SortOptions } from "../../../../declarations/backend/backend.did"

// state
import { useAppSelector } from "@/hooks/useRedux"
import { selectPaginatedIsLoading } from "@/state/projects/paginated"

interface SortOptProps {
  openSort: boolean
  setOpenSort: Dispatch<SetStateAction<boolean>>
  sortBtnWidth: number
  sortBtnRef: MutableRefObject<HTMLDivElement>
}

const sortItems = [
  { label: "Newest first", value: { newest_first: null } },
  { label: "Oldest first", value: { oldest_first: null } },
  { label: "Most upvoted", value: { most_upvoted: null } },
  { label: "Least upvoted", value: { least_upvoted: null } },
  { label: "Recently updated", value: { recently_updated: null } },
]

const SortOpt: FC<SortOptProps> = ({ openSort, setOpenSort, sortBtnWidth, sortBtnRef }): JSX.Element => {
  const sortOptionsRef = useRef(null)
  const { refreshPaginated } = useProjects()
  const { queryParams } = useQueryParams()
  const style = { width: `${sortBtnWidth.toString()}px` }
  const isLoading = useAppSelector(selectPaginatedIsLoading)

  const handleOutsideClick = (e: any) => {
    if (openSort && sortOptionsRef.current && !sortOptionsRef.current.contains(e.target) && sortBtnRef.current && !sortBtnRef.current.contains(e.target)) {
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
      await refreshPaginated({
        ...queryParams,
        sort,
      })
      setOpenSort(false)
    } catch (error) {
      throw new Error(error)
    }
  }

  return (
    <SortOptionsStyled>
      <LoadingModal isOpen={isLoading} />

      <ul style={style} ref={sortOptionsRef}>
        {sortItems.map((item) => {
          const isActive = Object.keys(item.value)[0] === Object.keys(queryParams.sort)[0]

          return (
            <li key={Object.keys(item.value)[0]} onClick={() => clickSort(item.value)}>
              {item.label} {isActive && <span>{iCheck}</span>}
            </li>
          )
        })}
      </ul>
    </SortOptionsStyled>
  )
}

const SortOptionsStyled = styled.ul`
  > ul {
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
  }
`

export default SortOpt
