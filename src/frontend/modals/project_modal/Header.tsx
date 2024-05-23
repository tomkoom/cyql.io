import React, { FC } from "react"
import styled from "styled-components"

// state
import { useAppSelector } from "@/hooks/useRedux"
import { selectProject } from "@/state/modals/projectModal"

const Header: FC = (): JSX.Element => {
  const project = useAppSelector(selectProject)

  return (
    <HeaderStyled>
      {project.id ? (
        <Title>
          <h5>Edit {project.name}</h5>
          {project.id && <p>id: {project.id}</p>}
        </Title>
      ) : (
        <Title>
          <h5>Add new project</h5>
        </Title>
      )}
    </HeaderStyled>
  )
}

const HeaderStyled = styled.div`
  display: flex;
  align-items: center;
`

const Title = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  > h4 {
    font-size: var(--fs4);
  }

  > p {
    font-size: var(--fsText);
    background-color: var(--underlay1);
    padding: 0.5rem;
  }
`

export default Header
