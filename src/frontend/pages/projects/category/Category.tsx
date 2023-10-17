import React, { FC, useState, useEffect, useRef } from "react"
import styled from "styled-components"
import { useScrollLock } from "@/hooks/useScrollLock"
import { Btn, CategoryListModal } from "./_index"

const Category: FC = (): JSX.Element => {
  const { lockScroll, unlockScroll } = useScrollLock()
  const [openCategoryList, setOpenCategoryList] = useState(false)
  const categoryBtnRef = useRef(null)

  // prevent from scrolling when modal is active
  useEffect(() => {
    if (openCategoryList) {
      lockScroll()
    } else {
      unlockScroll()
    }
  }, [openCategoryList])

  return (
    <CategoryStyled>
      <div onClick={() => setOpenCategoryList((prev) => !prev)} ref={categoryBtnRef}>
        <Btn />
      </div>

      {openCategoryList && (
        <CategoryListModal
          openCategoryList={openCategoryList}
          setOpenCategoryList={setOpenCategoryList}
        />
      )}
    </CategoryStyled>
  )
}

const CategoryStyled = styled.div`
  display: flex;
  align-self: flex-start;
`

export default Category
