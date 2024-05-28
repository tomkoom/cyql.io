import React, { FC, useState, useEffect } from "react"
import styled from "styled-components"
import { useScrollLock } from "@/hooks/_index"
import { CategoryListModal, CategoryBtn } from "./_index"

const Category: FC = (): JSX.Element => {
  const { lockScroll, unlockScroll } = useScrollLock()
  const [openCategoryList, setOpenCategoryList] = useState(false)

  useEffect(() => {
    if (openCategoryList) {
      lockScroll()
    } else {
      unlockScroll()
    }
  }, [openCategoryList])

  return (
    <CategoryStyled>
      <div onClick={() => setOpenCategoryList((prev) => !prev)}>
        <CategoryBtn />
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
