import React, { Dispatch, FC, SetStateAction } from "react"
import styled from "styled-components"
import { CrossIcon } from "@/components/icons/_index"
import type { Category } from "@/state/_types/types"

// state
import { useAppSelector, useAppDispatch } from "@/hooks/useRedux"
import { setCategory, selectCategory } from "@/state/projects/category"
import { selectActiveProjects } from "@/state/projects"
import { selectCategoriesSortedByNum } from "@/state/categories/categoriesSortedByNum"

interface CategoryListModalProps {
  openCategoryList: boolean
  setOpenCategoryList: Dispatch<SetStateAction<boolean>>
}

const CategoryListModal: FC<CategoryListModalProps> = ({
  openCategoryList,
  setOpenCategoryList,
}): JSX.Element => {
  const dispatch = useAppDispatch()
  const cat = useAppSelector(selectCategory)
  const projects = useAppSelector(selectActiveProjects)
  const categoriesSorted = useAppSelector(selectCategoriesSortedByNum)

  const clickCategory = (categoryLabel: string): void => {
    dispatch(setCategory(categoryLabel))
    closeCategoryList()
  }

  const closeCategoryList = (): void => {
    setOpenCategoryList(false)
  }

  const getCategoriesNum = (category: Category): number => {
    return category.id === "all"
      ? projects.length
      : projects.filter((p) => p.category.includes(category.label)).length
  }

  if (!openCategoryList) {
    return null
  }

  return (
    <CategoryListModalStyled>
      <Content>
        <CrossIcon onClick={closeCategoryList} />
        <h3>filter by category</h3>

        <Categories>
          {categoriesSorted.map((c) => (
            <li
              key={c.id}
              id={cat === c.label ? "active" : undefined}
              onClick={() => clickCategory(c.label)}
            >
              {c.icon} {c.label} <span>{getCategoriesNum(c).toString()}</span>
            </li>
          ))}
        </Categories>
      </Content>
    </CategoryListModalStyled>
  )
}

const CategoryListModalStyled = styled.div`
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  background-color: var(--background);
  padding: 1rem;

  /* overflow */
  height: 100%;
  overflow: auto;
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`

const Categories = styled.ul`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.5rem;
  font-weight: var(--fwMedium);
  padding: 1rem;

  > li {
    height: 3rem;
    display: flex;
    align-items: center;
    gap: 0.125rem;
    white-space: nowrap;
    padding: 0 0.75rem;
    background-color: var(--underlay1);
    border-radius: 1.5rem;
    cursor: pointer;

    &:hover {
      background-color: var(--underlay2);
    }

    #active {
      color: white;
      background-color: var(--highlight1);
      box-shadow: unset;
    }

    > span {
      color: var(--tertiaryColor);
    }
  }
`

export default CategoryListModal
