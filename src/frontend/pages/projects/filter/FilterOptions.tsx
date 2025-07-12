import { iCheck } from "@/components/icons/Icons"
import { useProjects, useQueryParams } from "@/hooks"
import { Option } from "@/state/types/curated_projects_types"
import React, { FC, useEffect, useRef } from "react"
import styled from "styled-components"

interface FilterOptionsProps {
  isOpen: boolean
  setIsOpen: (value: boolean) => void
  filterBtnWidth: number
  filterBtnRef: React.MutableRefObject<HTMLDivElement>
  // ...
  filterId: string
  filter: Option
}

const filterItems = [
  { label: "All", value: [] },
  { label: "True", value: [true] },
  { label: "False", value: [false] },
]

const FilterOptions: FC<FilterOptionsProps> = ({
  isOpen,
  setIsOpen,
  filterBtnWidth,
  filterBtnRef,
  filter,
  // ...
  filterId,
}): JSX.Element => {
  const filterOptionsRef = useRef(null)
  const { refreshPaginated } = useProjects()
  const { queryParams } = useQueryParams()
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

  // handle outside click
  useEffect(() => {
    // bind the event listener
    document.addEventListener("mousedown", handleOutsideClick)
    return () => {
      // unbind the event listener on clean up
      document.removeEventListener("mousedown", handleOutsideClick)
    }
  }, [isOpen])

  const onFilter = async (filter: Option): Promise<void> => {
    try {
      await refreshPaginated({ ...queryParams, ...{ [filterId]: filter } })
    } catch (error) {
      throw new Error(error)
    } finally {
      setIsOpen(false)
    }
  }

  return (
    <FilterOptionsStyled style={style} ref={filterOptionsRef}>
      {filterItems.map((item) => (
        <li key={item.label} onClick={() => onFilter(item.value.length < 1 ? [] : item.value[0] === true ? [true] : item.value[0] === false ? [false] : null)}>
          {item.label} {(item?.value[0] === filter[0] || (item.value.length === 0 && filter.length === 0)) && <Icon>{iCheck}</Icon>}
        </li>
      ))}
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
