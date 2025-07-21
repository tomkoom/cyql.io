import { Project } from "@/state/types/Project"
import styled from "styled-components"
import { Name, Tags } from "."

interface TitleProps {
  project: Project
}

export default function Title({ project }: TitleProps) {
  return (
    <TitleStyled>
      <Name name={project.name} />
      <Tags project={project} />
    </TitleStyled>
  )
}

const TitleStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`
