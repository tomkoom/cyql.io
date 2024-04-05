import React, { Dispatch, FC, SetStateAction } from "react"
import styled from "styled-components"
import { CrossIcon } from "@/components/icons/_index"
import { useSearchParams } from "react-router-dom"
import { PROJECTS_SEARCH_PARAMS_INITIAL } from "@/constants/constants"
import { getCategoryNum } from "@/utils/getCategoryNum"

// state
import { useAppSelector } from "@/hooks/useRedux"
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
  const projects = useAppSelector(selectActiveProjects)
  const categoriesSorted = useAppSelector(selectCategoriesSortedByNum)

  // ...
  const [searchParams, setSearchParams] = useSearchParams(PROJECTS_SEARCH_PARAMS_INITIAL)
  const category = searchParams.get("category")

  const updateCategory = (categoryLabel: string) => {
    return setSearchParams(
      (prev) => {
        prev.set("category", categoryLabel)
        return prev
      },
      { replace: true }
    )
  }

  const closeModal = (): void => {
    setOpenCategoryList(false)
  }

  const clickCategory = (categoryLabel: string): void => {
    updateCategory(categoryLabel)
    closeModal()
  }

  if (!openCategoryList) {
    return null
  }

  return (
    <CategoryListModalStyled>
      <Content>
        <CrossIcon onClick={closeModal} />
        <h3>Filter by Category</h3>

        <Categories>
          {categoriesSorted.map((c) => (
            <li
              key={c.id}
              id={category === c.label ? "active" : null}
              onClick={() => clickCategory(c.label)}
            >
              {c.label} <span>{getCategoryNum(projects, c.label).toString()}</span>
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
  gap: 0.25rem;
`

const Categories = styled.ul`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.25rem;
  font-weight: var(--fwMedium);
  padding: 1rem;

  > li {
    height: 2.75rem;
    display: flex;
    align-items: center;
    gap: 0.125rem;
    white-space: nowrap;
    padding: 0 0.75rem;
    background-color: var(--underlay1);
    /* border-radius: 1.375rem; */
    font-size: var(--fsText);
    cursor: pointer;
    transition: var(--transition1);

    &:hover {
      background-color: var(--underlay2);
    }

    &#active {
      color: var(--background);
      background-color: var(--primaryColor);
      box-shadow: unset;
    }

    > span {
      color: var(--tertiaryColor);
    }
  }
`

export default CategoryListModal
