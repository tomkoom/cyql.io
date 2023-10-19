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
  const projectCategory = useAppSelector(selectCategory)
  const projects = useAppSelector(selectActiveProjects)
  const projectsNum = projects.length
  const categoriesSortedByNum = useAppSelector(selectCategoriesSortedByNum)

  const clickCategory = (categoryLabel: string) => {
    dispatch(setCategory(categoryLabel))
    closeCategoryList()
  }

  const closeCategoryList = () => {
    setOpenCategoryList(false)
  }

  const categoriesNum = (category: Category) => {
    return category.id === "all"
      ? projectsNum
      : projects.filter((project) => project.category.includes(category.label)).length
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
          {categoriesSortedByNum.map((category) => (
            <li
              key={category.id}
              id={projectCategory === category.label ? "active" : undefined}
              onClick={() => clickCategory(category.label)}
            >
              {category.icon} {category.label.toLowerCase()}{" "}
              <span className="categoriesNum">{categoriesNum(category)}</span>
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
  font-weight: var(--fwBold);
  padding: 1rem;
  border-radius: 0.75rem;

  > li {
    height: 3rem;
    display: flex;
    align-items: center;
    gap: 0.125rem;
    white-space: nowrap;
    padding: 0 1rem;
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

    > span.categoriesNum {
      color: var(--tertiaryColor);
    }
  }
`

export default CategoryListModal
