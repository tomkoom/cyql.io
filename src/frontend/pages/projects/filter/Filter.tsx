import { Option } from "@/state/types/curated_projects_types"
import React, { FC, useLayoutEffect, useRef, useState } from "react"
import styled from "styled-components"
import { FilterBtn, FilterOptions } from "./_index"

interface FilterProps {
  filterId: string
  label: string
  filter: Option
}

const Filter: FC<FilterProps> = ({ filterId, label, filter }): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [filterBtnWidth, setFilterBtnWidth] = useState<number>(0)
  const filterBtnRef = useRef<HTMLDivElement>(null)

  const openFilterMenu = () => {
    setIsOpen((prev) => !prev)
  }

  useLayoutEffect(() => {
    setFilterBtnWidth(filterBtnRef.current.offsetWidth)
  }, [filter])

  return (
    <FilterStyled>
      <div onClick={openFilterMenu} ref={filterBtnRef}>
        <FilterBtn label={label} filter={filter} />
      </div>

      <Options>
        {isOpen && (
          <FilterOptions
            filterId={filterId}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            filterBtnWidth={filterBtnWidth}
            filterBtnRef={filterBtnRef}
            filter={filter}
          />
        )}
      </Options>
    </FilterStyled>
  )
}

const FilterStyled = styled.div`
  position: relative;
`

const Options = styled.div`
  position: absolute;
  top: calc(40px + 0.25rem);
  left: 0;
  z-index: 999;
`

export default Filter
