import React, { FC, ChangeEvent } from "react"
import styled from "styled-components"

// state
import { useAppSelector, useAppDispatch } from "@/hooks/useRedux"
import {
  selectProjectDescription,
  setProjectDescription,
} from "@/state/modals/projectModal"

const Description: FC = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const description = useAppSelector(selectProjectDescription)

  const setDescription = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    dispatch(setProjectDescription(e.target.value))
  }

  return (
    <DescriptionStyled>
      <label htmlFor="project-description">description</label>
      <textarea value={description} onChange={setDescription} id="project-description" rows={6} />
    </DescriptionStyled>
  )
}

const DescriptionStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.25rem;

  > label {
    font-size: var(--fsText);
    font-weight: var(--fwMedium);
    color: var(--tertiaryColor);
  }

  > textarea {
    width: 100%;
    font-size: var(--fsText);
    padding: 0.5rem;
    color: var(--primaryColor);
    background-color: var(--underlay1);
    border: none;
    outline: none;
  }
`

export default Description
