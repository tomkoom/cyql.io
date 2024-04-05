import React, { FC, useEffect, useRef } from "react"
import styled from "styled-components"
import { ActionCreatorWithOptionalPayload } from "@reduxjs/toolkit"
import { iCheck } from "@/components/icons/Icons"

// state
import { useAppDispatch } from "@/hooks/useRedux"

interface FilterOptionsProps {
  isOpen: boolean
  setIsOpen: (value: boolean) => void
  filterBtnWidth: number
  filterBtnRef: React.MutableRefObject<HTMLDivElement>
  filter: boolean
  setFilter: ActionCreatorWithOptionalPayload<boolean>
}

const FilterOptions: FC<FilterOptionsProps> = ({
  isOpen,
  setIsOpen,
  filterBtnWidth,
  filterBtnRef,
  filter,
  setFilter,
}): JSX.Element => {
  const dispatch = useAppDispatch()
  const filterOptionsRef = useRef(null)
  const style = { width: `${filterBtnWidth.toString()}px` }

  const handleOutsideClick = (e) => {
    if (
      isOpen &&
      filterOptionsRef.current &&
      !filterOptionsRef.current.contains(e.target) &&
      filterBtnRef.current &&
      !filterBtnRef.current.contains(e.target)
    ) {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    // bind the event listener
    document.addEventListener("mousedown", handleOutsideClick)
    return () => {
      // unbind the event listener on clean up
      document.removeEventListener("mousedown", handleOutsideClick)
    }
  }, [isOpen])

  const onFilter = (value: null | boolean) => {
    dispatch(setFilter(value))
    setIsOpen(false)
  }

  return (
    <FilterOptionsStyled style={style} ref={filterOptionsRef}>
      <li onClick={() => onFilter(null)}>All {filter === null && <Icon>{iCheck}</Icon>}</li>
      <li onClick={() => onFilter(true)}>True {filter === true && <Icon>{iCheck}</Icon>}</li>
      <li onClick={() => onFilter(false)}>False {filter === false && <Icon>{iCheck}</Icon>}</li>
    </FilterOptionsStyled>
  )
}

const FilterOptionsStyled = styled.ul`
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
  }
`

const Icon = styled.span`
  color: var(--colorOk);
`

export default FilterOptions
