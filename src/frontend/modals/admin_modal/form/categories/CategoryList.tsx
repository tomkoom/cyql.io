import React, { FC } from "react"
import styled from "styled-components"

// state
import { useAppSelector, useAppDispatch } from "@/hooks/useRedux"
import { selectAdmin, setAdminProjectItemArray } from "@/state/admin/admin"
import { selectCategories } from "@/state/categories/categories"

const categoryKey = "category"

const CategoryList: FC = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const categories = useAppSelector(selectCategories).categoriesWithSize
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
      {categories
        .filter((c) => c.category.id !== "all")
        .map((c) => (
          <Item key={c.category.id} style={copy.includes(c.category.lbl) ? active : null} onClick={() => setCategory(c.category.lbl)}>
            {c.category.lbl.toLowerCase()}
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
