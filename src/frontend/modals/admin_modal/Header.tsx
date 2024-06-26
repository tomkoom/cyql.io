import React, { FC } from "react"
import styled from "styled-components"

// state
import { useAppSelector } from "@/hooks/useRedux"
import { selectAdmin } from "@/state/admin/admin"

const Header: FC = (): JSX.Element => {
  const project = useAppSelector(selectAdmin).project

  return (
    <HeaderStyled>
      {project.id ? (
        <div className="title">
          <h5>Edit {project.name}</h5>
          <span>id: {project.id}</span>
        </div>
      ) : (
        <div className="title">
          <h5>Add new project</h5>
        </div>
      )}
    </HeaderStyled>
  )
}

const HeaderStyled = styled.div`
  display: flex;
  align-items: center;

  > div.title {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    > span {
      font-size: var(--fsText);
      background-color: var(--underlay1);
      padding: 0.5rem;
    }
  }
`

const Title = styled.div``

export default Header
