import React, { FC } from "react"
import styled from "styled-components"

// state
import { useAppSelector, useAppDispatch } from "@/hooks/useRedux"
import { selectListProject, setListProjectCategory } from "@/state/listProject"

interface CategoryBlockProps {
  name: string
  categories: string[]
}

const CategoryBlock: FC<CategoryBlockProps> = ({ name, categories }): JSX.Element => {
  const dispatch = useAppDispatch()
  const project = useAppSelector(selectListProject)

  const updateCategory = (category: string) => {
    if (project.category.includes(category)) {
      const updated = project.category.filter((c) => c !== category)
      dispatch(setListProjectCategory(updated))
    } else {
      dispatch(setListProjectCategory([...project.category, category]))
    }
  }

  return (
    <CategoryBlockStyled>
      <h6>{name}</h6>
      <div>
        {categories.map((c) => (
          <div
            key={`category-${c}`}
            className={project.category.includes(c) ? "active" : null}
            onClick={() => updateCategory(c)}
          >
            {c}
          </div>
        ))}
      </div>
    </CategoryBlockStyled>
  )
}

const CategoryBlockStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background-color: var(--underlay1);
  padding: 0.75rem 0.5rem;

  > h6 {
    margin-bottom: 0.5rem;
    font-size: var(--fsText);
    font-weight: var(--fwMedium);
  }

  > div {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 0.5rem;

    > div {
      height: 2rem;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      font-size: var(--fsText);
      font-weight: var(--fwMedium);
      background-color: var(--underlay2);
      padding: 0 0.5rem;
      cursor: pointer;
      transition: var(--transition1);

      &:hover {
        background-color: var(--underlay3);
      }

      &.active {
        color: var(--background);
        background-color: var(--primaryColor);
      }
    }
  }
`

export default CategoryBlock
