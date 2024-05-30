import React, { FC } from "react"
import styled from "styled-components"
import type { Category } from "@/state/_types/types"

// state
import { useAppSelector, useAppDispatch } from "@/hooks/useRedux"
import { selectAllCategories } from "@/state/categories/allCategories"
import { selectAdmin, setAdminProjectItemArray } from "@/state/admin/admin"

const categoryKey = "category"

const CategoryList: FC = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const allCategories = useAppSelector(selectAllCategories)
  const category = useAppSelector(selectAdmin).project.category
  const copy = category.slice()

  const setCategory = (label: string): void => {
    if (copy.includes(label)) {
      const index = copy.indexOf(label)
      copy.splice(index, 1)
    } else {
      copy.push(label)
    }
    dispatch(setAdminProjectItemArray({ [categoryKey]: copy }))
  }

  const active = {
    backgroundColor: "var(--primaryColor)",
    color: "var(--background)",
  }

  return (
    <CategoryListStyled>
      {allCategories
        .filter((category: Category) => category.id !== "all")
        .map((category: Category) => (
          <Item style={copy.includes(category.label) ? active : null} key={category.id} onClick={() => setCategory(category.label)}>
            {category.label.toLowerCase()}
          </Item>
        ))}
    </CategoryListStyled>
  )
}

const CategoryListStyled = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
`

const Item = styled.li`
  font-size: var(--fsText);
  font-weight: var(--fwMedium);
  padding: 0.75rem;
  background-color: var(--underlay1);
  cursor: pointer;
  transition: var(--transition1);

  &:hover {
    background-color: var(--underlay2);
  }
`

export default CategoryList
