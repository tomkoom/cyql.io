import React, { FC } from "react"
import styled from "styled-components"

// state
import { useAppSelector, useAppDispatch } from "@/hooks/useRedux"
import { selectProposedProject, setProposedProjectCategory } from "@/state/proposedProject"

interface CategoriesProps {
  name: string
  categories: string[]
}

const Categories: FC<CategoriesProps> = ({ name, categories }): JSX.Element => {
  const dispatch = useAppDispatch()
  const project = useAppSelector(selectProposedProject)

  const updateCategory = (category: string) => {
    if (project.category.includes(category)) {
      const updated = project.category.filter((c) => c !== category)
      dispatch(setProposedProjectCategory(updated))
    } else {
      dispatch(setProposedProjectCategory([...project.category, category]))
    }
  }

  return (
    <CategoriesStyled>
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
    </CategoriesStyled>
  )
}

const CategoriesStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  > h6 {
    margin-bottom: 0.5rem;
  }

  > div {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 0.5rem;

    > div {
      height: 2.5rem;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      font-size: var(--fsText);
      font-weight: var(--fwMedium);
      background-color: var(--underlay1);
      padding: 0 0.75rem;
      cursor: pointer;
      transition: var(--transition1);

      &:hover {
        background-color: var(--underlay2);
      }

      &.active {
        color: var(--background);
        background-color: var(--primaryColor);
      }
    }
  }
`

export default Categories
