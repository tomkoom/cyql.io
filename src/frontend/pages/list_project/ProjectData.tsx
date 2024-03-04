import React, { FC } from "react"
import styled from "styled-components"

// state
import { useAppSelector, useAppDispatch } from "@/hooks/useRedux"
import { selectCategoriesSortedByNum } from "@/state/categories/categoriesSortedByNum"
import { selectProposeProject, setProposeProjectCategory } from "@/state/proposeProject"

const ProjectData: FC = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const project = useAppSelector(selectProposeProject)
  const allCategories = useAppSelector(selectCategoriesSortedByNum)

  const updateCategory = (category: string) => {
    if (project.category.includes(category)) {
      const updated = project.category.filter((c) => c !== category)
      dispatch(setProposeProjectCategory(updated))
    } else {
      dispatch(setProposeProjectCategory([...project.category, category]))
    }
  }

  return (
    <ProjectDataStyled>
      <div className="section">
        <h4>Pick one or multiple categories</h4>
        <p>[{project.category.join(", ")}]</p>
        <Categories>
          {allCategories
            .filter((c) => c.id !== "all")
            .map((c) => (
              <li onClick={() => updateCategory(c.id)}>{c.id}</li>
            ))}
        </Categories>
      </div>
    </ProjectDataStyled>
  )
}

const ProjectDataStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  text-align: center;
  margin: 2rem 0;

  > div.section {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
`

const Categories = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.25rem;

  > li {
    height: 2.5rem;
    display: flex;
    align-items: center;
    font-size: var(--fsText);
    background-color: var(--underlay1);
    padding: 0 0.75rem;
    border-radius: 1.25rem;
    cursor: pointer;
    transition: var(--transition1);

    &:hover {
      background-color: var(--underlay2);
    }
  }
`

export default ProjectData
