import React, { FC, useState, useRef, useLayoutEffect } from "react"
import styled from "styled-components"
import { SortBtn, SortOptions } from "./_index"
import { useQueryParams } from "@/hooks/_index"

const Sort: FC = (): JSX.Element => {
  const { refreshProjectsParams } = useQueryParams()
  const [openSort, setOpenSort] = useState<boolean>(false)
  const [sortBtnWidth, setSortBtnWidth] = useState<number>(0)
  const sortBtnRef = useRef<HTMLDivElement>(null)

  const openSortMenu = (): void => {
    setOpenSort((prev) => !prev)
  }

  useLayoutEffect(() => {
    setSortBtnWidth(sortBtnRef.current.offsetWidth)
  }, [refreshProjectsParams.sort])

  return (
    <SortStyled>
      <div onClick={openSortMenu} ref={sortBtnRef}>
        <SortBtn />
      </div>

      <div className="sort_options">
        {openSort && (
          <SortOptions
            openSort={openSort}
            setOpenSort={setOpenSort}
            sortBtnWidth={sortBtnWidth}
            sortBtnRef={sortBtnRef}
          />
        )}
      </div>
    </SortStyled>
  )
}

const SortStyled = styled.div`
  position: relative;

  > div.sort_options {
    position: absolute;
    top: calc(40px + 0.25rem);
    left: 0;
    z-index: 999;
  }
`

export default Sort
