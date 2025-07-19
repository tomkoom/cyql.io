import { useAppDispatch, useAppSelector } from "@/hooks/useRedux"
import { selectAdmin, setAdminProjectItemString } from "@/state/admin/admin"
import { ChangeEvent } from "react"
import styled from "styled-components"

export default function Description() {
  const dispatch = useAppDispatch()
  const description = useAppSelector(selectAdmin).project.description

  const setDescription = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    const key = "description"
    dispatch(setAdminProjectItemString({ [key]: e.target.value }))
  }

  return (
    <DescriptionStyled>
      <label htmlFor="project_description">description</label>
      <textarea value={description} onChange={setDescription} id="project_description" rows={6} />
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
    line-height: 150%;
    border: none;
    outline: none;
  }
`
