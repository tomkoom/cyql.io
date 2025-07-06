import React, { Dispatch, FC, SetStateAction } from "react"
import styled from "styled-components"
import { CrossIcon } from "@/components/icons/_index"
import { Btn } from "@/components/btns"
import { useProjects, useQueryParams } from "@/hooks/_index"

// state
import { useAppSelector } from "@/hooks/useRedux"
import { selectCategories } from "@/state/categories/categories"

interface CategoryListModalProps {
  openCategoryList: boolean
  setOpenCategoryList: Dispatch<SetStateAction<boolean>>
}

const CategoryListModal: FC<CategoryListModalProps> = ({ openCategoryList, setOpenCategoryList }): JSX.Element => {
  const { refreshPaginated } = useProjects()
  const { queryParams } = useQueryParams()
  const categories = useAppSelector(selectCategories).categoriesWithSize

  const refresh = async (updatedCategory: string): Promise<void> => {
    try {
      await refreshPaginated({
        ...queryParams,
        category: updatedCategory,
      })
    } catch (error) {
      throw new Error(error)
    }
  }

  const closeModal = (): void => {
    setOpenCategoryList(false)
  }

  const setCategory = async (updatedCategory: string): Promise<void> => {
    try {
      await refresh(updatedCategory)
      closeModal()
    } catch (error) {
      throw new Error(error)
    }
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
          {categories.map((c) => (
            <li
              key={c.category.id}
              id={queryParams.category.toLowerCase() === c.category.lbl.toLowerCase() ? "active" : null}
              onClick={() => setCategory(c.category.lbl)}
            >
              <span className="label">{c.category.lbl}</span>
              <span className="num">{c.size.toString()}</span>
            </li>
          ))}
        </Categories>

        {queryParams.category !== "All" && <Btn style={{ width: "100%" }} btnType={"secondary"} text={"Reset Filter"} onClick={() => setCategory("All")} />}
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
  gap: 1rem;
`

const Categories = styled.ul`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.25rem;
  font-weight: var(--fwMedium);
  margin: 0.5rem 0;

  > li {
    height: 2.75rem;
    display: flex;
    align-items: center;
    gap: 0.25rem;
    white-space: nowrap;
    padding: 0 0.75rem;
    background-color: var(--underlay1);
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

    > span.num {
      color: var(--tertiaryColor);
    }
  }
`

export default CategoryListModal
