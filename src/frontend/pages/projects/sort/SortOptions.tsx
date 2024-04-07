import React, { useEffect, useRef } from "react"
import styled from "styled-components"
import { iCheck } from "@/components/icons/Icons"

// state
import { useAppSelector, useAppDispatch } from "@/hooks/useRedux"
import { selectSort, setSort } from "@/state/projects/sort"

const SortOptions = ({ openSort, setOpenSort, sortBtnWidth, sortBtnRef }) => {
  const dispatch = useAppDispatch()
  const sortOptionsRef = useRef(null)
  const sort = useAppSelector(selectSort)
  const style = { width: `${sortBtnWidth.toString()}px` }

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

  const clickSort = (sortType) => {
    dispatch(setSort(sortType))
    setOpenSort(false)
  }

  return (
    <SortOptionsStyled style={style} ref={sortOptionsRef}>
      <li onClick={() => clickSort("newest-first")}>
        Newest first {sort === "newest-first" && <span>{iCheck}</span>}
      </li>
      <li onClick={() => clickSort("oldest-first")}>
        Oldest first {sort === "oldest-first" && <span>{iCheck}</span>}
      </li>
      <li onClick={() => clickSort("most-upvoted")}>
        Most upvoted {sort === "most-upvoted" && <span>{iCheck}</span>}
      </li>
      <li onClick={() => clickSort("least-upvoted")}>
        Least upvoted {sort === "least-upvoted" && <span>{iCheck}</span>}
      </li>
    </SortOptionsStyled>
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

export default SortOptions
